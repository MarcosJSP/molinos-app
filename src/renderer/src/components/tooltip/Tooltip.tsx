import { cn } from '@/utils/helpers'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { ComponentProps, FC } from 'react'

const TooltipProvider = TooltipPrimitive.Provider
const Tooltip = TooltipPrimitive.Root
const TooltipTrigger = TooltipPrimitive.Trigger
const TooltipContent: FC<ComponentProps<typeof TooltipPrimitive.Content>> = ({
  className,
  ...props
}) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      className={cn('popup px-4', className)}
      collisionPadding={12}
      {...props}
    ></TooltipPrimitive.Content>
  </TooltipPrimitive.Portal>
)

export { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent }
