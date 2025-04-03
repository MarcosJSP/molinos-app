import Canvas from '@/components/canvas/Canvas'
import { DrawCb } from '@/components/canvas/useCanvas'
import { FC, useLayoutEffect, useMemo, useRef } from 'react'
import { lerp, lerpArray, scale } from '@/utils/helpers'
import { useAudioPlayerStore } from '@/stores/useAudioPlayerStore'

type AudioPlayerAudioVisualizerProps = {
  width?: number
  height?: number
  barWidth?: number
  minBarHeight?: number
  gapBetweenBars?: number
}

type LocalMutableState = {
  isHovered: boolean
  hoverX: number
  lastLightPercentages: number[]
  lastBarHeights: number[]
  barHeights: number[]
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

const AudioPlayerAudioVisualizer: FC<AudioPlayerAudioVisualizerProps> = ({
  width = 222,
  height = 32,
  barWidth = 4,
  minBarHeight = 4,
  gapBetweenBars = 2
}) => {
  const barCount = useMemo(
    () => Math.floor(width / (barWidth + gapBetweenBars)),
    [width, barWidth, gapBetweenBars]
  )

  const localMutableState = useRef<LocalMutableState>({
    isHovered: false,
    hoverX: 0,
    lastLightPercentages: Array.from<number>({ length: barCount }).fill(40),
    lastBarHeights: Array.from<number>({ length: barCount }).fill(minBarHeight),
    barHeights: Array.from<number>({ length: barCount }).fill(minBarHeight)
  })

  useLayoutEffect(() => {
    const calculateBarHeights = (amplitudes: number[]): number[] => {
      const lerpAmps = lerpArray(amplitudes, barCount)
      const maxAmp = Math.max(...lerpAmps)
      const barHeights = lerpAmps.map((amp) => {
        const barHeight = scale(amp + minBarHeight, [0, maxAmp + minBarHeight], [0, height])
        return barHeight
      })
      return barHeights
    }

    const killSubscription = useAudioPlayerStore.subscribe(
      (state) => state.amplitudes,
      (amplitudes) => {
        if (amplitudes.length > 1) {
          localMutableState.current.barHeights = calculateBarHeights(amplitudes)
        }
      }
    )

    const { amplitudes } = useAudioPlayerStore.getState()
    if (amplitudes.length > 1) {
      localMutableState.current.barHeights = calculateBarHeights(amplitudes)
    }
    return killSubscription
  }, [barCount, height, minBarHeight])

  // clear canvas
  const preDraw: DrawCb = (ctx) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  }

  // draw on canvas
  const draw: DrawCb = (ctx, delta): void => {
    const { progress } = useAudioPlayerStore.getState()
    const {
      hoverX: hX,
      isHovered,
      lastLightPercentages,
      lastBarHeights,
      barHeights
    } = localMutableState.current

    const pX = scale(progress, [0, 100], [0, width])

    for (let i = 0; i < barHeights.length; i++) {
      const x = Math.floor(i * (barWidth + gapBetweenBars))

      // morph between last color and desired color
      const desiredLp = getLightPercentage({ x, isHovered, hX, pX })
      const light = lerp(lastLightPercentages[i], desiredLp, delta * 0.02)
      localMutableState.current.lastLightPercentages[i] = light

      // morph between last amplitude and desired amplitude
      const barHeight = lerp(lastBarHeights[i], barHeights[i], delta * 0.01)
      localMutableState.current.lastBarHeights[i] = barHeight

      const yOffset = (height - barHeight) / 2

      ctx.fillStyle = `hsl(222, 7%, ${light}%)`
      ctx.beginPath()
      ctx.rect(x, yOffset, barWidth, barHeight)
      ctx.fill()
    }
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
    const { setProgress } = useAudioPlayerStore.getState()
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

export default AudioPlayerAudioVisualizer
