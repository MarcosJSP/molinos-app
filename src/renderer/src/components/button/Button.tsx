import { cn } from '@/utils/helpers'
import { ComponentProps, FC } from 'react'

type ButtonProps = {
  variant?: 'base' | 'outline'
  symmetricPadding?: boolean
} & ComponentProps<'button'>

const Button: FC<ButtonProps> = ({
  symmetricPadding,
  variant = 'outline',
  className,
  ...props
}) => {
  return (
    <button
      className={cn(
        'btn outline-focus',
        variant == 'outline' &&
          'border-app-gray-800 bg-app-white hover:bg-app-gray-950 active:bg-app-gray-900 text-app-gray-300 border font-medium',
        symmetricPadding ? 'p-1.5' : 'px-3 py-1.5',
        className
      )}
      {...props}
    />
  )
}

export default Button
