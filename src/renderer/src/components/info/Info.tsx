import { AlertIcon } from '@/components/icons'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/popover/Popover'
import { cn } from '@/utils/helpers'
import { FC } from 'react'

type InfoProps = {
  message: string
  className?: string
}

const Info: FC<InfoProps> = ({ message = 'details go here', className }) => {
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <button className={cn('btn outline-focus text-base', className)} aria-label="Info">
            <AlertIcon />
          </button>
        </PopoverTrigger>
        <PopoverContent side="top">{message}</PopoverContent>
      </Popover>
    </>
  )
}

export default Info
