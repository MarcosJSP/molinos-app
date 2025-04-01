import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { FC } from 'react'

type TooltipProps = {
  trigger: React.ReactElement<Record<string, unknown>>
  content: React.ReactNode
  delay?: number
}
const Tooltip: FC<TooltipProps> = ({
  trigger: TriggerComponent,
  content: ContentComponent,
  delay
}) => (
  <TooltipPrimitive.Provider delayDuration={delay}>
    <TooltipPrimitive.Root disableHoverableContent>
      <TooltipPrimitive.Trigger asChild>{TriggerComponent}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content className="popup px-4" collisionPadding={12}>
          {ContentComponent}
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  </TooltipPrimitive.Provider>
)

export { Tooltip }
