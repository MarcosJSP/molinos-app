import { ChevronDownIcon } from '@/components/icons'
import { cn } from '@/utils/helpers'
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible'
import { FC } from 'react'

const Collapsible: FC<CollapsiblePrimitive.CollapsibleProps> = ({ className, ...props }) => (
  <CollapsiblePrimitive.Collapsible
    className={cn('border-b-app-gray-950 w-full border-b', className)}
    {...props}
  />
)
const CollapsibleTrigger: FC<CollapsiblePrimitive.CollapsibleTriggerProps> = ({
  className,
  children,
  ...props
}) => (
  <CollapsiblePrimitive.Trigger
    className={cn(
      (className =
        'outline-focus text-app-gray-300 data-state[open]:bg-app-primary-500 relative mx-2 flex w-[calc(100%-1rem)] cursor-pointer items-center rounded-lg p-2 font-semibold transition-all duration-200 outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[state=open]:[&>*:first-child]:-rotate-180'),
      className
    )}
    {...props}
  >
    <ChevronDownIcon className="absolute right-0 mr-2 text-2xl transition-all" />
    {children}
  </CollapsiblePrimitive.Trigger>
)
const CollapsibleContent: FC<CollapsiblePrimitive.CollapsibleContentProps> = ({
  className,
  ...props
}) => (
  <CollapsiblePrimitive.CollapsibleContent
    className={cn('bg-app-gray-950 space-y-1 px-3 py-2', className)}
    {...props}
  />
)

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
