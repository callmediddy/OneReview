import { gql, useQuery } from '@apollo/client'
import { GridItemEight, GridItemFour, GridLayout } from '@components/GridLayout'
import SEO from '@components/utils/SEO'
import consoleLog from '@lib/consoleLog'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Custom404 from 'src/pages/404'
import Custom500 from 'src/pages/500'

import Cover from './Cover'
import Details from './Details'
import Feed from './Feed'
import FeedType from './FeedType'
import ProfilePageShimmer from './Shimmer'

export const PROFILE_QUERY = gql`
  query Profile($request: ProfileQueryRequest!) {
    profiles(request: $request) {
      items {
        id
        handle
        ownedBy
        name
        attributes {
          key
          value
        }
        bio
        stats {
          totalFollowers
          totalFollowing
          totalPosts
          totalComments
        }
        picture {
          ... on MediaSet {
            original {
              url
            }
          }
          ... on NftImage {
            uri
          }
        }
        coverPicture {
          ... on MediaSet {
            original {
              url
            }
          }
        }
        followModule {
          __typename
        }
      }
    }
  }
`

const ViewProfile: NextPage = () => {
  const {
    query: { username }
  } = useRouter()
  const { data, loading, error } = useQuery(PROFILE_QUERY, {
    variables: { request: { handles: username } },
    skip: !username,
    onCompleted(data) {
      consoleLog(
        'Query',
        '#ffa500',
        `Fetched profile details Profile:${data?.profiles?.items[0]?.id}`
      )
    }
  })

  if (error) return <Custom500 />
  if (loading || !data) return <ProfilePageShimmer />
  if (data?.profiles?.items?.length === 0) return <Custom404 />

  const profile = data?.profiles?.items[0]

  return (
    <>
      {profile?.name ? (
        <SEO title={`${profile?.name} (@${profile?.handle})`} />
      ) : (
        <SEO title={`@${profile?.handle}`} />
      )}
      <Cover cover={profile?.coverPicture?.original?.url} />
      <GridLayout className="pt-6">
        <GridItemFour>
          <Details profile={profile} />
        </GridItemFour>
        <GridItemEight className="space-y-5">
          <FeedType stats={profile?.stats} />
          <Feed profile={profile} type={'COMMENT'} />
        </GridItemEight>
      </GridLayout>
    </>
  )
}

export default ViewProfile
