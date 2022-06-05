import { Reviews } from '@generated/reviewtypes'
import React, { FC } from 'react'

import ThreadBody from '../ThreadBody'

interface Props {
  post: Reviews
}

const Commented: FC<Props> = ({ post }) => {
  const commentOn: Reviews | any = post?.commentOn
  const mainPost = commentOn?.mainPost
  const postType = mainPost?.metadata?.attributes[0]?.value

  return (
    <div>
      {mainPost && postType !== 'community' ? (
        <ThreadBody post={mainPost} />
      ) : null}
      <ThreadBody post={commentOn} />
    </div>
  )
}

export default Commented
