import Canvas from '@components/canvas/Canvas'
import { DrawCb } from '@components/canvas/useCanvas'
import { FC, useRef } from 'react'
import { lerp, scale } from '@renderer/utils/helpers'
import { usePlayerStore } from '@components/PlayerAmpVisualizer/usePlayerStore'

type PlayerAmpVisualizerProps = {
  width?: number
  height?: number
  noteWidth?: number
  minNoteHeight?: number
  gapBetweenNotes?: number
}

const getLightPercentage = ({
  x,
  isHovered,
  hX, // hover X
  pX // progress X
}: {
  x: number
  isHovered: boolean
  hX: number
  pX: number
}): number => {
  const isXBeforeP = x <= pX
  const isXBeforeH = x <= hX

  if (!isHovered) {
    return isXBeforeP ? 80 : 40
  }

  if (pX < hX) {
    return isXBeforeP ? 80 : isXBeforeH ? 60 : 40
  } else {
    return isXBeforeH ? 80 : isXBeforeP ? 60 : 40
  }
}

const PlayerAmpVisualizer: FC<PlayerAmpVisualizerProps> = ({
  width = 220,
  height = 32,
  noteWidth = 3,
  minNoteHeight = 4,
  gapBetweenNotes = 1
}) => {
  console.log(width / (noteWidth + gapBetweenNotes))

  const localMutableState = useRef({
    isHovered: false,
    hoverX: 0,
    // TODO: update on useeffect when new amplitude is set
    lastLightPercentages: Array.from({ length: width }).fill(
      40 // minimum light percentage
    ) as number[],
    lastAmplitudes: Array.from({ length: width }).fill(
      minNoteHeight // minimum height
    ) as number[]
  })

  const preDraw: DrawCb = (ctx) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  }

  const draw: DrawCb = (ctx, delta): void => {
    const { amplitudes, progress } = usePlayerStore.getState()
    const {
      hoverX: hX,
      isHovered,
      lastLightPercentages,
      lastAmplitudes
    } = localMutableState.current

    const pX = scale(progress, [0, 100], [0, width])
    const maxAmp = Math.max(...amplitudes)

    amplitudes.forEach((amp, i) => {
      const x = Math.floor(i * (noteWidth + gapBetweenNotes))

      // morph between last color and current color
      const lp = getLightPercentage({ x, isHovered, hX, pX })
      const currentLp = lerp(lastLightPercentages[x], lp, delta * 0.02)
      localMutableState.current.lastLightPercentages[x] = currentLp // update last light percentage
      ctx.fillStyle = `hsl(222, 7%, ${currentLp}%)`

      // morph between last amplitude and current amplitude
      const currentAmp = lerp(lastAmplitudes[x], amp, delta * 0.01)
      localMutableState.current.lastAmplitudes[x] = currentAmp

      const noteHeight = scale(currentAmp + minNoteHeight, [0, maxAmp + minNoteHeight], [0, height])
      const yOffset = (height - noteHeight) / 2

      ctx.beginPath()
      ctx.rect(x, yOffset, noteWidth, noteHeight)
      ctx.fill()
    })
  }

  const onMouseEnter = (): void => {
    localMutableState.current.isHovered = true
  }

  const onMouseMove = (x: number): void => {
    localMutableState.current.hoverX = x
  }

  const onMouseLeave = (): void => {
    localMutableState.current.isHovered = false
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

export default PlayerAmpVisualizer
