---
name: "vitepress-default-theme-sidebar"
description: "VitePress default theme sidebar configuration including groups, collapsible sections, and multi-path sidebars. Invoke when user needs to configure the site sidebar."
---

# VitePress 默认主题侧边栏 Skill

## 概述

侧边栏配置控制站点左侧导航菜单的行为和外观。

## 基本配置

```js
export default defineConfig({
  themeConfig: {
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Introduction', link: '/guide/' },
          { text: 'Getting Started', link: '/guide/getting-started' }
        ]
      }
    ]
  }
})
```

## 侧边栏类型

### 数组形式

```js
sidebar: [
  {
    text: 'Guide',
    items: [
      { text: 'Introduction', link: '/guide/' },
      { text: 'Getting Started', link: '/guide/getting-started' }
    ]
  }
]
```

### 对象形式（多路径）

```js
sidebar: {
  '/guide/': [
    {
      text: 'Guide',
      items: [
        { text: 'Introduction', link: '/guide/' },
        { text: 'Getting Started', link: '/guide/getting-started' }
      ]
    }
  ],
  '/api/': [
    {
      text: 'API Reference',
      items: [
        { text: 'Components', link: '/api/components' },
        { text: 'Utilities', link: '/api/utilities' }
      ]
    }
  ]
}
```

## 侧边栏项属性

### text

- **类型**: `string`
- **说明**: 侧边栏项文本

```js
{ text: 'Introduction', link: '/guide/' }
```

### link

- **类型**: `string`
- **说明**: 侧边栏项链接

```js
{ text: 'Introduction', link: '/guide/' }
```

### collapsed

- **类型**: `boolean`
- **说明**: 是否默认折叠

```js
{
  text: 'Advanced',
  items: [...],
  collapsed: true  // 默认折叠
}
```

### items

- **类型**: `SidebarItem[]`
- **说明**: 子项数组

```js
{
  text: 'Guide',
  items: [
    { text: 'Introduction', link: '/guide/' },
    { text: 'Getting Started', link: '/guide/getting-started' }
  ]
}
```

## 完整示例

```js
import { defineConfig } from 'vitepress'

export default defineConfig({
  themeConfig: {
    sidebar: [
      {
        text: '开始',
        items: [
          { text: '介绍', link: '/guide/' },
          { text: '快速开始', link: '/guide/getting-started' }
        ]
      },
      {
        text: '核心概念',
        items: [
          { text: '组件', link: '/guide/components/' },
          { text: '指令', link: '/guide/directives/' },
          { text: '插件', link: '/guide/plugins/' }
        ]
      },
      {
        text: '高级',
        collapsed: true,
        items: [
          { text: '性能优化', link: '/guide/performance/' },
          { text: '部署', link: '/guide/deployment/' },
          { text: '自定义主题', link: '/guide/custom-theme/' }
        ]
      }
    ]
  }
})
```

## 多路径侧边栏

### 不同路径不同侧边栏

```js
sidebar: {
  '/guide/': [
    {
      text: 'Guide',
      items: [
        { text: 'Introduction', link: '/guide/' },
        { text: 'Getting Started', link: '/guide/getting-started' }
      ]
    }
  ],
  '/api/': [
    {
      text: 'API',
      items: [
        { text: 'Components', link: '/api/components' },
        { text: 'Utilities', link: '/api/utilities' }
      ]
    }
  ]
}
```

### 嵌套路径

```js
sidebar: {
  '/guide/': [
    {
      text: 'Guide',
      items: [
        { text: 'Introduction', link: '/guide/' },
        { text: 'Getting Started', link: '/guide/getting-started' }
      ]
    }
  ],
  '/guide/advanced/': [
    {
      text: 'Advanced',
      items: [
        { text: 'Performance', link: '/guide/advanced/performance' },
        { text: 'Deployment', link: '/guide/advanced/deployment' }
      ]
    }
  ]
}
```

## 可折叠分组

### 默认展开

```js
{
  text: 'Advanced',
  collapsed: false,
  items: [...]
}
```

### 默认折叠

```js
{
  text: 'Advanced',
  collapsed: true,
  items: [...]
}
```

### 可折叠但不指定状态

```js
{
  text: 'Advanced',
  items: [...]
}
```

## 多语言侧边栏

### 每种语言独立配置

```js
export default defineConfig({
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      themeConfig: {
        sidebar: [
          {
            text: '指南',
            items: [
              { text: '介绍', link: '/' },
              { text: '快速开始', link: '/getting-started' }
            ]
          }
        ]
      }
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      themeConfig: {
        sidebar: [
          {
            text: 'Guide',
            items: [
              { text: 'Introduction', link: '/en/' },
              { text: 'Getting Started', link: '/en/getting-started' }
            ]
          }
        ]
      }
    }
  }
})
```

## 禁用侧边栏

### 全局禁用

```js
export default defineConfig({
  themeConfig: {
    sidebar: false
  }
})
```

### 页面级别禁用

```markdown
---
sidebar: false
---
```

## 自动生成侧边栏

### 使用数据加载

```js
// sidebar.data.js
import { createContentLoader } from 'vitepress'

export default createContentLoader('guide/*.md', {
  transform(data) {
    return data.map(item => ({
      text: item.frontmatter.title,
      link: item.url
    }))
  }
})
```

### 在配置中使用

```js
import { data as sidebarItems } from './sidebar.data'

export default defineConfig({
  themeConfig: {
    sidebar: [
      {
        text: 'Guide',
        items: sidebarItems
      }
    ]
  }
})
```

## 侧边栏行为

### 自动高亮

当前页面对应的侧边栏项会自动高亮。

### 自动展开

包含当前页面的分组会自动展开。

### 滚动到活动项

侧边栏会自动滚动到当前页面位置。

## 样式自定义

### 自定义 CSS

```css
/* 自定义侧边栏样式 */
.VPSidebar {
  background-color: var(--vp-c-bg-soft);
}

.VPSidebarItem {
  color: var(--vp-c-text-1);
}

.VPSidebarItem.active {
  color: var(--vp-c-brand-1);
}
```

## 最佳实践

1. **逻辑分组** - 按功能或主题组织侧边栏项
2. **控制深度** - 避免过深的嵌套
3. **清晰命名** - 使用简短明确的文本
4. **可折叠** - 对不常用的分组使用折叠
5. **多路径** - 为不同路径配置不同侧边栏
6. **多语言** - 为每种语言配置独立侧边栏

## 注意事项

1. 侧边栏项必须包含 `text` 和 `link` 属性
2. 分组使用 `items` 数组
3. 可以使用数组或对象形式配置
4. 对象形式支持多路径侧边栏
5. 折叠状态可以全局或局部控制
6. 在 frontmatter 中可以禁用侧边栏
