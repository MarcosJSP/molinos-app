import Canvas from '@components/canvas/Canvas'
import { DrawCb, OnMouseMoveCb } from '@components/canvas/useCanvas'
import { scale } from '@renderer/utils/helpers'
import { JSX } from 'react'

function App(): JSX.Element {
  const amplitudes = Array.from({ length: 37 }, () => Math.floor(Math.random() * 40))
  const canvasHeight = 32
  const noteWidth = 4
  const minNoteHeight = 4
  const gapBetweenNotes = 2
  const canvasWidth = amplitudes.length * (noteWidth + gapBetweenNotes) - gapBetweenNotes

  const preDraw: DrawCb = (ctx) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  }

  const draw: DrawCb = (ctx): void => {
    const maxAmp = Math.max(...amplitudes)

    ctx.fillStyle = '#000000'
    amplitudes.forEach((amp, i) => {
      const x = i * (noteWidth + gapBetweenNotes)
      const h = scale(amp + minNoteHeight, [0, maxAmp + minNoteHeight], [0, canvasHeight])

      const yOffset = (canvasHeight - h) / 2
      ctx.beginPath()
      ctx.rect(x, yOffset, noteWidth, h)
      ctx.fill()
    })
  }

  const onMouseMove: OnMouseMoveCb = (x, y) => {
    console.log(x, y)
  }
  const onMouseLeave = (): void => {
    console.log('out')
  }

  return (
    <>
      <Canvas
        onDraw={draw}
        onPreDraw={preDraw}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        width={canvasWidth}
        height={canvasHeight}
      />
    </>
  )
}

export default App
