import { clamp, debounce } from '@renderer/utils/helpers'
import React, { useCallback, useEffect, useRef } from 'react'

export type DrawCb = (ctx: CanvasRenderingContext2D, delta: number) => void
export type OnMouseMoveCb = (x: number, y: number, evt: MouseEvent) => void

interface UseCanvasProps {
  onDraw?: DrawCb
  onPreDraw?: DrawCb
  onMouseMove?: OnMouseMoveCb
  onMouseLeave?: () => void
}
interface UseCanvasReturn {
  ref: React.RefObject<HTMLCanvasElement | null>
}

const useCanvas = ({
  onDraw = (): void => {},
  onPreDraw = (): void => {},
  onMouseLeave = (): void => {},
  onMouseMove = (): void => {}
}: UseCanvasProps): UseCanvasReturn => {
  const ref = useRef<HTMLCanvasElement>(null)

  const getCanvasAndContext: () => {
    canvas: HTMLCanvasElement | null
    context: CanvasRenderingContext2D | null
  } = useCallback(() => {
    const canvas = ref.current
    if (!canvas) return { canvas: null, context: null }

    const context = canvas.getContext('2d')
    if (!context) return { canvas: null, context: null }

    return { canvas, context }
  }, [])

  // Handle Rendering
  useEffect(() => {
    const { canvas, context } = getCanvasAndContext()
    if (!canvas || !context) return

    let animationFrameId: number
    const render = (delta: DOMHighResTimeStamp): void => {
      onPreDraw(context, delta)
      onDraw(context, delta)
      animationFrameId = window.requestAnimationFrame(render)
    }
    animationFrameId = window.requestAnimationFrame(render)

    // cleanup
    return (): void => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [onDraw, onPreDraw, getCanvasAndContext])

  // Handle Events
  useEffect(() => {
    const { canvas, context } = getCanvasAndContext()
    if (!canvas || !context) return

    // Resize Handler
    const adjustDPI = (): void => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      context.scale(dpr, dpr)
    }
    const handleResize = debounce(adjustDPI, 100)

    // Mouse Move Handler
    const handleMouseMove = (evt: MouseEvent): void => {
      const rect = canvas.getBoundingClientRect()
      const x = clamp(evt.clientX - rect.left, 0, rect.width)
      const y = clamp(evt.clientY - rect.top, 0, rect.height)
      onMouseMove(x, y, evt)
    }

    // Mouse Leave Handler
    const handleMouseLeave = (): void => {
      onMouseLeave()
    }

    // Add Event Listeners
    window.addEventListener('resize', handleResize)
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)

    // Initial DPI adjustment
    adjustDPI()

    // cleanup
    return (): void => {
      window.removeEventListener('resize', handleResize)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [getCanvasAndContext, onMouseMove, onMouseLeave])

  return { ref }
}

export default useCanvas
