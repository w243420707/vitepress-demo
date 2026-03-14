---
name: "vitepress-cli"
description: "VitePress CLI commands including dev, build, preview, and init. Invoke when user needs to run VitePress commands or set up a new project."
---

# VitePress CLI Skill

## 概述

VitePress 提供了命令行接口 (CLI) 来开发、构建和预览文档站点。

## 安装

### 全局安装

```bash
npm install -g vitepress
```

### 本地安装（推荐）

```bash
npm install -D vitepress
```

## 可用命令

### vitepress dev

启动开发服务器。

```bash
# 基本用法
vitepress dev

# 指定根目录
vitepress dev docs

# 指定端口
vitepress dev --port 8080

# 指定主机
vitepress dev --host 0.0.0.0

# 启用 HTTPS
vitepress dev --https

# 打开浏览器
vitepress dev --open
```

#### 选项

| 选项 | 说明 |
|------|------|
| `--port <port>` | 指定端口 (默认: 5173) |
| `--host [host]` | 指定主机 (默认: localhost) |
| `--https` | 启用 HTTPS |
| `--open [path]` | 启动时打开浏览器 |
| `--base <path>` | 公共基础路径 |
| `--strictPort` | 如果端口被占用则退出 |
| `--force` | 强制优化器忽略缓存 |

### vitepress build

构建生产站点。

```bash
# 基本用法
vitepress build

# 指定根目录
vitepress build docs

# 指定输出目录
vitepress build --outDir dist

# 启用调试
vitepress build --debug
```

#### 选项

| 选项 | 说明 |
|------|------|
| `--outDir <dir>` | 输出目录 (默认: .vitepress/dist) |
| `--base <path>` | 公共基础路径 |
| `--minify [minifier]` | 启用/禁用压缩 (默认: esbuild) |
| `--emptyOutDir` | 清空输出目录 |
| `--debug` | 启用调试模式 |

### vitepress preview

预览生产构建。

```bash
# 基本用法
vitepress preview

# 指定根目录
vitepress preview docs

# 指定端口
vitepress preview --port 8080
```

#### 选项

| 选项 | 说明 |
|------|------|
| `--port <port>` | 指定端口 (默认: 4173) |
| `--host [host]` | 指定主机 (默认: localhost) |
| `--https` | 启用 HTTPS |
| `--open [path]` | 启动时打开浏览器 |
| `--base <path>` | 公共基础路径 |

## npm 脚本

### package.json 配置

```json
{
  "scripts": {
    "docs:dev": "vitepress dev",
    "docs:build": "vitepress build",
    "docs:preview": "vitepress preview"
  }
}
```

### 使用

```bash
npm run docs:dev
npm run docs:build
npm run docs:preview
```

## 项目初始化

### 快速初始化

```bash
npm init vitepress
```

### 分步设置

1. **创建项目目录**

```bash
mkdir my-docs
cd my-docs
```

2. **初始化 npm 项目**

```bash
npm init -y
```

3. **安装 VitePress**

```bash
npm install -D vitepress
```

4. **创建文档目录和文件**

```bash
mkdir docs
echo '# Hello VitePress' > docs/index.md
```

5. **创建配置文件**

```bash
mkdir docs/.vitepress
cat > docs/.vitepress/config.mjs << 'EOF'
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'My Docs',
  description: 'A VitePress site'
})
EOF
```

6. **添加 npm 脚本**

```json
{
  "scripts": {
    "docs:dev": "vitepress dev docs",
    "docs:build": "vitepress build docs",
    "docs:preview": "vitepress preview docs"
  }
}
```

7. **启动开发服务器**

```bash
npm run docs:dev
```

## 目录结构

### 标准结构

```
.
├── docs/                      # 文档根目录
│   ├── .vitepress/           # 配置目录
│   │   ├── config.mjs        # 配置文件
│   │   ├── theme/            # 自定义主题
│   │   └── dist/             # 构建输出
│   ├── index.md              # 首页
│   ├── guide/                # 指南目录
│   │   └── index.md
│   └── api/                  # API 目录
│       └── index.md
├── package.json
└── node_modules/
```

### 多包项目结构

```
project/
├── packages/
│   ├── docs/                 # 文档包
│   │   ├── .vitepress/
│   │   └── index.md
│   └── components/           # 组件包
├── package.json              # 根 package.json
└── pnpm-workspace.yaml       # pnpm workspace
```

## 环境变量

### 开发环境

```bash
# 启用调试
DEBUG=vitepress vitepress dev

# 指定 Vite 配置
VITE_CJS_IGNORE_WARNING=true vitepress dev
```

### 生产环境

```bash
# 设置 Node 环境
NODE_ENV=production vitepress build
```

## 配置文件

### 配置文件位置

- `.vitepress/config.js`
- `.vitepress/config.mjs`
- `.vitepress/config.ts`
- `.vitepress/config/index.js`

### TypeScript 配置

```typescript
import { defineConfig } from 'vitepress'
import type { UserConfig } from 'vitepress'

const config: UserConfig = {
  title: 'My Docs',
  // ...
}

export default defineConfig(config)
```

## 调试

### 启用调试模式

```bash
# 开发时
vitepress dev --debug

# 构建时
vitepress build --debug
```

### 日志级别

```bash
# 详细日志
DEBUG=vitepress:* vitepress dev

# 只显示 VitePress 日志
DEBUG=vitepress vitepress dev
```

## 常见问题

### 端口冲突

```bash
# 使用其他端口
vitepress dev --port 3000

# 严格端口模式
vitepress dev --strictPort
```

### 构建失败

```bash
# 清空缓存
vitepress build --force

# 调试构建
vitepress build --debug
```

### 内存不足

```bash
# 增加 Node 内存限制
node --max-old-space-size=4096 node_modules/.bin/vitepress build
```

## CI/CD 集成

### GitHub Actions

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          
      - run: npm ci
      - run: npm run docs:build
      
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: docs/.vitepress/dist
```

### Netlify

```toml
# netlify.toml
[build]
  command = "npm run docs:build"
  publish = "docs/.vitepress/dist"

[build.environment]
  NODE_VERSION = "18"
```

### Vercel

```json
{
  "buildCommand": "npm run docs:build",
  "outputDirectory": "docs/.vitepress/dist",
  "installCommand": "npm install"
}
```

## 性能优化

### 构建优化

```bash
# 分析构建
vitepress build --debug

# 检查包大小
npm run docs:build -- --debug
```

### 开发优化

```bash
# 禁用预打包（开发更快）
vitepress dev --force

# 指定缓存目录
vitepress dev --cacheDir .cache
```

## 注意事项

1. **Node 版本** - 需要 Node.js 16 或更高版本
2. **端口范围** - 开发服务器默认使用 5173
3. **输出目录** - 构建输出在 `.vitepress/dist`
4. **缓存** - 开发时自动缓存，使用 `--force` 清除
5. **环境变量** - 可以在配置中使用 `process.env`
