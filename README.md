# 🚀 PortMan - 跨平台端口管理工具 | Cross-Platform Port Management Tool

[![Build Status](https://github.com/portmanager/portman/workflows/Build%20and%20Release/badge.svg)](https://github.com/portmanager/portman/actions)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/Platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey.svg)]()

[English](#english) | [中文](#中文)

---

## 中文

### 📖 项目简介

PortMan 是一个现代化的跨平台桌面应用程序，用于监控和管理系统端口。它提供了美观的图形界面，让用户可以轻松查看端口占用情况、识别进程信息，并安全地终止不需要的进程。

### ✨ 主要功能

- 🖥️ **现代化界面**: 基于 Material-UI 的美观现代界面
- 🔍 **端口监控**: 实时查看所有活跃的 TCP/UDP 端口
- 📊 **系统信息**: 显示系统平台、主机名、运行时间和内存使用情况
- 🎯 **进程管理**: 查看占用端口的进程详情并安全终止
- 🌐 **多语言支持**: 支持中文和英文界面切换
- 🎨 **现代设计**: 渐变背景、毛玻璃效果、流畅动画
- 🖥️ **跨平台**: 支持 Windows、macOS 和 Linux
- 📦 **免安装**: 下载即用，无需复杂安装过程

### 🚀 快速开始

#### 下载使用

1. 前往 [Releases](https://github.com/portmanager/portman/releases) 页面
2. 下载适合您操作系统的版本：
   - Windows: `PortMan-Setup-x.x.x.exe`
   - macOS: `PortMan-x.x.x.dmg`
   - Linux: `PortMan-x.x.x.AppImage`
3. 双击运行即可使用

#### 开发环境

```bash
# 克隆项目
git clone https://github.com/portmanager/portman.git
cd portman

# 安装依赖
npm install

# 开发模式运行
npm run dev

# 构建应用
npm run build-electron
```

### 🎨 界面特色

- **渐变背景**: 紫蓝色渐变背景，视觉效果优雅
- **毛玻璃效果**: 半透明卡片设计，现代感十足
- **流畅动画**: 使用 Framer Motion 实现丰富的交互动画
- **响应式设计**: 适配不同屏幕尺寸
- **深色主题**: 护眼的深色界面设计
- **彩色标签**: 不同状态用不同颜色区分，一目了然

### 🛠️ 技术栈

- **Electron**: 跨平台桌面应用框架
- **React**: 现代化前端框架
- **Material-UI**: Google Material Design 组件库
- **Framer Motion**: 流畅动画库
- **Node.js**: 后端系统调用

### 📱 功能截图

应用包含以下主要界面：
- 系统信息仪表板
- 端口列表表格
- 进程终止确认对话框
- 多语言切换开关
- 实时数据刷新

### 🔧 系统要求

- **Windows**: Windows 10 或更高版本
- **macOS**: macOS 10.14 或更高版本
- **Linux**: 支持 AppImage 的现代 Linux 发行版

### 🤝 贡献

欢迎贡献代码！请遵循以下步骤：

1. Fork 本项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

### 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

---

## English

### 📖 Description

PortMan is a modern cross-platform desktop application for monitoring and managing system ports. It provides a beautiful graphical interface that allows users to easily view port usage, identify process information, and safely terminate unwanted processes.

### ✨ Features

- 🖥️ **Modern Interface**: Beautiful modern UI based on Material-UI
- 🔍 **Port Monitoring**: Real-time view of all active TCP/UDP ports
- 📊 **System Information**: Display system platform, hostname, uptime, and memory usage
- 🎯 **Process Management**: View process details occupying ports and terminate safely
- 🌐 **Multi-language**: Support for Chinese and English interface switching
- 🎨 **Modern Design**: Gradient backgrounds, glass morphism effects, smooth animations
- 🖥️ **Cross-Platform**: Support for Windows, macOS, and Linux
- 📦 **Portable**: Download and run, no complex installation required

### 🚀 Quick Start

#### Download and Use

1. Go to [Releases](https://github.com/portmanager/portman/releases) page
2. Download the version for your operating system:
   - Windows: `PortMan-Setup-x.x.x.exe`
   - macOS: `PortMan-x.x.x.dmg`
   - Linux: `PortMan-x.x.x.AppImage`
3. Double-click to run

#### Development

```bash
# Clone the project
git clone https://github.com/portmanager/portman.git
cd portman

# Install dependencies
npm install

# Run in development mode
npm run dev

# Build application
npm run build-electron
```

### 🎨 Interface Features

- **Gradient Background**: Purple-blue gradient background with elegant visual effects
- **Glass Morphism**: Semi-transparent card design with modern feel
- **Smooth Animations**: Rich interactive animations using Framer Motion
- **Responsive Design**: Adapts to different screen sizes
- **Dark Theme**: Eye-friendly dark interface design
- **Colored Labels**: Different colors for different states, clear at a glance

### 🛠️ Tech Stack

- **Electron**: Cross-platform desktop application framework
- **React**: Modern frontend framework
- **Material-UI**: Google Material Design component library
- **Framer Motion**: Smooth animation library
- **Node.js**: Backend system calls

### 📱 Screenshots

The application includes the following main interfaces:
- System information dashboard
- Port list table
- Process termination confirmation dialog
- Multi-language toggle switch
- Real-time data refresh

### 🔧 System Requirements

- **Windows**: Windows 10 or higher
- **macOS**: macOS 10.14 or higher
- **Linux**: Modern Linux distributions supporting AppImage

### 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Create a Pull Request

### 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made with ❤️ by the PortMan team
