---
name: "vitepress-cms"
description: "Integrate VitePress with headless CMS including Netlify CMS, Sanity, Contentful, and Strapi. Invoke when user wants to connect VitePress with a CMS for content management."
---

# VitePress CMS 集成 Skill

## 概述

VitePress 可以与各种 Headless CMS 集成，实现内容管理和静态站点生成的结合。

## 支持的 CMS

- **Netlify CMS** (Decap CMS) - Git-based CMS
- **Sanity** - 结构化内容平台
- **Contentful** - 内容基础设施
- **Strapi** - 开源 Node.js CMS
- **Storyblok** - 可视化编辑器
- **Forestry** (Tina CMS) - Git-based CMS

## Netlify CMS (Decap CMS)

### 安装

```bash
npm install -D netlify-cms-app
```

### 配置

创建 `public/admin/config.yml`：

```yaml
backend:
  name: git-gateway
  branch: main

media_folder: public/images
public_folder: /images

collections:
  - name: blog
    label: Blog
    folder: docs/blog
    create: true
    fields:
      - { name: title, label: Title, widget: string }
      - { name: date, label: Date, widget: datetime }
      - { name: body, label: Body, widget: markdown }
```

### 创建管理界面

创建 `public/admin/index.html`：

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Content Manager</title>
</head>
<body>
  <script src="https://unpkg.com/netlify-cms-app@^2.0.0/dist/netlify-cms-app.js"></script>
  <script>
    NetlifyCmsApp.init()
  </script>
</body>
</html>
```

### 身份验证

在 Netlify 中启用 Identity 和 Git Gateway。

## Sanity

### 安装

```bash
npm install -D @sanity/client
```

### 配置客户端

```js
// sanityClient.js
import { createClient } from '@sanity/client'

export default createClient({
  projectId: 'your-project-id',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-05-03'
})
```

### 数据加载器

```js
// posts.data.js
import sanityClient from './sanityClient'

export default {
  async load() {
    const query = `*[_type == "post"] | order(date desc) {
      title,
      slug,
      date,
      excerpt
    }`
    
    return await sanityClient.fetch(query)
  }
}
```

### 在页面中使用

```vue
<script setup>
import { data as posts } from './posts.data.js'
</script>

<template>
  <div v-for="post in posts" :key="post.slug.current">
    <h2>{{ post.title }}</h2>
    <p>{{ post.excerpt }}</p>
  </div>
</template>
```

## Contentful

### 安装

```bash
npm install -D contentful
```

### 配置客户端

```js
// contentfulClient.js
import { createClient } from 'contentful'

export default createClient({
  space: 'your-space-id',
  accessToken: 'your-access-token'
})
```

### 数据加载器

```js
// posts.data.js
import contentfulClient from './contentfulClient'

export default {
  async load() {
    const entries = await contentfulClient.getEntries({
      content_type: 'blogPost',
      order: '-fields.date'
    })
    
    return entries.items.map(item => ({
      title: item.fields.title,
      slug: item.fields.slug,
      date: item.fields.date,
      content: item.fields.content
    }))
  }
}
```

## Strapi

### 安装

```bash
npm install -D axios
```

### 数据加载器

```js
// posts.data.js
import axios from 'axios'

const API_URL = 'http://localhost:1337/api'

export default {
  async load() {
    const response = await axios.get(`${API_URL}/posts?populate=*`)
    
    return response.data.data.map(post => ({
      title: post.attributes.title,
      slug: post.attributes.slug,
      content: post.attributes.content,
      cover: post.attributes.cover?.data?.attributes?.url
    }))
  }
}
```

## Storyblok

### 安装

```bash
npm install -D @storyblok/js
```

### 配置

```js
// storyblok.js
import { storyblokInit, apiPlugin } from '@storyblok/js'

const { storyblokApi } = storyblokInit({
  accessToken: 'your-preview-token',
  use: [apiPlugin]
})

export { storyblokApi }
```

### 数据加载器

```js
// posts.data.js
import { storyblokApi } from './storyblok'

export default {
  async load() {
    const { data } = await storyblokApi.get('cdn/stories', {
      starts_with: 'blog/',
      version: 'draft'
    })
    
    return data.stories
  }
}
```

## Tina CMS

### 安装

```bash
npx @tinacms/cli@latest init
```

### 配置

```js
// tina/config.js
import { defineConfig } from 'tinacms'

export default defineConfig({
  branch: process.env.VERCEL_GIT_COMMIT_REF || 'main',
  clientId: process.env.TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: 'admin',
    publicFolder: 'public'
  },
  schema: {
    collections: [
      {
        name: 'post',
        label: 'Posts',
        path: 'content/posts',
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Title'
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Body',
            isBody: true
          }
        ]
      }
    ]
  }
})
```

## 通用集成模式

### 构建时获取

```js
// content.data.js
export default {
  async load() {
    // 在构建时从 CMS 获取数据
    const content = await fetchFromCMS()
    return content
  }
}
```

### 增量静态再生

使用 Webhook 触发重新构建：

```js
// 在 CMS 中配置 Webhook URL
// https://api.netlify.com/build_hooks/YOUR_HOOK_ID
```

### 预览模式

```js
// .vitepress/config.js
export default {
  async transformPageData(pageData) {
    if (process.env.VITE_CMS_PREVIEW === 'true') {
      // 获取草稿内容
      pageData.draft = await fetchDraftContent(pageData.relativePath)
    }
  }
}
```

## 最佳实践

1. **缓存策略** - 在构建时获取数据，避免运行时请求
2. **错误处理** - 添加数据获取错误处理
3. **类型安全** - 为 CMS 数据添加 TypeScript 类型
4. **图片优化** - 使用 CMS 提供的图片优化功能
5. **Webhook 集成** - 配置 Webhook 自动触发构建
6. **环境变量** - 使用环境变量存储敏感信息

## 注意事项

- 数据在构建时获取，不是实时更新
- 需要重新构建才能看到 CMS 更新
- 考虑使用 ISR 或客户端获取实现动态内容
- 注意 API 调用限制
- 处理图片和资源的路径问题
