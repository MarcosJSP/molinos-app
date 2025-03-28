import { JSX } from 'react'
import PlayerAmpVisualizer from '@components/audioPlayerAudioVisualizer/AudioPlayerAudioVisualizer'
import { useAudioPlayerStore } from '@renderer/stores/useAudioPlayerStore'

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
    <div className="h-screen w-screen bg-[#303236]">
      <PlayerAmpVisualizer />
    </div>
  )
}

export default App
