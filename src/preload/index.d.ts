import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      getAppInfo: () => Promise<{
        version: string
        isPackaged: boolean
      }>
      checkForUpdate: () => void
      openWebsite: (url: string) => void
    }
  }
}
