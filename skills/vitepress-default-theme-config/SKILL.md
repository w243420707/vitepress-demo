---
name: "vitepress-default-theme-config"
description: "VitePress default theme configuration including logo, siteTitle, outline, socialLinks, and appearance. Invoke when user needs to configure default theme settings."
---

# VitePress 默认主题配置 Skill

## 概述

默认主题配置控制 VitePress 默认主题的行为和外观，在 `themeConfig` 中定义。

## 基本配置

```js
import { defineConfig } from 'vitepress'

export default defineConfig({
  themeConfig: {
    // 主题配置
  }
})
```

## Logo

### 基本用法

```js
export default defineConfig({
  themeConfig: {
    logo: '/logo.svg'
  }
})
```

### 深色/浅色模式

```js
export default defineConfig({
  themeConfig: {
    logo: {
      light: '/logo-light.svg',
      dark: '/logo-dark.svg'
    }
  }
})
```

### 带文本

```js
export default defineConfig({
  themeConfig: {
    logo: {
      src: '/logo.svg',
      alt: 'My Logo'
    }
  }
})
```

## Site Title

### 自定义标题

```js
export default defineConfig({
  themeConfig: {
    siteTitle: 'My Custom Title'
  }
})
```

### 禁用标题

```js
export default defineConfig({
  themeConfig: {
    siteTitle: false
  }
})
```

## Outline

### 启用/禁用大纲

```js
export default defineConfig({
  themeConfig: {
    outline: {
      level: 2,
      label: 'On this page'
    }
  }
})
```

### 配置选项

| 选项 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `level` | `number \| [number, number] \| 'deep'` | `2` | 显示的标题级别 |
| `label` | `string` | `'On this page'` | 大纲标题 |

### 示例

```js
export default defineConfig({
  themeConfig: {
    outline: {
      level: [2, 4],      // 显示 h2 到 h4
      label: '页面目录'
    }
  }
})
```

## Social Links

### 基本用法

```js
export default defineConfig({
  themeConfig: {
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
      { icon: 'twitter', link: 'https://twitter.com/vitepress' },
      { icon: 'discord', link: 'https://discord.com/vitepress' }
    ]
  }
})
```

### 可用图标

- `github`
- `twitter`
- `discord`
- `facebook`
- `linkedin`
- `instagram`
- `youtube`
- `slack`
- `gitlab`
- `bitbucket`
- `stackoverflow`
- `dribbble`

### 自定义图标

```js
export default defineConfig({
  themeConfig: {
    socialLinks: [
      {
        icon: {
          svg: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Dribbble</title><path d="M12...6.38z"/></svg>'
        },
        link: 'https://dribbble.com',
        ariaLabel: 'Dribbble'
      }
    ]
  }
})
```

## Appearance

### 启用深色模式

```js
export default defineConfig({
  themeConfig: {
    appearance: true
  }
})
```

### 默认深色

```js
export default defineConfig({
  themeConfig: {
    appearance: 'dark'
  }
})
```

### 禁用切换

```js
export default defineConfig({
  themeConfig: {
    appearance: false
  }
})
```

## Last Updated

### 启用

```js
export default defineConfig({
  themeConfig: {
    lastUpdated: {
      text: '最后更新',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'short'
      }
    }
  }
})
```

### 禁用

```js
export default defineConfig({
  themeConfig: {
    lastUpdated: false
  }
})
```

## Edit Link

### 基本配置

```js
export default defineConfig({
  themeConfig: {
    editLink: {
      pattern: 'https://github.com/vuejs/vitepress/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页'
    }
  }
})
```

### 禁用

```js
export default defineConfig({
  themeConfig: {
    editLink: false
  }
})
```

## Doc Footer

### 自定义页脚

```js
export default defineConfig({
  themeConfig: {
    docFooter: {
      prev: '上一页',
      next: '下一页'
    }
  }
})
```

### 禁用

```js
export default defineConfig({
  themeConfig: {
    docFooter: false
  }
})
```

## External Link Icon

### 启用

```js
export default defineConfig({
  themeConfig: {
    externalLinkIcon: true
  }
})
```

### 自定义图标

```js
export default defineConfig({
  themeConfig: {
    externalLinkIcon: {
      svg: '<svg>...</svg>'
    }
  }
})
```

## Return to Top Button

### 启用

```js
export default defineConfig({
  themeConfig: {
    returnToTop: {
      label: '返回顶部'
    }
  }
})
```

### 禁用

```js
export default defineConfig({
  themeConfig: {
    returnToTop: false
  }
})
```

## 完整示例

```js
import { defineConfig } from 'vitepress'

export default defineConfig({
  themeConfig: {
    // Logo
    logo: '/logo.svg',
    
    // 站点标题
    siteTitle: 'My Documentation',
    
    // 大纲
    outline: {
      level: [2, 3],
      label: '页面目录'
    },
    
    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/username/repo' },
      { icon: 'twitter', link: 'https://twitter.com/username' }
    ],
    
    // 外观
    appearance: true,
    
    // 最后更新
    lastUpdated: {
      text: '最后更新',
      formatOptions: {
        dateStyle: 'medium'
      }
    },
    
    // 编辑链接
    editLink: {
      pattern: 'https://github.com/username/repo/edit/main/docs/:path',
      text: '在 GitHub 上编辑'
    },
    
    // 页脚
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    
    // 外部链接图标
    externalLinkIcon: true,
    
    // 返回顶部
    returnToTop: {
      label: '返回顶部'
    }
  }
})
```

## 类型定义

```typescript
import type { DefaultTheme } from 'vitepress'

export default defineConfig({
  themeConfig: {
    // 类型提示
  } satisfies DefaultTheme.Config
})
```

## 注意事项

1. 所有配置都是可选的
2. 可以在 frontmatter 中覆盖某些配置
3. 多语言配置时，每个 locale 可以有自己的 themeConfig
4. 使用 `satisfies DefaultTheme.Config` 获得类型检查
