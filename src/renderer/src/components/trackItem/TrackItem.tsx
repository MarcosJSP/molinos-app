import {
  AttributionCC0Icon,
  CopyIcon,
  DownloadIcon,
  FolderIcon,
  LinkExternalIcon,
  SoundNoteIcon,
  StopIcon,
  ThreeDotsIcon
} from '@/components/icons'
import { Menu, MenuContent, MenuItem, MenuTrigger } from '@/components/menu/Menu'
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent
} from '@/components/tooltip/Tooltip'
import { FC, useState } from 'react'
import { cn } from '@/utils/helpers'

const TrackActionMore: FC = () => (
  <Menu>
    <MenuTrigger asChild>
      <button className="btn outline-focus group" aria-label="Open options menu">
        <ThreeDotsIcon className="text-app-gray-600 group-hover:text-app-gray-300 group-active:text-app-gray-200 group-focus:text-app-gray-200 text-xl" />
      </button>
    </MenuTrigger>

    <MenuContent>
      <MenuItem>
        <FolderIcon className="mr-1 text-base" />
        Show enclosing folder
      </MenuItem>
      <MenuItem>
        <CopyIcon className="mr-1 text-base" />
        Copy to clipboard
      </MenuItem>
      <MenuItem>
        <LinkExternalIcon className="mr-1 text-base" />
        Open in browser
      </MenuItem>
      <MenuItem>
        <LinkExternalIcon className="mr-1 text-base" />
        More from author
      </MenuItem>
    </MenuContent>
  </Menu>
)

const TrackActionAttribution: FC = () => (
  <TooltipProvider>
    <Tooltip delayDuration={400} disableHoverableContent>
      <TooltipTrigger asChild>
        <button
          aria-label="This sound is registered under the Creative Commons 0"
          className="outline-focus group cursor-help rounded-sm p-2 focus:bg-transparent"
        >
          <AttributionCC0Icon className="text-app-gray-600 group-hover:text-app-gray-400 text-xl" />
        </button>
      </TooltipTrigger>
      <TooltipContent>This sound is registered under the Creative Commons 0</TooltipContent>
    </Tooltip>
  </TooltipProvider>
)

const TrackItem: FC = () => {
  const [isActive, setIsActive] = useState(false)

  return (
    <div
      className={cn(
        'group/track hover:bg-app-primary-950 relative flex h-[3.8rem] w-[calc(100%+1rem)] items-center overflow-hidden rounded-xl px-2 transition-colors duration-200',
        isActive && '!bg-app-primary-900'
      )}
    >
      <div className="flex w-full items-center justify-start">
        <button
          className={cn(
            'btn outline-focus bg-app-gray-300 hover:bg-app-gray-200 active:bg-app-gray-100 mr-3 h-8 w-8 shrink-0 p-0 transition-colors',
            isActive && 'bg-app-primary-500 hover:bg-app-primary-500 active:bg-app-primary-500'
          )}
          aria-label="play sound"
          onClick={() => setIsActive((prev) => !prev)}
        >
          <SoundNoteIcon
            className={cn(
              'text-app-white absolute text-xl opacity-0 transition-opacity duration-75 ease-out',
              !isActive && 'opacity-100 ease-in'
            )}
          />
          <StopIcon
            className={cn(
              'text-app-white absolute text-xl opacity-0 transition-opacity duration-75 ease-out',
              isActive && 'opacity-100 ease-in'
            )}
          />
        </button>
        <div className="w-full truncate">
          <p className="text-app-gray-300 truncate text-sm font-semibold">
            Rain on tree leaves ambience
          </p>
          <p className="text-app-gray-300 truncate text-xs">0:21 · rain · recording </p>
        </div>
      </div>
      <div
        className={cn(
          'group-hover/track:to-app-primary-950 to-app-white absolute right-2 my-auto flex h-full items-center gap-1 bg-linear-to-r from-transparent to-[.5rem] pl-4 transition-colors',
          isActive && 'to-app-primary-900 group-hover/track:to-app-primary-900'
        )}
      >
        <div
          className={cn(
            'flex w-0 scale-0 overflow-hidden opacity-0 ease-out group-hover/track:w-full group-hover/track:scale-100 group-hover/track:opacity-100',
            isActive && 'w-full scale-100 opacity-100'
          )}
        >
          <TrackActionAttribution />
        </div>
        <button className="btn outline-focus group">
          <DownloadIcon className="text-app-gray-600 group-hover:text-app-gray-300 group-active:text-app-gray-200 group-focus:text-app-gray-200 text-xl" />
        </button>
        <TrackActionMore />
      </div>
    </div>
  )
}

export default TrackItem
