import CommunityProfile from '@components/Shared/CommunityProfile'
import { Card, CardBody } from '@components/UI/Card'
import { EmptyState } from '@components/UI/EmptyState'
import { Community } from '@generated/reviewtypes'
import { UsersIcon } from '@heroicons/react/outline'
import React, { FC } from 'react'

interface Props {
  communities: Community[]
}

const List: FC<Props> = ({ communities }) => {
  return (
    <Card>
      <CardBody className="space-y-6">
        {communities?.length === 0 && (
          <EmptyState
            message={<div>No communities found!</div>}
            icon={<UsersIcon className="w-8 h-8 text-brand" />}
            hideCard
          />
        )}
        {communities.map((community) => (
          <div key={community?.id}>
            <CommunityProfile community={community} />
          </div>
        ))}
      </CardBody>
    </Card>
  )
}

export default List
