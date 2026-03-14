---
name: "vitepress-site-config"
description: "VitePress site configuration reference including base URL, title, description, head tags, locales, and vite options. Invoke when user needs to configure site-level settings."
---

# VitePress 站点配置 Skill

## 概述

站点配置控制 VitePress 站点的整体行为，在 `.vitepress/config.js` 或 `.vitepress/config.mjs` 中定义。

## 基本配置

```js
import { defineConfig } from 'vitepress'

export default defineConfig({
  // 站点配置
  base: '/docs/',
  lang: 'zh-CN',
  title: 'My Docs',
  description: 'A VitePress site',
  
  // 主题配置
  themeConfig: {
    // ...
  }
})
```

## 配置选项

### base

- **类型**: `string`
- **默认值**: `/`

站点的根路径。如果部署到子路径，需要设置：

```js
export default defineConfig({
  base: '/docs/'
})
```

### lang

- **类型**: `string`
- **默认值**: `en-US`

站点的语言。作为 `<html>` 标签的 `lang` 属性：

```js
export default defineConfig({
  lang: 'zh-CN'
})
```

### title

- **类型**: `string`
- **默认值**: `VitePress`

站点标题。显示在导航栏和浏览器标签页：

```js
export default defineConfig({
  title: 'My Documentation'
})
```

### titleTemplate

- **类型**: `string | boolean`

标题模板，用于组合页面标题和站点标题：

```js
export default defineConfig({
  title: 'My Site',
  titleTemplate: ':title - My Site'  // 页面标题 - My Site
})

// 或禁用后缀
export default defineConfig({
  titleTemplate: false
})
```

### description

- **类型**: `string`

站点描述。用于 SEO：

```js
export default defineConfig({
  description: 'A VitePress documentation site'
})
```

### head

- **类型**: `HeadConfig[]`

额外的 `<head>` 标签：

```js
export default defineConfig({
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'author', content: 'John Doe' }],
    ['meta', { property: 'og:title', content: 'My Docs' }]
  ]
})
```

### appearance

- **类型**: `boolean | 'dark' | 'force-dark'`
- **默认值**: `true`

是否启用深色模式：

```js
export default defineConfig({
  appearance: true,        // 启用切换
  appearance: 'dark',      // 默认深色
  appearance: false        // 禁用深色模式
})
```

### lastUpdated

- **类型**: `boolean`
- **默认值**: `false`

是否显示最后更新时间：

```js
export default defineConfig({
  lastUpdated: true
})
```

### cleanUrls

- **类型**: `boolean`
- **默认值**: `false`

是否生成干净的 URL（不带 `.html` 后缀）：

```js
export default defineConfig({
  cleanUrls: true
})
```

### ignoreDeadLinks

- **类型**: `boolean | 'localhostLinks' | RegExp | (string) => boolean`
- **默认值**: `false`

是否忽略死链检查：

```js
export default defineConfig({
  ignoreDeadLinks: true,
  ignoreDeadLinks: 'localhostLinks',  // 只忽略 localhost 链接
  ignoreDeadLinks: [/^\/playground/]  // 忽略特定路径
})
```

### markdown

- **类型**: `MarkdownOptions`

Markdown 解析器选项：

```js
export default defineConfig({
  markdown: {
    theme: 'github-dark',
    lineNumbers: true,
    config: (md) => {
      // 使用 markdown-it 插件
      md.use(require('markdown-it-xxx'))
    }
  }
})
```

### vite

- **类型**: `ViteConfig`

Vite 配置：

```js
export default defineConfig({
  vite: {
    server: {
      port: 3000
    },
    build: {
      rollupOptions: {
        // ...
      }
    },
    plugins: [
      // Vite 插件
    ]
  }
})
```

### vue

- **类型**: `VueOptions`

Vue 编译器选项：

```js
export default defineConfig({
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag.startsWith('custom-')
      }
    }
  }
})
```

### transformHead

- **类型**: `(context: TransformContext) => Awaitable<HeadConfig[] | void>`

转换 `<head>` 标签：

```js
export default defineConfig({
  async transformHead(context) {
    // 根据页面内容动态生成 head 标签
    return [
      ['meta', { property: 'og:url', content: context.pageData.relativePath }]
    ]
  }
})
```

### transformHtml

- **类型**: `(code: string, id: string, context: TransformContext) => Awaitable<string | void>`

转换生成的 HTML：

```js
export default defineConfig({
  async transformHtml(code, id, context) {
    // 修改 HTML 内容
    return code.replace(/old/g, 'new')
  }
})
```

### transformPageData

- **类型**: `(pageData: PageData, context: TransformContext) => Awaitable<Partial<PageData> | void>`

转换页面数据：

```js
export default defineConfig({
  async transformPageData(pageData, context) {
    // 修改页面数据
    pageData.frontmatter.customField = 'value'
  }
})
```

### buildEnd

- **类型**: `(siteConfig: SiteConfig) => Awaitable<void>`

构建结束钩子：

```js
export default defineConfig({
  async buildEnd(siteConfig) {
    // 构建完成后执行
    console.log('Build finished!')
  }
})
```

### sitemap

- **类型**: `SitemapOptions`

生成站点地图：

```js
export default defineConfig({
  sitemap: {
    hostname: 'https://example.com'
  }
})
```

### locales

- **类型**: `LocalesConfig`

多语言配置：

```js
export default defineConfig({
  locales: {
    root: {
      label: 'English',
      lang: 'en'
    },
    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/zh/'
    }
  }
})
```

## 完整示例

```js
import { defineConfig } from 'vitepress'

export default defineConfig({
  // 基础配置
  base: '/',
  lang: 'zh-CN',
  title: 'My Documentation',
  titleTemplate: ':title | My Docs',
  description: 'A comprehensive documentation site',
  
  // Head 标签
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#5f67ee' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }]
  ],
  
  // 功能开关
  appearance: true,
  lastUpdated: true,
  cleanUrls: true,
  
  // Markdown 配置
  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    },
    lineNumbers: true,
    config: (md) => {
      md.use(require('markdown-it-footnote'))
    }
  },
  
  // Vite 配置
  vite: {
    resolve: {
      alias: {
        '@': './components'
      }
    },
    plugins: []
  },
  
  // 构建钩子
  async buildEnd(siteConfig) {
    // 构建完成后执行额外操作
  },
  
  // 主题配置
  themeConfig: {
    // 导航栏、侧边栏等配置
  }
})
```

## 类型定义

```typescript
import { defineConfig } from 'vitepress'
import type { UserConfig } from 'vitepress'

// 使用类型
const config: UserConfig = {
  // ...
}

export default defineConfig(config)
```

## 环境变量

在配置中使用环境变量：

```js
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/docs/' : '/',
  title: process.env.VITE_APP_TITLE || 'My Docs'
})
```

## 配置文件位置

- `.vitepress/config.js`
- `.vitepress/config.mjs`
- `.vitepress/config.ts`
- `.vitepress/config/index.js` (可以拆分配置)

## 注意事项

1. 使用 `defineConfig` 获得类型提示
2. 配置支持异步函数
3. 可以使用相对路径
4. 构建时配置会被序列化，避免使用复杂对象
5. Vite 配置会深度合并
