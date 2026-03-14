---
name: "vitepress-i18n"
description: "Configure multi-language support for VitePress with Chinese as default, supporting English, Japanese, Arabic, Russian, Korean, French, and German. Invoke when user asks to set up or modify i18n configuration."
---

# VitePress 国际化 (i18n) Skill

## 概述

VitePress 内置国际化支持，可以轻松创建多语言文档站点。

## 目录结构

```
docs/
├─ index.md           # 默认语言（中文）
├─ markdown-examples.md
├─ api-examples.md
├─ en/                # 英文
│  ├─ index.md
│  ├─ markdown-examples.md
│  └─ api-examples.md
├─ ja/                # 日语
│  └─ ...
├─ ar/                # 阿拉伯语
│  └─ ...
└─ ...
```

## 基本配置

在 `.vitepress/config.mjs` 中配置：

```javascript
import { defineConfig } from 'vitepress'

export default defineConfig({
  locales: {
    // 默认语言（中文）- 根路径
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      themeConfig: {
        nav: [
          { text: '首页', link: '/' },
          { text: '示例', link: '/markdown-examples' }
        ],
        sidebar: [
          {
            text: '示例',
            items: [
              { text: 'Markdown 示例', link: '/markdown-examples' },
              { text: '运行时 API 示例', link: '/api-examples' }
            ]
          }
        ]
      }
    },
    // 英文
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'Examples', link: '/en/markdown-examples' }
        ],
        sidebar: [
          {
            text: 'Examples',
            items: [
              { text: 'Markdown Examples', link: '/en/markdown-examples' },
              { text: 'Runtime API Examples', link: '/en/api-examples' }
            ]
          }
        ]
      }
    },
    // 日语
    ja: {
      label: '日本語',
      lang: 'ja-JP',
      link: '/ja/',
      themeConfig: {
        nav: [
          { text: 'ホーム', link: '/ja/' },
          { text: 'ガイド', link: '/ja/guide/' }
        ],
        sidebar: {
          '/ja/guide/': [
            {
              text: 'ガイド',
              items: [
                { text: 'はじめに', link: '/ja/guide/' },
                { text: 'クイックスタート', link: '/ja/guide/getting-started' }
              ]
            }
          ]
        }
      }
    },
    // 阿拉伯语
    ar: {
      label: 'العربية',
      lang: 'ar-SA',
      link: '/ar/',
      themeConfig: {
        nav: [
          { text: 'الرئيسية', link: '/ar/' },
          { text: 'دليل', link: '/ar/guide/' }
        ],
        sidebar: {
          '/ar/guide/': [
            {
              text: 'دليل',
              items: [
                { text: 'مقدمة', link: '/ar/guide/' },
                { text: 'البدء السريع', link: '/ar/guide/getting-started' }
              ]
            }
          ]
        }
      }
    },
    // 俄语
    ru: {
      label: 'Русский',
      lang: 'ru-RU',
      link: '/ru/',
      themeConfig: {
        nav: [
          { text: 'Главная', link: '/ru/' },
          { text: 'Руководство', link: '/ru/guide/' }
        ],
        sidebar: {
          '/ru/guide/': [
            {
              text: 'Руководство',
              items: [
                { text: 'Введение', link: '/ru/guide/' },
                { text: 'Быстрый старт', link: '/ru/guide/getting-started' }
              ]
            }
          ]
        }
      }
    },
    // 韩语
    ko: {
      label: '한국어',
      lang: 'ko-KR',
      link: '/ko/',
      themeConfig: {
        nav: [
          { text: '홈', link: '/ko/' },
          { text: '가이드', link: '/ko/guide/' }
        ],
        sidebar: {
          '/ko/guide/': [
            {
              text: '가이드',
              items: [
                { text: '소개', link: '/ko/guide/' },
                { text: '빠른 시작', link: '/ko/guide/getting-started' }
              ]
            }
          ]
        }
      }
    },
    // 法语
    fr: {
      label: 'Français',
      lang: 'fr-FR',
      link: '/fr/',
      themeConfig: {
        nav: [
          { text: 'Accueil', link: '/fr/' },
          { text: 'Guide', link: '/fr/guide/' }
        ],
        sidebar: {
          '/fr/guide/': [
            {
              text: 'Guide',
              items: [
                { text: 'Introduction', link: '/fr/guide/' },
                { text: 'Démarrage rapide', link: '/fr/guide/getting-started' }
              ]
            }
          ]
        }
      }
    },
    // 德语
    de: {
      label: 'Deutsch',
      lang: 'de-DE',
      link: '/de/',
      themeConfig: {
        nav: [
          { text: 'Startseite', link: '/de/' },
          { text: 'Anleitung', link: '/de/guide/' }
        ],
        sidebar: {
          '/de/guide/': [
            {
              text: 'Anleitung',
              items: [
                { text: 'Einführung', link: '/de/guide/' },
                { text: 'Schnellstart', link: '/de/guide/getting-started' }
              ]
            }
          ]
        }
      }
    }
  },
  
  themeConfig: {
    search: {
      provider: 'local'
    }
  }
})
```

