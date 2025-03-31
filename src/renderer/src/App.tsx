import { JSX } from 'react'
import PlayerAmpVisualizer from '@/components/audioPlayerAudioVisualizer/AudioPlayerAudioVisualizer'
import { useAudioPlayerStore } from '@/stores/useAudioPlayerStore'
import TrackItem from '@/components/trackItem/TrackItem'

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
    <div className="h-screen w-screen overflow-hidden bg-white">
      <div className="flex flex-col items-center gap-0.5 px-3.5">
        <TrackItem />
        <TrackItem />
        <TrackItem />
        <TrackItem />
        <TrackItem />

        <div className="flex h-16 w-full items-center justify-center bg-[#303236]">
          <PlayerAmpVisualizer />
        </div>
      </div>
    </div>
  )
}

export default App
