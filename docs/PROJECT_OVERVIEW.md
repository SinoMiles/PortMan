# 项目概览 | Project Overview

<div align="center">

![PortMan Cover](images/portman-cover.png)

</div>

[English](#english) | [中文](#中文)

---

## 中文

### 🎯 项目愿景

PortMan 致力于成为最好用的跨平台端口管理工具，为开发者和系统管理员提供直观、高效的端口监控和管理体验。

### 📊 项目现状

#### ✅ 已完成功能

- **核心功能**
  - ✅ 跨平台端口监控（Windows/macOS/Linux）
  - ✅ 实时进程信息显示
  - ✅ 智能搜索和过滤
  - ✅ 一键进程终止
  - ✅ 无限滚动数据加载

- **用户界面**
  - ✅ 现代化渐变设计
  - ✅ 响应式布局
  - ✅ 自定义标题栏
  - ✅ 流畅动画效果
  - ✅ 整行悬停交互

- **性能优化**
  - ✅ 防抖搜索
  - ✅ 虚拟滚动
  - ✅ 硬件加速
  - ✅ 内存优化

- **开发体验**
  - ✅ 完整的开源文档
  - ✅ 中英文双语支持
  - ✅ CI/CD 自动构建
  - ✅ 多平台发布

#### 🚧 开发中功能

- **自动刷新**: 定时自动更新端口信息
- **主题切换**: 深色/浅色主题支持
- **系统托盘**: 最小化到系统托盘
- **导出功能**: 支持 CSV/JSON 格式导出

#### 📋 计划功能

- **端口历史**: 记录端口使用历史
- **性能监控**: CPU 和内存使用情况
- **网络流量**: 实时网络流量监控
- **告警系统**: 异常端口使用告警
- **插件系统**: 支持第三方插件扩展

### 🏗️ 技术架构

#### 核心技术栈

```
Frontend (渲染进程)
├── HTML5 - 结构层
├── CSS3 - 样式层（渐变、动画、响应式）
└── JavaScript - 逻辑层（ES6+、异步处理）

Backend (主进程)
├── Electron - 跨平台框架
├── Node.js - 运行时环境
└── Child Process - 系统命令调用

Build & Deploy
├── electron-builder - 应用打包
├── GitHub Actions - CI/CD
└── Multi-platform - 自动构建发布
```

#### 系统集成

```
Windows
├── netstat -ano - 端口信息
├── tasklist - 进程信息
└── taskkill - 进程终止

macOS
├── netstat -anv - 端口信息
├── ps - 进程信息
└── kill - 进程终止

Linux
├── netstat -tulpn - 端口信息
├── ps - 进程信息
└── kill - 进程终止
```

### 📁 项目结构

```
portman/
├── 📁 src/                    # 源代码
│   ├── 📄 main.js            # Electron 主进程
│   ├── 📄 preload.js         # 预加载脚本
│   ├── 📄 renderer.js        # 渲染进程逻辑
│   ├── 📄 index.html         # 主界面
│   └── 📄 styles.css         # 样式文件
├── 📁 docs/                  # 文档目录
│   ├── 📄 INSTALLATION.md    # 安装指南
│   ├── 📄 FAQ.md            # 常见问题
│   └── 📄 PROJECT_OVERVIEW.md # 项目概览
├── 📁 .github/               # GitHub 配置
│   └── 📁 workflows/         # CI/CD 工作流
├── 📄 package.json           # 项目配置
├── 📄 README.md             # 中文说明
├── 📄 README_EN.md          # 英文说明
├── 📄 CONTRIBUTING.md       # 贡献指南
├── 📄 CHANGELOG.md          # 更新日志
└── 📄 LICENSE               # 开源许可
```

### 🎨 设计理念

#### 用户体验优先
- **直观操作**: 无需学习成本，开箱即用
- **视觉美观**: 现代化设计，赏心悦目
- **性能流畅**: 优化渲染，响应迅速
- **跨平台一致**: 统一的用户体验

#### 开发者友好
- **开源透明**: 所有代码公开可审查
- **文档完善**: 详细的开发和使用文档
- **社区驱动**: 欢迎贡献和反馈
- **持续改进**: 定期更新和优化

### 🌟 核心优势

#### 相比同类工具

| 特性 | PortMan | 系统自带工具 | 其他第三方工具 |
|------|---------|-------------|---------------|
| 跨平台 | ✅ | ❌ | 部分支持 |
| 现代界面 | ✅ | ❌ | 部分支持 |
| 实时搜索 | ✅ | ❌ | 部分支持 |
| 进程管理 | ✅ | 部分支持 | ✅ |
| 开源免费 | ✅ | ✅ | 部分免费 |
| 无需安装 | ✅ | ✅ | ❌ |

#### 技术优势
- **Electron 框架**: 成熟稳定的跨平台解决方案
- **原生性能**: 直接调用系统命令，性能优异
- **模块化设计**: 易于维护和扩展
- **现代化技术**: 使用最新的 Web 技术标准

### 🚀 发展路线图

#### 短期目标 (1-3 个月)
- [ ] 完善自动刷新功能
- [ ] 添加主题切换支持
- [ ] 实现系统托盘功能
- [ ] 优化内存使用

#### 中期目标 (3-6 个月)
- [ ] 添加端口历史记录
- [ ] 实现数据导出功能
- [ ] 增加性能监控
- [ ] 支持多语言界面

#### 长期目标 (6-12 个月)
- [ ] 开发插件系统
- [ ] 添加网络流量监控
- [ ] 实现告警系统
- [ ] 移动端支持

### 🤝 社区参与

#### 贡献方式
- **代码贡献**: 提交 Pull Request
- **问题反馈**: 报告 Bug 和建议
- **文档改进**: 完善项目文档
- **推广宣传**: 分享给更多用户

#### 社区资源
- **GitHub**: [项目主页](https://github.com/yourusername/portman)
- **Issues**: [问题追踪](https://github.com/yourusername/portman/issues)
- **Discussions**: [社区讨论](https://github.com/yourusername/portman/discussions)
- **Wiki**: [项目百科](https://github.com/yourusername/portman/wiki)

---

## English

### 🎯 Project Vision

PortMan aims to become the best cross-platform port management tool, providing developers and system administrators with an intuitive and efficient port monitoring and management experience.

### 📊 Project Status

#### ✅ Completed Features

- **Core Functions**
  - ✅ Cross-platform port monitoring (Windows/macOS/Linux)
  - ✅ Real-time process information display
  - ✅ Smart search and filtering
  - ✅ One-click process termination
  - ✅ Infinite scroll data loading

- **User Interface**
  - ✅ Modern gradient design
  - ✅ Responsive layout
  - ✅ Custom title bar
  - ✅ Smooth animations
  - ✅ Full-row hover interaction

- **Performance Optimization**
  - ✅ Debounced search
  - ✅ Virtual scrolling
  - ✅ Hardware acceleration
  - ✅ Memory optimization

- **Development Experience**
  - ✅ Complete open source documentation
  - ✅ Bilingual support (Chinese/English)
  - ✅ CI/CD automated builds
  - ✅ Multi-platform releases

#### 🚧 In Development

- **Auto Refresh**: Scheduled automatic port information updates
- **Theme Switching**: Dark/light theme support
- **System Tray**: Minimize to system tray
- **Export Function**: CSV/JSON format export support

#### 📋 Planned Features

- **Port History**: Record port usage history
- **Performance Monitoring**: CPU and memory usage
- **Network Traffic**: Real-time network traffic monitoring
- **Alert System**: Abnormal port usage alerts
- **Plugin System**: Third-party plugin extension support

### 🏗️ Technical Architecture

#### Core Tech Stack

```
Frontend (Renderer Process)
├── HTML5 - Structure layer
├── CSS3 - Style layer (gradients, animations, responsive)
└── JavaScript - Logic layer (ES6+, async processing)

Backend (Main Process)
├── Electron - Cross-platform framework
├── Node.js - Runtime environment
└── Child Process - System command calls

Build & Deploy
├── electron-builder - Application packaging
├── GitHub Actions - CI/CD
└── Multi-platform - Automated build and release
```

#### System Integration

```
Windows
├── netstat -ano - Port information
├── tasklist - Process information
└── taskkill - Process termination

macOS
├── netstat -anv - Port information
├── ps - Process information
└── kill - Process termination

Linux
├── netstat -tulpn - Port information
├── ps - Process information
└── kill - Process termination
```

### 📁 Project Structure

```
portman/
├── 📁 src/                    # Source code
│   ├── 📄 main.js            # Electron main process
│   ├── 📄 preload.js         # Preload script
│   ├── 📄 renderer.js        # Renderer process logic
│   ├── 📄 index.html         # Main interface
│   └── 📄 styles.css         # Style files
├── 📁 docs/                  # Documentation
│   ├── 📄 INSTALLATION.md    # Installation guide
│   ├── 📄 FAQ.md            # FAQ
│   └── 📄 PROJECT_OVERVIEW.md # Project overview
├── 📁 .github/               # GitHub configuration
│   └── 📁 workflows/         # CI/CD workflows
├── 📄 package.json           # Project configuration
├── 📄 README.md             # Chinese documentation
├── 📄 README_EN.md          # English documentation
├── 📄 CONTRIBUTING.md       # Contribution guide
├── 📄 CHANGELOG.md          # Changelog
└── 📄 LICENSE               # Open source license
```

### 🎨 Design Philosophy

#### User Experience First
- **Intuitive Operation**: No learning curve, ready to use
- **Visual Appeal**: Modern design, pleasing to the eye
- **Smooth Performance**: Optimized rendering, quick response
- **Cross-platform Consistency**: Unified user experience

#### Developer Friendly
- **Open Source Transparency**: All code publicly auditable
- **Complete Documentation**: Detailed development and usage docs
- **Community Driven**: Welcome contributions and feedback
- **Continuous Improvement**: Regular updates and optimizations

### 🌟 Core Advantages

#### Compared to Similar Tools

| Feature | PortMan | System Built-in | Other Third-party |
|---------|---------|----------------|------------------|
| Cross-platform | ✅ | ❌ | Partial |
| Modern UI | ✅ | ❌ | Partial |
| Real-time Search | ✅ | ❌ | Partial |
| Process Management | ✅ | Partial | ✅ |
| Open Source Free | ✅ | ✅ | Partial |
| No Installation | ✅ | ✅ | ❌ |

#### Technical Advantages
- **Electron Framework**: Mature and stable cross-platform solution
- **Native Performance**: Direct system command calls, excellent performance
- **Modular Design**: Easy to maintain and extend
- **Modern Technology**: Uses latest web technology standards

### 🚀 Development Roadmap

#### Short-term Goals (1-3 months)
- [ ] Complete auto-refresh functionality
- [ ] Add theme switching support
- [ ] Implement system tray feature
- [ ] Optimize memory usage

#### Medium-term Goals (3-6 months)
- [ ] Add port history records
- [ ] Implement data export functionality
- [ ] Add performance monitoring
- [ ] Support multi-language interface

#### Long-term Goals (6-12 months)
- [ ] Develop plugin system
- [ ] Add network traffic monitoring
- [ ] Implement alert system
- [ ] Mobile platform support

### 🤝 Community Participation

#### Ways to Contribute
- **Code Contribution**: Submit Pull Requests
- **Issue Feedback**: Report bugs and suggestions
- **Documentation Improvement**: Enhance project documentation
- **Promotion**: Share with more users

#### Community Resources
- **GitHub**: [Project Homepage](https://github.com/yourusername/portman)
- **Issues**: [Issue Tracking](https://github.com/yourusername/portman/issues)
- **Discussions**: [Community Discussion](https://github.com/yourusername/portman/discussions)
- **Wiki**: [Project Wiki](https://github.com/yourusername/portman/wiki)

---

<div align="center">

**Join us in building the best port management tool! 🚀**

[⭐ Star on GitHub](https://github.com/yourusername/portman) | [🐛 Report Issues](https://github.com/yourusername/portman/issues) | [💬 Join Discussion](https://github.com/yourusername/portman/discussions)

</div>
