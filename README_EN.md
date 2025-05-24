# 🚀 PortMan - Cross-Platform Port Management Tool

<div align="center">

![PortMan Logo](https://img.shields.io/badge/PortMan-Port%20Manager-blue?style=for-the-badge)

[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey.svg)](https://github.com/yourusername/portman)
[![Electron](https://img.shields.io/badge/Electron-Latest-47848f.svg)](https://electronjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-16%2B-green.svg)](https://nodejs.org/)

**A modern cross-platform port management tool with intuitive GUI for viewing and managing system port usage**

[简体中文](README.md) | English

</div>

## ✨ Features

- 🖥️ **Cross-Platform Support** - Compatible with Windows, macOS, and Linux
- 🎨 **Modern Interface** - Beautiful UI based on Electron
- ⚡ **Real-time Monitoring** - Live display of active ports and process information
- 🔍 **Smart Search** - Multi-dimensional search for ports, process names, PIDs, etc.
- 📊 **Protocol Filtering** - TCP/UDP protocol categorized display
- 🔄 **Infinite Scroll** - Smooth data loading experience
- 🎯 **Process Management** - One-click termination of processes occupying ports
- 🎪 **Zero Configuration** - Ready to use out of the box

## 📸 Screenshots

### Main Interface
![Main Interface](docs/images/main-interface.png)

### Search and Filter
![Search Filter](docs/images/search-filter.png)

## 🚀 Quick Start

### Requirements

- Node.js 16.0 or higher
- npm or yarn package manager

### Installation Steps

1. **Clone Repository**
   ```bash
   git clone https://github.com/yourusername/portman.git
   cd portman
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Application**
   ```bash
   npm start
   ```

### Build Release Version

```bash
# Build for current platform
npm run build

# Build for Windows
npm run build:win

# Build for macOS
npm run build:mac

# Build for Linux
npm run build:linux
```

## 📖 User Guide

### Basic Functions

1. **View Port Information**
   - Automatically displays active ports on system startup
   - Shows protocol type, local address, remote address, state, PID and process name

2. **Search and Filter**
   - Enter keywords in search box for real-time search
   - Use protocol dropdown to filter TCP/UDP ports
   - Support searching port numbers, IP addresses, process names, etc.

3. **Process Management**
   - Click "Terminate" button to end processes occupying ports
   - System will ask for confirmation to prevent accidental operations

4. **Data Refresh**
   - Click "🔄 Refresh" button to get latest port information
   - Support infinite scroll for automatic loading of more data

### Keyboard Shortcuts

- `Ctrl/Cmd + R` - Refresh port information
- `Ctrl/Cmd + F` - Focus search box
- `Ctrl/Cmd + W` - Close application
- `Ctrl/Cmd + M` - Minimize window

## 🛠️ Technical Architecture

### Core Tech Stack

- **Frontend Framework**: Electron + HTML5 + CSS3 + JavaScript
- **UI Design**: Custom CSS with modern gradient design
- **System Calls**: Node.js child process system commands
- **Cross-Platform**: Electron-based cross-platform solution

### Project Structure

```
portman/
├── src/                    # Source code directory
│   ├── main.js            # Electron main process
│   ├── preload.js         # Preload script
│   ├── renderer.js        # Renderer process logic
│   ├── index.html         # Main interface HTML
│   └── styles.css         # Style files
├── docs/                  # Documentation directory
├── package.json           # Project configuration
├── README.md             # Chinese documentation
└── README_EN.md          # English documentation
```

### System Commands

Different platforms use different system commands to get port information:

- **Windows**: `netstat -ano` + `tasklist`
- **macOS**: `netstat -anv`
- **Linux**: `netstat -tulpn`

## 🤝 Contributing

We welcome all forms of contributions!

### How to Contribute

1. Fork this repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Create a Pull Request

### Development Guidelines

- Follow existing code style
- Add appropriate comments
- Ensure cross-platform compatibility
- Test thoroughly before submitting

### Report Issues

If you find bugs or have feature suggestions, please:

1. Check if there are existing related issues
2. Create a new issue with detailed description
3. Provide reproduction steps and environment information

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Electron](https://electronjs.org/) - Cross-platform desktop application framework
- [Node.js](https://nodejs.org/) - JavaScript runtime environment
- All contributors and users for their support

## 📞 Contact

- Project Homepage: [https://github.com/yourusername/portman](https://github.com/yourusername/portman)
- Issue Reports: [Issues](https://github.com/yourusername/portman/issues)
- Feature Requests: [Discussions](https://github.com/yourusername/portman/discussions)

---

<div align="center">

**If this project helps you, please give us a ⭐ Star!**

Made with ❤️ by [Your Name](https://github.com/yourusername)

</div>
