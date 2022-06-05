import { gql, useQuery } from '@apollo/client'
import Feed from '@components/Comment/Feed'
import { GridItemEight, GridItemFour, GridLayout } from '@components/GridLayout'
import UserProfile from '@components/Shared/UserProfile'
import { Card, CardBody } from '@components/UI/Card'
import AppContext from '@components/utils/AppContext'
import SEO from '@components/utils/SEO'
import { Reviews } from '@generated/reviewtypes'
import { CommentFields } from '@gql/CommentFields'
import { PostFields } from '@gql/PostFields'
import consoleLog from '@lib/consoleLog'
import { apps } from 'data/apps'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import { ZERO_ADDRESS } from 'src/constants'
import Custom404 from 'src/pages/404'
import Custom500 from 'src/pages/500'

import IPFSHash from './IPFSHash'
import PostPageShimmer from './Shimmer'
import SinglePost from './SinglePost'
import ViaApp from './ViaApp'

export const POST_QUERY = gql`
  query Post(
    $request: PublicationQueryRequest!
    $followRequest: DoesFollowRequest!
  ) {
    publication(request: $request) {
      ... on Post {
        ...PostFields
        onChainContentURI
        referenceModule {
          __typename
        }
      }
      ... on Comment {
        ...CommentFields
        onChainContentURI
        referenceModule {
          __typename
        }
      }
    }
    doesFollow(request: $followRequest) {
      follows
    }
  }
  ${PostFields}
  ${CommentFields}
`

const ViewPost: NextPage = () => {
  const {
    query: { id }
  } = useRouter()

  const { currentUser } = useContext(AppContext)
  const { data, loading, error } = useQuery(POST_QUERY, {
    variables: {
      request: { publicationId: id },
      followRequest: {
        followInfos: {
          followerAddress: currentUser?.ownedBy
            ? currentUser?.ownedBy
            : ZERO_ADDRESS,
          profileId: id?.toString().split('-')[0]
        }
      }
    },
    skip: !id,
    onCompleted() {
      consoleLog(
        'Query',
        '#ffa500',
        `Fetched publication details Publication:${id}`
      )
    }
  })

  if (error) return <Custom500 />
  if (loading || !data) return <PostPageShimmer />
  if (!data.publication) return <Custom404 />

  const post: Reviews = data.publication
  const appConfig = apps.filter((e) => e.id === post?.appId)[0]

  return (
    <GridLayout>
      <SEO title={`${post?.__typename} by @${post?.profile?.handle}`} />
      <GridItemEight className="space-y-5">
        <Card>
          <SinglePost post={post} showThread />
        </Card>
        <Feed
          post={post}
          onlyFollowers={
            post?.referenceModule?.__typename ===
            'FollowOnlyReferenceModuleSettings'
          }
          isFollowing={data?.doesFollow[0]?.follows}
        />
      </GridItemEight>
      <GridItemFour>
        <div className="sticky space-y-5 top-[126px]">
          <Card>
            <CardBody>
              <UserProfile profile={post?.profile} showBio />
            </CardBody>
            <ViaApp appConfig={appConfig} />
          </Card>
          <IPFSHash ipfsHash={post?.onChainContentURI} />
        </div>
      </GridItemFour>
    </GridLayout>
  )
}

export default ViewPost
