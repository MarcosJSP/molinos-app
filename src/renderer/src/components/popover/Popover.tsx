import { cn } from '@/utils/helpers'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { FC } from 'react'

const Popover = PopoverPrimitive.Root
const PopoverTrigger = PopoverPrimitive.Trigger
const PopoverContent: FC<PopoverPrimitive.PopoverContentProps> = ({
  className,
  collisionPadding = 12,
  ...props
}) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      className={cn('popup overflow-hidden px-4', className)}
      collisionPadding={collisionPadding}
      {...props}
    ></PopoverPrimitive.Content>
  </PopoverPrimitive.Portal>
)

export { Popover, PopoverTrigger, PopoverContent }
