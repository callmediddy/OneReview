import { ProfileStats } from '@generated/types'
import { ChatAlt2Icon, PencilAltIcon } from '@heroicons/react/outline'
import humanize from '@lib/humanize'
import trackEvent from '@lib/trackEvent'
import clsx from 'clsx'
import React, { Dispatch, FC, ReactNode } from 'react'

interface Props {
  stats: ProfileStats
}

const FeedType: FC<Props> = ({ stats }) => {
  interface FeedLinkProps {
    name: string
    icon: ReactNode
    type: string
    count?: number
  }

  const FeedLink: FC<FeedLinkProps> = ({ name, icon, type, count = 0 }) => (
    <button
      type="button"
      className={clsx(
        'flex items-center space-x-2 rounded-lg px-4 sm:px-3 py-2 sm:py-1 text-brand hover:bg-brand-100 dark:hover:bg-opacity-20 hover:bg-opacity-100'
      )}
      aria-label={name}
    >
      {icon}
      <div className="hidden sm:block">{name}</div>
      {count ? (
        <div className="px-2 text-xs font-medium rounded-full bg-brand-200 dark:bg-brand-800">
          {humanize(count)}
        </div>
      ) : null}
    </button>
  )

  return (
    <div className="flex overflow-x-auto gap-3 px-5 pb-2 mt-3 sm:px-0 sm:mt-0 md:pb-0">
      <FeedLink
        name="Comments"
        icon={<ChatAlt2Icon className="w-4 h-4" />}
        type="COMMENT"
        count={stats?.totalComments}
      />
    </div>
  )
}

export default FeedType
