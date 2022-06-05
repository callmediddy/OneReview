// import { Community } from '@generated/reviewtypes'
import imagekitURL from '@lib/imagekitURL'
import Link from 'next/link'
import React, { FC } from 'react'

interface Props {
  community: any
}

const CommunityProfile: FC<Props> = ({ community }) => {
  return (
    <div className="flex justify-between items-center">
      <Link href={`/projects/${community?.id}`} prefetch={false}>
        <a href={`/projects/${community?.id}`}>
          <div className="flex items-center space-x-3">
            <img
              src={imagekitURL(
                community?.metadata?.cover?.original?.url
                  ? community?.metadata?.cover?.original?.url
                  : `https://avatar.tobi.sh/${community?.id}.png`,
                'avatar'
              )}
              className="w-16 h-16 bg-gray-600 rounded-xl border dark:border-gray-700/80"
              height={64}
              width={64}
              alt={community?.id}
            />
            <div className="space-y-1">
              <div className="">{community?.metadata?.name}</div>
              <div className="text-sm text-gray-500">
                {community?.metadata?.description}
              </div>
            </div>
          </div>
        </a>
      </Link>
    </div>
  )
}

export default CommunityProfile
