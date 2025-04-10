import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const debounce = (cb: () => void, wait: number) => {
  let timeout: ReturnType<typeof setTimeout>
  return (): void => {
    clearTimeout(timeout)
    timeout = setTimeout(cb, wait)
  }
}

export const clamp = (v: number, min: number, max: number): number => {
  return Math.min(Math.max(v, min), max)
}

export const scale = (v: number, [inMin, inMax]: number[], [outMin, outMax]: number[]): number => {
  return ((v - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin
}

export const inRange = (v: number, [min, max]: number[]): boolean => {
  return v >= min && v <= max
}

export const lerp = (a: number, b: number, alpha: number): number => {
  return a + alpha * (b - a)
}

export const lerpArray = (arr: number[], size: number): number[] => {
  if (arr.length <= 1) {
    throw Error('arr must be of length > 1')
  }

  const result = Array.from<number>({ length: size })
  for (let i = 0; i < size; i++) {
    // find proportional position in arr
    const pointer = (i / (size - 1)) * (arr.length - 1)
    const j0 = Math.floor(pointer)
    const j1 = Math.ceil(pointer)
    const alpha = pointer - j0
    result[i] = lerp(arr[j0], arr[j1], alpha)
  }
  return result
}

export const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs))
}

export const setInputValue = (input: HTMLInputElement, value: string): void => {
  const descriptor = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')
  const nativeInputValueSetter = descriptor?.set
  nativeInputValueSetter?.call(input, value)
  input.dispatchEvent(new Event('input', { bubbles: true }))
}
