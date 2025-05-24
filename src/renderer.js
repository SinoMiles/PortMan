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
let displayedPorts = []; // 当前显示的端口
let currentIndex = 0; // 当前加载到的索引
const itemsPerLoad = 25; // 每次加载的数量
let isLoading = false; // 防止重复加载

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
    displayedPorts = []; // 重置显示的端口
    currentIndex = 0; // 重置索引
    console.log('已设置全局变量，端口数量:', ports.length);

    if (ports.length === 0) {
      portList.innerHTML = '<div class="empty">未找到活跃端口</div>';
      console.log('端口数量为0，显示空状态');
      return;
    }

    console.log('开始初始化无限滚动表格...');
    initializeInfiniteScroll();
    console.log('无限滚动表格初始化完成');

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

// 初始化无限滚动
function initializeInfiniteScroll() {
  const portList = document.getElementById('portList');

  // 检查是否已经有表格结构，避免重复创建
  let portTable = document.getElementById('portTable');
  if (!portTable) {
    // 创建表格结构
    let html = '<table class="table" id="portTable"><thead>';
    html += '<tr><th>协议</th><th>本地地址</th><th>远程地址</th><th>状态</th><th>PID</th><th>进程名</th><th>操作</th></tr>';
    html += '</thead><tbody id="portTableBody">';
    html += '</tbody></table>';
    html += '<div id="loadingIndicator" class="loading-indicator" style="display: none;">正在加载更多...</div>';
    html += '<div class="stats" id="statsInfo">正在加载端口信息...</div>';

    portList.innerHTML = html;

    // 添加滚动监听器（只添加一次）
    const tableContainer = document.querySelector('.table-container');
    if (tableContainer) {
      // 移除之前的监听器，避免重复绑定
      tableContainer.removeEventListener('scroll', handleScroll);
      tableContainer.addEventListener('scroll', handleScroll);
    }
  } else {
    // 如果表格已存在，只清空tbody
    const tbody = document.getElementById('portTableBody');
    if (tbody) {
      tbody.innerHTML = '';
    }
  }

  // 加载初始数据
  loadMorePorts();
}

// 加载更多端口数据
function loadMorePorts() {
  if (isLoading || currentIndex >= filteredPorts.length) {
    return;
  }

  isLoading = true;
  const loadingIndicator = document.getElementById('loadingIndicator');

  // 只在有更多数据时显示加载指示器
  if (loadingIndicator && currentIndex < filteredPorts.length) {
    loadingIndicator.style.display = 'block';
    loadingIndicator.style.opacity = '1';
  }

  // 减少延迟，使加载更流畅
  setTimeout(() => {
    const endIndex = Math.min(currentIndex + itemsPerLoad, filteredPorts.length);
    const newPorts = filteredPorts.slice(currentIndex, endIndex);

    if (newPorts.length > 0) {
      // 添加新端口到显示列表
      displayedPorts = displayedPorts.concat(newPorts);
      currentIndex = endIndex;

      // 渲染新的行
      renderNewRows(newPorts);

      // 更新统计信息
      updateStats();
    }

    // 平滑隐藏加载指示器
    if (loadingIndicator) {
      loadingIndicator.style.opacity = '0';
      setTimeout(() => {
        loadingIndicator.style.display = 'none';
      }, 150);
    }

    isLoading = false;
    console.log('加载了', newPorts.length, '个端口，当前总数:', displayedPorts.length);
  }, 100); // 减少延迟到100ms
}

// 渲染新的表格行
function renderNewRows(ports) {
  const tbody = document.getElementById('portTableBody');
  if (!tbody) return;

  // 创建文档片段，减少DOM操作
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < ports.length; i++) {
    const port = ports[i];
    const statusClass = port.state.toUpperCase() === 'LISTEN' ? 'status-listen' :
                       port.state.toUpperCase() === 'ESTABLISHED' ? 'status-established' : 'status-other';

    const actionBtn = (port.pid !== '-' && port.pid !== '0') ?
      '<button onclick="killProcess(\'' + port.pid + '\', \'' + (port.processName || '').replace(/'/g, '') + '\')" class="btn btn-danger btn-sm">终止</button>' :
      '<span style="color: #bdc3c7; font-style: italic;">-</span>';

    // 创建行元素
    const tr = document.createElement('tr');
    tr.className = 'port-row';
    tr.style.opacity = '0';
    tr.style.animation = 'fadeInRow 0.2s ease forwards';
    tr.style.animationDelay = (i * 20) + 'ms'; // 减少动画延迟

    tr.innerHTML =
      '<td><span class="protocol-tag">' + port.protocol + '</span></td>' +
      '<td>' + port.localAddress + '</td>' +
      '<td>' + (port.remoteAddress || '-') + '</td>' +
      '<td><span class="status ' + statusClass + '">' + port.state + '</span></td>' +
      '<td>' + port.pid + '</td>' +
      '<td>' + (port.processName || '-') + '</td>' +
      '<td>' + actionBtn + '</td>';

    fragment.appendChild(tr);
  }

  // 一次性添加所有行，减少重排
  tbody.appendChild(fragment);
}

// 更新统计信息
function updateStats() {
  const statsInfo = document.getElementById('statsInfo');
  if (statsInfo) {
    const remaining = filteredPorts.length - currentIndex;
    let text = '已显示 ' + displayedPorts.length + ' 条，共 ' + filteredPorts.length + ' 个活跃端口';
    if (remaining > 0) {
      text += ' (还有 ' + remaining + ' 条)';
    }
    statsInfo.textContent = text;
  }
}

// 处理滚动事件
let scrollTimeout;
function handleScroll() {
  // 防抖处理，减少频繁触发
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    const tableContainer = document.querySelector('.table-container');
    if (!tableContainer) return;

    const scrollTop = tableContainer.scrollTop;
    const scrollHeight = tableContainer.scrollHeight;
    const clientHeight = tableContainer.clientHeight;

    // 当滚动到底部附近时加载更多数据，增加触发距离
    if (scrollTop + clientHeight >= scrollHeight - 150 && !isLoading) {
      loadMorePorts();
    }
  }, 50); // 50ms 防抖延迟
}

// 缓存上次的过滤条件，避免重复计算
let lastSearchTerm = '';
let lastProtocolFilter = '';

// 防抖函数，减少过滤频率
let filterTimeout;
function filterPorts() {
  clearTimeout(filterTimeout);
  filterTimeout = setTimeout(() => {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const protocolFilter = document.getElementById('protocolFilter').value;

    // 如果过滤条件没有变化，直接返回
    if (searchTerm === lastSearchTerm && protocolFilter === lastProtocolFilter) {
      return;
    }

    // 更新缓存的过滤条件
    lastSearchTerm = searchTerm;
    lastProtocolFilter = protocolFilter;

    console.log('执行过滤，搜索词:', searchTerm, '协议:', protocolFilter);

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

    // 重置无限滚动状态
    displayedPorts = [];
    currentIndex = 0;
    isLoading = false;

    // 重新初始化无限滚动
    if (filteredPorts.length > 0) {
      initializeInfiniteScroll();
    } else {
      const portList = document.getElementById('portList');
      if (portList) {
        portList.innerHTML = '<div class="empty">未找到匹配的端口</div>';
      }
    }
  }, 50); // 进一步减少防抖延迟到50ms
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
