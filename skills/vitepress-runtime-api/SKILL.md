---
name: "vitepress-runtime-api"
description: "VitePress runtime API reference including useData, useRoute, useRouter, and withBase. Invoke when user needs to access runtime data or navigation in components."
---

# VitePress 运行时 API Skill

## 概述

VitePress 提供了一组运行时 API，用于在 Vue 组件中访问站点数据、页面元数据和导航功能。

## useData

获取当前页面的运行时数据。

### 基本用法

```vue
<script setup>
import { useData } from 'vitepress'

const { site, theme, page, frontmatter, lang, dir } = useData()
</script>
```

### 返回值

| 属性 | 类型 | 说明 |
|------|------|------|
| `site` | `Ref<SiteData>` | 站点配置数据 |
| `theme` | `Ref<ThemeConfig>` | 主题配置数据 |
| `page` | `Ref<PageData>` | 页面数据 |
| `frontmatter` | `Ref<PageFrontmatter>` | 页面 frontmatter |
| `lang` | `Ref<string>` | 当前语言 |
| `dir` | `Ref<string>` | 文本方向 (ltr/rtl) |
| `localeIndex` | `Ref<string>` | 当前 locale 索引 |
| `title` | `Ref<string>` | 页面标题 |
| `description` | `Ref<string>` | 页面描述 |
| `isDark` | `Ref<boolean>` | 是否深色模式 |

### SiteData

```typescript
interface SiteData {
  base: string
  cleanUrls?: boolean
  lang: string
  title: string
  titleTemplate?: string | boolean
  description: string
  head: HeadConfig[]
  appearance: boolean | 'dark' | 'force-dark'
  themeConfig?: ThemeConfig
}
```

### PageData

```typescript
interface PageData {
  path: string
  relativePath: string
  title: string
  titleTemplate?: string | boolean
  description: string
  headers: Header[]
  frontmatter: PageFrontmatter
  lastUpdated?: number
  isNotFound: boolean
}

interface Header {
  level: number
  title: string
  slug: string
  link: string
  children: Header[]
}
```

### 使用示例

```vue
<script setup>
import { useData } from 'vitepress'

const { page, frontmatter, site, theme } = useData()

// 访问页面信息
console.log(page.value.title)
console.log(page.value.relativePath)

// 访问 frontmatter
console.log(frontmatter.value.author)

// 访问站点配置
console.log(site.value.title)

// 访问主题配置
console.log(theme.value.nav)
</script>

<template>
  <h1>{{ page.title }}</h1>
  <p>作者: {{ frontmatter.author }}</p>
</template>
```

## useRoute

获取当前路由信息。

### 基本用法

```vue
<script setup>
import { useRoute } from 'vitepress'

const route = useRoute()
</script>
```

### 返回值

| 属性 | 类型 | 说明 |
|------|------|------|
| `path` | `string` | 当前路径 |
| `data` | `PageData` | 页面数据 |
| `component` | `Component | null` | 页面组件 |

### 使用示例

```vue
<script setup>
import { useRoute } from 'vitepress'

const route = useRoute()

console.log(route.path)
console.log(route.data.title)
</script>
```

## useRouter

获取路由实例，用于程序化导航。

### 基本用法

```vue
<script setup>
import { useRouter } from 'vitepress'

const router = useRouter()
</script>
```

### 方法

| 方法 | 说明 |
|------|------|
| `go(href: string)` | 导航到指定路径 |
| `route` | 当前路由 |

### 使用示例

```vue
<script setup>
import { useRouter } from 'vitepress'

const router = useRouter()

function navigateToGuide() {
  router.go('/guide/')
}
</script>

<template>
  <button @click="navigateToGuide">Go to Guide</button>
</template>
```

## withBase

将基础路径添加到给定的 URL。

### 基本用法

```vue
<script setup>
import { withBase, useData } from 'vitepress'

const { site } = useData()

const imageUrl = withBase('/images/logo.png')
// 如果 base 是 '/docs/'，结果是 '/docs/images/logo.png'
</script>
```

### 使用示例

```vue
<script setup>
import { withBase } from 'vitepress'

const logoUrl = withBase('/logo.svg')
</script>

<template>
  <img :src="logoUrl" alt="Logo">
</template>
```

