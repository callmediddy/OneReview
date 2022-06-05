import { gql, useQuery } from '@apollo/client'
import SinglePost from '@components/Post/SinglePost'
import PostsShimmer from '@components/Shared/Shimmer/PostsShimmer'
import { Card } from '@components/UI/Card'
import { EmptyState } from '@components/UI/EmptyState'
import { ErrorMessage } from '@components/UI/ErrorMessage'
import { Spinner } from '@components/UI/Spinner'
import { Reviews } from '@generated/reviewtypes'
import { PaginatedResultInfo, Profile } from '@generated/types'
import { CommentFields } from '@gql/CommentFields'
import { PostFields } from '@gql/PostFields'
import { CollectionIcon } from '@heroicons/react/outline'
import consoleLog from '@lib/consoleLog'
import React, { FC, useState } from 'react'
import { useInView } from 'react-cool-inview'

const PROFILE_FEED_QUERY = gql`
  query ProfileFeed($request: PublicationsQueryRequest!) {
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
  profile: Profile
  type: 'POST' | 'COMMENT'
}

const Feed: FC<Props> = ({ profile, type }) => {
  const [publications, setPublications] = useState<Reviews[]>([])
  const [pageInfo, setPageInfo] = useState<PaginatedResultInfo>()
  const { data, loading, error, fetchMore } = useQuery(PROFILE_FEED_QUERY, {
    variables: {
      request: { publicationTypes: type, profileId: profile?.id, limit: 10 }
    },
    skip: !profile?.id,
    fetchPolicy: 'no-cache',
    onCompleted(data) {
      setPageInfo(data?.publications?.pageInfo)
      setPublications(data?.publications?.items)
      consoleLog(
        'Query',
        '#ffa500',
        `Fetched first 10 profile publications Profile:${profile?.id}`
      )
    }
  })

  const { observe } = useInView({
    onEnter: () => {
      fetchMore({
        variables: {
          request: {
            publicationTypes: type,
            profileId: profile?.id,
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
          `Fetched next 10 profile publications Profile:${profile?.id} Next:${pageInfo?.next}`
        )
      })
    }
  })

  console.log('length', data?.publications?.items?.length)
  return (
    <>
      {loading && <PostsShimmer />}
      {data?.publications?.items?.length === 0 && (
        <EmptyState
          message={
            <div>
              <span className="mr-1 font-bold">@{profile?.handle}</span>
              <span>seems like not {type.toLowerCase()}ed yet!</span>
            </div>
          }
          icon={<CollectionIcon className="w-8 h-8 text-brand" />}
        />
      )}
      <ErrorMessage title="Failed to load profile feed" error={error} />
      {!error && !loading && data?.publications?.items?.length !== 0 && (
        <>
          <Card className="divide-y-[1px] dark:divide-gray-700/80">
            {publications?.map((post: Reviews, index: number) => (
              <SinglePost key={`${post?.id}_${index}`} post={post} url={''} />
            ))}
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
