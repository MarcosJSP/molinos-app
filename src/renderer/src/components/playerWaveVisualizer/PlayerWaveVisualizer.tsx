import Canvas from '@components/canvas/Canvas'
import { DrawCb } from '@components/canvas/useCanvas'
import { FC, useRef } from 'react'
import { scale } from '@renderer/utils/helpers'
import { usePlayerStore } from '@components/playerWaveVisualizer/usePlayerStore'
import { useStore } from 'zustand'

type PlayerWaveVisualizerProps = {
  width?: number
  height?: number
  noteWidth?: number
  minNoteHeight?: number
  gapBetweenNotes?: number
}

const PlayerWaveVisualizer: FC<PlayerWaveVisualizerProps> = ({
  width = 220,
  height = 32,
  noteWidth = 3,
  minNoteHeight = 4,
  gapBetweenNotes = 2
}) => {
  console.log(width / (noteWidth + gapBetweenNotes))

  const mutableState = useRef({
    isHovered: false,
    hoverX: 0
  })

  const preDraw: DrawCb = (ctx) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  }

  const getColor = (x: number): string => {
    const generateColor = (light: number): string => `hsl(222, 7%, ${light}%)`
    const { isHovered, hoverX: h } = mutableState.current
    const { progress } = usePlayerStore.getState()
    const p = scale(progress, [0, 100], [0, width])

    const isXBeforeP = x <= p
    const isXBeforeH = x <= h

    if (!isHovered) {
      return isXBeforeP ? generateColor(80) : generateColor(40)
    }

    if (p < h) {
      return isXBeforeP ? generateColor(80) : isXBeforeH ? generateColor(60) : generateColor(40)
    } else {
      return isXBeforeH ? generateColor(80) : isXBeforeP ? generateColor(60) : generateColor(40)
    }
  }

  const draw: DrawCb = (ctx): void => {
    const { amplitudes } = usePlayerStore.getState()
    const maxAmp = Math.max(...amplitudes)

    amplitudes.forEach((amp, i) => {
      const x = i * (noteWidth + gapBetweenNotes)
      const h = scale(amp + minNoteHeight, [0, maxAmp + minNoteHeight], [0, height])
      const yOffset = (height - h) / 2

      ctx.fillStyle = getColor(x)
      ctx.beginPath()
      ctx.rect(x, yOffset, noteWidth, h)
      ctx.fill()
    })
  }

  const onMouseEnter = (): void => {
    mutableState.current.isHovered = true
  }

  const onMouseMove = (x: number): void => {
    mutableState.current.hoverX = x
  }

  const onMouseLeave = (): void => {
    mutableState.current.isHovered = false
  }

  const onClick = (x: number): void => {
    const { setProgress } = usePlayerStore.getState()
    const newProgress = scale(x, [0, width], [0, 100])
    setProgress(newProgress)
  }

  return (
    <Canvas
      onDraw={draw}
      onPreDraw={preDraw}
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      width={width}
      height={height}
    />
  )
}

export default PlayerWaveVisualizer
