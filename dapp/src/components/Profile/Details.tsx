import { gql, useQuery, ApolloClient, InMemoryCache } from '@apollo/client'
import Follow from '@components/Shared/Follow'
import Markup from '@components/Shared/Markup'
import Slug from '@components/Shared/Slug'
import Unfollow from '@components/Shared/Unfollow'
import { Button } from '@components/UI/Button'
import { Tooltip } from '@components/UI/Tooltip'
import AppContext from '@components/utils/AppContext'
import { useENS } from '@components/utils/hooks/useENS'
import { Profile } from '@generated/types'
import {
  CogIcon,
  HashtagIcon,
  LocationMarkerIcon
} from '@heroicons/react/outline'
import { BadgeCheckIcon, ShieldCheckIcon } from '@heroicons/react/solid'
import consoleLog from '@lib/consoleLog'
import formatAddress from '@lib/formatAddress'
import getAttribute from '@lib/getAttribute'
import getAvatar from '@lib/getAvatar'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import React, { FC, ReactElement, useContext, useEffect, useState } from 'react'
import { STATIC_ASSETS } from 'src/constants'

import DoesFollow from './DoesFollow'
import Followerings from './Followerings'
import ProfileMod from './Mod'

export const DOES_FOLLOW_QUERY = gql`
  query DoesFollow($request: DoesFollowRequest!) {
    doesFollow(request: $request) {
      follows
    }
  }
`

interface Props {
  profile: Profile
}

const GRAPH_API_URL =
  'https://gateway.thegraph.com/api/a5652c6b354167b2472a8a259c3ecaa7/subgraphs/id/CvvUWXNtn8A5zVAtM8ob3JGq8kQS8BLrzL6WJV7FrHRy'

const client = new ApolloClient({
  uri: GRAPH_API_URL,
  cache: new InMemoryCache()
})

export const AAVE_QUERY = gql`
  query IsUser($request: IsUserRequest!) {
    userS(request: $request) {
      lifetimeRewards
    }
  }
`

