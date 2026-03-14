---
name: "vitepress-custom-theme"
description: "Create custom VitePress themes including theme structure, Layout component, 404 handling, and theme distribution. Invoke when user wants to build a custom theme from scratch."
---

# VitePress 自定义主题 Skill

## 概述

VitePress 允许创建完全自定义的主题。每个 Markdown 文件被编译成 HTML，然后作为 Vue 组件处理。

## 主题结构

### 文件位置

```
.
├─ docs
│  ├─ .vitepress
│  │  ├─ theme
│  │  │  └─ index.js    # 主题入口文件
│  │  └─ config.js      # 配置文件
│  └─ index.md
└─ package.json
```

### 检测到主题入口文件时

VitePress 会使用自定义主题而不是默认主题。

## 主题接口

```typescript
interface Theme {
  /**
   * 每个页面的根布局组件
   * @required
   */
  Layout: Component
  /**
   * 增强 Vue 应用实例
   * @optional
   */
  enhanceApp?: (ctx: EnhanceAppContext) => Awaitable<void>
  /**
   * 扩展另一个主题
   * @optional
   */
  extends?: Theme
}

interface EnhanceAppContext {
  app: App      // Vue 应用实例
  router: Router // VitePress 路由实例
  siteData: Ref<SiteData> // 站点级元数据
}
```

## 基本主题示例

### 最简单的主题

```js
// .vitepress/theme/index.js
import Layout from './Layout.vue'

export default {
  Layout
}
```

### 完整主题示例

```js
// .vitepress/theme/index.js
import Layout from './Layout.vue'

export default {
  Layout,
  enhanceApp({ app, router, siteData }) {
    // 注册全局组件
    app.component('MyGlobalComponent', MyGlobalComponent)
    
    // 添加路由守卫
    router.beforeEach((to) => {
      console.log('路由切换:', to)
    })
  }
}
```

## 构建布局组件

### 最基本的布局

```vue
<!-- .vitepress/theme/Layout.vue -->
<template>
  <h1>Custom Layout!</h1>
  
  <!-- 渲染 Markdown 内容 -->
  <Content />
</template>
```

### 处理 404 错误

```vue
<script setup>
import { useData } from 'vitepress'
const { page } = useData()
</script>

<template>
  <h1>Custom Layout!</h1>
  
  <div v-if="page.isNotFound">
    Custom 404 page!
  </div>
  <Content v-else />
</template>
```

### 根据 frontmatter 切换布局

```vue
<script setup>
import { useData } from 'vitepress'
const { page, frontmatter } = useData()
</script>

<template>
  <h1>Custom Layout!</h1>
  
  <div v-if="page.isNotFound">
    Custom 404 page!
  </div>
  <div v-else-if="frontmatter.layout === 'home'">
    Custom home page!
  </div>
  <Content v-else />
</template>
```

### 拆分布局组件

```vue
<script setup>
import { useData } from 'vitepress'
import NotFound from './NotFound.vue'
import Home from './Home.vue'
import Page from './Page.vue'

const { page, frontmatter } = useData()
</script>

<template>
  <h1>Custom Layout!</h1>
  
  <NotFound v-if="page.isNotFound" />
  <Home v-else-if="frontmatter.layout === 'home'" />
  <Page v-else />
</template>
```

## 使用运行时 API

### useData()

```vue
<script setup>
import { useData } from 'vitepress'

const { site, theme, page, frontmatter, lang, dir } = useData()
</script>
```

可用数据：
- `site` - 站点配置
- `theme` - 主题配置
- `page` - 页面数据（包括 `isNotFound`）
- `frontmatter` - 当前页面的 frontmatter
- `lang` - 当前语言
- `dir` - 文本方向

## 数据驱动布局

使用构建时数据加载生成数据驱动布局：

```vue
<script setup>
import { data as posts } from './posts.data.js'
</script>

<template>
  <h1>Blog Posts</h1>
  <ul>
    <li v-for="post in posts" :key="post.url">
      <a :href="post.url">{{ post.frontmatter.title }}</a>
    </li>
  </ul>
</template>
```

## 分发自定义主题

### 作为 npm 包分发

1. **包入口导出主题对象**

```js
// index.js
import Layout from './Layout.vue'

export default {
  Layout,
  enhanceApp({ app }) {
    // ...
  }
}
```

2. **导出主题配置类型**

```typescript
// types.ts
export interface ThemeConfig {
  // 主题配置选项
}
```

3. **导出 VitePress 配置（可选）**

```js
// config.js
export default {
  // 主题需要的 VitePress 配置
}
```

### 使用自定义主题

```js
// .vitepress/theme/index.js
import Theme from 'awesome-vitepress-theme'

export default Theme
```

### 扩展自定义主题

```js
// .vitepress/theme/index.js
import Theme from 'awesome-vitepress-theme'

export default {
  extends: Theme,
  enhanceApp(ctx) {
    // 自定义增强
  }
}
```

### 扩展主题配置

```js
// .vitepress/config.js
import baseConfig from 'awesome-vitepress-theme/config'

export default {
  extends: baseConfig,
  // 其他配置
}
```

### TypeScript 类型支持

```typescript
// .vitepress/config.ts
import baseConfig from 'awesome-vitepress-theme/config'
import { defineConfigWithTheme } from 'vitepress'
import type { ThemeConfig } from 'awesome-vitepress-theme'

export default defineConfigWithTheme<ThemeConfig>({
  extends: baseConfig,
  themeConfig: {
    // 类型安全的主题配置
  }
})
```

## 最佳实践

1. **保持 SSR 兼容** - 所有组件必须支持服务端渲染
2. **使用 `<Content />`** - 必须包含以渲染 Markdown
3. **处理 404** - 检查 `page.isNotFound`
4. **支持 frontmatter** - 允许用户自定义布局
5. **提供类型定义** - 方便 TypeScript 用户使用
6. **文档清晰** - 说明如何使用和配置主题

## 注意事项

- 主题入口文件是必须的
- 只有 `Layout` 属性是必须的
- 主题需要保证 SSR 兼容
- 可以使用 Vue 3 的所有功能
- 构建时数据加载可以用于生成动态内容
