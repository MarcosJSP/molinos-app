import { clamp } from '@renderer/utils/helpers'

/**
 * Calculates mouse x and y position relative to the canvas
 *
 * @param canvas
 * @param evt
 * @returns x,y
 */
export const getMousePosition = (canvas: HTMLCanvasElement, evt: MouseEvent): [number, number] => {
  const rect = canvas.getBoundingClientRect()
  const x = clamp(evt.clientX - rect.left, 0, rect.width)
  const y = clamp(evt.clientY - rect.top, 0, rect.height)
  return [x, y]
}

export const adjustCanvasDPI = (canvas: HTMLCanvasElement): void => {
  const context = canvas.getContext('2d')!
  const dpr = window.devicePixelRatio || 1
  const rect = canvas.getBoundingClientRect()
  canvas.width = rect.width * dpr
  canvas.height = rect.height * dpr
  context.scale(dpr, dpr)
}
