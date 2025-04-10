import { cn } from '@/utils/helpers'
import { ComponentProps, FC } from 'react'

const SearchActionButton: FC<ComponentProps<'button'>> = ({ className, ...props }) => (
  <button
    className={cn(
      'btn group outline-focus border-app-gray-800 text-app-gray-300 size-9 border text-2xl',
      className
    )}
    {...props}
  />
)

export default SearchActionButton
