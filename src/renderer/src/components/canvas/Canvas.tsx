import { debounce } from '@renderer/utils/helpers'
import { useEffect, useRef, FC, useCallback } from 'react'

interface CanvasProps {
  draw: (ctx: CanvasRenderingContext2D, delta: number) => void
  width: number
  height: number
}

const Canvas: FC<CanvasProps> = ({ draw, width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const adjustDPI = (): void => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    const dpr = window.devicePixelRatio || 1
    const { width, height } = canvas.getBoundingClientRect()

    // Maintain CSS size but increase internal resolution
    canvas.width = width * dpr
    canvas.height = height * dpr
    context.scale(dpr, dpr)
  }

  const preDraw = useCallback((): void => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return
    context.clearRect(0, 0, context.canvas.width, context.canvas.height)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    // Handle Rendering
    let animationFrameId: number
    const render = (delta: DOMHighResTimeStamp): void => {
      preDraw()
      draw(context, delta)
      animationFrameId = window.requestAnimationFrame(render)
    }
    animationFrameId = window.requestAnimationFrame(render)

    // Handle Resizing
    adjustDPI()
    const handleResize = debounce(adjustDPI, 100)
    window.addEventListener('resize', handleResize)

    // Remove events & listeners
    return (): void => {
      window.cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
    }
  }, [draw, preDraw])

  return <canvas ref={canvasRef} style={{ width, height }} />
}

export default Canvas
