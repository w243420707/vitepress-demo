---
name: "vitepress-frontmatter"
description: "VitePress frontmatter usage guide including YAML/JSON format, accessing data via $frontmatter and useData(). Invoke when user needs to configure page-level metadata or access frontmatter data."
---

# VitePress Frontmatter Skill

## 概述

VitePress 支持在所有 Markdown 文件中使用 YAML frontmatter，使用 gray-matter 解析。Frontmatter 用于配置页面级元数据，可被主题和组件访问。

## 基本用法

Frontmatter 必须位于 Markdown 文件顶部，在三条虚线之间：

```markdown
---
title: Docs with VitePress
editLink: true
---
```

## 支持的格式

### YAML 格式（推荐）
```markdown
---
title: Docs with VitePress
editLink: true
lang: en-US
---
```

### JSON 格式
```markdown
---
{
  "title": "Blogging Like a Hacker",
  "editLink": true
}
---
```

## 访问 Frontmatter 数据

### 在 Markdown 中使用
通过 `$frontmatter` 全局变量访问：

```markdown
---
title: Docs with VitePress
editLink: true
---

# {{ $frontmatter.title }}

Guide content
```

### 在 Vue 组件中使用
使用 `useData()` 辅助函数：

```vue
<script setup>
import { useData } from 'vitepress'

const { page } = useData()
</script>

<pre>{{ page }}</pre>
```

输出示例：
```json
{
  "path": "/using-vue.html",
  "title": "Using Vue in Markdown",
  "frontmatter": {
    "title": "Docs with VitePress",
    "editLink": true
  }
}
```

## 常用 Frontmatter 配置

### 页面标题
```markdown
---
title: 页面标题
---
```

### 编辑链接
```markdown
---
editLink: true
---
```

### 语言设置
```markdown
---
lang: zh-CN
---
```

### 布局设置
```markdown
---
layout: home
---
```

可选值：
- `doc` - 文档布局（默认）
- `home` - 首页布局
- `page` - 页面布局

### 侧边栏控制
```markdown
---
sidebar: false
---
```

### 大纲控制
```markdown
---
outline: deep
---
```

或禁用：
```markdown
---
outline: false
---
```

### 导航栏控制
```markdown
---
navbar: false
---
```

### 最后更新时间
```markdown
---
lastUpdated: false
---
```

### 页面描述
```markdown
---
description: 页面描述信息
---
```

## 自定义 Frontmatter 数据

可以定义自己的 frontmatter 数据，在页面中使用：

```markdown
---
author: John Doe
date: 2024-01-01
tags:
  - vue
  - vitepress
---

<script setup>
import { useData } from 'vitepress'
const { frontmatter } = useData()
</script>

作者: {{ frontmatter.author }}
日期: {{ frontmatter.date }}
标签: {{ frontmatter.tags.join(', ') }}
```

## 覆盖站点配置

Frontmatter 可以覆盖站点或主题配置中的选项：

```markdown
---
# 覆盖 editLink
editLink: false

# 覆盖 lastUpdated
lastUpdated: true

# 覆盖 aside
aside: false

# 覆盖 outline
outline: 2
---
```

## 注意事项

1. Frontmatter 必须放在文件最顶部
2. 必须在任何元素之前（包括 `<script>` 标签）
3. 使用有效的 YAML 或 JSON 格式
4. 布尔值不需要引号
5. 字符串值可以带引号也可以不带
