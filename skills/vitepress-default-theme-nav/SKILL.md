---
name: "vitepress-default-theme-nav"
description: "VitePress default theme navigation bar configuration including nav items, dropdown menus, and custom links. Invoke when user needs to configure the site navigation."
---

# VitePress 默认主题导航栏 Skill

## 概述

导航栏配置控制站点顶部导航菜单的行为和外观。

## 基本配置

```js
export default defineConfig({
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' }
    ]
  }
})
```

## 导航项类型

### 简单链接

```js
nav: [
  { text: 'Home', link: '/' },
  { text: 'Guide', link: '/guide/' }
]
```

### 下拉菜单

```js
nav: [
  {
    text: 'Resources',
    items: [
      { text: 'Guide', link: '/guide/' },
      { text: 'API', link: '/api/' },
      { text: 'Examples', link: '/examples/' }
    ]
  }
]
```

### 嵌套下拉菜单

```js
nav: [
  {
    text: 'Resources',
    items: [
      {
        text: 'Documentation',
        items: [
          { text: 'Guide', link: '/guide/' },
          { text: 'API', link: '/api/' }
        ]
      },
      { text: 'Examples', link: '/examples/' }
    ]
  }
]
```

## 导航项属性

### text

- **类型**: `string`
- **说明**: 导航项文本

```js
{ text: 'Home', link: '/' }
```

### link

- **类型**: `string | ((payload: PageData) => string)`
- **说明**: 导航项链接

```js
// 静态链接
{ text: 'Home', link: '/' }

// 动态链接
{
  text: 'Current Page',
  link: (payload) => payload.relativePath
}
```

### activeMatch

- **类型**: `string`
- **说明**: 激活匹配模式

```js
{
  text: 'Guide',
  link: '/guide/',
  activeMatch: '/guide/'  // 匹配 /guide/ 开头的路径
}
```

### target

- **类型**: `string`
- **说明**: 链接目标属性

```js
{
  text: 'External',
  link: 'https://example.com',
  target: '_blank'
}
```

### rel

- **类型**: `string`
- **说明**: 链接关系属性

```js
{
  text: 'External',
  link: 'https://example.com',
  rel: 'noopener noreferrer'
}
```

### noIcon

- **类型**: `boolean`
- **说明**: 隐藏外部链接图标

```js
{
  text: 'External',
  link: 'https://example.com',
  noIcon: true
}
```

## 完整示例

```js
import { defineConfig } from 'vitepress'

export default defineConfig({
  themeConfig: {
    nav: [
      // 简单链接
      { text: '首页', link: '/' },
      
      // 带激活匹配
      {
        text: '指南',
        link: '/guide/',
        activeMatch: '/guide/'
      },
      
      // 下拉菜单
      {
        text: '资源',
        items: [
          { text: '文档', link: '/docs/' },
          { text: 'API', link: '/api/' },
          { text: '示例', link: '/examples/' }
        ]
      },
      
      // 外部链接
      {
        text: 'GitHub',
        link: 'https://github.com/username/repo',
        target: '_blank',
        rel: 'noopener noreferrer'
      },
      
      // 嵌套菜单
      {
        text: '更多',
        items: [
          {
            text: '社区',
            items: [
              { text: '论坛', link: '/forum/' },
              { text: 'Discord', link: 'https://discord.gg/xxx' }
            ]
          },
          { text: '博客', link: '/blog/' }
        ]
      }
    ]
  }
})
```

## 多语言导航

### 每种语言独立配置

```js
export default defineConfig({
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      themeConfig: {
        nav: [
          { text: '首页', link: '/' },
          { text: '指南', link: '/guide/' }
        ]
      }
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'Guide', link: '/en/guide/' }
        ]
      }
    }
  }
})
```

## 动态导航

### 基于页面数据

```js
export default defineConfig({
  themeConfig: {
    nav: [
      {
        text: '当前页面',
        link: (payload) => payload.relativePath
      }
    ]
  }
})
```

### 条件显示

```js
export default defineConfig({
  themeConfig: {
    nav: (context) => {
      const items = [
        { text: '首页', link: '/' }
      ]
      
      if (context.site.themeConfig.showAdmin) {
        items.push({ text: '管理', link: '/admin/' })
      }
      
      return items
    }
  }
})
```

## 导航栏布局

### Logo 位置

Logo 显示在导航栏左侧。

### 导航项位置

导航项显示在 Logo 右侧。

### 语言切换器

语言切换器自动显示在导航栏右侧（当配置了多个 locale 时）。

### 社交链接

社交链接显示在导航栏右侧（当配置了 socialLinks 时）。

### 外观切换

深色模式切换按钮显示在导航栏右侧。

## 样式自定义

### 自定义 CSS

```css
/* 自定义导航栏样式 */
.VPNavBar {
  background-color: var(--vp-c-brand-1);
}

.VPNavBarTitle {
  color: white;
}
```

## 最佳实践

1. **保持简洁** - 导航项不宜过多
2. **逻辑分组** - 使用下拉菜单组织相关链接
3. **清晰命名** - 使用简短明确的文本
4. **外部链接** - 使用 `target="_blank"` 打开新标签
5. **激活状态** - 使用 `activeMatch` 控制高亮
6. **多语言** - 为每种语言配置独立导航

## 注意事项

1. 导航项必须包含 `text` 和 `link` 属性
2. 下拉菜单使用 `items` 数组
3. 外部链接会自动添加图标（除非设置 `noIcon: true`）
4. 可以使用函数动态生成导航项
5. 移动端会自动转换为汉堡菜单
