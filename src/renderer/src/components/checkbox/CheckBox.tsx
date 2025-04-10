import { ComponentProps, FC } from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'

import { cn } from '@/utils/helpers'
import { CheckIcon } from '@/components/icons'

const Checkbox: FC<ComponentProps<typeof CheckboxPrimitive.Root>> = ({ className, ...props }) => (
  <CheckboxPrimitive.Root
    className={cn(
      'peer outline-focus bg-app-white border-app-gray-700 flex size-4 shrink-0 cursor-pointer rounded-sm border transition-all',
      '[&:not(:disabled):not([data-state=checked])]:hover:border-app-gray-300 data-[state=checked]:bg-app-primary-500 data-[state=checked]:text-app-white data-[state=checked]:border-app-primary-500 disabled:cursor-not-allowed disabled:opacity-50',
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn('flex size-4 items-center justify-center text-current', 'animate-scale-in-200')}
    >
      <CheckIcon className="text-xs [&_path]:stroke-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
)

export { Checkbox }
