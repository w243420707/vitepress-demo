---
name: "vitepress-default-theme-layout"
description: "VitePress default theme layout configuration including doc, home, page layouts and layout slots. Invoke when user needs to configure page layouts or use layout slots."
---

# VitePress 默认主题布局 Skill

## 概述

VitePress 默认主题提供三种布局类型：`doc`、`home` 和 `page`，以及多个可用的插槽用于自定义内容注入。

## 布局类型

### Doc 布局（默认）

标准的文档布局，包含侧边栏和大纲。

```markdown
---
layout: doc
---
```

### Home 布局

首页布局，包含 hero 区域和特性展示。

```markdown
---
layout: home
---
```

### Page 布局

纯页面布局，无侧边栏。

```markdown
---
layout: page
---
```

## Doc 布局

### 基本用法

```markdown
---
layout: doc
---

# My Document

Content goes here...
```

### Doc 布局结构

- 顶部：导航栏
- 左侧：侧边栏
- 中间：文档内容
- 右侧：大纲（目录）
- 底部：页脚

### Doc 布局插槽

| 插槽名 | 位置 | 说明 |
|--------|------|------|
| `doc-top` | 文档顶部 | 在文档内容之前 |
| `doc-bottom` | 文档底部 | 在文档内容之后 |
| `doc-footer-before` | 文档页脚之前 | 在上一页/下一页之前 |
| `doc-before` | 文档内容之前 | 在实际内容之前 |
| `doc-after` | 文档内容之后 | 在实际内容之后 |
| `sidebar-nav-before` | 侧边栏导航之前 | 在侧边栏顶部 |
| `sidebar-nav-after` | 侧边栏导航之后 | 在侧边栏底部 |
| `aside-top` | 右侧边栏顶部 | 在大纲之前 |
| `aside-bottom` | 右侧边栏底部 | 在大纲之后 |
| `aside-outline-before` | 大纲之前 | 在目录之前 |
| `aside-outline-after` | 大纲之后 | 在目录之后 |
| `aside-ads-before` | 广告之前 | 在广告位之前 |
| `aside-ads-after` | 广告之后 | 在广告位之后 |

### 使用 Doc 布局插槽

```vue
<!-- .vitepress/theme/Layout.vue -->
<script setup>
import DefaultTheme from 'vitepress/theme'
</script>

<template>
  <DefaultTheme.Layout>
    <template #doc-top>
      <div class="custom-top">Custom top content</div>
    </template>
    <template #doc-after>
      <div class="custom-bottom">Custom bottom content</div>
    </template>
  </DefaultTheme.Layout>
</template>
```

## Home 布局

### 基本用法

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

features:
  - title: Feature A
    details: Description of feature A
  - title: Feature B
    details: Description of feature B
---
```

### Home 布局插槽

| 插槽名 | 位置 | 说明 |
|--------|------|------|
| `home-hero-before` | Hero 区域之前 | 在 hero 内容之前 |
| `home-hero-info-before` | Hero 信息之前 | 在 hero 标题之前 |
| `home-hero-info` | Hero 信息 | 替换 hero 标题内容 |
| `home-hero-info-after` | Hero 信息之后 | 在 hero 标题之后 |
| `home-hero-actions-after` | Hero 按钮之后 | 在按钮之后 |
| `home-hero-image` | Hero 图片 | 替换 hero 图片 |
| `home-hero-after` | Hero 区域之后 | 在整个 hero 之后 |
| `home-features-before` | 特性区域之前 | 在 features 之前 |
| `home-features-after` | 特性区域之后 | 在 features 之后 |

### 使用 Home 布局插槽

```vue
<!-- .vitepress/theme/Layout.vue -->
<script setup>
import DefaultTheme from 'vitepress/theme'
</script>

<template>
  <DefaultTheme.Layout>
    <template #home-hero-before>
      <div class="banner">Special announcement!</div>
    </template>
    <template #home-features-after>
      <div class="cta">Call to action</div>
    </template>
  </DefaultTheme.Layout>
</template>
```

## Page 布局

### 基本用法

```markdown
---
layout: page
---

# Custom Page

This is a custom page without sidebar...
```

### Page 布局结构

- 顶部：导航栏
- 中间：页面内容
- 底部：页脚

### Page 布局插槽

| 插槽名 | 位置 | 说明 |
|--------|------|------|
| `page-top` | 页面顶部 | 在页面内容之前 |
| `page-bottom` | 页面底部 | 在页面内容之后 |

### 使用 Page 布局插槽

```vue
<!-- .vitepress/theme/Layout.vue -->
<script setup>
import DefaultTheme from 'vitepress/theme'
</script>

