import { Reviews } from '@generated/reviewtypes'
import { useRouter } from 'next/router'
import React, { FC } from 'react'

import Collected from './Collected'
import Commented from './Commented'
import CommunityPost from './CommunityPost'

interface Props {
  post: Reviews
  hideType?: boolean
  showThread?: boolean
}

const PostType: FC<Props> = ({ post, hideType, showThread }) => {
  const { pathname } = useRouter()
  const type = post?.__typename
  const postType = post?.metadata?.attributes[0]?.value
  const isCollected = !!post?.collectedBy

  return (
    <>
      {type === 'Comment' &&
        !hideType &&
        !showThread &&
        !isCollected &&
        postType !== 'community post' && <Commented post={post} />}
      {postType === 'community post' && pathname !== '/projects/[id]' && (
        <CommunityPost post={post} />
      )}
      {isCollected && postType !== 'community' && (
        <Collected post={post} type="Collected" />
      )}
      {isCollected && <Collected post={post} type="Funded" />}
    </>
  )
}

export default PostType
