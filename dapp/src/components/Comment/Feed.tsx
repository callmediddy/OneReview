import { gql, useQuery } from '@apollo/client'
import SinglePost from '@components/Post/SinglePost'
import PostsShimmer from '@components/Shared/Shimmer/PostsShimmer'
import { Card } from '@components/UI/Card'
import { EmptyState } from '@components/UI/EmptyState'
import { ErrorMessage } from '@components/UI/ErrorMessage'
import { Spinner } from '@components/UI/Spinner'
import AppContext from '@components/utils/AppContext'
import { Reviews } from '@generated/reviewtypes'
import { PaginatedResultInfo } from '@generated/types'
import { CommentFields } from '@gql/CommentFields'
import { CollectionIcon } from '@heroicons/react/outline'
import consoleLog from '@lib/consoleLog'
import { useRouter } from 'next/router'
import React, { FC, useContext, useState } from 'react'
import { useInView } from 'react-cool-inview'

import ReferenceAlert from '../Shared/ReferenceAlert'
import NewComment from './NewComment'

const COMMENT_FEED_QUERY = gql`
  query CommentFeed($request: PublicationsQueryRequest!) {
    publications(request: $request) {
      items {
        ... on Comment {
          ...CommentFields
        }
      }
      pageInfo {
        totalCount
        next
      }
    }
  }
  ${CommentFields}
`
interface Props {
  post: Reviews
  type?: 'comment' | 'community post'
  onlyFollowers?: boolean
  isFollowing?: boolean
  url?: string | string[]
}

const Feed: FC<Props> = ({
  post,
  type = 'comment',
  onlyFollowers = false,
  isFollowing = true,
  url = ''
}) => {
  const {
    query: { id }
  } = useRouter()
  const { currentUser } = useContext(AppContext)
  const [publications, setPublications] = useState<Reviews[]>([])
  const [pageInfo, setPageInfo] = useState<PaginatedResultInfo>()
  const { data, loading, error, fetchMore } = useQuery(COMMENT_FEED_QUERY, {
    variables: {
      request: { commentsOf: id, limit: 10 }
    },
    skip: !id,
    fetchPolicy: 'no-cache',
    onCompleted(data) {
      setPageInfo(data?.publications?.pageInfo)
      setPublications(data?.publications?.items)
      consoleLog(
        'Query',
        '#ffa500',
        `Fetched first 10 comments of Publication:${id}`
      )
    }
  })

  const { observe } = useInView({
    onEnter: () => {
      fetchMore({
        variables: {
          request: {
            commentsOf: post?.id,
            cursor: pageInfo?.next,
            limit: 10
          }
        }
      }).then(({ data }: any) => {
        setPageInfo(data?.publications?.pageInfo)
        setPublications([...publications, ...data?.publications?.items])
        consoleLog(
          'Query',
          '#ffa500',
          `Fetched next 10 comments of Publication:${id} Next:${pageInfo?.next}`
        )
      })
    }
  })

  return (
    <>
      {currentUser &&
        (isFollowing || !onlyFollowers ? (
          <NewComment post={post} type={type} url={url} />
        ) : (
          <ReferenceAlert
            handle={post?.profile?.handle}
            isSuperFollow={
              post?.profile?.followModule?.__typename ===
              'FeeFollowModuleSettings'
            }
            action="comment"
          />
        ))}
      {loading && <PostsShimmer />}
      {data?.publications?.items?.length === 0 && (
        <EmptyState
          message={<span>Be the first one to comment!</span>}
          icon={<CollectionIcon className="w-8 h-8 text-brand" />}
        />
      )}
      <ErrorMessage title="Failed to load comment feed" error={error} />
      {!error && !loading && data?.publications?.items?.length !== 0 && (
        <>
          <Card className="divide-y-[1px] dark:divide-gray-700/80">
            {publications?.map((post: Reviews, index: number) =>
              post?.metadata?.name === url ? (
                <SinglePost
                  key={`${post?.id}_${index}`}
                  post={post}
                  hideType
                  url={url}
                />
              ) : null
            )}
          </Card>
          {pageInfo?.next && publications.length !== pageInfo?.totalCount && (
            <span ref={observe} className="flex justify-center p-5">
              <Spinner size="sm" />
            </span>
          )}
        </>
      )}
    </>
  )
}

export default Feed
