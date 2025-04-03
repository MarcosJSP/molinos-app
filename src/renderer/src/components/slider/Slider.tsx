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
      'relative flex cursor-pointer touch-none items-center justify-center select-none data-[disabled]:pointer-events-none data-[disabled]:cursor-not-allowed data-[orientation=horizontal]:h-4 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-4',
      className
    )}
    defaultValue={defaultValue}
    max={max}
    min={min}
    step={step}
    {...props}
  >
    <SliderPrimitive.Track className="bg-app-gray-800 relative overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5">
      <SliderPrimitive.Range className="bg-app-primary-500 data-[disabled]:bg-app-primary-200 absolute h-full w-full" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="outline-focus border-app-primary-500 bg-app-white bg-background data-[disabled]:border-app-primary-200 data-[disabled]:bg-app-gray-600 block size-4 rounded-full border-2 outline-offset-0 transition-colors" />
  </SliderPrimitive.Root>
)

export { Slider }