const Details: FC<Props> = ({ profile }) => {
  const [followersCount, setFollowersCount] = useState<number>(0)
  const [following, setFollowing] = useState<boolean>(false)
  const { currentUser, staffMode } = useContext(AppContext)
  const { resolvedTheme } = useTheme()
  const { data: ensName } = useENS(profile?.ownedBy ?? '')

  useEffect(() => {
    if (profile?.stats?.totalFollowers) {
      setFollowersCount(profile?.stats?.totalFollowers)
    }
  }, [profile?.stats?.totalFollowers])

  const {
    data: rewards,
    loading,
    error
  } = useQuery(AAVE_QUERY, {
    variables: {
      request: {
        address: profile?.ownedBy
      }
    }
  })

  const { data: followData, loading: followLoading } = useQuery(
    DOES_FOLLOW_QUERY,
    {
      variables: {
        request: {
          followInfos: [
            {
              // Am I following them
              followerAddress: profile?.ownedBy,
              profileId: currentUser?.id
            },
            {
              // Do they follow me
              followerAddress: currentUser?.ownedBy,
              profileId: profile?.id
            }
          ]
        }
      },
      skip: !profile || !currentUser,
      onCompleted(data) {
        setFollowing(data?.doesFollow[1]?.follows)
        consoleLog(
          'Query',
          '#ffa500',
          `Fetched has followed check Profile:${profile?.id} Following:${following}`
        )
      }
    }
  )

  const MetaDetails = ({
    children,
    icon
  }: {
    children: ReactElement
    icon: ReactElement
  }) => (
    <div className="flex gap-2 items-center">
      {icon}
      <div className="truncate">{children}</div>
    </div>
  )

  const followType = profile?.followModule?.__typename

  return (
    <div className="px-5 mb-4 space-y-5 sm:px-0">
      <div className="relative -mt-24 w-32 h-32 sm:-mt-32 sm:w-52 sm:h-52">
        <img
          src={getAvatar(profile)}
          className="w-32 h-32 bg-gray-200 rounded-xl ring-8 ring-gray-50 sm:w-52 sm:h-52 dark:bg-gray-700 dark:ring-black"
          height={128}
          width={128}
          alt={profile?.handle}
        />
      </div>
      <div className="py-2 space-y-1">
        <div className="flex gap-1.5 items-center text-2xl font-bold">
          <div className="truncate">{profile?.name ?? profile?.handle}</div>
        </div>
        <div className="flex items-center space-x-3">
          {profile?.name ? (
            <Slug slug={profile?.handle} prefix="@" />
          ) : (
            <Slug slug={formatAddress(profile?.ownedBy)} />
          )}
          {currentUser && currentUser?.id !== profile?.id && (
            <DoesFollow followData={followData?.doesFollow[0]} />
          )}
        </div>
      </div>
      <div className="space-y-5">
        <Followerings followersCount={followersCount} profile={profile} />
        <div className="flex items-center space-x-2">
          {followLoading ? (
            <div className="w-28 rounded-lg h-[34px] shimmer" />
          ) : followType !== 'RevertFollowModuleSettings' ? (
            following ? (
              <div className="flex space-x-2">
                <Unfollow
                  profile={profile}
                  setFollowing={setFollowing}
                  followersCount={followersCount}
                  setFollowersCount={setFollowersCount}
                  showText
                />
              </div>
            ) : (
              <Follow
                profile={profile}
                setFollowing={setFollowing}
                followersCount={followersCount}
                setFollowersCount={setFollowersCount}
                showText
              />
            )
          ) : null}
        </div>
        {profile?.bio && (
          <div className="mr-0 leading-7 sm:mr-10 linkify">
            <Markup>{profile?.bio}</Markup>
          </div>
        )}
        <div className="w-full divider" />
        <div className="space-y-2">
          <MetaDetails icon={<HashtagIcon className="w-4 h-4" />}>
            <Tooltip content={`#${parseInt(profile?.id)}`}>
              {profile?.id}
            </Tooltip>
          </MetaDetails>
          {getAttribute(profile?.attributes, 'location') && (
            <MetaDetails icon={<LocationMarkerIcon className="w-4 h-4" />}>
              {getAttribute(profile?.attributes, 'location') as any}
            </MetaDetails>
          )}
          {ensName && (
            <MetaDetails
              icon={
                <img
                  src={`${STATIC_ASSETS}/brands/ens.svg`}
                  className="w-4 h-4"
                  height={16}
                  width={16}
                  alt="ENS Logo"
                />
              }
            >
              {ensName as any}
            </MetaDetails>
          )}
          {typeof rewards !== 'undefined' ? (
            <MetaDetails
              icon={
                <img
                  src={`${STATIC_ASSETS}/brands/ens.svg`}
                  className="w-4 h-4"
                  height={16}
                  width={16}
                  alt="ENS Logo"
                />
              }
            >
              {ensName as any}
            </MetaDetails>
          ) : (
            <div>Not a AAVE user</div>
          )}
          {getAttribute(profile?.attributes, 'website') && (
            <MetaDetails
              icon={
                <img
                  src={`https://www.google.com/s2/favicons?domain=${getAttribute(
                    profile?.attributes,
                    'website'
                  )
                    ?.replace('https://', '')
                    .replace('http://', '')}`}
                  className="w-4 h-4 rounded-full"
                  height={16}
                  width={16}
                  alt="Website"
                />
              }
            >
              <a
                href={`https://${getAttribute(profile?.attributes, 'website')
                  ?.replace('https://', '')
                  .replace('http://', '')}`}
                target="_blank"
                rel="noreferrer noopener"
              >
                {getAttribute(profile?.attributes, 'website')
                  ?.replace('https://', '')
                  .replace('http://', '')}
              </a>
            </MetaDetails>
          )}
          {getAttribute(profile?.attributes, 'twitter') && (
            <MetaDetails
              icon={
                <img
                  src={`${STATIC_ASSETS}/brands/twitter-dark.svg`}
                  className="w-4 h-4"
                  height={16}
                  width={16}
                  alt="Twitter Logo"
                />
              }
            >
              <a
                href={`https://twitter.com/${getAttribute(
                  profile?.attributes,
                  'twitter'
                )}`}
                target="_blank"
                rel="noreferrer noopener"
              >
                {getAttribute(profile?.attributes, 'twitter')?.replace(
                  'https://twitter.com/',
                  ''
                )}
              </a>
            </MetaDetails>
          )}
        </div>
      </div>
    </div>
  )
}

export default Details
