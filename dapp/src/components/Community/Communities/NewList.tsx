import CommunityProfile from '@components/Shared/CommunityProfile'
import { Card, CardBody } from '@components/UI/Card'
import { EmptyState } from '@components/UI/EmptyState'
import { CollectModule, Maybe, Wallet, MetadataOutput, Profile, FollowOnlyReferenceModuleSettings, PublicationStats } from '@generated/types'
import { UsersIcon } from '@heroicons/react/outline'
import React, { FC } from 'react'

interface Props {
  communities: any
}

const NewList: FC<Props> = ({ communities }) => {
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
        {communities.map(
          (community: {
            id: any
            appId?: any
            collectModule?: CollectModule
            collectNftAddress?: any
            collectedBy?: Maybe<Wallet> | undefined
            createdAt?: any
            metadata?: MetadataOutput
            onChainContentURI?: string
            profile?: Profile
            referenceModule?:
              | Maybe<FollowOnlyReferenceModuleSettings>
              | undefined
            stats?: PublicationStats
          }) => (
            <div key={community?.id}>
              <CommunityProfile community={community} />
            </div>
        ))}
      </CardBody>
    </Card>
  )
}

export default NewList
