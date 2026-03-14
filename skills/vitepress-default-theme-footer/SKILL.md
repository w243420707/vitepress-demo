---
name: "vitepress-default-theme-footer"
description: "VitePress default theme footer configuration including copyright, message, and custom footer content. Invoke when user needs to configure the site footer."
---

# VitePress 默认主题页脚 Skill

## 概述

页脚配置控制站点底部的内容和样式。

## 基本配置

```js
export default defineConfig({
  themeConfig: {
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present John Doe'
    }
  }
})
```

## Footer 配置

### message

- **类型**: `string`
- **说明**: 页脚消息文本

```js
footer: {
  message: 'Released under the MIT License.'
}
```

### copyright

- **类型**: `string`
- **说明**: 版权信息

```js
footer: {
  copyright: 'Copyright © 2024-present John Doe'
}
```

## 完整示例

```js
import { defineConfig } from 'vitepress'

export default defineConfig({
  themeConfig: {
    footer: {
      message: '基于 MIT 协议发布',
      copyright: '版权所有 © 2024-present John Doe'
    }
  }
})
```

## 多语言页脚

### 中文页脚

```js
export default defineConfig({
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      themeConfig: {
        footer: {
          message: '基于 MIT 协议发布',
          copyright: '版权所有 © 2024-present John Doe'
        }
      }
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      themeConfig: {
        footer: {
          message: 'Released under the MIT License.',
          copyright: 'Copyright © 2024-present John Doe'
        }
      }
    }
  }
})
```

## 禁用页脚

### 全局禁用

```js
export default defineConfig({
  themeConfig: {
    footer: false
  }
})
```

### 页面级别禁用

```markdown
---
footer: false
---
```

## 自定义页脚内容

### 使用插槽

```vue
<!-- .vitepress/theme/Layout.vue -->
<script setup>
import DefaultTheme from 'vitepress/theme'
</script>

<template>
  <DefaultTheme.Layout>
    <template #layout-bottom>
      <div class="custom-footer">
        <p>Custom footer content</p>
      </div>
    </template>
  </DefaultTheme.Layout>
</template>
```

### 自定义样式

```css
.custom-footer {
  background-color: var(--vp-c-bg-soft);
  padding: 2rem;
  text-align: center;
}
```

## 页脚布局

### 默认布局

页脚内容居中显示，包含消息和版权信息。

### 响应式设计

页脚在不同屏幕尺寸下自动调整布局。

## 样式自定义

### 自定义页脚样式

```css
.VPFooter {
  background-color: var(--vp-c-bg-soft);
  border-top: 1px solid var(--vp-c-divider);
}

.VPFooter .message {
  color: var(--vp-c-text-2);
}

.VPFooter .copyright {
  color: var(--vp-c-text-2);
  font-size: 0.875rem;
}
```

### 深色模式适配

```css
.dark .VPFooter {
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}
```

## 最佳实践

1. **简洁信息** - 页脚信息不宜过长
2. **版权信息** - 包含年份和作者
3. **许可证信息** - 明确说明使用的许可证
4. **多语言适配** - 为每种语言提供本地化页脚
5. **链接添加** - 可以在页脚添加重要链接
6. **保持一致** - 确保页脚风格与整体主题一致

## 注意事项

1. 页脚配置是可选的
2. 可以在 frontmatter 中覆盖
3. 支持多语言配置
4. 页脚自动适应深色模式
5. 可以使用插槽自定义页脚内容
6. 可以完全禁用页脚
