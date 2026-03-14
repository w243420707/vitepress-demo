import DefaultTheme from 'vitepress/theme'
import './styles/fonts.css'
import './styles/custom.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app, router }) {
    if (typeof document === 'undefined') return
    
    // 获取当前语言
    const getCurrentLang = () => {
      const path = window.location.pathname
      if (path.startsWith('/en/')) return 'en-US'
      if (path.startsWith('/ja/')) return 'ja-JP'
      if (path.startsWith('/ar/')) return 'ar-SA'
      if (path.startsWith('/ru/')) return 'ru-RU'
      if (path.startsWith('/ko/')) return 'ko-KR'
      if (path.startsWith('/fr/')) return 'fr-FR'
      if (path.startsWith('/de/')) return 'de-DE'
      return 'zh-CN'
    }
    
    let lastLang = getCurrentLang()
    
    // 监听语言切换，自动刷新页面
    // 使用 popstate 事件监听浏览器历史记录变化
    window.addEventListener('popstate', () => {
      const currentLang = getCurrentLang()
      if (currentLang !== lastLang) {
        window.location.reload()
      }
    })
    
    // 监听点击事件，检测语言切换链接
    document.addEventListener('click', (e) => {
      const target = e.target.closest('a')
      if (target) {
        const href = target.getAttribute('href')
        if (href) {
          // 检查是否是语言切换链接
          const langs = ['/en/', '/ja/', '/ar/', '/ru/', '/ko/', '/fr/', '/de/']
          const isLangSwitch = langs.some(lang => href.startsWith(lang)) || 
                              (href === '/' && lastLang !== 'zh-CN')
          
          if (isLangSwitch) {
            // 延迟检查，让路由先完成
            setTimeout(() => {
              const currentLang = getCurrentLang()
              if (currentLang !== lastLang) {
                window.location.reload()
              }
            }, 100)
          }
        }
      }
    })
    
    // 添加广告样式
    const style = document.createElement('style')
    style.textContent = `
      .cyber-offer-popup {
        --ad-scale: 0.9;
        position: fixed;
        bottom: 20px;
        right: 18px;
        left: auto;
        width: 360px;
        background: var(--vp-c-bg);
        border-radius: 12px;
        box-shadow: 0 10px 28px rgba(0, 0, 0, 0.22);
        z-index: 1000;
        padding: 16px 16px 14px;
        animation: offerPopupSlideIn 0.3s ease-out both;
        border: 1px solid var(--vp-c-divider);
        backdrop-filter: blur(4px);
        transform: scale(var(--ad-scale));
        transform-origin: bottom right;
      }

      .cyber-offer-popup .offer-content {
        position: relative;
        width: calc(102% - 20px);
        max-width: 350px;
        margin: 0 0 0 auto;
        text-align: left;
        padding-right: 16px;
        padding-bottom: 32px;
      }
      
      .cyber-offer-popup .offer-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 8px;
      }
      
      .cyber-offer-popup .offer-header h3 {
        margin: 0;
        color: var(--vp-c-text-1);
        font-size: 24px;
        line-height: 1.8;
        letter-spacing: 0.2px;
      }
      
      .cyber-offer-popup .offer-content p {
        margin: 0;
        color: var(--vp-c-text-2);
        line-height: 1.85;
      }

      .cyber-offer-popup .offer-content ul {
        margin: 10px 0 8px;
        padding-left: 18px;
        color: var(--vp-c-text-2);
      }

      .cyber-offer-popup .offer-content li {
        margin: 3px 0;
        line-height: 1.75;
      }

      .cyber-offer-popup .offer-link {
        position: absolute;
        right: 0;
        bottom: 0;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: var(--vp-c-brand-1);
        text-decoration: none;
        font-weight: 600;
        font-size: 15px;
      }

      .cyber-offer-popup .offer-link:hover {
        text-decoration: underline;
      }

      .cyber-offer-popup .offer-coupon {
        margin-top: 6px !important;
        font-weight: 600;
        color: var(--vp-c-text-1) !important;
      }
      
      .cyber-offer-popup .offer-close {
        background: none !important;
        border: none !important;
        color: #999 !important;
        padding: 0 !important;
        font-size: 18px !important;
        cursor: pointer !important;
        transition: color 0.2s !important;
        line-height: 1 !important;
        position: absolute !important;
        /* Primary vertical position control for the close icon */
        top: 6px !important;
        right: 10px !important;
      }
      
      .cyber-offer-popup .offer-close:hover {
        color: #666 !important;
      }
      
      @keyframes offerPopupSlideIn {
        from {
          transform: translateY(100%) scale(var(--ad-scale));
          opacity: 0;
        }
        to {
          transform: translateY(0) scale(var(--ad-scale));
          opacity: 1;
        }
      }
    `
    document.head.appendChild(style)
    
    // 多语言广告内容
    const adContent = {
      'zh-CN': {
        title: '🚀 网络工具',
        desc: '新加坡实体企业运营，支持 AI和视频解锁 全系产品，Win/Mac/iPhone/Android 均可使用。',
        plan: '推荐套餐：99元 / 99999GB',
        price: '最低 9.9元/年起',
        feature: '流量不限时，用完即止，送谷歌账号',
        coupon: '八五折优惠券：oqPCcC84',
        link: '点击进入'
      },
      'en-US': {
        title: '🚀 Network Tools',
        desc: 'Singapore-based enterprise operation, supports all AI and video unlocking products, available for Win/Mac/iPhone/Android.',
        plan: 'Recommended Plan: $14 / 99999GB',
        price: 'Starting from $1.5/year',
        feature: 'Unlimited traffic time, expires when used up, includes Google account',
        coupon: '15% Off Coupon: oqPCcC84',
        link: 'Click to Enter'
      },
      'ja-JP': {
        title: '🚀 ネットワークツール',
        desc: 'シンガポール法人運営、AI・動画解除製品全般をサポート、Win/Mac/iPhone/Android対応。',
        plan: 'おすすめプラン：99元 / 99999GB',
        price: '年間9.9元から',
        feature: 'トラフィック期限なし、使い切りまで、Googleアカウント付属',
        coupon: '15%オフクーポン：oqPCcC84',
        link: 'クリックして入る'
      },
      'ar-SA': {
        title: '🚀 أدوات الشبكة',
        desc: 'شركة سنغافورية، دعم جميع منتجات الذكاء الاصطناعي، متوافق مع Win/Mac/iPhone/Android.',
        plan: 'الخطة الموصى بها: 99 يوان / 99999 جيجابايت',
        price: 'يبدأ من 9.9 يوان/سنة',
        feature: 'حركة مرور غير محدودة الوقت، تنتهي عند الاستخدام، يأتي مع حساب Google',
        coupon: 'قسيمة خصم 15%: oqPCcC84',
        link: 'انقر للدخول'
      },
      'ru-RU': {
        title: '🚀 Сетевые инструменты',
        desc: 'Сингапурская компания, поддержка всех продуктов ИИ, совместимость с Win/Mac/iPhone/Android.',
        plan: 'Рекомендуемый план: 99 юаней / 99999 ГБ',
        price: 'От 9.9 юаней/год',
        feature: 'Трафик без ограничения по времени, истекает при использовании, включает аккаунт Google',
        coupon: 'Купон на скидку 15%: oqPCcC84',
        link: 'Нажмите для входа'
      },
      'ko-KR': {
        title: '🚀 네트워크 도구',
        desc: '싱가포르 법인 운영, 모든 AI 제품 지원, Win/Mac/iPhone/Android 대응.',
        plan: '추천 플랜: 99위안 / 99999 GB',
        price: '최저 9.9위안/년부터',
        feature: '트래픽 기한 없음, 사용 완료까지, Google 계정 포함',
        coupon: '15% 할인 쿠폰: oqPCcC84',
        link: '클릭하여 입장'
      },
      'fr-FR': {
        title: '🚀 Outils réseau',
        desc: 'Entreprise singapourienne, support de tous les produits IA, compatible Win/Mac/iPhone/Android.',
        plan: 'Forfait recommandé: 99 yuans / 99999 Go',
        price: 'À partir de 9.9 yuans/an',
        feature: 'Trafic sans limite de temps, expire à l\'utilisation, inclut un compte Google',
        coupon: 'Coupon de réduction de 15%: oqPCcC84',
        link: 'Cliquez pour entrer'
      },
      'de-DE': {
        title: '🚀 Netzwerktools',
        desc: 'Singapur-Unternehmen, Unterstützung aller KI-Produkte, kompatibel mit Win/Mac/iPhone/Android.',
        plan: 'Empfohlener Plan: 99 Yuan / 99999 GB',
        price: 'Ab 9.9 Yuan/Jahr',
        feature: 'Traffic ohne Zeitlimit, läuft bei Verbrauch ab, inklusive Google-Konto',
        coupon: '15% Rabatt-Gutschein: oqPCcC84',
        link: 'Klicken zum Eingehen'
      }
    }
    
    let adContainer = null
    
    // 创建广告弹窗
    const createAdPopup = () => {
      // 移除旧的广告
      if (adContainer) {
        adContainer.remove()
      }
      
      const lang = getCurrentLang()
      const content = adContent[lang] || adContent['zh-CN']
      
      adContainer = document.createElement('div')
      adContainer.className = 'cyber-offer-popup'
      adContainer.innerHTML = `
        <button class="offer-close">×</button>
        <div class="offer-content">
          <div class="offer-header">
            <h3>${content.title}</h3>
          </div>
          <p>${content.desc}</p>
          <ul>
            <li style="color: var(--vp-c-brand-1);">${content.plan}</li>
            <li>${content.price}</li>
            <li>${content.feature}</li>
          </ul>
          <p class="offer-coupon">${content.coupon}</p>
          <a class="offer-link" href="https://skylumo.cc" target="_blank" rel="noopener noreferrer">${content.link}</a>
        </div>
      `
      document.body.appendChild(adContainer)
      
      // 直接设置关闭按钮的样式
      const closeButton = adContainer.querySelector('.offer-close')
      closeButton.style.background = 'none'
      closeButton.style.border = 'none'
      closeButton.style.color = '#999'
      closeButton.style.padding = '0'
      closeButton.style.fontSize = '14.4px'
      closeButton.style.cursor = 'pointer'
      closeButton.style.transition = 'color 0.2s'
      closeButton.style.lineHeight = '1'
      
      // 添加关闭按钮事件
      closeButton.addEventListener('click', () => {
        adContainer.remove()
        adContainer = null
      })
    }
    
    // 页面加载完成后添加广告
    setTimeout(() => {
      createAdPopup()
    }, 10000)
  }
}