---
name: "vitepress-data-loading"
description: "Build-time data loading in VitePress including custom data loaders, createContentLoader, and generating content indexes. Invoke when user needs to load or process data at build time."
---

# VitePress 构建时数据加载 Skill

## 概述

VitePress 支持构建时数据加载，允许加载任意数据并从页面或组件中导入。数据加载只在构建时执行，最终数据序列化为 JavaScript 包中的 JSON。

## 使用场景

- 获取远程数据
- 基于本地文件生成元数据
- 创建内容索引（如博客文章列表）
- 生成 API 文档索引

## 基本用法

### 数据加载文件

文件必须以 `.data.js` 或 `.data.ts` 结尾：

```js
// example.data.js
export default {
  load() {
    return {
      hello: 'world'
    }
  }
}
```

### 在组件中使用

```vue
<script setup>
import { data } from './example.data.js'
</script>

<pre>{{ data }}</pre>
```

输出：
```json
{
  "hello": "world"
}
```

### 异步加载

```js
// example.data.js
export default {
  async load() {
    // 获取远程数据
    return (await fetch('https://api.example.com/data')).json()
  }
}
```

## 使用本地文件生成数据

### watch 选项

使用 `watch` 选项监听文件变化：

```js
// posts.data.js
import fs from 'node:fs'
import path from 'node:path'

export default {
  watch: ['./posts/*.md'],
  load(watchedFiles) {
    // watchedFiles 是匹配文件的绝对路径数组
    return watchedFiles.map((file) => {
      return {
        path: path.relative('./posts', file),
        content: fs.readFileSync(file, 'utf-8')
      }
    })
  }
}
```

### CSV 文件示例

```js
// data.data.js
import fs from 'node:fs'
import { parse } from 'csv-parse/sync'

export default {
  watch: ['./data/*.csv'],
  load(watchedFiles) {
    return watchedFiles.map((file) => {
      return parse(fs.readFileSync(file, 'utf-8'), {
        columns: true,
        skip_empty_lines: true
      })
    })
  }
}
```

## createContentLoader

### 基本用法

用于创建内容索引（如博客归档页面）：

```js
// posts.data.js
import { createContentLoader } from 'vitepress'

export default createContentLoader('posts/*.md')
```

### 返回数据类型

```typescript
interface ContentData {
  url: string              // 页面 URL（不含 base）
  frontmatter: Record<string, any>  // frontmatter 数据
  src?: string             // 原始 markdown 源（可选）
  html?: string            // 渲染的 HTML（可选）
  excerpt?: string         // 摘录 HTML（可选）
}
```

### 在页面中使用

```vue
<script setup>
import { data as posts } from './posts.data.js'
</script>

<template>
  <h1>All Blog Posts</h1>
  <ul>
    <li v-for="post of posts" :key="post.url">
      <a :href="post.url">{{ post.frontmatter.title }}</a>
      <span>by {{ post.frontmatter.author }}</span>
    </li>
  </ul>
</template>
```

## 配置选项

### 完整选项

```js
// posts.data.js
import { createContentLoader } from 'vitepress'

export default createContentLoader('posts/*.md', {
  includeSrc: true,      // 包含原始 markdown 源
  render: true,          // 包含渲染的整页 HTML
  excerpt: true,         // 包含摘录
  transform(rawData) {
    // 转换原始数据
    return rawData
      .sort((a, b) => {
        return +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date)
      })
      .map((page) => {
        return {
          url: page.url,
          title: page.frontmatter.title,
          date: page.frontmatter.date,
          excerpt: page.excerpt
        }
      })
  }
})
```

### 选项说明

| 选项 | 类型 | 说明 |
|------|------|------|
| `includeSrc` | boolean | 包含原始 markdown 源 |
| `render` | boolean | 包含渲染的整页 HTML |
| `excerpt` | boolean | 包含摘录（第一个 `---` 上面的内容） |
| `transform` | function | 转换原始数据 |

## 高级用法

### 生成博客索引

```js
// posts.data.js
import { createContentLoader } from 'vitepress'

export default createContentLoader('posts/*.md', {
  excerpt: true,
  transform(data) {
    return data
      .sort((a, b) => {
        return +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date)
      })
      .map((post) => {
        return {
          url: post.url,
          title: post.frontmatter.title,
          date: post.frontmatter.date,
          author: post.frontmatter.author,
          tags: post.frontmatter.tags,
          excerpt: post.excerpt
        }
      })
  }
})
```

### 生成 API 索引

```js
// api.data.js
import { createContentLoader } from 'vitepress'

export default createContentLoader('api/*.md', {
  transform(data) {
    return data.map((page) => {
      return {
        url: page.url,
        name: page.frontmatter.name,
        description: page.frontmatter.description,
        params: page.frontmatter.params,
        returns: page.frontmatter.returns
      }
    })
  }
})
```

### 多目录加载

```js
// content.data.js
import { createContentLoader } from 'vitepress'

export default {
  async load() {
    const posts = await createContentLoader('posts/*.md').load()
    const docs = await createContentLoader('docs/*.md').load()
    
    return {
      posts,
      docs
    }
  }
}
```

## 性能优化

### 缓存

`createContentLoader` 基于文件修改时间戳实现了缓存，提高开发性能。

### 数据大小控制

加载的数据将作为 JSON 内联在客户端 bundle 中，需要谨慎考虑其大小：

1. 只包含必要的数据
2. 使用 `transform` 过滤和精简数据
3. 避免包含完整的 `src` 或 `html`（除非必要）

## 最佳实践

1. **文件命名** - 使用描述性的 `.data.js` 文件名
2. **数据转换** - 在 `transform` 中精简数据
3. **错误处理** - 在 `load()` 中添加错误处理
4. **类型安全** - 为数据添加 TypeScript 类型
5. **缓存利用** - 合理使用 `watch` 选项

## 注意事项

- 数据加载只在构建时执行
- 匹配的非 Markdown 文件会被跳过
- 最终数据序列化为 JSON
- 注意控制数据大小
- 可以使用 Node.js API 和 npm 依赖
