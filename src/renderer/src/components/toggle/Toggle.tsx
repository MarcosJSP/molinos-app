import { cn } from '@/utils/helpers'
import * as TogglePrimitive from '@radix-ui/react-toggle'
import { FC } from 'react'

const Toggle: FC<TogglePrimitive.ToggleProps> = ({ className, ...props }) => (
  <TogglePrimitive.Root
    className={cn(
      'outline-focus hover:bg-app-gray-900 bg-app-white text-app-gray-300 flex cursor-pointer items-center justify-center rounded-lg px-2 py-1 text-sm transition-all duration-200',
      'data-[state=on]:bg-app-primary-500 data-[state=on]:text-app-white data-[state=on]:hover:bg-app-primary-600',
      className
    )}
    {...props}
  />
)

export { Toggle }
