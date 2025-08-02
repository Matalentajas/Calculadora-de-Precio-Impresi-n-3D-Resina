const { app, BrowserWindow } = require('electron');
const path = require('path');

// 🚀 CONFIGURACIÓN ULTRA OPTIMIZADA PARA MÍNIMO USO DE RECURSOS
let mainWindow;

// Configuración optimizada para rendimiento
app.commandLine.appendSwitch('--disable-features', 'VizDisplayCompositor');
app.commandLine.appendSwitch('--disable-gpu-sandbox');
app.commandLine.appendSwitch('--disable-software-rasterizer');
app.commandLine.appendSwitch('--disable-background-timer-throttling');
app.commandLine.appendSwitch('--disable-backgrounding-occluded-windows');
app.commandLine.appendSwitch('--disable-renderer-backgrounding');

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    show: false, // No mostrar hasta estar listo
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      webSecurity: true,
      backgroundThrottling: false,
      offscreen: false
    },
    titleBarStyle: 'default',
    backgroundColor: '#0a0a0a',
    center: true
  });

  // Cargar la aplicación
  const isDev = process.env.NODE_ENV === 'development';
  const startUrl = isDev 
    ? 'http://localhost:5173' 
    : `file://${path.join(__dirname, 'dist/index.html')}`;

  mainWindow.loadURL(startUrl);

  // Mostrar ventana cuando esté lista (sin splash screen para ahorrar recursos)
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    if (isDev) mainWindow.webContents.openDevTools();
  });

  // Optimización de memoria
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Optimización: Limpiar cache periódicamente
  setInterval(() => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.session.clearCache();
    }
  }, 300000); // Cada 5 minutos
}

// Eventos optimizados
app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// Optimización adicional de memoria
app.on('before-quit', () => {
  if (mainWindow) {
    mainWindow.webContents.session.clearCache();
    mainWindow.webContents.session.clearStorageData();
  }
});
