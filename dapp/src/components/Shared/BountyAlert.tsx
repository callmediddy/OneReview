import { FC } from 'react'

const BountyAlert: FC = () => {
  var prize = Math.floor(Math.random() * 5)
  var winners = Math.floor(Math.random() * 50)
  var days = Math.floor(Math.random() * 10)
  return (
    <div className="bg-yellow-50 border-l-8 border-yellow-900 mb-2">
      <div className="flex items-center">
        <div className="p-2">
          <div className="flex items-center">
            <p className="px-6 py-4 text-yellow-900 font-semibold text-lg">
              This project has an active bounty!
            </p>
          </div>
          <div className="px-16 mb-4">
            <li className="text-md font-bold text-yellow-700 text-sm">
              {prize} ETH awarded to the Top {winners} reviews
            </li>
            <li className="text-md font-bold text-yellow-700 text-sm">
              Bounty active for the next {days} days
            </li>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BountyAlert
