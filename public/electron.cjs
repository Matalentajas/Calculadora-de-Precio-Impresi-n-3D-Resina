const { app, BrowserWindow, Menu, screen } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;
let splashWindow;

function createSplashWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  
  // Ventana de splash profesional
  splashWindow = new BrowserWindow({
    width: 500,
    height: 300,
    frame: false,
    alwaysOnTop: true,
    transparent: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    },
    icon: path.join(__dirname, 'app-icon.ico'),
    show: false,
    center: true,
    resizable: false
  });

  // HTML del splash screen
  const splashHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          border-radius: 15px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
          overflow: hidden;
          position: relative;
        }
        
        .logo {
          font-size: 3em;
          margin-bottom: 20px;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
          animation: pulse 2s infinite;
        }
        
        .title {
          font-size: 1.5em;
          margin-bottom: 10px;
          font-weight: 300;
          text-align: center;
        }
        
        .subtitle {
          font-size: 1em;
          opacity: 0.8;
          margin-bottom: 30px;
          text-align: center;
        }
        
        .loading {
          display: flex;
          gap: 5px;
          margin-bottom: 20px;
        }
        
        .dot {
          width: 8px;
          height: 8px;
          background: white;
          border-radius: 50%;
          animation: loading 1.4s infinite ease-in-out;
        }
        
        .dot:nth-child(1) { animation-delay: -0.32s; }
        .dot:nth-child(2) { animation-delay: -0.16s; }
        
        .version {
          position: absolute;
          bottom: 20px;
          right: 20px;
          font-size: 0.8em;
          opacity: 0.7;
        }
        
        .particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }
        
        .particle {
          position: absolute;
          width: 2px;
          height: 2px;
          background: rgba(255,255,255,0.3);
          border-radius: 50%;
          animation: float 6s infinite linear;
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        
        @keyframes loading {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
        
        @keyframes float {
          0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-10px) rotate(360deg); opacity: 0; }
        }
      </style>
    </head>
    <body>
      <div class="particles"></div>
      <div class="logo">🖨️</div>
      <div class="title">Calculadora de Precios 3D</div>
      <div class="subtitle">Sistema Profesional de Cálculo de Costes</div>
      <div class="loading">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
      <div class="version">v1.0.6</div>
      
      <script>
        // Crear partículas flotantes
        function createParticles() {
          const container = document.querySelector('.particles');
          for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (6 + Math.random() * 4) + 's';
            container.appendChild(particle);
          }
        }
        
        createParticles();
      </script>
    </body>
    </html>
  `;

  splashWindow.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(splashHTML));
  splashWindow.once('ready-to-show', () => {
    splashWindow.show();
  });
}

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  
  // Crear la ventana principal en pantalla completa
  mainWindow = new BrowserWindow({
    width: width,
    height: height,
    minWidth: 1000,
    minHeight: 700,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    },
    icon: path.join(__dirname, 'app-icon.ico'),
    title: 'Calculadora de Precios 3D - Sistema Profesional',
    show: false,
    backgroundColor: '#1a1a2e',
    titleBarStyle: 'default',
    frame: true,
    maximizable: true,
    fullscreenable: true
  });

  // Cargar la aplicación
  const startUrl = isDev 
    ? 'http://localhost:3000' 
    : `file://${path.join(__dirname, '../dist/index.html')}`;
  
  mainWindow.loadURL(startUrl);

  // Mostrar la ventana cuando esté lista con transición profesional
  mainWindow.once('ready-to-show', () => {
    // Esperar 3 segundos para mostrar la aplicación principal
    setTimeout(() => {
      if (splashWindow) {
        splashWindow.close();
        splashWindow = null;
      }
      
      mainWindow.maximize(); // Maximizar la ventana
      mainWindow.show();
      
      // Opcional: Activar pantalla completa con F11
      // mainWindow.setFullScreen(true); // Descomenta para pantalla completa automática
      
    }, 3000); // 3 segundos de splash screen
  });

  // Manejar el cierre de la ventana
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Crear menú personalizado
function createMenu() {
  const template = [
    {
      label: 'Archivo',
      submenu: [
        {
          label: 'Nueva Pieza',
          accelerator: 'CmdOrCtrl+N',
          click: () => {
            mainWindow.webContents.send('nueva-pieza');
          }
        },
        { type: 'separator' },
        {
          label: 'Salir',
          accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
          click: () => {
            app.quit();
          }
        }
      ]
    },
    {
      label: 'Ver',
      submenu: [
        { role: 'reload', label: 'Recargar' },
        { role: 'forceReload', label: 'Forzar Recarga' },
        { role: 'toggleDevTools', label: 'Herramientas de Desarrollador' },
        { type: 'separator' },
        { role: 'resetZoom', label: 'Zoom Normal' },
        { role: 'zoomIn', label: 'Acercar' },
        { role: 'zoomOut', label: 'Alejar' },
        { type: 'separator' },
        { role: 'togglefullscreen', label: 'Pantalla Completa' }
      ]
    },
    {
      label: 'Ventana',
      submenu: [
        { role: 'minimize', label: 'Minimizar' },
        { role: 'close', label: 'Cerrar' }
      ]
    },
    {
      label: 'Ayuda',
      submenu: [
        {
          label: 'Acerca de',
          click: () => {
            const { dialog } = require('electron');
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: 'Acerca de',
              message: 'Calculadora de Precios 3D',
              detail: 'Sistema profesional de cálculo de costes para impresión en resina.\n\nVersión 1.0.0'
            });
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// Eventos de la aplicación
app.whenReady().then(() => {
  // Crear primero el splash screen
  createSplashWindow();
  
  // Luego crear la ventana principal (pero no la mostramos aún)
  createWindow();
  createMenu();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Evitar múltiples instancias
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    // Si alguien trata de ejecutar una segunda instancia, enfocamos nuestra ventana
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });
}
