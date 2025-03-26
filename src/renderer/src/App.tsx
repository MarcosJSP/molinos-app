import PlayerWaveVisualizer from '@components/playerWaveVisualizer/PlayerWaveVisualizer'
import { usePlayerStore } from '@components/playerWaveVisualizer/usePlayerStore'

import { JSX } from 'react'

const amplitudes = Array.from({ length: 100 }, () => Math.floor(Math.random() * 40))

setInterval(() => {
  let progress = usePlayerStore.getState().progress + 0.1
  if (progress >= 100) {
    progress = 0
  }

  usePlayerStore.setState({ progress })
}, 1)

usePlayerStore.setState({ amplitudes, progress: 0 })

function App(): JSX.Element {
  return (
    <div className="h-screen w-screen bg-[#303236]">
      <PlayerWaveVisualizer />
    </div>
  )
}

export default App
