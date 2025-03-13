import useCanvas, { DrawCb, OnMouseMoveCb } from '@components/canvas/useCanvas'
import { FC } from 'react'

interface CanvasProps {
  onDraw?: DrawCb
  onPreDraw?: DrawCb
  onMouseMove?: OnMouseMoveCb
  onMouseLeave?: () => void
  width: number
  height: number
}

const Canvas: FC<CanvasProps> = ({
  onDraw = (): void => {},
  onPreDraw = (): void => {},
  onMouseLeave = (): void => {},
  onMouseMove = (): void => {},
  width,
  height
}) => {
  const { ref } = useCanvas({ onDraw, onPreDraw, onMouseLeave, onMouseMove })

  return (
    <canvas
      ref={ref}
      style={{ width, height, position: 'absolute', left: '100px', top: '300px' }}
    />
  )
}

export default Canvas
