---
name: "vitepress-using-vue"
description: "Using Vue in VitePress Markdown including template syntax, directives, script setup, components, and SSR compatibility. Invoke when user needs to add dynamic content or Vue components in Markdown."
---

# VitePress 中使用 Vue Skill

## 概述

VitePress 中每个 Markdown 文件都被编译成 HTML，并作为 Vue 单文件组件处理。可以使用任何 Vue 功能，包括动态模板、Vue 组件和 `<script>` 标签逻辑。

## 重要提示

- VitePress 自动检测和优化 Markdown 内容的纯静态部分
- 所有 Vue 用法都需要兼容 SSR
- 静态内容被优化为单个占位符节点

## 模板化

### 插值语法

在文本中使用 Vue 的插值语法：

```markdown
{{ 1 + 1 }}
```

输出：`2`

### 指令

可以使用 Vue 指令：

```html
<span v-for="i in 3">{{ i }} </span>
```

输出：`1 2 3 `

## Script 和 Style

### 基本用法

Markdown 文件中的根级 `<script>` 和 `<style>` 标签与 Vue SFC 一样：

```markdown
---
hello: world
---

<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

## Markdown Content

The count is: {{ count }}

<button :class="$style.button" @click="count++">Increment</button>

<style module>
.button {
  color: red;
  font-weight: bold;
}
</style>
```

### 注意事项

1. 所有标签应放在 frontmatter 之后
2. 没有 `<template>` 标签，根级内容就是 Markdown
3. 避免使用 `<style scoped>`（会增加页面大小）
4. 推荐使用 `<style module>`

## 使用 useData()

访问 VitePress 运行时 API：

```vue
<script setup>
import { useData } from 'vitepress'

const { page, site, theme, frontmatter } = useData()
</script>

<pre>{{ page }}</pre>
```

## 使用组件

### 局部导入

在使用的地方显式导入：

```markdown
<script setup>
import CustomComponent from '../../components/CustomComponent.vue'
</script>

# Docs

This is a .md using a custom component

<CustomComponent />
```

### 全局注册

在主题入口文件中注册：

```js
// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('MyGlobalComponent', MyGlobalComponent)
  }
}
```

### 组件命名规范

确保自定义组件名称：
- 包含连字符（kebab-case）：`my-component`
- 或使用 PascalCase：`MyComponent`

否则会被视为内联元素并包裹在 `<p>` 标签内。

## 在标题中使用组件

注意以下语法区别：

| Markdown | 输出的 HTML | 被解析的标题 |
|----------|------------|-------------|
| `# text <Tag/>` | `<h1>text <Tag/></h1>` | text |
| `# text `<Tag/>`` | `<h1>text <code>&lt;Tag/&gt;</code></h1>` | text `<Tag/>` |

被 `<code>` 包裹的 HTML 将按原样显示，只有未包裹的 HTML 才会被 Vue 解析。

## 转义 Vue 插值

### 使用 v-pre 指令

```markdown
This <span v-pre>{{ will be displayed as-is }}</span>
```

输出：`This {{ will be displayed as-is }}`

### 使用 v-pre 容器

```markdown
::: v-pre
{{ This will be displayed as-is }}
:::
```

## 代码块中的 Vue 语法

### 默认保护

代码块自动使用 `v-pre` 包装，不处理 Vue 语法。

### 启用 Vue 语法

在代码语言后附加 `-vue` 后缀：

````markdown
```js-vue
Hello {{ 1 + 1 }}
```
````

输出：`Hello 2`

注意：可能会影响语法高亮。

## 使用 CSS 预处理器

VitePress 内置支持 CSS 预处理器：

### 安装预处理器

```bash
# .scss and .sass
npm install -D sass

# .less
npm install -D less

# .styl and .stylus
npm install -D stylus
```

### 在 Markdown 中使用

```vue
<style lang="sass">
.title
  font-size: 20px
</style>
```

## Teleport 组件

VitePress 目前只支持使用 teleport 传送到 body 的 SSG。

对于其他地方，可以包裹在 `<ClientOnly>` 组件中：

```vue
<ClientOnly>
  <Teleport to="#somewhere">
    <!-- content -->
  </Teleport>
</ClientOnly>
```

## SSR 兼容性

所有 Vue 用法都需要兼容 SSR：

1. 避免在 `beforeMount`/`mounted` 之外访问浏览器 API
2. 使用 `<ClientOnly>` 包裹客户端专用组件
3. 确保自定义组件可以服务端渲染

## 最佳实践

1. 优先使用 `<script setup>` 语法
2. 使用 `<style module>` 代替 `<style scoped>`
3. 局部导入组件以获得更好的代码分割
4. 使用 `v-pre` 转义不需要处理的插值
5. 注意 SSR 兼容性
