import SEO from '@components/utils/SEO'
import { useState } from 'react'

export default function Custom404() {
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false)

  return (
    <div className="flex-col page-center">
      <SEO title="Invalid Access" />
      <div className="py-10 text-center">
        <h1 className="mb-4 text-3xl font-bold">Please Connect Wallet!</h1>
      </div>
    </div>
  )
}
