import { ComponentProps, FC } from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { cn } from '@/utils/helpers'

const Slider: FC<ComponentProps<typeof SliderPrimitive.Root>> = ({
  className,
  defaultValue = [50],
  max = 100,
  min = 0,
  step = 10,
  ...props
}) => (
  <SliderPrimitive.Root
    className={cn(
      'relative flex touch-none items-center justify-center select-none data-[orientation=horizontal]:h-4 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-4',
      className
    )}
    defaultValue={defaultValue}
    max={max}
    min={min}
    step={step}
    {...props}
  >
    <SliderPrimitive.Track className="bg-app-gray-800 relative overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5">
      <SliderPrimitive.Range className="bg-app-primary-500 absolute h-full w-full" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="outline-focus border-app-primary-500 bg-app-white bg-background block size-4 cursor-pointer rounded-full border-2 ![box-shadow:none] outline-offset-0 transition-colors disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50" />
  </SliderPrimitive.Root>
)

export { Slider }
