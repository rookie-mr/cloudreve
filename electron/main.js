const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const isDev = !app.isPackaged

function createWindow() {
  const mainWindow = new BrowserWindow({
    minWidth: 800,
    minHeight: 600,
    frame: isDev ? true : true,
    webPreferences: {
      preload: path.join(__dirname, './preload.js'),
      webSecurity: false,
      allowRunningInsecureContent: true,
      nodeIntegration: true,
      contextIsolation: false,
      webviewTag: true,
      enableRemoteModule: true,
      serviceWorkers: true,
      backgroundThrottling: false
    }
  })

  // 加载React应用
  mainWindow.loadFile(path.join(__dirname, '../build/index.html'))

  // 打开开发者工具（开发环境）
  if (isDev) { // TODO 区分环境
    mainWindow.webContents.openDevTools()
  }
}

app.whenReady().then(() => {
  ipcMain.handle('ping', () => 'pong')
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
