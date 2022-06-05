// import {
//   Comment,
//   FeeCollectModuleSettings,
//   FeeFollowModuleSettings,
//   FreeCollectModuleSettings,
//   LimitedFeeCollectModuleSettings,
//   LimitedTimedFeeCollectModuleSettings,
//   Post,
//   ProfileFollowModuleSettings,
//   RevertCollectModuleSettings,
//   RevertFollowModuleSettings,
//   TimedFeeCollectModuleSettings
// } from './types'

// export type Community = Post
// export type ReviewCollect = FreeCollectModuleSettings &
//   FeeCollectModuleSettings &
//   LimitedFeeCollectModuleSettings &
//   LimitedTimedFeeCollectModuleSettings &
//   RevertCollectModuleSettings &
//   TimedFeeCollectModuleSettings
// export type ReviewFollow = FeeFollowModuleSettings &
//   ProfileFollowModuleSettings &
//   RevertFollowModuleSettings
// export type ReviewAttachments = { item: string; type: string }
// export type UserSuggestion = {
//   uid: string
//   id: string
//   display: string
//   name: string
//   picture: string
// }

import {
  Comment,
  FeeCollectModuleSettings,
  FeeFollowModuleSettings,
  FreeCollectModuleSettings,
  LimitedFeeCollectModuleSettings,
  LimitedTimedFeeCollectModuleSettings,
  Mirror,
  Notification,
  Post,
  Profile,
  ProfileFollowModuleSettings,
  RevertCollectModuleSettings,
  RevertFollowModuleSettings,
  TimedFeeCollectModuleSettings
} from './types'

export type Reviews = Comment & { pubId: string }
export type OneReviewPost = Post & Mirror & Comment & { pubId: string }
export type OneReviewNotification = Notification & { profile: Profile }
export type Community = Post
export type ReviewCollect = FreeCollectModuleSettings &
  FeeCollectModuleSettings &
  LimitedFeeCollectModuleSettings &
  LimitedTimedFeeCollectModuleSettings &
  RevertCollectModuleSettings &
  TimedFeeCollectModuleSettings
export type ReviewFollow = FeeFollowModuleSettings &
  ProfileFollowModuleSettings &
  RevertFollowModuleSettings
export type ReviewAttachments = { item: string; type: string }
export type UserSuggestion = {
  uid: string
  id: string
  display: string
  name: string
  picture: string
}