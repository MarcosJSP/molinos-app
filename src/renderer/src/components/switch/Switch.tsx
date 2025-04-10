import { cn } from '@/utils/helpers'
import * as SwitchPrimitives from '@radix-ui/react-switch'
import { FC } from 'react'

const Switch: FC<React.ComponentProps<typeof SwitchPrimitives.Root>> = ({
  className,
  ...props
}) => (
  <SwitchPrimitives.Root
    className={cn(
      'outline-focus bg-app-gray-800 hover:bg-app-gray-700 data-[state=checked]:bg-app-primary-500 data-[state=checked]:hover:bg-app-primary-600 flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full **:transition-all **:duration-200',
      className
    )}
    {...props}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        'bg-app-white pointer-events-none mx-0.5 size-4 rounded-full',
        'data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0'
      )}
    />
  </SwitchPrimitives.Root>
)

export { Switch }
