// 全局错误捕获
window.addEventListener('error', (event) => {
  console.error('JavaScript错误:', event.error);
  console.error('错误信息:', event.message);
  console.error('错误位置:', event.filename + ':' + event.lineno + ':' + event.colno);
  alert('JavaScript错误: ' + event.message);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('未处理的Promise错误:', event.reason);
  alert('Promise错误: ' + event.reason);
});

// 页面加载完成后自动获取端口信息
window.addEventListener('DOMContentLoaded', () => {
  console.log('页面加载完成，准备获取端口信息...');
  try {
    setTimeout(() => {
      console.log('开始执行 refreshPorts...');
      refreshPorts();
    }, 1000);
  } catch (error) {
    console.error('DOMContentLoaded 错误:', error);
    alert('页面加载错误: ' + error.message);
  }
});

// 窗口控制函数
async function minimizeWindow() {
  if (window.electronAPI && window.electronAPI.windowControls) {
    await window.electronAPI.windowControls.minimize();
  }
}

async function maximizeWindow() {
  if (window.electronAPI && window.electronAPI.windowControls) {
    await window.electronAPI.windowControls.maximize();
  }
}

async function closeWindow() {
  if (window.electronAPI && window.electronAPI.windowControls) {
    await window.electronAPI.windowControls.close();
  }
}

// 端口管理相关函数
async function refreshPorts() {
  console.log('=== refreshPorts 函数开始执行 ===');

  try {
    const portList = document.getElementById('portList');
    if (!portList) {
      throw new Error('找不到 portList 元素');
    }

    portList.innerHTML = '<div class="loading">正在获取端口信息...</div>';
    console.log('已设置加载状态');

    console.log('检查 Electron API...');
    console.log('window.electronAPI 存在:', !!window.electronAPI);

    if (window.electronAPI) {
      console.log('window.electronAPI.getPorts 存在:', !!window.electronAPI.getPorts);

      if (window.electronAPI.getPorts) {
        console.log('调用 getPorts API...');
        const result = await window.electronAPI.getPorts();
        console.log('API 返回结果:', result);

        if (result && result.success) {
          console.log('成功获取端口数据，数量:', result.data ? result.data.length : 0);
          displayPorts(result.data);
        } else {
          console.error('获取端口失败:', result);
          portList.innerHTML = '<div class="error">获取端口信息失败: ' + (result ? result.error : '未知错误') + '</div>';
        }
      } else {
        console.error('getPorts 方法不存在');
        // 显示测试数据
        console.log('使用测试数据...');
        const testData = [
          { protocol: 'TCP', localAddress: '127.0.0.1:3000', remoteAddress: '0.0.0.0:0', state: 'LISTEN', pid: '1234', processName: 'node.exe' },
          { protocol: 'TCP', localAddress: '0.0.0.0:80', remoteAddress: '0.0.0.0:0', state: 'LISTEN', pid: '5678', processName: 'nginx.exe' },
          { protocol: 'UDP', localAddress: '0.0.0.0:53', remoteAddress: '*:*', state: 'UDP', pid: '9012', processName: 'dns.exe' }
        ];
        displayPorts(testData);
      }
    } else {
      console.error('Electron API 完全不可用');
      // 显示测试数据
      console.log('API 不可用，使用测试数据...');
      const testData = [
        { protocol: 'TCP', localAddress: '127.0.0.1:3000', remoteAddress: '0.0.0.0:0', state: 'LISTEN', pid: '1234', processName: 'node.exe' },
        { protocol: 'TCP', localAddress: '0.0.0.0:80', remoteAddress: '0.0.0.0:0', state: 'LISTEN', pid: '5678', processName: 'nginx.exe' }
      ];
      displayPorts(testData);
    }
  } catch (error) {
    console.error('=== refreshPorts 函数发生错误 ===');
    console.error('错误类型:', error.name);
    console.error('错误信息:', error.message);
    console.error('错误堆栈:', error.stack);

    const portList = document.getElementById('portList');
    if (portList) {
      portList.innerHTML = '<div class="error">严重错误: ' + error.message + '<br>请查看控制台获取详细信息</div>';
    }

    alert('refreshPorts 错误: ' + error.message);
  }

  console.log('=== refreshPorts 函数执行结束 ===');
}

// 全局变量存储端口数据
let allPorts = [];
let filteredPorts = [];
let currentPage = 0;
const itemsPerPage = 50;

function displayPorts(ports) {
  console.log('=== displayPorts 函数开始执行 ===');
  console.log('接收到的端口数据:', ports);

  try {
    const portList = document.getElementById('portList');
    if (!portList) {
      throw new Error('找不到 portList 元素');
    }

    if (!ports || !Array.isArray(ports)) {
      throw new Error('端口数据格式错误: ' + typeof ports);
    }

    allPorts = ports;
    filteredPorts = ports;
    console.log('已设置全局变量，端口数量:', ports.length);

    if (ports.length === 0) {
      portList.innerHTML = '<div class="empty">未找到活跃端口</div>';
      console.log('端口数量为0，显示空状态');
      return;
    }

    console.log('开始渲染端口表格...');
    renderPortTable();
    console.log('端口表格渲染完成');

  } catch (error) {
    console.error('=== displayPorts 函数发生错误 ===');
    console.error('错误类型:', error.name);
    console.error('错误信息:', error.message);
    console.error('错误堆栈:', error.stack);

    const portList = document.getElementById('portList');
    if (portList) {
      portList.innerHTML = '<div class="error">显示端口数据时发生错误: ' + error.message + '</div>';
    }

    alert('displayPorts 错误: ' + error.message);
  }

  console.log('=== displayPorts 函数执行结束 ===');
}

