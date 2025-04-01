import { Tooltip as BaseTooltip } from '@base-ui-components/react/tooltip'
import { FC } from 'react'

type TooltipProps = {
  trigger: React.ReactElement<Record<string, unknown>>
  content: React.ReactNode
  delay?: number
  closeDelay?: number
}
const Tooltip: FC<TooltipProps> = ({
  trigger: TriggerComponent,
  content: ContentComponent,
  delay,
  closeDelay
}) => (
  <BaseTooltip.Provider delay={delay} closeDelay={closeDelay}>
    <BaseTooltip.Root hoverable={false}>
      <BaseTooltip.Trigger render={TriggerComponent} />
      <BaseTooltip.Portal>
        <BaseTooltip.Positioner>
          <BaseTooltip.Popup className="popover">
            <BaseTooltip.Arrow className="popover-arrow" />
            {ContentComponent}
          </BaseTooltip.Popup>
        </BaseTooltip.Positioner>
      </BaseTooltip.Portal>
    </BaseTooltip.Root>
  </BaseTooltip.Provider>
)

export { Tooltip }
