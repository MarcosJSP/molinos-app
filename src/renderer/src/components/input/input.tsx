import { ComponentProps, FC } from 'react'

import { cn } from '@/utils/helpers'

const Input: FC<ComponentProps<'input'>> = ({
  className,
  placeholder = 'input',
  type,
  ...props
}) => {
  return (
    <input
      type={type}
      className={cn(
        'outline-focus border-app-gray-800 hover:not-disabled:border-app-gray-600 placeholder:text-app-gray-600 text-app-gray-300 disabled:text-app-gray-500 disabled:bg-app-gray-900 w-full rounded-lg border px-3 py-2 text-sm font-normal transition-all placeholder:font-light disabled:cursor-not-allowed',
        className
      )}
      placeholder={placeholder}
      {...props}
    />
  )
}

export { Input }
