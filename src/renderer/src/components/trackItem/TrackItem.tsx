import {
  AttributionCC0Icon,
  DownloadIcon,
  SoundNoteIcon,
  StopIcon,
  ThreeDotsIcon
} from '@/components/icons'
import { Tooltip } from '@/components/tooltip/Tooltip'
import { FC, useState } from 'react'
import { twMerge } from 'tailwind-merge'

const TrackItem: FC = () => {
  const [isActive, setIsActive] = useState(false)

  return (
    <div
      className={twMerge(
        'group/track hover:bg-app-primary-950 relative flex h-[3.8rem] w-[calc(100%+1rem)] items-center overflow-hidden rounded-lg px-2 transition-colors duration-200',
        isActive && '!bg-app-primary-900'
      )}
    >
      <div className="flex w-full items-center justify-start">
        <button
          className={twMerge(
            'btn outline-focus bg-app-gray-300 hover:bg-app-gray-200 active:bg-app-gray-100 mr-3 h-8 w-8 shrink-0 p-0 transition-colors',
            isActive && 'bg-app-primary-500 hover:bg-app-primary-500 active:bg-app-primary-500'
          )}
          aria-label="play sound"
          onClick={() => setIsActive((prev) => !prev)}
        >
          <SoundNoteIcon
            className={twMerge(
              'text-app-white absolute text-xl opacity-0 transition-opacity duration-75 ease-out',
              !isActive && 'opacity-100 ease-in'
            )}
          />
          <StopIcon
            className={twMerge(
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
        className={twMerge(
          'group-hover/track:to-app-primary-950 to-app-white absolute right-2 my-auto flex h-full items-center gap-1 bg-linear-to-r from-transparent to-[.5rem] pl-4 transition-colors',
          isActive && 'to-app-primary-900 group-hover/track:to-app-primary-900'
        )}
      >
        <div
          className={twMerge(
            'flex w-0 scale-0 overflow-hidden opacity-0 ease-out group-hover/track:w-full group-hover/track:scale-100 group-hover/track:opacity-100',
            isActive && 'w-full scale-100 opacity-100'
          )}
        >
          <Tooltip
            delay={0}
            trigger={
              <button
                aria-label="This sound is registered under the Creative Commons 0"
                className="outline-focus group rounded-sm p-2 focus:bg-transparent"
              >
                <AttributionCC0Icon className="text-app-gray-600 group-hover:text-app-gray-400 text-xl" />
              </button>
            }
            content="This sound is registered under the Creative Commons 0"
          />
        </div>
        <button className="btn outline-focus group">
          <DownloadIcon className="text-app-gray-600 group-hover:text-app-gray-300 group-active:text-app-gray-200 group-focus:text-app-gray-200 text-xl" />
        </button>
        <button className="btn outline-focus group">
          <ThreeDotsIcon className="text-app-gray-600 group-hover:text-app-gray-300 group-active:text-app-gray-200 group-focus:text-app-gray-200 text-xl" />
        </button>
      </div>
    </div>
  )
}

export default TrackItem
