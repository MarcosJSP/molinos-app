import { adjustCanvasDPI, getMousePosition } from '@components/canvas/helpers'
import { debounce } from '@renderer/utils/helpers'
import React, { useCallback, useEffect, useRef } from 'react'

export type DrawCb = (ctx: CanvasRenderingContext2D, delta: number) => void
export type MouseEventCb = (x: number, y: number, evt: MouseEvent) => void

interface UseCanvasProps {
  onDraw?: DrawCb
  onPreDraw?: DrawCb
  onMouseMove?: MouseEventCb
  onMouseEnter?: MouseEventCb
  onMouseLeave?: MouseEventCb
  onClick?: MouseEventCb
}
interface UseCanvasReturn {
  ref: React.RefObject<HTMLCanvasElement | null>
}

const useCanvas = ({
  onDraw = (): void => {},
  onPreDraw = (): void => {},
  onMouseMove = (): void => {},
  onMouseEnter = (): void => {},
  onMouseLeave = (): void => {},
  onClick = (): void => {}
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
    const { context } = getCanvasAndContext()
    if (!context) return

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

  useEffect(() => {
    const { canvas } = getCanvasAndContext()
    if (!canvas) return

    // Resize Handler
    const handleResize = (): (() => void) => {
      return debounce(() => adjustCanvasDPI(canvas), 100)
    }

    // Mouse Event Handler Generator
    const createMouseEventHandler = (handler: MouseEventCb) => {
      return (evt: Event): void => {
        if (!(evt instanceof MouseEvent)) return
        const [x, y] = getMousePosition(canvas, evt)
        handler(x, y, evt)
      }
    }

    // Event Handlers
    const handleMouseMove = createMouseEventHandler(onMouseMove)
    const handleMouseEnter = createMouseEventHandler(onMouseEnter)
    const handleMouseLeave = createMouseEventHandler(onMouseLeave)
    const handleClick = createMouseEventHandler(onClick)

    // Event Listeners
    const events = [
      { target: window, type: 'resize', handler: handleResize },
      { target: canvas, type: 'mousemove', handler: handleMouseMove },
      { target: canvas, type: 'mouseenter', handler: handleMouseEnter },
      { target: canvas, type: 'mouseleave', handler: handleMouseLeave },
      { target: canvas, type: 'click', handler: handleClick }
    ]

    // Add Event Listeners
    events.forEach(({ target, type, handler }) => target.addEventListener(type, handler))

    // Initial DPI adjustment
    adjustCanvasDPI(canvas)

    // Cleanup
    return (): void => {
      events.forEach(({ target, type, handler }) => target.removeEventListener(type, handler))
    }
  }, [getCanvasAndContext, onMouseMove, onMouseEnter, onMouseLeave, onClick])

  return { ref }
}

export default useCanvas
