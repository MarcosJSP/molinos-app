import { cn } from '@/utils/helpers'
import { ComponentProps, FC } from 'react'

const Scroll: FC<ComponentProps<'div'>> = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        'scrollbar scrollbar-thumb-app-gray-800 scrollbar-track-transparent overflow-auto',
        className
      )}
      {...props}
    />
  )
}

export default Scroll
