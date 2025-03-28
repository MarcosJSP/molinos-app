import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

type AudioPlayerStoreState = {
  progress: number // from 0 to 100
  amplitudes: number[]
}

type AudioPlayerStoreActions = {
  setProgress: (progress: number) => void
  setAmplitudes: (amplitudes: number[]) => void
}

type AudioPlayerStore = AudioPlayerStoreState & AudioPlayerStoreActions

export const useAudioPlayerStore = create<AudioPlayerStore>()(
  subscribeWithSelector((set) => ({
    progress: 0,
    setProgress: (progress): void => set(() => ({ progress })),

    amplitudes: [],
    setAmplitudes: (amplitudes): void => set(() => ({ amplitudes }))
  }))
)