## inBrowser

检查是否在浏览器环境中。

### 基本用法

```vue
<script setup>
import { inBrowser } from 'vitepress'

if (inBrowser) {
  // 只在浏览器中执行
  console.log(window.innerWidth)
}
</script>
```

### 使用场景

```vue
<script setup>
import { inBrowser, useData } from 'vitepress'
import { ref, onMounted } from 'vue'

const { site } = useData()
const isMobile = ref(false)

onMounted(() => {
  if (inBrowser) {
    isMobile.value = window.innerWidth < 768
    window.addEventListener('resize', handleResize)
  }
})
</script>
```

## useClipboard

剪贴板操作（实验性）。

### 基本用法

```vue
<script setup>
import { useClipboard } from 'vitepress'

const { copy, copied, isSupported } = useClipboard()

async function copyCode() {
  if (isSupported.value) {
    await copy('console.log("Hello")')
  }
}
</script>

<template>
  <button @click="copyCode">
    {{ copied ? 'Copied!' : 'Copy' }}
  </button>
</template>
```

## Content 组件

渲染 Markdown 内容的组件。

### 在自定义主题中使用

```vue
<template>
  <div class="custom-layout">
    <h1>My Custom Layout</h1>
    <Content />
  </div>
</template>
```

### 使用示例

```vue
<script setup>
import { Content, useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

const { page } = useData()
</script>

<template>
  <div v-if="page.isNotFound">
    <h1>404</h1>
    <p>Page not found</p>
  </div>
  <Content v-else />
</template>
```

## ClientOnly 组件

只在客户端渲染的组件包装器。

### 基本用法

```vue
<ClientOnly>
  <MyClientSideComponent />
</ClientOnly>
```

### 带占位符

```vue
<ClientOnly>
  <Comments />
  <template #fallback>
    <div>Loading comments...</div>
  </template>
</ClientOnly>
```

## 完整示例

### 面包屑导航

```vue
<script setup>
import { useData, useRoute } from 'vitepress'
import { computed } from 'vue'

const { theme } = useData()
const route = useRoute()

const breadcrumbs = computed(() => {
  const paths = route.path.split('/').filter(Boolean)
  return paths.map((path, index) => {
    const link = '/' + paths.slice(0, index + 1).join('/')
    return { text: path, link }
  })
})
</script>

<template>
  <nav class="breadcrumbs">
    <span v-for="(crumb, index) in breadcrumbs" :key="index">
      <a :href="crumb.link">{{ crumb.text }}</a>
      <span v-if="index < breadcrumbs.length - 1"> / </span>
    </span>
  </nav>
</template>
```

### 动态导航

```vue
<script setup>
import { useData, useRouter } from 'vitepress'
import { computed } from 'vue'

const { theme, page } = useData()
const router = useRouter()

const navItems = computed(() => theme.value.nav || [])

function handleNav(item) {
  if (item.link.startsWith('http')) {
    window.open(item.link, '_blank')
  } else {
    router.go(item.link)
  }
}
</script>

<template>
  <nav>
    <button
      v-for="item in navItems"
      :key="item.link"
      @click="handleNav(item)"
    >
      {{ item.text }}
    </button>
  </nav>
</template>
```

### 阅读进度

```vue
<script setup>
import { inBrowser } from 'vitepress'
import { ref, onMounted, onUnmounted } from 'vue'

const progress = ref(0)

function updateProgress() {
  if (!inBrowser) return
  
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  progress.value = (scrollTop / docHeight) * 100
}

onMounted(() => {
  if (inBrowser) {
    window.addEventListener('scroll', updateProgress)
  }
})

onUnmounted(() => {
  if (inBrowser) {
    window.removeEventListener('scroll', updateProgress)
  }
})
</script>

<template>
  <div class="progress-bar" :style="{ width: progress + '%' }"></div>
</template>
```

## 注意事项

1. **SSR 兼容性** - 使用 `inBrowser` 检查浏览器环境
2. **响应式** - 所有返回值都是 Vue refs
3. **组合式 API** - 必须在 `setup` 或 `<script setup>` 中使用
4. **性能** - 避免在模板中频繁调用 API
5. **类型安全** - 使用 TypeScript 获得完整类型支持
