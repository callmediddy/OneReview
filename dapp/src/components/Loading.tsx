import { FC } from 'react'

import SEO from './utils/SEO'

const Loading: FC = () => {
  return (
    <div className="flex flex-grow justify-center items-center h-screen animate-pulse">
      <SEO />
      <img
        className="w-28"
        width={112}
        src="https://raw.githubusercontent.com/callmediddy/OneReview/main/assets/logo_solo.png"
        alt="Logo"
      />
    </div>
  )
}

export default Loading
