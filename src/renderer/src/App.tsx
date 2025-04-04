import { JSX } from 'react'
import PlayerAmpVisualizer from '@/components/audioPlayerAudioVisualizer/AudioPlayerAudioVisualizer'
import { useAudioPlayerStore } from '@/stores/useAudioPlayerStore'
import TrackItem from '@/components/trackItem/TrackItem'
import Scroll from '@/components/scroll/Scroll'
import AudioPlayer from '@/components/audioPlayer/audioPlayer'

const rand = (length): number => Math.floor(Math.random() * length)

const generateRandomAmplitudes = (length = 100): number[] =>
  Array.from({ length: length }, () => Math.floor(Math.random() * 40))

setInterval(() => {
  let progress = useAudioPlayerStore.getState().progress + 0.1
  if (progress >= 100) {
    progress = 0
  }

  useAudioPlayerStore.setState({ progress })
}, 1)

setInterval(() => {
  useAudioPlayerStore.setState({
    amplitudes: generateRandomAmplitudes(rand(50)),
    progress: 0
  })
}, 2000)

useAudioPlayerStore.setState({
  amplitudes: generateRandomAmplitudes(rand(50)),
  progress: 60
})

function App(): JSX.Element {
  return (
    <div className="flex h-screen w-screen max-w-full flex-col overflow-hidden bg-white py-2">
      <Scroll className="h-full">
        <div className="flex w-full scroll-p-0 flex-col items-center gap-0.5 px-3.5">
          {Array.from({ length: 50 }).map((_, i) => (
            <TrackItem key={i} />
          ))}
        </div>
      </Scroll>
      <AudioPlayer />
    </div>
  )
}

export default App