## 可覆盖的 Locale 属性

每个 locale 可以覆盖以下属性：

```typescript
interface LocaleSpecificConfig<ThemeConfig = any> {
  lang?: string           // 语言代码
  dir?: string            // 文本方向 (ltr/rtl)
  title?: string          // 站点标题
  titleTemplate?: string | boolean
  description?: string    // 站点描述
  head?: HeadConfig[]     // 头部配置
  themeConfig?: ThemeConfig  // 主题配置
}
```

## 语言代码参考

| 语言 | 代码 | 标签 |
|------|------|------|
| 中文（默认） | zh | 简体中文 |
| 英文 | en | English |
| 日语 | ja | 日本語 |
| 阿拉伯语 | ar | العربية |
| 俄语 | ru | Русский |
| 韩语 | ko | 한국어 |
| 法语 | fr | Français |
| 德语 | de | Deutsch |

## 默认语言配置

- 使用 `root` 配置默认语言
- 默认语言不需要路径前缀
- 其他语言需要指定 `link` 属性

## RTL 支持（实验性）

阿拉伯语等 RTL 语言需要：

1. 在配置中指定 `dir: 'rtl'`
2. 使用 RTLCSS PostCSS 插件

```javascript
export default defineConfig({
  locales: {
    ar: {
      label: 'العربية',
      lang: 'ar',
      dir: 'rtl',
      link: '/ar/'
    }
  }
})
```

## 服务器重定向配置

如果需要将根路径重定向到特定语言：

### Netlify

创建 `docs/public/_redirects`：

```
/*  /zh/:splat  302  Language=zh
/*  /en/:splat  302  Language=en
/*  /ja/:splat  302  Language=ja
```

### 保存用户语言选择

使用 cookie 保存用户选择：

```vue
<script setup lang="ts">
import { useData, inBrowser } from 'vitepress'
import { watchEffect } from 'vue'

const { lang } = useData()
watchEffect(() => {
  if (inBrowser) {
    document.cookie = `nf_lang=${lang.value}; expires=Mon, 1 Jan 2030 00:00:00 UTC; path=/`
  }
})
</script>
```

## 搜索配置

多语言搜索会自动索引所有语言的内容。

## 内容翻译

当创建多语言版本时，**所有内容都必须进行完整翻译，无一例外**：

### 翻译范围（全部内容）

#### 文档内容
- ✅ **标题** - 所有级别的标题（H1-H6）
- ✅ **段落** - 正文段落内容
- ✅ **列表** - 有序列表、无序列表
- ✅ **表格** - 表头和单元格内容
- ✅ **引用** - 引用块内容
- ✅ **链接文本** - 链接的显示文字
- ✅ **按钮文本** - 按钮上的文字
- ✅ **提示信息** - 警告、提示、注意等块内容

