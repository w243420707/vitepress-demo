---
name: "vitepress-default-theme-features"
description: "VitePress default theme features including search, edit link, last updated, prev/next links, and carbon ads. Invoke when user needs to configure theme features."
---

# VitePress 默认主题特性 Skill

## 概述

默认主题提供多种特性，包括搜索、编辑链接、最后更新时间、上下页导航等。

## 搜索

### 本地搜索

```js
export default defineConfig({
  themeConfig: {
    search: {
      provider: 'local'
    }
  }
})
```

### Algolia 搜索

```js
export default defineConfig({
  themeConfig: {
    search: {
      provider: 'algolia',
      options: {
        appId: 'YOUR_APP_ID',
        apiKey: 'YOUR_SEARCH_API_KEY',
        indexName: 'YOUR_INDEX_NAME',
        locales: {
          zh: {
            placeholder: '搜索文档...',
            translations: {
              button: {
                buttonText: '搜索',
                buttonAriaLabel: '搜索'
              },
              modal: {
                searchBox: {
                  resetButtonTitle: '清除搜索',
                  resetButtonAriaLabel: '清除搜索',
                  cancelButtonText: '取消',
                  cancelButtonAriaLabel: '取消'
                },
                startScreen: {
                  recentSearchesTitle: '最近搜索',
                  noRecentSearchesText: '没有最近搜索',
                  saveRecentSearchButtonTitle: '保存此搜索',
                  removeRecentSearchButtonTitle: '从历史中移除此搜索',
                  favoriteSearchesTitle: '收藏',
                  removeFavoriteSearchButtonTitle: '从收藏中移除此搜索'
                },
                errorScreen: {
                  titleText: '无法获取结果',
                  helpText: '您可能需要检查您的网络连接。'
                },
                footer: {
                  selectText: '选择',
                  navigateText: '导航',
                  closeText: '关闭',
                  searchByText: '搜索提供'
                },
                  noResultsScreen: {
                    noResultsText: '没有找到结果',
                    suggestedQueryText: '您可以尝试查询',
                    reportMissingResultsText: '您认为此查询应该返回结果吗？',
                    reportMissingResultsLinkText: '点击此处报告。'
                  }
                }
          }
        }
      }
    }
  }
})
```

### 禁用搜索

```js
export default defineConfig({
  themeConfig: {
    search: false
  }
})
```

## 编辑链接

### 基本配置

```js
export default defineConfig({
  themeConfig: {
    editLink: {
      pattern: 'https://github.com/username/repo/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页'
    }
  }
})
```

### 多语言配置

```js
export default defineConfig({
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      themeConfig: {
        editLink: {
          pattern: 'https://github.com/username/repo/edit/main/docs/:path',
          text: '在 GitHub 上编辑此页'
        }
      }
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      themeConfig: {
        editLink: {
          pattern: 'https://github.com/username/repo/edit/main/docs/en/:path',
          text: 'Edit this page on GitHub'
        }
      }
    }
  }
})
```

### 禁用编辑链接

```js
export default defineConfig({
  themeConfig: {
    editLink: false
  }
})
```

## 最后更新时间

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

### 自定义格式

```js
export default defineConfig({
  themeConfig: {
    lastUpdated: {
      text: '最后更新',
      formatOptions: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
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

## 上下页链接

### 全局配置

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

### 页面级别配置

```markdown
---
prev: './getting-started'
next: './advanced-usage'
---
```

### 自定义文本

```markdown
---
prev:
  text: 前一章
  link: ./chapter-1
next:
  text: 后一章
  link: ./chapter-3
---
```

### 禁用

```markdown
---
prev: false
next: false
---
```

## 团队页面

### 基本配置

```js
export default defineConfig({
  themeConfig: {
    team: [
      {
        avatar: 'https://www.github.com/user1.png',
        name: 'John Doe',
        title: 'Developer',
        links: [
          { icon: 'github', link: 'https://github.com/user1' },
          { icon: 'twitter', link: 'https://twitter.com/user1' }
        ]
      },
      {
        avatar: 'https://www.github.com/user2.png',
        name: 'Jane Smith',
        title: 'Designer',
        links: [
          { icon: 'github', link: 'https://github.com/user2' },
          { icon: 'linkedin', link: 'https://linkedin.com/in/user2' }
        ]
      }
    ]
  }
})
```

### 团队成员属性

| 属性 | 类型 | 说明 |
|------|------|------|
| `avatar` | `string` | 头像 URL |
| `name` | `string` | 成员姓名 |
| `title` | `string` | 职位/头衔 |
| `org` | `string` | 组织名称 |
| `orgLink` | `string` | 组织链接 |
| `desc` | `string` | 个人简介 |
| `links` | `SocialLink[]` | 社交链接 |
| `actionText` | `string` | 操作按钮文本 |
| `actionLink` | `string` | 操作按钮链接 |

### 使用团队页面

创建 `team.md` 文件：

```markdown
---
layout: page
---
```

访问 `/team/` 查看团队页面。

## Carbon Ads

### 基本配置

```js
export default defineConfig({
  themeConfig: {
    carbonAds: {
      code: 'YOUR_CARBON_CODE',
      placement: 'right'
    }
  }
})
```

### 配置选项

| 选项 | 类型 | 说明 |
|------|------|------|
| `code` | `string` | Carbon 广告代码 |
| `placement` | `'left' \| 'right'` | 广告位置 |

### 禁用

```js
export default defineConfig({
  themeConfig: {
    carbonAds: false
  }
})
```

## 外部链接图标

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

### 禁用

```js
export default defineConfig({
  themeConfig: {
    externalLinkIcon: false
  }
})
```

## 返回顶部按钮

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
    // 搜索
    search: {
      provider: 'local'
    },
    
    // 编辑链接
    editLink: {
      pattern: 'https://github.com/username/repo/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页'
    },
    
    // 最后更新
    lastUpdated: {
      text: '最后更新',
      formatOptions: {
        dateStyle: 'medium'
      }
    },
    
    // 上下页
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    
    // 团队
    team: [
      {
        avatar: 'https://www.github.com/user.png',
        name: 'John Doe',
        title: 'Developer',
        links: [
          { icon: 'github', link: 'https://github.com/user' }
        ]
      }
    ],
    
    // Carbon Ads
    carbonAds: {
      code: 'CE7I52Q7',
      placement: 'right'
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

## 最佳实践

1. **搜索优化** - 选择合适的搜索提供商
2. **编辑链接** - 提供清晰的编辑路径
3. **时间格式** - 使用用户友好的时间格式
4. **导航清晰** - 提供明确的上下页文本
5. **团队信息** - 保持团队信息简洁准确
6. **广告平衡** - 合理放置广告不影响用户体验

## 注意事项

1. 某些特性可能需要额外配置
2. 多语言时需要为每种语言配置
3. 搜索功能需要相应的提供商配置
4. Carbon Ads 需要在 Carbon 网站注册
5. 可以在 frontmatter 中覆盖某些配置
6. 所有特性都是可选的
