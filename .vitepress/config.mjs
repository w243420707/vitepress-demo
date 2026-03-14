import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  // base 设置成根路径
  base: '/',
  // 排除 skills 目录，不参与构建
  srcExclude: ['skills/**'],
  // 网站图标配置
  head: [
    ['link', { rel: 'icon', href: '/favicon.svg' }]
  ],
  locales: {
    // 中文（默认主语言，根路径）
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      themeConfig: {
        // 站点标题和logo
        siteTitle: 'Cyber Trainer',
        logo: '/logo.svg',
        nav: [
          { text: '首页', link: '/' },
          { text: '全部资源概述', link: '/全部资源概述' }
        ],
        sidebar: [
          {
            text: '示例',
            items: [
              { text: 'Markdown 示例', link: '/markdown-examples' },
              { text: '全部资源概述', link: '/全部资源概述' }
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
        // 站点标题和logo
        siteTitle: 'Cyber Trainer',
        logo: '/logo.svg',
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
    }
  },
  themeConfig: {
    search: {
      provider: 'local'
    }
  }
})
