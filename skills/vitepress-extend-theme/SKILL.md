---
name: "vitepress-extend-default-theme"
description: "Extend VitePress default theme including custom CSS, global components, layout slots, and view transitions. Invoke when user wants to customize the default theme without building from scratch."
---

# VitePress 扩展默认主题 Skill

## 概述

VitePress 默认主题已经针对文档优化，可以通过扩展来实现高级自定义，而无需从头构建主题。

## 适用场景

- 调整 CSS 样式
- 注册全局组件
- 通过 layout 插槽注入自定义内容
- 添加视图过渡动画

## 自定义 CSS

### 覆盖 CSS 变量

```js
// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import './custom.css'

export default DefaultTheme
```

```css
/* .vitepress/theme/custom.css */
:root {
  --vp-c-brand-1: #646cff;
  --vp-c-brand-2: #747bff;
}
```

### 查看可覆盖的变量

参考 [默认主题 CSS 变量](https://vitepress.dev/reference/default-theme-css-variables) 获取完整列表。

## 使用自定义字体

### 不使用默认字体

```js
// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme-without-fonts'
import './my-fonts.css'

export default DefaultTheme
```

```css
/* .vitepress/theme/my-fonts.css */
:root {
  --vp-font-family-base: 'Your Font', sans-serif;
  --vp-font-family-mono: 'Your Mono Font', monospace;
}
```

### 预加载本地字体

```js
// .vitepress/config.js
export default {
  transformHead({ assets }) {
    const myFontFile = assets.find(file => /font-name\.[\w-]+\.woff2/.test(file))
    if (myFontFile) {
      return [
        [
          'link',
          {
            rel: 'preload',
            href: myFontFile,
            as: 'font',
            type: 'font/woff2',
            crossorigin: ''
          }
        ]
      ]
    }
  }
}
```

## 注册全局组件

```js
// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 注册自定义全局组件
    app.component('MyGlobalComponent', MyGlobalComponent)
  }
}
```

### TypeScript 版本

```typescript
// .vitepress/theme/index.ts
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('MyGlobalComponent', MyGlobalComponent)
  }
} satisfies Theme
```

### 自动注册组件目录

利用 Vite 的 glob 导入：

```js
// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'

export default {
  extends: DefaultTheme,
  async enhanceApp({ app }) {
    const components = import.meta.glob('./components/*.vue')
    
    for (const [path, component] of Object.entries(components)) {
      const name = path.match(/\.\/components\/(.*)\.vue$/)[1]
      app.component(name, (await component()).default)
    }
  }
}
```

## 布局插槽

### 基本用法

```js
// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import MyLayout from './MyLayout.vue'

export default {
  extends: DefaultTheme,
  Layout: MyLayout
}
```

```vue
<!-- .vitepress/theme/MyLayout.vue -->
<script setup>
import DefaultTheme from 'vitepress/theme'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #aside-outline-before>
      My custom sidebar top content
    </template>
  </Layout>
</template>
```

### 使用渲染函数

```js
// .vitepress/theme/index.js
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import MyComponent from './MyComponent.vue'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'aside-outline-before': () => h(MyComponent)
    })
  }
}
```

## 可用插槽列表

### Doc 布局（默认）

| 插槽名 | 位置 |
|--------|------|
| `doc-top` | 文档顶部 |
| `doc-bottom` | 文档底部 |
| `doc-footer-before` | 文档页脚之前 |
| `doc-before` | 文档内容之前 |
| `doc-after` | 文档内容之后 |
| `sidebar-nav-before` | 侧边栏导航之前 |
| `sidebar-nav-after` | 侧边栏导航之后 |
| `aside-top` | 右侧边栏顶部 |
| `aside-bottom` | 右侧边栏底部 |
| `aside-outline-before` | 大纲之前 |
| `aside-outline-after` | 大纲之后 |
| `aside-ads-before` | 广告之前 |
| `aside-ads-after` | 广告之后 |

### Home 布局

| 插槽名 | 位置 |
|--------|------|
| `home-hero-before` | Hero 区域之前 |
| `home-hero-info-before` | Hero 信息之前 |
| `home-hero-info` | Hero 信息 |
| `home-hero-info-after` | Hero 信息之后 |
| `home-hero-actions-after` | Hero 按钮之后 |
| `home-hero-image` | Hero 图片 |
| `home-hero-after` | Hero 区域之后 |
| `home-features-before` | 特性区域之前 |
| `home-features-after` | 特性区域之后 |

### Page 布局

| 插槽名 | 位置 |
|--------|------|
| `page-top` | 页面顶部 |
| `page-bottom` | 页面底部 |

### 404 页面

| 插槽名 | 位置 |
|--------|------|
| `not-found` | 404 内容 |

### 全局插槽

| 插槽名 | 位置 |
|--------|------|
| `layout-top` | 布局最顶部 |
| `layout-bottom` | 布局最底部 |
| `nav-bar-title-before` | 导航栏标题之前 |
| `nav-bar-title-after` | 导航栏标题之后 |
| `nav-bar-content-before` | 导航栏内容之前 |
| `nav-bar-content-after` | 导航栏内容之后 |
| `nav-screen-content-before` | 移动端导航内容之前 |
| `nav-screen-content-after` | 移动端导航内容之后 |

## 视图过渡 API

### 外观切换过渡

```vue
<!-- .vitepress/theme/Layout.vue -->
<script setup lang="ts">
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { nextTick, provide } from 'vue'

const { isDark } = useData()

const enableTransitions = () =>
  'startViewTransition' in document &&
  window.matchMedia('(prefers-reduced-motion: no-preference)').matches

provide('toggle-appearance', async () => {
  if (!enableTransitions()) {
    isDark.value = !isDark.value
    return
  }

  await document.startViewTransition(async () => {
    isDark.value = !isDark.value
    await nextTick()
  }).ready
})
</script>

<template>
  <DefaultTheme.Layout />
</template>
```

## 最佳实践

1. **优先使用扩展** - 除非必要，不要从头创建主题
2. **CSS 变量优先** - 使用变量而不是覆盖具体样式
3. **组件命名规范** - 使用 PascalCase 或带连字符的名称
4. **插槽选择** - 选择合适的插槽位置注入内容
5. **性能考虑** - 避免在 enhanceApp 中执行耗时操作
6. **TypeScript 支持** - 使用 `satisfies Theme` 获得类型检查

## 注意事项

- 确保自定义组件 SSR 兼容
- 使用 `vitepress/theme-without-fonts` 避免加载默认字体
- 布局插槽只在特定布局下可用
- 全局插槽在所有布局中都可用
- 视图过渡需要浏览器支持
