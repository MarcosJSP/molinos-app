import useCanvas, { DrawCb, MouseEventCb } from '@components/canvas/useCanvas'
import { FC } from 'react'

interface CanvasProps {
  onDraw?: DrawCb
  onPreDraw?: DrawCb
  onMouseMove?: MouseEventCb
  onMouseEnter?: MouseEventCb
  onMouseLeave?: MouseEventCb
  onClick?: MouseEventCb
  width: number
  height: number
  pointerOnHover?: boolean
}

const Canvas: FC<CanvasProps> = ({
  onDraw = (): void => {},
  onPreDraw = (): void => {},
  onMouseEnter = (): void => {},
  onMouseLeave = (): void => {},
  onMouseMove = (): void => {},
  onClick = (): void => {},
  width,
  height,
  pointerOnHover = true
}) => {
  const { ref } = useCanvas({ onDraw, onPreDraw, onMouseLeave, onMouseEnter, onMouseMove, onClick })

  return (
    <canvas
      ref={ref}
      className="cursor-pointer"
      style={{
        width,
        height,
        position: 'absolute',
        left: '100px',
        top: '300px',
        cursor: pointerOnHover ? 'pointer' : 'default'
      }}
    />
  )
}

export default Canvas
