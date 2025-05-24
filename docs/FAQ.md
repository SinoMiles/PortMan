# 常见问题 | Frequently Asked Questions

[English](#english) | [中文](#中文)

---

## 中文

### 🚀 安装和启动

#### Q: 应用无法启动，显示"应用程序无法正常启动"
**A:** 这通常是由于缺少必要的运行时库导致的。

**解决方案:**
- **Windows**: 安装 [Microsoft Visual C++ Redistributable](https://docs.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist)
- **macOS**: 确保系统版本为 10.14 或更高
- **Linux**: 安装必要的依赖包
  ```bash
  sudo apt-get install libgtk-3-0 libxss1 libnss3
  ```

#### Q: macOS 提示"无法打开应用，因为它来自身份不明的开发者"
**A:** 这是 macOS 的安全机制。

**解决方案:**
1. 右键点击应用，选择"打开"
2. 或者在"系统偏好设置 > 安全性与隐私"中点击"仍要打开"
3. 或者使用命令行移除隔离属性：
   ```bash
   xattr -cr /Applications/PortMan.app
   ```

#### Q: Linux 下 AppImage 文件无法执行
**A:** 需要添加执行权限。

**解决方案:**
```bash
chmod +x PortMan-x.x.x.AppImage
./PortMan-x.x.x.AppImage
```

### 🔍 功能使用

#### Q: 端口列表为空或显示"未找到端口信息"
**A:** 这可能是权限问题或系统命令不可用。

**解决方案:**
1. **以管理员权限运行应用**
   - Windows: 右键选择"以管理员身份运行"
   - macOS/Linux: 使用 `sudo` 运行
2. **检查系统命令**
   - 确保系统安装了 `netstat` 命令
   - Windows 用户检查是否启用了网络工具

#### Q: 进程名显示为"-"或空白
**A:** 这通常是权限不足或系统限制导致的。

**解决方案:**
1. **提升权限**: 以管理员/root权限运行应用
2. **Windows 特定**: 确保 Windows Management Instrumentation 服务正在运行
3. **macOS 特定**: 在"系统偏好设置 > 安全性与隐私 > 隐私 > 完全磁盘访问权限"中添加 PortMan

#### Q: 无法终止进程，提示"权限不足"
**A:** 终止进程需要足够的系统权限。

**解决方案:**
1. **以管理员权限运行应用**
2. **检查进程类型**: 某些系统关键进程无法被终止
3. **使用系统工具**: 对于顽固进程，可能需要使用系统自带的任务管理器

#### Q: 搜索功能不工作或搜索结果不准确
**A:** 检查搜索条件和数据加载状态。

**解决方案:**
1. **等待数据加载完成**: 确保端口列表已完全加载
2. **检查搜索关键词**: 确保关键词拼写正确
3. **清空搜索框**: 重新输入搜索条件
4. **刷新数据**: 点击刷新按钮重新加载端口信息

### ⚡ 性能问题

#### Q: 应用启动很慢
**A:** 这可能是由于系统端口数量过多或系统性能限制。

**解决方案:**
1. **关闭不必要的网络服务**: 减少活跃端口数量
2. **增加系统内存**: 确保有足够的可用内存
3. **检查防病毒软件**: 某些防病毒软件可能影响启动速度

#### Q: 滚动时出现卡顿
**A:** 这通常是由于数据量过大或渲染性能问题。

**解决方案:**
1. **使用搜索过滤**: 减少显示的端口数量
2. **关闭其他应用**: 释放系统资源
3. **更新显卡驱动**: 确保硬件加速正常工作

#### Q: 内存使用过高
**A:** 长时间运行可能导致内存累积。

**解决方案:**
1. **重启应用**: 定期重启应用释放内存
2. **减少刷新频率**: 避免频繁刷新端口信息
3. **关闭不必要的功能**: 如果不需要实时监控，可以手动刷新

### 🔧 技术问题

#### Q: 如何查看应用日志？
**A:** 应用日志可以帮助诊断问题。

**查看方法:**
- **Windows**: 按 `F12` 打开开发者工具，查看 Console 标签
- **macOS/Linux**: 从终端启动应用查看输出
- **所有平台**: 检查应用数据目录中的日志文件

#### Q: 如何报告 Bug？
**A:** 我们欢迎 Bug 报告来改进应用。

**报告步骤:**
1. 访问 [GitHub Issues](https://github.com/yourusername/portman/issues)
2. 点击"New Issue"
3. 选择"Bug Report"模板
4. 详细描述问题和复现步骤
5. 附上系统信息和错误截图

#### Q: 如何请求新功能？
**A:** 我们重视用户的功能建议。

**请求步骤:**
1. 访问 [GitHub Issues](https://github.com/yourusername/portman/issues)
2. 点击"New Issue"
3. 选择"Feature Request"模板
4. 详细描述功能需求和使用场景

### 🔒 安全问题

#### Q: 应用是否安全？会不会泄露隐私？
**A:** PortMan 是开源软件，注重用户隐私和安全。

**安全保证:**
- **开源透明**: 所有代码公开可审查
- **本地运行**: 不收集或上传任何用户数据
- **最小权限**: 仅请求必要的系统权限
- **无网络通信**: 应用完全离线运行

#### Q: 为什么需要管理员权限？
**A:** 管理员权限用于访问系统端口信息和管理进程。

**权限用途:**
- **读取端口信息**: 访问系统网络状态
- **获取进程信息**: 查看进程详细信息
- **终止进程**: 结束占用端口的进程
- **系统调用**: 执行 netstat 等系统命令

#### Q: 防病毒软件报告威胁怎么办？
**A:** 这可能是误报，因为应用需要访问系统信息。

**解决方案:**
1. **添加白名单**: 将 PortMan 添加到防病毒软件白名单
2. **检查数字签名**: 确保下载的是官方版本
3. **从源码构建**: 如果担心安全，可以自行编译

### 🌐 兼容性

#### Q: 支持哪些操作系统版本？
**A:** PortMan 支持主流操作系统的现代版本。

**支持列表:**
- **Windows**: Windows 10 1903+ / Windows 11
- **macOS**: macOS 10.14 (Mojave)+
- **Linux**: Ubuntu 18.04+, CentOS 8+, Fedora 30+

#### Q: 是否支持 ARM 架构？
**A:** 是的，我们提供 ARM 架构支持。

**支持情况:**
- **Apple Silicon (M1/M2)**: 原生支持
- **ARM64 Linux**: 提供专门构建版本
- **Windows ARM**: 计划中的功能

#### Q: 旧版本系统如何使用？
**A:** 对于不支持的旧系统，建议升级或使用替代方案。

**建议:**
- **升级系统**: 升级到支持的版本
- **虚拟机**: 在虚拟机中运行新系统
- **命令行工具**: 使用系统自带的 netstat 命令

---

## English

### 🚀 Installation and Startup

#### Q: Application won't start, shows "Application failed to start properly"
**A:** This is usually caused by missing runtime libraries.

**Solutions:**
- **Windows**: Install [Microsoft Visual C++ Redistributable](https://docs.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist)
- **macOS**: Ensure system version is 10.14 or higher
- **Linux**: Install necessary dependencies
  ```bash
  sudo apt-get install libgtk-3-0 libxss1 libnss3
  ```

#### Q: macOS shows "Cannot open app because it's from an unidentified developer"
**A:** This is macOS security mechanism.

**Solutions:**
1. Right-click the app and select "Open"
2. Or click "Open Anyway" in "System Preferences > Security & Privacy"
3. Or use command line to remove quarantine attribute:
   ```bash
   xattr -cr /Applications/PortMan.app
   ```

#### Q: AppImage file won't execute on Linux
**A:** Need to add execute permission.

**Solution:**
```bash
chmod +x PortMan-x.x.x.AppImage
./PortMan-x.x.x.AppImage
```

### 🔍 Feature Usage

#### Q: Port list is empty or shows "No port information found"
**A:** This might be a permission issue or system command unavailable.

**Solutions:**
1. **Run with administrator privileges**
   - Windows: Right-click and select "Run as administrator"
   - macOS/Linux: Use `sudo` to run
2. **Check system commands**
   - Ensure `netstat` command is installed
   - Windows users check if network tools are enabled

#### Q: Process names show as "-" or blank
**A:** This is usually caused by insufficient permissions or system restrictions.

**Solutions:**
1. **Elevate privileges**: Run app with administrator/root privileges
2. **Windows specific**: Ensure Windows Management Instrumentation service is running
3. **macOS specific**: Add PortMan to "System Preferences > Security & Privacy > Privacy > Full Disk Access"

#### Q: Cannot terminate process, shows "Insufficient permissions"
**A:** Process termination requires sufficient system privileges.

**Solutions:**
1. **Run with administrator privileges**
2. **Check process type**: Some critical system processes cannot be terminated
3. **Use system tools**: For stubborn processes, may need to use system task manager

#### Q: Search function doesn't work or results are inaccurate
**A:** Check search conditions and data loading status.

**Solutions:**
1. **Wait for data loading**: Ensure port list is fully loaded
2. **Check search keywords**: Ensure keywords are spelled correctly
3. **Clear search box**: Re-enter search criteria
4. **Refresh data**: Click refresh button to reload port information

### ⚡ Performance Issues

#### Q: Application starts slowly
**A:** This might be due to too many system ports or system performance limitations.

**Solutions:**
1. **Close unnecessary network services**: Reduce active port count
2. **Increase system memory**: Ensure sufficient available memory
3. **Check antivirus software**: Some antivirus may affect startup speed

#### Q: Scrolling is laggy
**A:** This is usually due to large data volume or rendering performance issues.

**Solutions:**
1. **Use search filters**: Reduce displayed port count
2. **Close other applications**: Free up system resources
3. **Update graphics drivers**: Ensure hardware acceleration works properly

#### Q: High memory usage
**A:** Long-term running may cause memory accumulation.

**Solutions:**
1. **Restart application**: Periodically restart to free memory
2. **Reduce refresh frequency**: Avoid frequent port information refresh
3. **Close unnecessary features**: If real-time monitoring isn't needed, refresh manually

### 🔧 Technical Issues

#### Q: How to view application logs?
**A:** Application logs can help diagnose issues.

**Viewing methods:**
- **Windows**: Press `F12` to open developer tools, check Console tab
- **macOS/Linux**: Launch app from terminal to see output
- **All platforms**: Check log files in application data directory

#### Q: How to report bugs?
**A:** We welcome bug reports to improve the application.

**Reporting steps:**
1. Visit [GitHub Issues](https://github.com/yourusername/portman/issues)
2. Click "New Issue"
3. Select "Bug Report" template
4. Describe the issue and reproduction steps in detail
5. Attach system information and error screenshots

#### Q: How to request new features?
**A:** We value user feature suggestions.

**Request steps:**
1. Visit [GitHub Issues](https://github.com/yourusername/portman/issues)
2. Click "New Issue"
3. Select "Feature Request" template
4. Describe feature requirements and use cases in detail

### 🔒 Security Issues

#### Q: Is the application safe? Will it leak privacy?
**A:** PortMan is open-source software that values user privacy and security.

**Security guarantees:**
- **Open source transparency**: All code is publicly auditable
- **Local operation**: No collection or upload of user data
- **Minimal permissions**: Only requests necessary system permissions
- **No network communication**: Application runs completely offline

#### Q: Why does it need administrator privileges?
**A:** Administrator privileges are used to access system port information and manage processes.

**Permission usage:**
- **Read port information**: Access system network status
- **Get process information**: View detailed process information
- **Terminate processes**: End processes occupying ports
- **System calls**: Execute system commands like netstat

#### Q: What if antivirus reports threats?
**A:** This might be a false positive because the app needs to access system information.

**Solutions:**
1. **Add to whitelist**: Add PortMan to antivirus whitelist
2. **Check digital signature**: Ensure downloaded version is official
3. **Build from source**: If security is a concern, compile yourself

### 🌐 Compatibility

#### Q: Which operating system versions are supported?
**A:** PortMan supports modern versions of mainstream operating systems.

**Support list:**
- **Windows**: Windows 10 1903+ / Windows 11
- **macOS**: macOS 10.14 (Mojave)+
- **Linux**: Ubuntu 18.04+, CentOS 8+, Fedora 30+

#### Q: Is ARM architecture supported?
**A:** Yes, we provide ARM architecture support.

**Support status:**
- **Apple Silicon (M1/M2)**: Native support
- **ARM64 Linux**: Dedicated build versions provided
- **Windows ARM**: Planned feature

#### Q: How to use on older system versions?
**A:** For unsupported older systems, recommend upgrading or using alternatives.

**Recommendations:**
- **Upgrade system**: Upgrade to supported version
- **Virtual machine**: Run new system in virtual machine
- **Command line tools**: Use system built-in netstat command

---

<div align="center">

**Still have questions? [Contact us](https://github.com/yourusername/portman/discussions)!**

</div>