<template>
  <DefaultTheme.Layout>
    <template #page-top>
      <div class="page-header">Custom header</div>
    </template>
    <template #page-bottom>
      <div class="page-footer">Custom footer</div>
    </template>
  </DefaultTheme.Layout>
</template>
```

## 404 页面

### 404 插槽

| 插槽名 | 位置 | 说明 |
|--------|------|------|
| `not-found` | 404 内容 | 替换默认 404 页面 |

### 自定义 404 页面

```vue
<!-- .vitepress/theme/Layout.vue -->
<script setup>
import DefaultTheme from 'vitepress/theme'
</script>

<template>
  <DefaultTheme.Layout>
    <template #not-found>
      <div class="custom-404">
        <h1>404</h1>
        <p>Page not found</p>
        <a href="/">Go Home</a>
      </div>
    </template>
  </DefaultTheme.Layout>
</template>
```

## 全局插槽

### 全局插槽列表

| 插槽名 | 位置 | 说明 |
|--------|------|------|
| `layout-top` | 布局最顶部 | 在所有内容之前 |
| `layout-bottom` | 布局最底部 | 在所有内容之后 |
| `nav-bar-title-before` | 导航栏标题之前 | 在 logo 之前 |
| `nav-bar-title-after` | 导航栏标题之后 | 在 logo 之后 |
| `nav-bar-content-before` | 导航栏内容之前 | 在导航项之前 |
| `nav-bar-content-after` | 导航栏内容之后 | 在导航项之后 |
| `nav-screen-content-before` | 移动端导航内容之前 | 在移动端菜单之前 |
| `nav-screen-content-after` | 移动端导航内容之后 | 在移动端菜单之后 |

### 使用全局插槽

```vue
<!-- .vitepress/theme/Layout.vue -->
<script setup>
import DefaultTheme from 'vitepress/theme'
</script>

<template>
  <DefaultTheme.Layout>
    <template #layout-top>
      <div class="top-banner">Top banner</div>
    </template>
    <template #nav-bar-content-after>
      <div class="search-enhanced">Enhanced search</div>
    </template>
  </DefaultTheme.Layout>
</template>
```

## 插槽使用模式

### 单插槽

```vue
<DefaultTheme.Layout>
  <template #doc-top>
    <div>Content</div>
  </template>
</DefaultTheme.Layout>
```

### 多插槽

```vue
<DefaultTheme.Layout>
  <template #doc-top>
    <div>Top content</div>
  </template>
  <template #doc-bottom>
    <div>Bottom content</div>
  </template>
</DefaultTheme.Layout>
```

### 条件插槽

```vue
<script setup>
import { useData } from 'vitepress'
const { page } = useData()
</script>

<template>
  <DefaultTheme.Layout>
    <template v-if="page.frontmatter.showBanner" #doc-top>
      <div class="banner">Special banner</div>
    </template>
  </DefaultTheme.Layout>
</template>
```

## 样式自定义

### 自定义布局样式

```css
/* 自定义文档布局 */
.VPDoc {
  max-width: 1200px;
}

/* 自定义首页布局 */
.VPHome {
  padding: 2rem 0;
}

/* 自定义页面布局 */
.VPPage {
  max-width: 800px;
}
```

### 自定义插槽内容

```css
.custom-top {
  background-color: var(--vp-c-brand-soft);
  padding: 1rem;
  margin-bottom: 1rem;
}
```

## 最佳实践

1. **选择合适的插槽** - 根据需要选择正确的插槽位置
2. **保持简洁** - 插槽内容不宜过多
3. **响应式设计** - 确保自定义内容在所有设备上良好显示
4. **性能考虑** - 避免在插槽中使用复杂组件
5. **样式隔离** - 使用 CSS 变量保持主题一致性
6. **条件渲染** - 根据页面类型或 frontmatter 控制插槽内容

## 注意事项

1. 插槽只在特定布局下可用
2. 全局插槽在所有布局中都可用
3. 插槽内容会自动适应深色模式
4. 可以使用多个插槽同时注入内容
5. 插槽内容会被包裹在主题容器中
6. 某些插槽可能为空（如无广告时）
