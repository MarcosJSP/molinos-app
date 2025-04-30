import { BrowserWindow } from 'electron'

let mainWindow: BrowserWindow | null = null

const setMainWindow = (win: BrowserWindow): void => {
  mainWindow = win
}

const getMainWindow = (): BrowserWindow | null => {
  return mainWindow
}

export { setMainWindow, getMainWindow }
