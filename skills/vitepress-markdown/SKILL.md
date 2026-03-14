---
name: "vitepress-markdown"
description: "VitePress Markdown extensions guide including syntax highlighting, custom containers, tables, emojis, TOC, and more. Invoke when user needs help with Markdown formatting in VitePress."
---

# VitePress Markdown 扩展 Skill

## 概述

VitePress 提供了丰富的内置 Markdown 扩展功能，让你的文档更加美观和实用。

## 标题锚点

### 自动锚点
标题会自动应用锚点，可以通过 `markdown.anchor` 选项配置。

### 自定义锚点
为标题指定自定义锚点：
```markdown
# 使用自定义锚点 {#my-anchor}
```
链接时使用 `#my-anchor` 而不是默认的 `#使用自定义锚点`。

## 链接

### 内部链接
- 转换为单页导航的路由链接
- `index.md` 自动转换为 `index.html`，URL 为 `/`

```markdown
[Home](/)                    <!-- 导航至根目录 index.html -->
[foo](/foo/)                <!-- 导航至 foo/index.html -->
[foo heading](./#heading)   <!-- 锚定到 foo/index 的标题 -->
[bar - three](../bar/three) <!-- 可省略扩展名 -->
[bar - three](../bar/three.md)   <!-- 可添加 .md -->
[bar - four](../bar/four.html)   <!-- 可添加 .html -->
```

### 外部链接
自动添加 `target="_blank" rel="noreferrer"`：
```markdown
[vuejs.org](https://vuejs.org)
[VitePress on GitHub](https://github.com/vuejs/vitepress)
```

## Frontmatter

YAML 格式，页面配置数据：
```yaml
---
title: Blogging Like a Hacker
lang: en-US
---
```

## GitHub 风格表格

```markdown
| Tables        |      Are      |  Cool |
| ------------- | :-----------: | ----: |
| col 3 is      | right-aligned | $1600 |
| col 2 is      |   centered    |   $12 |
| zebra stripes |   are neat    |    $1 |
```

## Emoji

使用 emoji 简码：
```markdown
:tada: :100:
```
效果：🎉 💯

## 目录表 (TOC)

```markdown
[[toc]]
```

可通过 `markdown.toc` 选项配置。

## 自定义容器

### 默认标题
```markdown
::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::
```

### 自定义标题
```markdown
::: danger STOP
危险区域，请勿继续
:::

::: details 点我查看代码
```js
console.log('Hello, VitePress!')
```
:::
```

### 全局自定义标题
```typescript
// config.ts
export default defineConfig({
  markdown: {
    container: {
      tipLabel: '提示',
      warningLabel: '警告',
      dangerLabel: '危险',
      infoLabel: '信息',
      detailsLabel: '详细信息'
    }
  }
})
```

## GitHub 风格警报

```markdown
> [!NOTE]
> 强调用户在快速浏览文档时也不应忽略的重要信息。

> [!TIP]
> 有助于用户更顺利达成目标的建议性信息。

> [!IMPORTANT]
> 对用户达成目标至关重要的信息。

> [!WARNING]
> 因为可能存在风险，所以需要用户立即关注的关键内容。

> [!CAUTION]
> 行为可能带来的负面影响。
```

## 语法高亮

### 代码块
使用 Shiki 驱动，支持多种语言：
````markdown
```js
export default {
  name: 'MyComponent'
}
```
````

### 行高亮
````markdown
```js{4}
export default {
  data () {
    return {
      msg: '第4行高亮！'
    }
  }
}
```
````

### 多行高亮
````markdown
```js{1,4,6-8}
// 第1行
// 第2行
// 第3行
// 第4行
// 第5行
// 第6行
// 第7行
// 第8行
```
````

### 聚焦代码块
````markdown
```js
export default {
  data () {
    return {
      // [!code focus]
      msg: 'Focused!'
    }
  }
}
```
````

### 颜色差异高亮
````markdown
```js
export default {
  data () {
    return {
      msg: 'Removed' // [!code --]
      msg: 'Added'   // [!code ++]
    }
  }
}
```
````

### 错误和警告
````markdown
```js
export default {
  // [!code error]
  msg: 'Error',
  // [!code warning]
  msg2: 'Warning'
}
```
````

### 行号
````markdown
```js:line-numbers
// 默认从1开始
const line1 = 'This is line 1'
const line2 = 'This is line 2'
```

```js:line-numbers=5
// 从5开始
const line5 = 'This is line 5'
```
````

### 导入代码片段
```markdown
<<< @/filepath

<<< @/filepath{js}

<<< @/filepath#line-range
```

## 代码组

```markdown
::: code-group

```bash [npm]
npm install
```

```bash [yarn]
yarn install
```

```bash [pnpm]
pnpm install
```

:::
```

## 包含 Markdown 文件

```markdown
<!-- @include: ./parts/basics.md -->

<!-- @include: ./parts/basics.md{3,10} -->
```

## 数学方程

支持 KaTeX：
```markdown
$
\sqrt{3x-1}+(1+x)^2
$
```

## 图片懒加载

```markdown
![图片](/image.png){loading=lazy}
```

## 高级配置

### 禁用行号
```typescript
export default defineConfig({
  markdown: {
    lineNumbers: false
  }
})
```

### 代码块配置
```typescript
export default defineConfig({
  markdown: {
    theme: 'material-theme-palenight',
    config: (md) => {
      // 使用 markdown-it 插件
      md.use(require('markdown-it-xxx'))
    }
  }
})
```
