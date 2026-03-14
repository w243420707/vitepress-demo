---
name: "vitepress-default-theme-home-page"
description: "VitePress default theme home page configuration including hero section, features, and actions. Invoke when user needs to configure the site homepage."
---

# VitePress 默认主题首页 Skill

## 概述

首页布局 (`layout: home`) 提供了 hero 区域和特性展示，用于创建吸引人的站点首页。

## 基本配置

### 设置首页布局

```markdown
---
layout: home
---
```

### Hero 区域

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
      link: https://github.com/username/repo

features:
  - title: Feature A
    details: Description of feature A
  - title: Feature B
    details: Description of feature B
---
```

## Hero 配置

### name

- **类型**: `string`
- **说明**: 项目名称

```markdown
hero:
  name: My Awesome Project
```

### text

- **类型**: `string`
- **说明**: 主标题文本

```markdown
hero:
  text: A VitePress Site
```

### tagline

- **类型**: `string`
- **说明**: 副标题/标语

```markdown
hero:
  tagline: Build better documentation faster
```

### image

- **类型**: `string | { src: string, alt?: string }`
- **说明**: Hero 图片

```markdown
hero:
  image:
    src: /hero-image.png
    alt: Hero Image
```

### actions

- **类型**: `Action[]`
- **说明**: 按钮操作

```markdown
hero:
  actions:
    - theme: brand
      text: Get Started
      link: /guide/
    - theme: alt
      text: Learn More
      link: /about/
```

#### Action 配置

| 属性 | 类型 | 说明 |
|------|------|------|
| `theme` | `'brand' \| 'alt'` | 按钮主题 |
| `text` | `string` | 按钮文本 |
| `link` | `string` | 按钮链接 |

## Features 配置

### 基本用法

```markdown
features:
  - title: Feature A
    details: Description of feature A
  - title: Feature B
    details: Description of feature B
  - title: Feature C
    details: Description of feature C
```

### Feature 配置

| 属性 | 类型 | 说明 |
|------|------|------|
| `title` | `string` | 特性标题 |
| `details` | `string` | 特性描述 |
| `icon` | `string | Component` | 特性图标 |
| `link` | `string` | 特性链接 |

### 使用图标

```markdown
features:
  - title: Fast
    details: Lightning fast build times
    icon: ⚡
  - title: Easy
    details: Simple and intuitive
    icon: 🎯
  - title: Powerful
    details: Full-featured documentation
    icon: 💪
```

### 使用链接

```markdown
features:
  - title: Fast
    details: Lightning fast build times
    link: /performance/
  - title: Easy
    details: Simple and intuitive
    link: /getting-started/
```

## 完整示例

```markdown
---
layout: home

hero:
  name: My Documentation
  text: Build Better Documentation
  tagline: The modern static site generator for Vue
  image:
    src: /hero.png
    alt: Hero Image
  actions:
    - theme: brand
      text: Get Started
      link: /guide/
    - theme: alt
      text: View on GitHub
      link: https://github.com/username/repo
    - theme: alt
      text: View Demo
      link: /demo/

features:
  - title: 🚀 Fast
    details: Lightning fast build times with Vite
    link: /guide/performance/
  - title: 📝 Easy
    details: Write in Markdown, get a beautiful site
    link: /guide/markdown/
  - title: 🎨 Customizable
    details: Full theme customization support
    link: /guide/custom-theme/
  - title: 🔍 SEO Friendly
    details: Optimized for search engines
    link: /guide/seo/
  - title: 📱 Responsive
    details: Perfect on all devices
    link: /guide/responsive/
  - title: 🌍 i18n Ready
    details: Built-in internationalization
    link: /guide/i18n/
---
```

## 多语言首页

### 中文首页

```markdown
---
layout: home

hero:
  name: 我的文档
  text: 构建更好的文档
  tagline: 现代化的 Vue 静态站点生成器
  actions:
    - theme: brand
      text: 开始使用
      link: /guide/
    - theme: alt
      text: 查看 GitHub
      link: https://github.com/username/repo

features:
  - title: 🚀 快速
    details: 基于 Vite 的极速构建
  - title: 📝 简单
    details: 用 Markdown 编写，获得精美站点
  - title: 🎨 可定制
    details: 完整的主题自定义支持
---
```

### 英文首页

```markdown
---
layout: home

hero:
  name: My Docs
  text: Build Better Documentation
  tagline: Modern static site generator for Vue
  actions:
    - theme: brand
      text: Get Started
      link: /guide/
    - theme: alt
      text: View on GitHub
      link: https://github.com/username/repo

features:
  - title: 🚀 Fast
    details: Lightning fast build times
  - title: 📝 Easy
    details: Write in Markdown
  - title: 🎨 Customizable
    details: Full theme support
---
```

## 样式自定义

### 自定义 Hero 样式

```css
.VPHero {
  background-color: var(--vp-c-brand-soft);
}

.VPHero .name {
  font-size: 3rem;
}

.VPHero .text {
  font-size: 1.5rem;
}
```

### 自定义 Features 样式

```css
.VPFeature {
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
}

.VPFeature .icon {
  font-size: 2rem;
}
```

## 插槽使用

### 扩展首页

```vue
<!-- .vitepress/theme/Layout.vue -->
<script setup>
import DefaultTheme from 'vitepress/theme'
</script>

<template>
  <DefaultTheme.Layout>
    <template #home-hero-before>
      Custom hero before content
    </template>
    <template #home-hero-info-before>
      Custom hero info before
    </template>
    <template #home-hero-info-after>
      Custom hero info after
    </template>
    <template #home-features-before>
      Custom features before
    </template>
    <template #home-features-after>
      Custom features after
    </template>
  </DefaultTheme.Layout>
</template>
```

## 最佳实践

1. **简洁明了** - Hero 文本要简短有力
2. **突出价值** - 强调核心特性和优势
3. **清晰行动** - 提供明确的行动按钮
4. **视觉平衡** - 合理安排 Hero 和 Features
5. **响应式设计** - 确保在所有设备上良好显示
6. **多语言适配** - 为每种语言提供本地化内容

## 注意事项

1. 必须设置 `layout: home`
2. Hero 和 Features 都可以独立配置
3. 图片路径相对于 public 目录
4. Actions 支持多个按钮
5. 可以使用 emoji 或自定义图标
6. 插槽可用于扩展首页布局
