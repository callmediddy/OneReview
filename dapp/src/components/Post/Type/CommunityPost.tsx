import Slug from '@components/Shared/Slug'
import { Reviews } from '@generated/reviewtypes'
import { UsersIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import React, { FC } from 'react'

interface Props {
  post: Reviews
}

const CommunityPost: FC<Props> = ({ post }) => {
  const commentOn: any = post?.commentOn

  return (
    <div className="flex items-center pb-4 space-x-1 text-gray-500 text-[13px]">
      <UsersIcon className="w-4 h-4" />
      <div className="flex items-center space-x-1">
        <Link
          href={`/projects/0x023b-0x16?ref=${post?.metadata?.name}`}
          prefetch={false}
        >
          <a href={`/projects/0x023b-0x16?ref=${post?.metadata?.name}`}>
            <span>Reviewed for </span>
            <Slug slug={post?.metadata?.name} />
          </a>
        </Link>
      </div>
    </div>
  )
}

export default CommunityPost
