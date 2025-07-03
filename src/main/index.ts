import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import * as Sentry from '@sentry/electron/main'
import { app, BrowserWindow, ipcMain, Menu, MenuItem, shell } from 'electron'
import { installExtension, REDUX_DEVTOOLS } from 'electron-devtools-installer'
import windowStateKeeper from 'electron-window-state'
import { join } from 'path'

import icon from '../../resources/icon.png?asset'
import AppUpdater from './updater'

function createWindow() {
  const mainWindowState = windowStateKeeper({
    defaultWidth: 1080,
    defaultHeight: 670
  })

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
    minWidth: 680,
    minHeight: 500,
    show: true,
    autoHideMenuBar: true,
    titleBarStyle: 'hiddenInset',
    trafficLightPosition: { x: 8, y: 12 },
    icon,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      devTools: !app.isPackaged,
      webSecurity: false
    }
  })

  mainWindowState.manage(mainWindow)

  mainWindow.webContents.on('context-menu', () => {
    const menu = new Menu()
    menu.append(new MenuItem({ label: '复制', role: 'copy', sublabel: '⌘ + C' }))
    menu.append(new MenuItem({ label: '粘贴', role: 'paste', sublabel: '⌘ + V' }))
    menu.append(new MenuItem({ label: '剪切', role: 'cut', sublabel: '⌘ + X' }))
    menu.append(new MenuItem({ type: 'separator' }))
    menu.append(new MenuItem({ label: '全选', role: 'selectAll', sublabel: '⌘ + A' }))
    menu.popup()
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  return mainWindow
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.1Chen1y1111.CyCherryStudio')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  const mainWindow = createWindow()

  const { autoUpdater } = new AppUpdater(mainWindow)

  // IPC
  ipcMain.handle('get-app-info', () => {
    return { version: app.getVersion(), isPackaged: app.isPackaged }
  })

  // 触发检查更新(此方法用于被渲染线程调用，例如页面点击检查更新按钮来调用此方法)
  ipcMain.handle('check-for-update', async () => {
    autoUpdater.logger?.info('触发检查更新')
    return {
      currentVersion: autoUpdater.currentVersion,
      update: await autoUpdater.checkForUpdates()
    }
  })

  installExtension(REDUX_DEVTOOLS)
    .then((ext) => console.log(`Added Extension:  ${ext.name}`))
    .catch((err) => console.log('An error occurred: ', err))
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
Sentry.init({
  dsn: 'https://7acb55c9ae62ac2cea7b3746cdaa24e3@o4506517126643712.ingest.us.sentry.io/4509590843424768'
})
