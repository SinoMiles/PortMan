const { app, BrowserWindow, ipcMain, dialog, Menu } = require('electron');
const path = require('path');
const { spawn, exec } = require('child_process');
const os = require('os');

let mainWindow;

function createWindow() {
  // 隐藏菜单栏
  Menu.setApplicationMenu(null);

  mainWindow = new BrowserWindow({
    width: 900,
    height: 650,
    minWidth: 700,
    minHeight: 500,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, '../assets/icon.png'),
    titleBarStyle: 'default',
    show: false,
    autoHideMenuBar: true, // 自动隐藏菜单栏
    menuBarVisible: false  // 菜单栏不可见
  });

  // 直接使用内联 HTML 内容
  console.log('正在加载应用界面...');

  // 创建完整的应用界面
  const simpleHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>PortMan - 端口管理工具</title>
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
            overflow: hidden;
          }
          .app-container {
            height: 100vh;
            display: flex;
            flex-direction: column;
          }
          .header {
            background: rgba(255,255,255,0.1);
            backdrop-filter: blur(10px);
            border-bottom: 1px solid rgba(255,255,255,0.2);
            padding: 15px 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .title {
            font-size: 1.4em;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 10px;
          }
          .header-actions {
            display: flex;
            gap: 10px;
            align-items: center;
          }
          .main-content {
            flex: 1;
            padding: 20px;
            overflow-y: auto;
          }
          .card {
            background: rgba(255,255,255,0.1);
            backdrop-filter: blur(10px);
            border-radius: 12px;
            padding: 20px;
            border: 1px solid rgba(255,255,255,0.2);
            height: 100%;
            display: flex;
            flex-direction: column;
          }
          .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
          }
          .card-title {
            font-size: 1.2em;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .btn {
            background: rgba(255,255,255,0.2);
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 13px;
            font-weight: 500;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.3);
          }
          .btn:hover {
            background: rgba(255,255,255,0.3);
            transform: translateY(-1px);
          }
          .btn-primary {
            background: #667eea;
            border: 1px solid #667eea;
          }
          .btn-primary:hover {
            background: #5a6fd8;
          }
          .table-container {
            flex: 1;
            overflow-y: auto;
            border-radius: 8px;
            border: 1px solid rgba(255,255,255,0.2);
          }
          .table {
            width: 100%;
            border-collapse: collapse;
            font-size: 13px;
          }
          .table th {
            background: rgba(255,255,255,0.2);
            padding: 12px 10px;
            border-bottom: 1px solid rgba(255,255,255,0.3);
            font-weight: 600;
            text-align: left;
            position: sticky;
            top: 0;
          }
          .table td {
            padding: 10px;
            border-bottom: 1px solid rgba(255,255,255,0.1);
            background: rgba(255,255,255,0.05);
          }
          .table tr:hover td {
            background: rgba(255,255,255,0.1);
          }
          .status {
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 11px;
            font-weight: 500;
          }
          .status-listen { background: #4caf50; }
          .status-established { background: #2196f3; }
          .status-other { background: #ff9800; }
          .protocol-tag {
            background: #667eea;
            padding: 2px 6px;
            border-radius: 3px;
            font-size: 11px;
            font-weight: 500;
          }
          .loading {
            text-align: center;
            padding: 60px 20px;
            font-size: 16px;
            color: rgba(255,255,255,0.8);
          }
          .error {
            text-align: center;
            padding: 40px 20px;
            color: #ff6b6b;
          }
          .empty {
            text-align: center;
            padding: 60px 20px;
            color: rgba(255,255,255,0.6);
          }
          .stats {
            font-size: 12px;
            color: rgba(255,255,255,0.7);
            margin-top: 15px;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="app-container">
          <div class="header">
            <div class="title">
              🚀 PortMan
            </div>
            <div class="header-actions">
              <button onclick="refreshPorts()" class="btn btn-primary">🔄 刷新</button>
            </div>
          </div>
          <div class="main-content">
            <div class="card">
              <div class="card-header">
                <div class="card-title">
                  🔌 端口列表
                </div>
              </div>
              <div class="table-container">
                <div id="portList">
                  <div class="loading">正在加载端口信息...</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <script>
          // 页面加载完成后自动获取端口信息
          window.addEventListener('DOMContentLoaded', () => {
            console.log('页面加载完成，准备获取端口信息...');
            setTimeout(refreshPorts, 1000);
          });

          async function refreshPorts() {
            const portList = document.getElementById('portList');
            portList.innerHTML = '<div class="loading">正在获取端口信息...</div>';

            console.log('开始获取端口信息...');
            console.log('Electron API 可用:', !!window.electronAPI);

            try {
              if (window.electronAPI) {
                console.log('调用 getPorts API...');
                const result = await window.electronAPI.getPorts();
                console.log('API 返回结果:', result);

                if (result && result.success) {
                  console.log('成功获取端口数据:', result.data);
                  displayPorts(result.data);
                } else {
                  console.error('获取端口失败:', result);
                  portList.innerHTML = '<div class="error">获取端口信息失败: ' + (result ? result.error : '未知错误') + '</div>';
                }
              } else {
                console.error('Electron API 不可用');
                portList.innerHTML = '<div class="error">Electron API 未就绪，请重新启动应用</div>';
              }
            } catch (error) {
              console.error('获取端口信息时发生错误:', error);
              portList.innerHTML = '<div class="error">错误: ' + error.message + '</div>';
            }
          }

          function displayPorts(ports) {
            const portList = document.getElementById('portList');
            if (ports.length === 0) {
              portList.innerHTML = '<div class="empty">未找到活跃端口</div>';
              return;
            }

            let html = '<table class="table">';
            html += '<tr><th>协议</th><th>本地地址</th><th>远程地址</th><th>状态</th><th>PID</th><th>进程名</th><th>操作</th></tr>';

            ports.forEach(port => {
              const statusClass = port.state.toUpperCase() === 'LISTEN' ? 'status-listen' :
                                 port.state.toUpperCase() === 'ESTABLISHED' ? 'status-established' : 'status-other';

              html += \`<tr>
                <td><span class="protocol-tag">\${port.protocol}</span></td>
                <td>\${port.localAddress}</td>
                <td>\${port.remoteAddress || '-'}</td>
                <td><span class="status \${statusClass}">\${port.state}</span></td>
                <td>\${port.pid}</td>
                <td>\${port.processName || '-'}</td>
                <td>
                  \${port.pid !== '-' && port.pid !== '0' ? \`<button onclick="killProcess('\${port.pid}', '\${port.processName}')" class="btn" style="background: #f44336; padding: 4px 8px; font-size: 11px;">终止</button>\` : '-'}
                </td>
              </tr>\`;
            });

            html += '</table>';
            html += \`<div class="stats">共找到 \${ports.length} 个活跃端口</div>\`;
            portList.innerHTML = html;
          }

          async function killProcess(pid, processName) {
            if (confirm(\`确定要终止进程 \${processName} (PID: \${pid}) 吗？\`)) {
              try {
                const result = await window.electronAPI.killProcess(pid);
                if (result.success) {
                  alert('进程终止成功！');
                  refreshPorts();
                } else {
                  alert('进程终止失败: ' + result.error);
                }
              } catch (error) {
                alert('错误: ' + error.message);
              }
            }
          }
        </script>
      </body>
      </html>
    `;

  mainWindow.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(simpleHTML));

  // 开发模式下打开开发者工具
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
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
