---
name: "vitepress-frontmatter-config"
description: "VitePress frontmatter configuration reference including layout, title, description, sidebar, outline, and page metadata. Invoke when user needs to configure page-level settings via frontmatter."
---

# VitePress Frontmatter 配置 Skill

## 概述

Frontmatter 配置允许在每个 Markdown 文件中覆盖站点或主题级别的配置，控制页面的特定行为。

## 基本格式

```markdown
---
title: Page Title
editLink: true
---
```

## 页面元数据

### title

- **类型**: `string`
- **说明**: 页面标题

```markdown
---
title: Getting Started
---
```

### titleTemplate

- **类型**: `string | boolean`
- **说明**: 标题模板

```markdown
---
title: Page Title
titleTemplate: '%s - Custom Suffix'
---
```

### description

- **类型**: `string`
- **说明**: 页面描述，用于 SEO

```markdown
---
description: A detailed guide to getting started with our product
---
```

### lang

- **类型**: `string`
- **说明**: 页面语言

```markdown
---
lang: zh-CN
---
```

## 布局控制

### layout

- **类型**: `'doc' | 'home' | 'page'`
- **默认值**: `'doc'`
- **说明**: 页面布局类型

```markdown
---
layout: home
---
```

#### doc 布局

默认布局，包含侧边栏和大纲：

```markdown
---
layout: doc
---
```

#### home 布局

首页布局，使用 hero 和 features：

```markdown
---
layout: home

hero:
  name: My Project
  text: A VitePress Site
  tagline: My great project tagline
  actions:
    - theme: brand
      text: Get Started
      link: /guide/
    - theme: alt
      text: View on GitHub
      link: https://github.com/

features:
  - title: Feature A
    details: Description of feature A
  - title: Feature B
    details: Description of feature B
---
```

#### page 布局

纯页面布局，无侧边栏：

```markdown
---
layout: page
---
```

## 侧边栏控制

### sidebar

- **类型**: `boolean | 'auto'`
- **默认值**: `true`
- **说明**: 是否显示侧边栏

```markdown
---
sidebar: false
---
```

### aside

- **类型**: `boolean | 'left'`
- **默认值**: `true`
- **说明**: 是否显示右侧大纲

```markdown
---
aside: false
---
```

## 大纲控制

### outline

- **类型**: `number | [number, number] | 'deep' | false`
- **默认值**: `2`
- **说明**: 大纲显示的标题级别

```markdown
---
outline: 2           # 只显示 h2
outline: [2, 3]      # 显示 h2 和 h3
outline: deep        # 显示 h2 到 h6
outline: false       # 禁用大纲
---
```

## 导航栏控制

### navbar

- **类型**: `boolean`
- **默认值**: `true`
- **说明**: 是否显示导航栏

```markdown
---
navbar: false
---
```

## 编辑链接

### editLink

- **类型**: `boolean`
- **默认值**: `true`（如果配置了 editLink 模板）
- **说明**: 是否显示编辑链接

```markdown
---
editLink: false
---
```

## 最后更新时间

### lastUpdated

- **类型**: `boolean | Date`
- **默认值**: `true`（如果全局启用）
- **说明**: 是否显示最后更新时间

```markdown
---
lastUpdated: false
---
```

### date

- **类型**: `string`
- **说明**: 页面日期，用于博客文章排序

```markdown
---
date: 2024-01-15
---
```

## 页面导航

### prev

- **类型**: `string | false | { text: string, link: string }`
- **说明**: 上一页链接

```markdown
---
prev: './getting-started'
prev: false
prev:
  text: Getting Started
  link: ./getting-started
---
```

### next

- **类型**: `string | false | { text: string, link: string }`
- **说明**: 下一页链接

```markdown
---
next: './advanced-usage'
next: false
next:
  text: Advanced Usage
  link: ./advanced-usage
---
```

## 搜索

### search

- **类型**: `boolean`
- **默认值**: `true`
- **说明**: 是否在搜索索引中包含此页面

```markdown
---
search: false
---
```

## Head 标签

### head

- **类型**: `HeadConfig[]`
- **说明**: 页面特定的 head 标签

```markdown
---
head:
  - - meta
    - name: author
      content: John Doe
  - - link
    - rel: canonical
      href: https://example.com/page
---
```

## 自定义数据

可以定义任意自定义数据：

```markdown
---
author: John Doe
category: Guide
tags:
  - vue
  - vitepress
difficulty: beginner
---
```

在页面中使用：

```vue
<script setup>
import { useData } from 'vitepress'
const { frontmatter } = useData()
</script>

<p>Author: {{ frontmatter.author }}</p>
<p>Category: {{ frontmatter.category }}</p>
```

## 完整示例

```markdown
---
title: Getting Started Guide
description: A comprehensive guide to get you started with our product
layout: doc
sidebar: true
aside: true
outline: deep
navbar: true
editLink: true
lastUpdated: true
date: 2024-01-15
prev: false
next:
  text: Advanced Topics
  link: ./advanced
tags:
  - getting-started
  - basics
author: John Doe
head:
  - - meta
    - property: og:title
      content: Getting Started Guide
---

# Getting Started

Welcome to the getting started guide...
```

## 优先级

Frontmatter 配置优先级：

1. 页面 frontmatter（最高优先级）
2. 语言特定配置（locales）
3. 主题配置（themeConfig）
4. 站点配置（最低优先级）

## 注意事项

1. YAML 格式必须正确
2. 布尔值不需要引号
3. 字符串可以带引号也可以不带
4. 数组和对象使用 YAML 语法
5. 自定义数据可以在组件中访问
6. 某些配置只在特定布局下有效
