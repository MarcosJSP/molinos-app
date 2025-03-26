import PlayerAmpVisualizer from '@components/PlayerAmpVisualizer/PlayerAmpVisualizer'
import { JSX } from 'react'
import { usePlayerStore } from '@components/PlayerAmpVisualizer/usePlayerStore'

const rand = (length) => Math.floor(Math.random() * length)

const generateRandomAmplitudes = (length = 100): number[] =>
  Array.from({ length: length }, () => Math.floor(Math.random() * 40))

setInterval(() => {
  let progress = usePlayerStore.getState().progress + 0.1
  if (progress >= 100) {
    progress = 0
  }

  usePlayerStore.setState({ progress })
}, 1)

setInterval(() => {
  usePlayerStore.setState({
    amplitudes: generateRandomAmplitudes(100),
    progress: 0
  })
}, 2000)

usePlayerStore.setState({
  amplitudes: generateRandomAmplitudes(100),
  progress: 0
})

function App(): JSX.Element {
  return (
    <div className="h-screen w-screen bg-[#303236]">
      <PlayerAmpVisualizer />
    </div>
  )
}

export default App
