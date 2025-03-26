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
