import { Reviews } from '@generated/reviewtypes'
import React, { FC, useContext } from 'react'
import AppContext from '@components/utils/AppContext'

import Comment from './Comment'
import Delete from './Delete'

interface Props {
  post: Reviews
}

const PostActions: FC<Props> = ({ post }) => {
  const { currentUser } = useContext(AppContext)
  const postType = post?.metadata?.attributes[0]?.value

  return postType !== 'community' ? (
    <div className="flex gap-8 items-center pt-3 -ml-2 text-gray-500">
      <Comment post={post} />
      {currentUser?.id === post?.profile?.id ? <Delete post={post} /> : null}
    </div>
  ) : null
}

export default PostActions
