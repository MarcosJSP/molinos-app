import AudioPlayerAudioVisualizer from '@/components/audioPlayerAudioVisualizer/AudioPlayerAudioVisualizer'
import {
  SkipBackIcon,
  SkipForwardIcon,
  StopIcon,
  VolumeMaxIcon,
  VolumeMinIcon,
  VolumeIcon
} from '@/components/icons'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/popover/Popover'
import { Slider } from '@/components/slider/Slider'
import { cn } from '@/utils/helpers'
import { ComponentProps, FC, useState } from 'react'

const AudioPlayerActionButton: FC<ComponentProps<'button'>> = ({ className, ...props }) => (
  <button
    className={cn('btn group outline-focus hover:bg-app-white/5 active:bg-app-white/10', className)}
    {...props}
  />
)

const AudioPlayerPlayButtons: FC = () => {
  return (
    <div className="bg-app-gray-300 flex h-full items-center rounded-xl p-1">
      <AudioPlayerActionButton aria-label="Previous sound">
        <SkipBackIcon className="text-app-gray-800 group-disabled:text-app-gray-500 group-hover:text-app-gray-950 text-xl" />
      </AudioPlayerActionButton>
      <AudioPlayerActionButton aria-label="Pause sound">
        <StopIcon className="fill-app-gray-800 text-app-gray-800 group-disabled:fill-app-gray-500 group-hover:text-app-gray-950 group-disabled:text-app-gray-500 group-hover:fill-app-gray-950 text-xl" />
      </AudioPlayerActionButton>
      <AudioPlayerActionButton aria-label="Next sound">
        <SkipForwardIcon className="text-app-gray-800 group-disabled:text-app-gray-500 group-hover:text-app-gray-950 text-xl" />
      </AudioPlayerActionButton>
    </div>
  )
}

const HIGH_VOLUME_THRESHOLD = 60
const AudioPlayerVolumeControl: FC = () => {
  const [volume, setVolume] = useState([0])

  const noVolume = volume[0] == 0
  const someVolume = volume[0] > 0 && volume[0] < HIGH_VOLUME_THRESHOLD
  const highVolume = volume[0] >= HIGH_VOLUME_THRESHOLD

  const className = {
    icon: 'text-app-gray-800 group-disabled:text-app-gray-500 group-hover:text-app-gray-950 text-xl absolute transition-all duration-200 ease-out'
  }

  return (
    <div className="bg-app-gray-300 flex h-full items-center rounded-xl p-1">
      <Popover>
        <PopoverTrigger asChild>
          <AudioPlayerActionButton className="size-8" aria-label="Modify Volume">
            <VolumeMinIcon
              className={cn(
                className.icon,
                noVolume ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
              )}
            />
            <VolumeIcon
              className={cn(
                className.icon,
                someVolume ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
              )}
            />
            <VolumeMaxIcon
              className={cn(
                className.icon,
                highVolume ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
              )}
            />
          </AudioPlayerActionButton>
        </PopoverTrigger>
        <PopoverContent sideOffset={12} className="bg-app-gray-300 h-26 px-1.5">
          <Slider value={volume} onValueChange={setVolume} orientation="vertical" />
        </PopoverContent>
      </Popover>
    </div>
  )
}

const AudioPlayer: FC = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-40 relative px-3.5 pt-4 pb-2 duration-250 ease-out">
      <div className="bg-app-gray-200 flex w-full items-center justify-between gap-2 rounded-[1.25rem] p-2">
        <AudioPlayerPlayButtons />
        <AudioPlayerAudioVisualizer />
        <AudioPlayerVolumeControl />
      </div>
    </div>
  )
}

export default AudioPlayer
