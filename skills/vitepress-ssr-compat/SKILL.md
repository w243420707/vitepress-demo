---
name: "vitepress-ssr-compat"
description: "SSR compatibility guide for VitePress including ClientOnly component, browser API usage, and hydration mismatch solutions. Invoke when user encounters SSR-related issues."
---

# VitePress SSR 兼容性 Skill

## 概述

VitePress 在构建时执行服务端渲染 (SSR)，因此所有 Vue 用法都需要兼容 SSR。了解 SSR 兼容性对于避免 hydration 不匹配和其他问题至关重要。

## 常见问题

### Hydration Mismatch

当服务端渲染的 HTML 与客户端激活后的 DOM 不一致时发生。

### 浏览器 API 不可用

在 SSR 过程中，`window`、`document` 等浏览器 API 不可用。

## ClientOnly 组件

### 基本用法

将客户端专用组件包裹在 `<ClientOnly>` 中：

```vue
<ClientOnly>
  <MyClientSideComponent />
</ClientOnly>
```

### 带占位符

```vue
<ClientOnly>
  <MyClientSideComponent />
  <template #fallback>
    <!-- 服务端渲染时显示 -->
    <div>Loading...</div>
  </template>
</ClientOnly>
```

## 浏览器 API 使用

### 使用生命周期钩子

只在客户端生命周期钩子中访问浏览器 API：

```vue
<script setup>
import { onMounted, ref } from 'vue'

const width = ref(0)

onMounted(() => {
  // 只在客户端执行
  width.value = window.innerWidth
  window.addEventListener('resize', handleResize)
})
</script>
```

### 使用 inBrowser

VitePress 提供的 `inBrowser` 标志：

```vue
<script setup>
import { inBrowser } from 'vitepress'

if (inBrowser) {
  // 只在浏览器中执行
  console.log(window.location.href)
}
</script>
```

### 动态导入

对于客户端专用库，使用动态导入：

```vue
<script setup>
import { onMounted } from 'vue'

onMounted(async () => {
  if (typeof window !== 'undefined') {
    const library = await import('client-side-library')
    library.doSomething()
  }
})
</script>
```

## 时间相关

### 避免使用 Date.now()

```vue
<script setup>
// ❌ 错误：会导致 hydration mismatch
const now = Date.now()

// ✅ 正确：只在客户端获取
import { onMounted, ref } from 'vue'
const now = ref('')
onMounted(() => {
  now.value = Date.now()
})
</script>
```

### 使用随机数

```vue
<script setup>
// ❌ 错误：服务端和客户端生成的随机数不同
const id = Math.random()

// ✅ 正确：只在客户端生成
import { onMounted, ref } from 'vue'
const id = ref('')
onMounted(() => {
  id.value = Math.random()
})
</script>
```

## 第三方库

### 检查 SSR 兼容性

在使用第三方库前，检查其是否支持 SSR：

```vue
<script setup>
import { onMounted, ref } from 'vue'

const chart = ref(null)

onMounted(async () => {
  // 只在客户端加载图表库
  const ChartLibrary = await import('chart-library')
  chart.value = new ChartLibrary.default('#chart')
})
</script>
```

### 包装组件

为客户端专用库创建包装组件：

```vue
<!-- ClientOnlyChart.vue -->
<template>
  <div ref="chartContainer"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const chartContainer = ref(null)

onMounted(async () => {
  const Chart = await import('chart-library')
  new Chart.default(chartContainer.value)
})
</script>
```

## 自定义指令

### SSR 安全的指令

确保自定义指令在 SSR 时不会出错：

```js
const vMyDirective = {
  mounted(el) {
    // 只在客户端执行
    el.addEventListener('click', handleClick)
  },
  unmounted(el) {
    el.removeEventListener('click', handleClick)
  }
}
```

## Teleport

### SSR 限制

VitePress 只支持 teleport 到 body：

```vue
<!-- ✅ 正确 -->
<Teleport to="body">
  <Modal />
</Teleport>

<!-- ❌ 错误 -->
<Teleport to="#custom-container">
  <Modal />
</Teleport>
```

### 解决方案

对于其他位置，使用 `<ClientOnly>`：

```vue
<ClientOnly>
  <Teleport to="#custom-container">
    <Modal />
  </Teleport>
</ClientOnly>
```

## 最佳实践

1. **延迟浏览器 API 访问** - 使用 `onMounted` 或 `inBrowser`
2. **使用 ClientOnly** - 包裹客户端专用组件
3. **检查库兼容性** - 使用前确认支持 SSR
4. **避免随机值** - 不要在模板中使用随机生成
5. **统一数据源** - 确保服务端和客户端数据一致
6. **测试构建** - 运行 `npm run docs:build` 检查 SSR 错误

## 调试技巧

### 检查 Hydration 错误

在浏览器控制台查看 hydration mismatch 警告。

### 禁用 SSR（开发时）

```js
// .vitepress/config.js
export default {
  vite: {
    ssr: {
      noExternal: ['some-library']
    }
  }
}
```

### 日志调试

```vue
<script setup>
import { onMounted } from 'vue'

console.log('This runs on both server and client')

onMounted(() => {
  console.log('This runs only on client')
})
</script>
```

## 常见错误及解决

### window is not defined

```vue
<!-- ❌ 错误 -->
<script setup>
const width = window.innerWidth
</script>

<!-- ✅ 正确 -->
<script setup>
import { onMounted, ref } from 'vue'
const width = ref(0)
onMounted(() => {
  width.value = window.innerWidth
})
</script>
```

### document is not defined

```vue
<!-- ❌ 错误 -->
<script setup>
const element = document.getElementById('app')
</script>

<!-- ✅ 正确 -->
<script setup>
import { onMounted, ref } from 'vue'
const element = ref(null)
onMounted(() => {
  element.value = document.getElementById('app')
})
</script>
```

### localStorage is not defined

```vue
<!-- ❌ 错误 -->
<script setup>
const value = localStorage.getItem('key')
</script>

<!-- ✅ 正确 -->
<script setup>
import { onMounted, ref } from 'vue'
const value = ref('')
onMounted(() => {
  value.value = localStorage.getItem('key')
})
</script>
```
