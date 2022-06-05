import React, { FC } from 'react'

interface Props {
  title?: string
  error?: Error
  className?: string
}

export const ErrorMessage: FC<Props> = ({ title, error, className = '' }) => {
  if (!error) return null

  return (
    <div
      className={`bg-red-50 dark:bg-red-800 dark:bg-opacity-15 border-1 border-red-500 border-opacity-50 p-4 space-y-1 rounded-md ${className}`}
    >
      {title && (
        <h3 className="text-md font-medium text-red-800 dark:text-red-200">
          {title}
        </h3>
      )}
      <div className="text-md text-red-700 dark:text-red-200">
        {error?.message}
      </div>
    </div>
  )
}
