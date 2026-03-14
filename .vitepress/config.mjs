import { defineConfig } from 'vitepress'

const base = process.env.VITEPRESS_BASE || '/'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  // 站点标题
  title: '赛博资源站',
  // 自定义域名请保持 '/', 项目页可在构建时传入 VITEPRESS_BASE=/<repo>/
  base,
  // 排除 skills 目录，不参与构建
  srcExclude: ['skills/**'],
  // 网站图标配置
  head: [
    ['link', { rel: 'icon', href: '/favicon.svg' }]
  ],
  // 构建时复制到输出目录的静态资源
  vite: {
    build: {
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name.split('.');
            const ext = info[info.length - 1];
            if (/\.(woff2?|ttf|otf|eot)$/.test(assetInfo.name)) {
              return `fonts/[name][extname]`;
            }
            return `assets/[name]-[hash][extname]`;
          }
        }
      }
    }
  },
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
          { text: 'Git 教程', link: '/91git' },
          { text: '网络环境', link: '/网络环境' },
          { text: 'GITHUB 资源汇总', link: '/全部资源概述' }
        ],
        sidebar: [
          {
            text: '📚 Git 教程',
            link: '/git-tutorial',
            items: [
              { text: '01- Git 基础', link: '/91git' },
              { text: '02- 网络环境配置', link: '/网络环境' }
            ]
          },
          {
            text: '🚀 GitHub 资源',
            link: '/github-resources',
            items: [
              { text: '01- GitHub 使用指南', link: '/github-guide' },
              { text: '02- 全部资源概述', link: '/全部资源概述' }
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
    },
    outline: {
      level: [2, 3],
      label: '目录'
    }
  }
})
