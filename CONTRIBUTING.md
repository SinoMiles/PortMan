# 贡献指南 | Contributing Guide

[English](#english) | [中文](#中文)

---

## 中文

### 🤝 欢迎贡献

感谢您对 PortMan 项目的关注！我们欢迎所有形式的贡献，包括但不限于：

- 🐛 报告 Bug
- 💡 提出新功能建议
- 📝 改进文档
- 🔧 提交代码修复
- 🎨 UI/UX 改进
- 🌐 多语言支持

### 📋 开发环境设置

#### 环境要求

- Node.js 16.0 或更高版本
- npm 或 yarn 包管理器
- Git

#### 设置步骤

1. **Fork 仓库**
   - 点击 GitHub 页面右上角的 "Fork" 按钮

2. **克隆您的 Fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/portman.git
   cd portman
   ```

3. **添加上游仓库**
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/portman.git
   ```

4. **安装依赖**
   ```bash
   npm install
   ```

5. **启动开发环境**
   ```bash
   npm start
   ```

### 🔄 开发流程

#### 创建功能分支

```bash
# 确保您在主分支上
git checkout main

# 拉取最新更改
git pull upstream main

# 创建新的功能分支
git checkout -b feature/your-feature-name
```

#### 提交更改

```bash
# 添加更改的文件
git add .

# 提交更改（请使用有意义的提交信息）
git commit -m "feat: add new feature description"

# 推送到您的 Fork
git push origin feature/your-feature-name
```

#### 创建 Pull Request

1. 访问您的 GitHub Fork 页面
2. 点击 "Compare & pull request" 按钮
3. 填写 PR 标题和描述
4. 提交 Pull Request

### 📝 代码规范

#### 提交信息格式

我们使用 [Conventional Commits](https://www.conventionalcommits.org/) 格式：

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**类型 (type):**
- `feat`: 新功能
- `fix`: Bug 修复
- `docs`: 文档更新
- `style`: 代码格式化（不影响功能）
- `refactor`: 代码重构
- `perf`: 性能优化
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动

**示例:**
```
feat: add infinite scroll for port list
fix: resolve process name display issue on Windows
docs: update installation instructions
```

#### 代码风格

- 使用 2 个空格缩进
- 使用分号结束语句
- 使用单引号字符串
- 函数和变量使用驼峰命名
- 常量使用大写下划线命名
- 添加适当的注释

#### 文件结构

```
src/
├── main.js          # Electron 主进程
├── preload.js       # 预加载脚本
├── renderer.js      # 渲染进程逻辑
├── index.html       # 主界面
└── styles.css       # 样式文件
```

### 🐛 报告 Bug

#### Bug 报告模板

请使用以下模板报告 Bug：

```markdown
**Bug 描述**
简要描述遇到的问题

**复现步骤**
1. 打开应用
2. 点击 '...'
3. 滚动到 '...'
4. 看到错误

**期望行为**
描述您期望发生的情况

**实际行为**
描述实际发生的情况

**环境信息**
- 操作系统: [例如 Windows 10]
- Node.js 版本: [例如 16.14.0]
- 应用版本: [例如 1.0.0]

**截图**
如果适用，请添加截图来帮助解释问题

**额外信息**
添加任何其他相关信息
```

### 💡 功能建议

#### 功能请求模板

```markdown
**功能描述**
简要描述您希望添加的功能

**问题背景**
描述这个功能要解决的问题

**解决方案**
描述您希望的解决方案

**替代方案**
描述您考虑过的其他解决方案

**额外信息**
添加任何其他相关信息或截图
```

### ✅ Pull Request 检查清单

在提交 PR 之前，请确保：

- [ ] 代码遵循项目的代码规范
- [ ] 添加了适当的注释
- [ ] 更新了相关文档
- [ ] 测试了所有修改的功能
- [ ] 确保跨平台兼容性
- [ ] 提交信息遵循约定格式
- [ ] PR 描述清楚说明了更改内容

### 🔍 代码审查

所有的 Pull Request 都需要经过代码审查：

1. **自动检查**: CI/CD 会自动运行测试
2. **人工审查**: 维护者会审查代码质量和功能
3. **反馈处理**: 根据反馈修改代码
4. **合并**: 审查通过后合并到主分支

### 📞 获取帮助

如果您在贡献过程中遇到问题：

- 📧 发送邮件到: [your-email@example.com]
- 💬 在 [Discussions](https://github.com/yourusername/portman/discussions) 中提问
- 🐛 在 [Issues](https://github.com/yourusername/portman/issues) 中报告问题

---

## English

### 🤝 Welcome Contributors

Thank you for your interest in the PortMan project! We welcome all forms of contributions, including but not limited to:

- 🐛 Bug reports
- 💡 Feature suggestions
- 📝 Documentation improvements
- 🔧 Code fixes
- 🎨 UI/UX improvements
- 🌐 Multi-language support

### 📋 Development Environment Setup

#### Requirements

- Node.js 16.0 or higher
- npm or yarn package manager
- Git

#### Setup Steps

1. **Fork the Repository**
   - Click the "Fork" button in the top right corner of the GitHub page

2. **Clone Your Fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/portman.git
   cd portman
   ```

3. **Add Upstream Remote**
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/portman.git
   ```

4. **Install Dependencies**
   ```bash
   npm install
   ```

5. **Start Development Environment**
   ```bash
   npm start
   ```

### 🔄 Development Workflow

#### Create Feature Branch

```bash
# Make sure you're on the main branch
git checkout main

# Pull latest changes
git pull upstream main

# Create new feature branch
git checkout -b feature/your-feature-name
```

#### Commit Changes

```bash
# Add changed files
git add .

# Commit changes (use meaningful commit messages)
git commit -m "feat: add new feature description"

# Push to your fork
git push origin feature/your-feature-name
```

#### Create Pull Request

1. Visit your GitHub fork page
2. Click "Compare & pull request" button
3. Fill in PR title and description
4. Submit Pull Request

### 📝 Code Standards

#### Commit Message Format

We use [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation update
- `style`: Code formatting (no functional changes)
- `refactor`: Code refactoring
- `perf`: Performance optimization
- `test`: Test related
- `chore`: Build process or auxiliary tool changes

**Examples:**
```
feat: add infinite scroll for port list
fix: resolve process name display issue on Windows
docs: update installation instructions
```

#### Code Style

- Use 2 spaces for indentation
- Use semicolons to end statements
- Use single quotes for strings
- Use camelCase for functions and variables
- Use UPPER_SNAKE_CASE for constants
- Add appropriate comments

### 🐛 Bug Reports

#### Bug Report Template

Please use the following template to report bugs:

```markdown
**Bug Description**
Brief description of the issue

**Steps to Reproduce**
1. Open application
2. Click on '...'
3. Scroll to '...'
4. See error

**Expected Behavior**
Describe what you expected to happen

**Actual Behavior**
Describe what actually happened

**Environment**
- OS: [e.g. Windows 10]
- Node.js version: [e.g. 16.14.0]
- App version: [e.g. 1.0.0]

**Screenshots**
If applicable, add screenshots to help explain the problem

**Additional Information**
Add any other relevant information
```

### 💡 Feature Requests

#### Feature Request Template

```markdown
**Feature Description**
Brief description of the feature you'd like to add

**Problem Background**
Describe the problem this feature would solve

**Proposed Solution**
Describe your preferred solution

**Alternative Solutions**
Describe alternative solutions you've considered

**Additional Information**
Add any other relevant information or screenshots
```

### ✅ Pull Request Checklist

Before submitting a PR, please ensure:

- [ ] Code follows project coding standards
- [ ] Added appropriate comments
- [ ] Updated relevant documentation
- [ ] Tested all modified functionality
- [ ] Ensured cross-platform compatibility
- [ ] Commit messages follow conventional format
- [ ] PR description clearly explains changes

### 🔍 Code Review

All Pull Requests require code review:

1. **Automated Checks**: CI/CD automatically runs tests
2. **Manual Review**: Maintainers review code quality and functionality
3. **Feedback Handling**: Modify code based on feedback
4. **Merge**: Merge to main branch after review approval

### 📞 Getting Help

If you encounter issues during contribution:

- 📧 Send email to: [your-email@example.com]
- 💬 Ask questions in [Discussions](https://github.com/yourusername/portman/discussions)
- 🐛 Report issues in [Issues](https://github.com/yourusername/portman/issues)

---

<div align="center">

**Thank you for contributing to PortMan! 🎉**

</div>