function renderPortTable() {
  const portList = document.getElementById('portList');
  const startIndex = currentPage * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredPorts.length);
  const currentPorts = filteredPorts.slice(startIndex, endIndex);

  // 使用字符串拼接，避免模板字符串的性能开销
  let html = '<table class="table"><thead>';
  html += '<tr><th>协议</th><th>本地地址</th><th>远程地址</th><th>状态</th><th>PID</th><th>进程名</th><th>操作</th></tr>';
  html += '</thead><tbody>';

  // 批量处理，减少字符串拼接次数
  const rows = [];
  for (let i = 0; i < currentPorts.length; i++) {
    const port = currentPorts[i];
    const statusClass = port.state.toUpperCase() === 'LISTEN' ? 'status-listen' :
                       port.state.toUpperCase() === 'ESTABLISHED' ? 'status-established' : 'status-other';

    const actionBtn = (port.pid !== '-' && port.pid !== '0') ?
      '<button onclick="killProcess(\'' + port.pid + '\', \'' + (port.processName || '').replace(/'/g, '') + '\')" class="btn" style="background: #f44336; padding: 4px 8px; font-size: 11px;">终止</button>' :
      '-';

    rows.push(
      '<tr>' +
      '<td><span class="protocol-tag">' + port.protocol + '</span></td>' +
      '<td>' + port.localAddress + '</td>' +
      '<td>' + (port.remoteAddress || '-') + '</td>' +
      '<td><span class="status ' + statusClass + '">' + port.state + '</span></td>' +
      '<td>' + port.pid + '</td>' +
      '<td>' + (port.processName || '-') + '</td>' +
      '<td>' + actionBtn + '</td>' +
      '</tr>'
    );
  }

  html += rows.join('');
  html += '</tbody></table>';

  // 分页控制
  const totalPages = Math.ceil(filteredPorts.length / itemsPerPage);
  if (totalPages > 1) {
    html += '<div class="pagination" style="text-align: center; margin-top: 15px;">';
    html += '<button onclick="changePage(-1)" ' + (currentPage === 0 ? 'disabled' : '') + ' class="btn" style="margin: 0 5px;">上一页</button>';
    html += '<span style="margin: 0 10px;">第 ' + (currentPage + 1) + ' 页 / 共 ' + totalPages + ' 页</span>';
    html += '<button onclick="changePage(1)" ' + (currentPage === totalPages - 1 ? 'disabled' : '') + ' class="btn" style="margin: 0 5px;">下一页</button>';
    html += '</div>';
  }

  html += '<div class="stats">显示 ' + (startIndex + 1) + '-' + endIndex + ' 条，共 ' + filteredPorts.length + ' 个活跃端口</div>';

  // 一次性更新 DOM
  portList.innerHTML = html;
}

function changePage(direction) {
  const totalPages = Math.ceil(filteredPorts.length / itemsPerPage);
  currentPage += direction;
  if (currentPage < 0) currentPage = 0;
  if (currentPage >= totalPages) currentPage = totalPages - 1;
  renderPortTable();
}

// 防抖函数，减少过滤频率
let filterTimeout;
function filterPorts() {
  clearTimeout(filterTimeout);
  filterTimeout = setTimeout(() => {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const protocolFilter = document.getElementById('protocolFilter').value;

    // 如果没有过滤条件，直接使用原数据
    if (!searchTerm && !protocolFilter) {
      filteredPorts = allPorts;
    } else {
      filteredPorts = allPorts.filter(port => {
        // 优化搜索逻辑，减少字符串操作
        let matchesSearch = true;
        if (searchTerm) {
          const searchFields = [
            port.localAddress,
            port.remoteAddress || '',
            port.processName || '',
            port.pid.toString(),
            port.state
          ].join(' ').toLowerCase();
          matchesSearch = searchFields.includes(searchTerm);
        }

        const matchesProtocol = !protocolFilter || port.protocol === protocolFilter;
        return matchesSearch && matchesProtocol;
      });
    }

    currentPage = 0; // 重置到第一页
    renderPortTable();
  }, 150); // 150ms 防抖延迟
}

async function killProcess(pid, processName) {
  if (confirm('确定要终止进程 ' + processName + ' (PID: ' + pid + ') 吗？')) {
    try {
      const result = await window.electronAPI.killProcess(pid);
      if (result.success) {
        alert('进程终止成功！');
        refreshPorts(); // 刷新端口列表
      } else {
        alert('进程终止失败: ' + result.error);
      }
    } catch (error) {
      console.error('终止进程时发生错误:', error);
      alert('终止进程时发生错误: ' + error.message);
    }
  }
}
