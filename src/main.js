const { app, BrowserWindow, ipcMain, dialog, Menu } = require('electron');
const path = require('path');
const { spawn, exec } = require('child_process');
const os = require('os');

let mainWindow;

function createWindow() {
  // 隐藏菜单栏
  Menu.setApplicationMenu(null);

  mainWindow = new BrowserWindow({
    width: 1100,
    height: 750,
    minWidth: 900,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.js'),
      webSecurity: false, // 允许加载本地资源
      allowRunningInsecureContent: true // 允许不安全内容
    },
    icon: path.join(__dirname, '../assets/icon.png'),
    frame: false, // 隐藏默认标题栏
    show: false, // 初始隐藏窗口，避免闪烁
    autoHideMenuBar: true, // 自动隐藏菜单栏
    menuBarVisible: false,  // 菜单栏不可见
    backgroundColor: '#667eea', // 设置背景色避免白屏闪烁
    webSecurity: false, // 允许加载本地资源
    titleBarOverlay: false, // 禁用标题栏覆盖
    paintWhenInitiallyHidden: false, // 初始隐藏时不绘制
    skipTaskbar: false
  });

  // 直接加载HTML文件，避免URL构造问题
  console.log('正在加载应用界面...');

  const htmlPath = path.join(__dirname, 'index.html');
  const fs = require('fs');

  // 检查HTML文件是否存在
  if (fs.existsSync(htmlPath)) {
    console.log('HTML文件存在，直接加载:', htmlPath);
    // 使用 file:// 协议直接加载HTML文件
    mainWindow.loadFile(htmlPath);
  } else {
    console.error('HTML文件不存在，使用备用方案');/*  */
    // 备用方案：使用内联HTML
    const backupHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>PortMan - 端口管理工具</title>
        <style>
          body {
            font-family: 'Segoe UI', Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 40px;
            margin: 0;
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          h1 { margin-bottom: 20px; }
          p { font-size: 16px; opacity: 0.9; }
        </style>
      </head>
      <body>
        <h1>🚀 PortMan - 端口管理工具</h1>
        <p>HTML文件加载失败，请检查文件路径</p>
        <p>文件路径: ${htmlPath}</p>
      </body>
      </html>
    `;
    mainWindow.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(backupHTML));
  }

  // 总是打开开发者工具以便调试
  mainWindow.webContents.openDevTools();

  // 优化窗口显示时机，减少闪烁
  mainWindow.webContents.once('dom-ready', () => {
    // DOM 准备就绪后直接显示，避免复杂动画
    setTimeout(() => {
      mainWindow.show();
    }, 100); // 减少延迟时间
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

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

// IPC 处理程序 - 获取端口信息
ipcMain.handle('get-ports', async () => {
  try {
    const ports = await getPortsInfo();
    return { success: true, data: ports };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// IPC 处理程序 - 终止进程
ipcMain.handle('kill-process', async (event, pid) => {
  try {
    await killProcess(pid);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// IPC 处理程序 - 获取系统信息
ipcMain.handle('get-system-info', async () => {
  return {
    platform: os.platform(),
    arch: os.arch(),
    hostname: os.hostname(),
    uptime: os.uptime(),
    totalMemory: os.totalmem(),
    freeMemory: os.freemem()
  };
});

// IPC 处理程序 - 窗口控制
ipcMain.handle('window-minimize', () => {
  if (mainWindow) {
    mainWindow.minimize();
  }
});

ipcMain.handle('window-maximize', () => {
  if (mainWindow) {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  }
});

ipcMain.handle('window-unmaximize', () => {
  if (mainWindow) {
    mainWindow.unmaximize();
  }
});

ipcMain.handle('window-close', () => {
  if (mainWindow) {
    mainWindow.close();
  }
});

ipcMain.handle('window-is-maximized', () => {
  return mainWindow ? mainWindow.isMaximized() : false;
});

// 获取端口信息的函数
async function getPortsInfo() {
  return new Promise((resolve, reject) => {
    const platform = os.platform();
    let command;
    let args;

    console.log('当前平台:', platform);

    if (platform === 'win32') {
      command = 'netstat';
      args = ['-ano'];
    } else if (platform === 'darwin') {
      command = 'netstat';
      args = ['-anv'];
    } else {
      command = 'netstat';
      args = ['-tulpn'];
    }

    console.log('执行命令:', command, args.join(' '));

    const child = spawn(command, args);
    let output = '';
    let errorOutput = '';

    child.stdout.on('data', (data) => {
      output += data.toString();
    });

    child.stderr.on('data', (data) => {
      errorOutput += data.toString();
      console.error('stderr:', data.toString());
    });

    child.on('close', (code) => {
      console.log('命令执行完成，退出码:', code);
      console.log('输出长度:', output.length);

      if (code === 0 || output.length > 0) {
        try {
          const ports = parseNetstatOutput(output, platform);
          console.log('解析得到端口数量:', ports.length);
          resolve(ports);
        } catch (parseError) {
          console.error('解析输出时出错:', parseError);
          reject(parseError);
        }
      } else {
        console.error('命令失败，错误输出:', errorOutput);
        reject(new Error(`Command failed with code ${code}: ${errorOutput}`));
      }
    });

    child.on('error', (error) => {
      console.error('执行命令时出错:', error);
      reject(error);
    });

    // 设置超时
    setTimeout(() => {
      child.kill();
      reject(new Error('Command timeout'));
    }, 10000);
  });
}

// 解析 netstat 输出
function parseNetstatOutput(output, platform) {
  const lines = output.split('\n');
  const ports = [];

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine || trimmedLine.includes('Proto') || trimmedLine.includes('Active')) {
      continue;
    }

    const parts = trimmedLine.split(/\s+/);
    if (parts.length < 4) continue;

    let portInfo = {};

    if (platform === 'win32') {
      if (parts[0] === 'TCP' || parts[0] === 'UDP') {
        portInfo = {
          protocol: parts[0],
          localAddress: parts[1],
          remoteAddress: parts[2] || '-',
          state: parts[0] === 'TCP' ? parts[3] : 'UDP',
          pid: parts[0] === 'TCP' ? parts[4] : parts[3],
          processName: '-'
        };
      }
    } else {
      if (parts[0] === 'tcp' || parts[0] === 'udp' || parts[0] === 'tcp6' || parts[0] === 'udp6') {
        portInfo = {
          protocol: parts[0].toUpperCase(),
          localAddress: parts[3] || parts[1],
          remoteAddress: parts[4] || parts[2] || '-',
          state: parts[5] || 'LISTEN',
          pid: extractPid(parts[6] || parts[parts.length - 1]),
          processName: extractProcessName(parts[6] || parts[parts.length - 1])
        };
      }
    }

    if (portInfo.protocol && portInfo.localAddress) {
      ports.push(portInfo);
    }
  }

  return ports;
}

// 提取 PID
function extractPid(pidString) {
  if (!pidString || pidString === '-') return '-';
  const match = pidString.match(/(\d+)/);
  return match ? match[1] : '-';
}

// 提取进程名
function extractProcessName(pidString) {
  if (!pidString || pidString === '-') return '-';
  const parts = pidString.split('/');
  return parts.length > 1 ? parts[1] : '-';
}

// 终止进程
async function killProcess(pid) {
  return new Promise((resolve, reject) => {
    const platform = os.platform();
    let command;
    let args;

    if (platform === 'win32') {
      command = 'taskkill';
      args = ['/F', '/PID', pid];
    } else {
      command = 'kill';
      args = ['-9', pid];
    }

    const child = spawn(command, args);

    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Failed to kill process ${pid}`));
      }
    });

    child.on('error', (error) => {
      reject(error);
    });
  });
}
