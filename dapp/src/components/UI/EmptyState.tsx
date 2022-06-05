import React, { FC, ReactNode } from 'react'

import { Card } from './Card'

interface Props {
  message: ReactNode
  icon: ReactNode
  hideCard?: boolean
}

export const EmptyState: FC<Props> = ({ message, icon, hideCard = false }) => {
  return (
    <Card className={hideCard ? 'border-1 !shadow-none !bg-transparent' : ''}>
      <div className="grid justify-items-center p-4 space-y-2">
        <div>{icon}</div>
        <div>{message}</div>
      </div>
    </Card>
  )
}
