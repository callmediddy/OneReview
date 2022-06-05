import { gql, useQuery } from '@apollo/client'
import Feed from '@components/Comment/Feed'
import { GridItemEight, GridItemFour, GridLayout } from '@components/GridLayout'
import BountyAlert from '@components/Shared/BountyAlert'
import SEO from '@components/utils/SEO'
import { CommunityFields } from '@gql/CommunityFields'
import consoleLog from '@lib/consoleLog'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import Custom404 from 'src/pages/404'
import Custom500 from 'src/pages/500'

import Details from './Details'
import CommunityPageShimmer from './Shimmer'

const COMMUNITY_QUERY = gql`
  query Community($request: PublicationQueryRequest!) {
    publication(request: $request) {
      ... on Post {
        ...CommunityFields
      }
    }
  }
  ${CommunityFields}
`

const ViewCommunity: NextPage = () => {
  const router = useRouter()
  const { ref } = router.query

  const {
    query: { id }
  } = useRouter()
  const { data, loading, error } = useQuery(COMMUNITY_QUERY, {
    variables: { request: { publicationId: id } },
    skip: !id,
    onCompleted() {
      consoleLog(
        'Query',
        '#ffa500',
        `Fetched community details Community:${id}`
      )
    }
  })

  const randomBountyIsFound = Boolean(Math.round(Math.random()))

  if (error) return <Custom500 />
  if (loading || !data) return <CommunityPageShimmer />
  if (
    !data.publication ||
    data.publication?.metadata?.attributes[0]?.value !== 'community'
  )
    return <Custom404 />

  return (
    <GridLayout>
      <SEO title={`${data?.publication?.metadata?.name}`} />
      <GridItemFour>
        <Details community={data.publication} />
      </GridItemFour>
      <GridItemEight className="space-y-5">
        {randomBountyIsFound && <BountyAlert />}
        <Feed post={data.publication} type="community post" url={ref} />
      </GridItemEight>
    </GridLayout>
  )
}

export default ViewCommunity
