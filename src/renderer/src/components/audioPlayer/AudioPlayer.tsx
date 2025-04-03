import AudioPlayerAudioVisualizer from '@/components/audioPlayerAudioVisualizer/AudioPlayerAudioVisualizer'
import { SkipBackIcon, SkipForwardIcon, StopIcon, VolumeMinIcon } from '@/components/icons'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/popover/Popover'
import { Slider } from '@/components/slider/Slider'
import { FC } from 'react'

const AudioPlayerPlayButtons: FC = () => {
  return (
    <div className="bg-app-gray-300 flex h-full items-center rounded-xl p-1">
      <button className="btn group outline-focus">
        <SkipBackIcon className="text-app-gray-800 group-disabled:text-app-gray-500 group-hover:text-app-gray-950 text-xl" />
      </button>
      <button className="btn group outline-focus">
        <StopIcon className="fill-app-gray-800 text-app-gray-800 group-disabled:fill-app-gray-500 group-hover:text-app-gray-950 group-disabled:text-app-gray-500 group-hover:fill-app-gray-950 text-xl" />
      </button>
      <button className="btn group outline-focus">
        <SkipForwardIcon className="text-app-gray-800 group-disabled:text-app-gray-500 group-hover:text-app-gray-950 text-xl" />
      </button>
    </div>
  )
}
const AudioPlayerVolumeControl: FC = () => {
  return (
    <div className="bg-app-gray-300 flex h-full items-center rounded-xl p-1">
      <Popover>
        <PopoverTrigger asChild>
          <button className="btn group outline-focus">
            <VolumeMinIcon className="text-app-gray-800 group-disabled:text-app-gray-500 group-hover:text-app-gray-950 text-xl" />
          </button>
        </PopoverTrigger>
        <PopoverContent sideOffset={12} className="h-24">
          <Slider orientation="vertical" />
        </PopoverContent>
      </Popover>
    </div>
  )
}

const AudioPlayer: FC = () => {
  return (
    <div className="relative px-3.5 py-3">
      <div className="bg-app-gray-200 flex w-full items-center justify-between gap-2 rounded-[1.25rem] p-2">
        <AudioPlayerPlayButtons />
        <AudioPlayerAudioVisualizer />
        <AudioPlayerVolumeControl />
      </div>
    </div>
  )
}

export default AudioPlayer
