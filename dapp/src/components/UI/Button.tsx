import clsx from 'clsx'
import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  forwardRef,
  ReactNode
} from 'react'

interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'super' | 'danger'
  outline?: boolean
  light?: boolean
  loading?: boolean
  icon?: ReactNode
  children?: ReactNode
  className?: string
}

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  {
    className = '',
    size = 'md',
    variant = 'primary',
    outline,
    light,
    loading,
    icon,
    children,
    ...rest
  },
  ref
) {
  return (
    <button
      ref={ref}
      className={clsx(
        {
          'bg-orange-500 hover:bg-orange-600 border border-orange-500 text-white focus:ring-orange-400':
            !outline && !light && variant === 'primary',
          'bg-gray-500 hover:bg-gray-600 border border-gray-600 text-white focus:ring-gray-400':
            !outline && !light && variant === 'secondary',
          'bg-green-500 hover:bg-green-400 border border-green-600 text-white focus:ring-green-400':
            !outline && !light && variant === 'success',
          'bg-yellow-500 hover:bg-yellow-400 border border-yellow-600 text-white focus:ring-yellow-400':
            !outline && !light && variant === 'warning',
          'bg-pink-500 hover:bg-pink-300 border border-pink-800 text-white focus:ring-pink-500':
            !outline && !light && variant === 'super',
          'bg-red-500 hover:bg-red-400 border border-red-600 text-white focus:ring-red-400':
            !outline && !light && variant === 'danger',
          'border border-brand-500 text-brand hover:bg-brand-100 focus:ring-brand-400':
            outline && !light && variant === 'primary',
          'border border-gray-500 text-gray-500 hover:bg-gray-300 focus:ring-gray-400':
            outline && !light && variant === 'secondary',
          'border border-green-500 text-green-500 hover:bg-green-100 focus:ring-green-400':
            outline && !light && variant === 'success',
          'border border-yellow-500 text-yellow-500 hover:bg-yellow-100 focus:ring-yellow-400':
            outline && !light && variant === 'warning',
          'border border-pink-500 text-pink-500 hover:bg-pink-100 focus:ring-pink-400':
            outline && !light && variant === 'super',
          'border border-red-500 text-red-500 hover:bg-red-100 focus:ring-red-400':
            outline && !light && variant === 'danger',
          'border-none !shadow-none text-gray-500': light,
          'px-2.5 py-0.5': size === 'sm',
          'px-3.5 py-1.5': size === 'md',
          'px-4.5 py-2.5': size === 'lg',
          'flex items-center space-x-2': icon && children
        },
        'rounded-md font-bold disabled:opacity-30 shadow-md focus:ring-1 focus:ring-opacity-60 focus:ring-offset-2 outline-none',
        className
      )}
      disabled={loading}
      {...rest}
    >
      {icon}
      <div>{children}</div>
    </button>
  )
})
