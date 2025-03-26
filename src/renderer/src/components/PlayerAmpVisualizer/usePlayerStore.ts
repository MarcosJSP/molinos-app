import { create } from 'zustand'

type PlayerStoreState = {
  progress: number // from 0 to 100
  amplitudes: number[]
}

type PlayerStoreActions = {
  setProgress: (progress: number) => void
  setAmplitudes: (amplitudes: number[]) => void
}

type PlayerStore = PlayerStoreState & PlayerStoreActions

export const usePlayerStore = create<PlayerStore>()((set) => ({
  progress: 0,
  setProgress: (progress): void => set(() => ({ progress })),

  amplitudes: [],
  setAmplitudes: (amplitudes): void => set(() => ({ amplitudes }))
}))
