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
      label: '🇨🇳 简体中文',
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
      label: '🇺🇸 English',
      lang: 'en-US',
      link: '/en/',
      themeConfig: {
        // 站点标题和logo
        siteTitle: 'Cyber Resource Hub',
        logo: '/logo.svg',
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'Git Tutorial', link: '/en/91git' },
          { text: 'Network', link: '/en/网络环境' },
          { text: 'GitHub Resources', link: '/en/全部资源概述' }
        ],
        sidebar: [
          {
            text: '📚 Git Tutorial',
            link: '/en/git-tutorial',
            items: [
              { text: '01- Git Basics', link: '/en/91git' },
              { text: '02- Network Config', link: '/en/网络环境' }
            ]
          },
          {
            text: '🚀 GitHub Resources',
            link: '/en/github-resources',
            items: [
              { text: '01- GitHub Guide', link: '/en/github-guide' },
              { text: '02- All Resources', link: '/en/全部资源概述' }
            ]
          }
        ]
      }
    },
    // 日语
    ja: {
      label: '🇯🇵 日本語',
      lang: 'ja-JP',
      link: '/ja/',
      themeConfig: {
        siteTitle: 'サイバーリソースハブ',
        logo: '/logo.svg',
        nav: [
          { text: 'ホーム', link: '/ja/' },
          { text: 'Gitチュートリアル', link: '/ja/91git' },
          { text: 'ネットワーク', link: '/ja/网络环境' },
          { text: 'GitHubリソース', link: '/ja/全部资源概述' }
        ],
        sidebar: [
          {
            text: '📚 Gitチュートリアル',
            link: '/ja/git-tutorial',
            items: [
              { text: '01- Git基礎', link: '/ja/91git' },
              { text: '02- ネットワーク設定', link: '/ja/网络环境' }
            ]
          },
          {
            text: '🚀 GitHubリソース',
            link: '/ja/github-resources',
            items: [
              { text: '01- GitHubガイド', link: '/ja/github-guide' },
              { text: '02- 全リソース', link: '/ja/全部资源概述' }
            ]
          }
        ]
      }
    },
    // 阿拉伯语
    ar: {
      label: '🇸🇦 العربية',
      lang: 'ar-SA',
      dir: 'rtl',
      link: '/ar/',
      themeConfig: {
        siteTitle: 'مركز الموارد السيبرانية',
        logo: '/logo.svg',
        nav: [
          { text: 'الرئيسية', link: '/ar/' },
          { text: 'دليل Git', link: '/ar/91git' },
          { text: 'الشبكة', link: '/ar/网络环境' },
          { text: 'موارد GitHub', link: '/ar/全部资源概述' }
        ],
        sidebar: [
          {
            text: '📚 دليل Git',
            link: '/ar/git-tutorial',
            items: [
              { text: '01- أساسيات Git', link: '/ar/91git' },
              { text: '02- إعداد الشبكة', link: '/ar/网络环境' }
            ]
          },
          {
            text: '🚀 موارد GitHub',
            link: '/ar/github-resources',
            items: [
              { text: '01- دليل GitHub', link: '/ar/github-guide' },
              { text: '02- جميع الموارد', link: '/ar/全部资源概述' }
            ]
          }
        ]
      }
    },
    // 俄语
    ru: {
      label: '🇷🇺 Русский',
      lang: 'ru-RU',
      link: '/ru/',
      themeConfig: {
        siteTitle: 'Кибер Ресурсный Центр',
        logo: '/logo.svg',
        nav: [
          { text: 'Главная', link: '/ru/' },
          { text: 'Git Руководство', link: '/ru/91git' },
          { text: 'Сеть', link: '/ru/网络环境' },
          { text: 'Ресурсы GitHub', link: '/ru/全部资源概述' }
        ],
        sidebar: [
          {
            text: '📚 Git Руководство',
            link: '/ru/git-tutorial',
            items: [
              { text: '01- Основы Git', link: '/ru/91git' },
              { text: '02- Настройка Сети', link: '/ru/网络环境' }
            ]
          },
          {
            text: '🚀 Ресурсы GitHub',
            link: '/ru/github-resources',
            items: [
              { text: '01- Руководство GitHub', link: '/ru/github-guide' },
              { text: '02- Все Ресурсы', link: '/ru/全部资源概述' }
            ]
          }
        ]
      }
    },
    // 韩语
    ko: {
      label: '🇰🇷 한국어',
      lang: 'ko-KR',
      link: '/ko/',
      themeConfig: {
        siteTitle: '사이버 리소스 허브',
        logo: '/logo.svg',
        nav: [
          { text: '홈', link: '/ko/' },
          { text: 'Git 튜토리얼', link: '/ko/91git' },
          { text: '네트워크', link: '/ko/网络环境' },
          { text: 'GitHub 리소스', link: '/ko/全部资源概述' }
        ],
        sidebar: [
          {
            text: '📚 Git 튜토리얼',
            link: '/ko/git-tutorial',
            items: [
              { text: '01- Git 기초', link: '/ko/91git' },
              { text: '02- 네트워크 설정', link: '/ko/网络环境' }
            ]
          },
          {
            text: '🚀 GitHub 리소스',
            link: '/ko/github-resources',
            items: [
              { text: '01- GitHub 가이드', link: '/ko/github-guide' },
              { text: '02- 모든 리소스', link: '/ko/全部资源概述' }
            ]
          }
        ]
      }
    },
    // 法语
    fr: {
      label: '🇫🇷 Français',
      lang: 'fr-FR',
      link: '/fr/',
      themeConfig: {
        siteTitle: 'Centre de Ressources Cyber',
        logo: '/logo.svg',
        nav: [
          { text: 'Accueil', link: '/fr/' },
          { text: 'Tutoriel Git', link: '/fr/91git' },
          { text: 'Réseau', link: '/fr/网络环境' },
          { text: 'Ressources GitHub', link: '/fr/全部资源概述' }
        ],
        sidebar: [
          {
            text: '📚 Tutoriel Git',
            link: '/fr/git-tutorial',
            items: [
              { text: '01- Bases de Git', link: '/fr/91git' },
              { text: '02- Configuration Réseau', link: '/fr/网络环境' }
            ]
          },
          {
            text: '🚀 Ressources GitHub',
            link: '/fr/github-resources',
            items: [
              { text: '01- Guide GitHub', link: '/fr/github-guide' },
              { text: '02- Toutes les Ressources', link: '/fr/全部资源概述' }
            ]
          }
        ]
      }
    },
    // 德语
    de: {
      label: '🇩🇪 Deutsch',
      lang: 'de-DE',
      link: '/de/',
      themeConfig: {
        siteTitle: 'Cyber Ressourcen Hub',
        logo: '/logo.svg',
        nav: [
          { text: 'Startseite', link: '/de/' },
          { text: 'Git Anleitung', link: '/de/91git' },
          { text: 'Netzwerk', link: '/de/网络环境' },
          { text: 'GitHub Ressourcen', link: '/de/全部资源概述' }
        ],
        sidebar: [
          {
            text: '📚 Git Anleitung',
            link: '/de/git-tutorial',
            items: [
              { text: '01- Git Grundlagen', link: '/de/91git' },
              { text: '02- Netzwerkkonfiguration', link: '/de/网络环境' }
            ]
          },
          {
            text: '🚀 GitHub Ressourcen',
            link: '/de/github-resources',
            items: [
              { text: '01- GitHub Anleitung', link: '/de/github-guide' },
              { text: '02- Alle Ressourcen', link: '/de/全部资源概述' }
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
