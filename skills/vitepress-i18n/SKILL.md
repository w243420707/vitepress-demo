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

## 注意事项

1. 不要在 locale 级别覆盖 `themeConfig.algolia` 或 `themeConfig.carbonAds`
2. 每种语言可以独立配置 `nav` 和 `sidebar`
3. 阿拉伯语会自动启用 RTL 布局
4. 语言切换器显示在导航栏右上角
5. 配置文件可以拆分为多个文件：`docs/.vitepress/config/index.ts`