#### 代码相关内容
- ✅ **代码注释** - 所有代码块中的注释
- ✅ **代码文档字符串** - 函数、类的文档说明
- ✅ **变量名注释** - 对变量含义的说明
- ✅ **配置文件注释** - 配置文件中的说明文字
- ✅ **Shell 脚本注释** - 命令行脚本的说明

#### 配置文件内容
- ✅ **导航栏文字** - nav 配置中的所有 text
- ✅ **侧边栏文字** - sidebar 配置中的所有 text
- ✅ **站点标题** - title、siteTitle
- ✅ **站点描述** - description
- ✅ **页脚文字** - footer 配置
- ✅ **搜索提示** - search 配置中的 placeholder 等

#### UI 界面内容
- ✅ **导航栏** - 所有导航文字、下拉菜单
- ✅ **侧边栏** - 所有分组标题和链接文字
- ✅ **搜索框** - placeholder、搜索提示、结果文字
- ✅ **页脚** - 版权信息、链接文字
- ✅ **分页导航** - 上一页/下一页文字
- ✅ **编辑链接** - "编辑此页"等文字
- ✅ **最后更新** - 时间格式和提示文字
- ✅ **大纲标题** - 右侧目录标题
- ✅ **移动端菜单** - 菜单按钮文字
- ✅ **语言切换器** - 语言选择文字

#### 广告和弹窗内容
- ✅ **广告弹窗标题** - 弹窗的标题文字
- ✅ **广告内容** - 所有描述、列表项
- ✅ **按钮文字** - 关闭按钮、链接按钮
- ✅ **优惠券信息** - 优惠码、折扣信息
- ✅ **提示信息** - 所有提示和说明文字

#### 其他内容
- ✅ **图片 alt 文本** - 图片的替代文字
- ✅ **Frontmatter 内容** - title、description 等元数据
- ✅ **HTML 属性** - title、placeholder 等属性
- ✅ **自定义组件** - 组件中的文字内容
- ✅ **JavaScript 提示** - alert、confirm 等弹窗文字

### 翻译示例

**中文原文** (`index.md`):
```markdown
# 赛博资源站

欢迎来到赛博资源站，这里汇集了各种实用的开发资源。

## 特性

- 🚀 快速访问
- 📚 丰富资源
- 🔧 持续更新

## 开始使用

访问 [GitHub 使用指南](/github-guide) 了解更多。
```

**英文翻译** (`en/index.md`):
```markdown
# Cyber Resource Hub

Welcome to Cyber Resource Hub, where you can find various practical development resources.

## Features

- 🚀 Fast Access
- 📚 Rich Resources
- 🔧 Continuous Updates

## Getting Started

Visit [GitHub Usage Guide](/en/github-guide) to learn more.
```

### 翻译原则

1. **全部翻译** - 所有内容无一例外，必须全部翻译
2. **保持格式** - 保留所有 Markdown 格式和结构
3. **保留 emoji** - emoji 图标保持不变
4. **更新链接** - 自动更新内部链接为对应语言版本
5. **语义准确** - 确保翻译准确传达原意
6. **专业术语** - 使用行业标准的技术术语翻译
7. **代码保留** - 代码本身不翻译，只翻译注释和说明
8. **一致性** - 相同术语在整个站点中保持统一翻译

## 注意事项

1. 不要在 locale 级别覆盖 `themeConfig.algolia` 或 `themeConfig.carbonAds`
2. 每种语言可以独立配置 `nav` 和 `sidebar`
3. 阿拉伯语会自动启用 RTL 布局
4. 语言切换器显示在导航栏右上角
5. 配置文件可以拆分为多个文件：`docs/.vitepress/config/index.ts`
6. **构建时会自动检查并翻译缺失的多语言内容**
