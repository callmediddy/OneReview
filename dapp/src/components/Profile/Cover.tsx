import imagekitURL from '@lib/imagekitURL'
import React, { FC } from 'react'
import { STATIC_ASSETS } from 'src/constants'

interface Props {
  cover: string
}

const Cover: FC<Props> = ({ cover }) => {
  return (
    <div
      className="h-52 sm:h-80"
      style={{
        backgroundColor: '#ffa500',
        backgroundSize: cover ? 'cover' : '30%',
        backgroundPosition: 'center center',
        backgroundRepeat: cover ? 'no-repeat' : 'repeat'
      }}
    />
  )
}

export default Cover
