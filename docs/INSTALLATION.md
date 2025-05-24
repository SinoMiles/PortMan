# 安装指南 | Installation Guide

[English](#english) | [中文](#中文)

---

## 中文

### 📋 系统要求

#### 最低要求
- **操作系统**: Windows 10, macOS 10.14, Ubuntu 18.04 或更高版本
- **内存**: 512 MB RAM
- **存储空间**: 200 MB 可用磁盘空间
- **网络**: 无需网络连接（离线使用）

#### 推荐配置
- **操作系统**: Windows 11, macOS 12, Ubuntu 20.04 或更高版本
- **内存**: 1 GB RAM 或更多
- **存储空间**: 500 MB 可用磁盘空间
- **显示器**: 1280x720 或更高分辨率

### 🚀 安装方式

#### 方式一：下载预编译版本（推荐）

1. **访问发布页面**
   - 前往 [GitHub Releases](https://github.com/yourusername/portman/releases)
   - 选择最新版本

2. **下载对应平台的安装包**
   - **Windows**: `PortMan-Setup-x.x.x.exe` 或 `PortMan-x.x.x-win.zip`
   - **macOS**: `PortMan-x.x.x.dmg` 或 `PortMan-x.x.x-mac.zip`
   - **Linux**: `PortMan-x.x.x.AppImage` 或 `PortMan-x.x.x-linux.tar.gz`

3. **安装应用**
   - **Windows**: 双击 `.exe` 文件，按照安装向导操作
   - **macOS**: 打开 `.dmg` 文件，将应用拖拽到应用程序文件夹
   - **Linux**: 给 `.AppImage` 文件添加执行权限后直接运行

#### 方式二：从源码构建

##### 环境准备

1. **安装 Node.js**
   ```bash
   # 下载并安装 Node.js 16.0 或更高版本
   # 访问 https://nodejs.org/
   
   # 验证安装
   node --version
   npm --version
   ```

2. **安装 Git**
   ```bash
   # 下载并安装 Git
   # 访问 https://git-scm.com/
   
   # 验证安装
   git --version
   ```

##### 构建步骤

1. **克隆仓库**
   ```bash
   git clone https://github.com/yourusername/portman.git
   cd portman
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **开发模式运行**
   ```bash
   npm start
   ```

4. **构建生产版本**
   ```bash
   # 构建当前平台版本
   npm run build
   
   # 构建特定平台版本
   npm run build:win    # Windows
   npm run build:mac    # macOS
   npm run build:linux  # Linux
   ```

### 🔧 平台特定说明

#### Windows

**安装方式:**
- **安装包**: 运行 `.exe` 安装程序，会自动创建桌面快捷方式和开始菜单项
- **便携版**: 解压 `.zip` 文件到任意目录，直接运行 `PortMan.exe`

**权限要求:**
- 需要管理员权限来终止某些系统进程
- 首次运行可能需要允许防火墙访问

**兼容性:**
- 支持 Windows 10 1903 及更高版本
- 支持 Windows 11 所有版本

#### macOS

**安装方式:**
- 打开 `.dmg` 文件
- 将 PortMan 拖拽到应用程序文件夹
- 从启动台或应用程序文件夹启动

**权限要求:**
- 首次运行需要在"系统偏好设置 > 安全性与隐私"中允许运行
- 可能需要授予"完全磁盘访问权限"以获取完整的进程信息

**兼容性:**
- 支持 macOS 10.14 (Mojave) 及更高版本
- 原生支持 Apple Silicon (M1/M2) 和 Intel 处理器

#### Linux

**安装方式:**
- **AppImage**: 下载后添加执行权限直接运行
  ```bash
  chmod +x PortMan-x.x.x.AppImage
  ./PortMan-x.x.x.AppImage
  ```
- **tar.gz**: 解压到任意目录运行
  ```bash
  tar -xzf PortMan-x.x.x-linux.tar.gz
  cd PortMan-x.x.x-linux
  ./portman
  ```

**依赖要求:**
- 大多数现代 Linux 发行版无需额外依赖
- 某些最小化安装可能需要安装 `libgtk-3-0` 和 `libxss1`

**权限要求:**
- 需要 `sudo` 权限来终止某些系统进程
- 建议将用户添加到 `sudo` 组

### 🔍 验证安装

安装完成后，您可以通过以下方式验证：

1. **启动应用**
   - 应用应该能够正常启动并显示主界面

2. **检查功能**
   - 端口列表应该显示当前系统的活跃端口
   - 搜索功能应该能够正常工作
   - 协议过滤应该能够正确筛选

3. **测试权限**
   - 尝试终止一个测试进程（请谨慎操作）

### ❌ 卸载应用

#### Windows
- **安装版**: 通过"控制面板 > 程序和功能"卸载
- **便携版**: 直接删除应用文件夹

#### macOS
- 将应用从应用程序文件夹移动到废纸篓

#### Linux
- **AppImage**: 直接删除 `.AppImage` 文件
- **tar.gz**: 删除解压的文件夹

### 🐛 常见问题

#### 应用无法启动
- **Windows**: 检查是否安装了 Visual C++ Redistributable
- **macOS**: 检查安全设置，允许运行未知开发者的应用
- **Linux**: 检查是否有执行权限，安装必要的依赖

#### 权限不足
- 以管理员/root权限运行应用
- 检查系统安全设置

#### 端口信息不显示
- 检查系统是否安装了 `netstat` 命令
- 确认应用有足够的权限访问系统信息

### 📞 获取帮助

如果您在安装过程中遇到问题：

- 📖 查看 [常见问题](FAQ.md)
- 🐛 [报告问题](https://github.com/yourusername/portman/issues)
- 💬 [社区讨论](https://github.com/yourusername/portman/discussions)

---

## English

### 📋 System Requirements

#### Minimum Requirements
- **OS**: Windows 10, macOS 10.14, Ubuntu 18.04 or higher
- **Memory**: 512 MB RAM
- **Storage**: 200 MB available disk space
- **Network**: No internet connection required (offline usage)

#### Recommended Configuration
- **OS**: Windows 11, macOS 12, Ubuntu 20.04 or higher
- **Memory**: 1 GB RAM or more
- **Storage**: 500 MB available disk space
- **Display**: 1280x720 or higher resolution

### 🚀 Installation Methods

#### Method 1: Download Pre-built Binaries (Recommended)

1. **Visit Release Page**
   - Go to [GitHub Releases](https://github.com/yourusername/portman/releases)
   - Select the latest version

2. **Download Platform-specific Package**
   - **Windows**: `PortMan-Setup-x.x.x.exe` or `PortMan-x.x.x-win.zip`
   - **macOS**: `PortMan-x.x.x.dmg` or `PortMan-x.x.x-mac.zip`
   - **Linux**: `PortMan-x.x.x.AppImage` or `PortMan-x.x.x-linux.tar.gz`

3. **Install Application**
   - **Windows**: Double-click `.exe` file, follow installation wizard
   - **macOS**: Open `.dmg` file, drag app to Applications folder
   - **Linux**: Add execute permission to `.AppImage` file and run directly

#### Method 2: Build from Source

##### Environment Setup

1. **Install Node.js**
   ```bash
   # Download and install Node.js 16.0 or higher
   # Visit https://nodejs.org/
   
   # Verify installation
   node --version
   npm --version
   ```

2. **Install Git**
   ```bash
   # Download and install Git
   # Visit https://git-scm.com/
   
   # Verify installation
   git --version
   ```

##### Build Steps

1. **Clone Repository**
   ```bash
   git clone https://github.com/yourusername/portman.git
   cd portman
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run in Development Mode**
   ```bash
   npm start
   ```

4. **Build Production Version**
   ```bash
   # Build for current platform
   npm run build
   
   # Build for specific platforms
   npm run build:win    # Windows
   npm run build:mac    # macOS
   npm run build:linux  # Linux
   ```

### 🔧 Platform-specific Instructions

#### Windows

**Installation Methods:**
- **Installer**: Run `.exe` installer, automatically creates desktop shortcut and start menu item
- **Portable**: Extract `.zip` file to any directory, run `PortMan.exe` directly

**Permission Requirements:**
- Administrator privileges needed to terminate certain system processes
- First run may require firewall access permission

**Compatibility:**
- Supports Windows 10 1903 and higher
- Supports all Windows 11 versions

#### macOS

**Installation Method:**
- Open `.dmg` file
- Drag PortMan to Applications folder
- Launch from Launchpad or Applications folder

**Permission Requirements:**
- First run requires allowing in "System Preferences > Security & Privacy"
- May need "Full Disk Access" permission for complete process information

**Compatibility:**
- Supports macOS 10.14 (Mojave) and higher
- Native support for Apple Silicon (M1/M2) and Intel processors

#### Linux

**Installation Methods:**
- **AppImage**: Download, add execute permission, and run directly
  ```bash
  chmod +x PortMan-x.x.x.AppImage
  ./PortMan-x.x.x.AppImage
  ```
- **tar.gz**: Extract to any directory and run
  ```bash
  tar -xzf PortMan-x.x.x-linux.tar.gz
  cd PortMan-x.x.x-linux
  ./portman
  ```

**Dependency Requirements:**
- Most modern Linux distributions require no additional dependencies
- Some minimal installations may need `libgtk-3-0` and `libxss1`

**Permission Requirements:**
- `sudo` privileges needed to terminate certain system processes
- Recommend adding user to `sudo` group

### 🔍 Verify Installation

After installation, verify by:

1. **Launch Application**
   - Application should start normally and display main interface

2. **Check Functions**
   - Port list should display current system active ports
   - Search function should work properly
   - Protocol filter should correctly filter results

3. **Test Permissions**
   - Try terminating a test process (use caution)

### ❌ Uninstall Application

#### Windows
- **Installer version**: Uninstall via "Control Panel > Programs and Features"
- **Portable version**: Delete application folder directly

#### macOS
- Move application from Applications folder to Trash

#### Linux
- **AppImage**: Delete `.AppImage` file directly
- **tar.gz**: Delete extracted folder

### 🐛 Common Issues

#### Application Won't Start
- **Windows**: Check if Visual C++ Redistributable is installed
- **macOS**: Check security settings, allow apps from unknown developers
- **Linux**: Check execute permissions, install necessary dependencies

#### Insufficient Permissions
- Run application with administrator/root privileges
- Check system security settings

#### Port Information Not Displayed
- Check if `netstat` command is installed on system
- Ensure application has sufficient permissions to access system information

### 📞 Get Help

If you encounter issues during installation:

- 📖 Check [FAQ](FAQ.md)
- 🐛 [Report Issues](https://github.com/yourusername/portman/issues)
- 💬 [Community Discussion](https://github.com/yourusername/portman/discussions)

---

<div align="center">

**Thank you for choosing PortMan!**

</div>
