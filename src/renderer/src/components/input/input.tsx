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
        'outline-focus border-app-gray-800 hover:border-app-gray-600 placeholder:text-app-gray-600 text-app-gray-300 w-full rounded-lg border px-3 py-2 text-sm font-normal transition-all placeholder:font-light',
        className
      )}
      placeholder={placeholder}
      {...props}
    />
  )
}

export { Input }
