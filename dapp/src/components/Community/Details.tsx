import Markup from '@components/Shared/Markup'
import AppContext from '@components/utils/AppContext'
import { Reviews } from '@generated/reviewtypes'
import imagekitURL from '@lib/imagekitURL'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useRouter } from 'next/router'
import React, { FC, ReactNode, useContext, useState } from 'react'

dayjs.extend(relativeTime)

interface Props {
  community: Reviews
}

const Details: FC<Props> = ({ community }) => {
  const { currentUser } = useContext(AppContext)
  const [showMembersModal, setShowMembersModal] = useState<boolean>(false)

  const router = useRouter()
  const { ref, title, cover } = router.query

  const MetaDetails = ({
    children,
    icon
  }: {
    children: ReactNode
    icon: ReactNode
  }) => (
    <div className="flex gap-2 items-center">
      {icon}
      {children}
    </div>
  )

  console.log(cover)
  var coverImg = undefined
  if(Array.isArray(cover)){
    coverImg = ""
  } else {
    coverImg = cover
  }

  return (
    <div className="px-5 mb-4 space-y-5 sm:px-0">
      <div className="pt-1 text-1xl font-bold">
        {/* <div className="truncate">{title}</div> */}
        <div>{title}</div>
      </div>
      <div className="relative w-32 h-32 sm:w-72 sm:h-72">
        <img
          src={imagekitURL(
            coverImg != '' && coverImg != undefined
              ? coverImg
              : `https://avatar.tobi.sh/${community?.id}.png`,
            'avatar'
          )}
          className="w-32 h-32 bg-gray-200 rounded-xl ring-2 ring-gray-200 sm:w-72 sm:h-72 dark:bg-gray-700 dark:ring-gray-700/80"
          height={128}
          width={128}
          alt={community?.id}
        />
      </div>

      <div className="space-y-5">
        {community?.metadata?.description && (
          <div className="mr-0 leading-7 sm:mr-10 linkify">
            <Markup>{'Project link: ' + ref}</Markup>
          </div>
        )}
        <div className="space-y-2"></div>
      </div>
    </div>
  )
}

export default Details
