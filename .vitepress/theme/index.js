import DefaultTheme from 'vitepress/theme'
import { onMounted } from 'vue'
import './styles/fonts.css'
import './styles/custom.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app, router }) {
    // 只在客户端执行
    if (typeof document === 'undefined') return
    
    // 添加广告样式
    const style = document.createElement('style')
    style.textContent = `
      .cyber-offer-popup {
        --ad-scale: 0.9;
        position: fixed;
        bottom: 20px;
        right: 20px;
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
        padding-bottom: 32px;
        max-width: 300px;
        margin: 0 auto;
        text-align: left;
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
    
    // 页面加载完成后添加广告
    setTimeout(() => {
      const adContainer = document.createElement('div')
      adContainer.className = 'cyber-offer-popup'
      adContainer.innerHTML = `
        <button class="offer-close">×</button>
        <div class="offer-content">
          <div class="offer-header">
            <h3>🚀 网络工具</h3>
          </div>
          <p>新加坡实体企业运营，支持 AI和视频解锁 全系产品，Win/Mac/iPhone/Android 均可使用。</p>
          <ul>
            <li>推荐套餐</li>
            <li>99元 / 99999GB</li>
            <li>最低 9.9元/年起</li>
            <li>流量不限时，用完即止，送谷歌账号</li>
          </ul>
          <p class="offer-coupon">八五折优惠券：oqPCcC84</p>
          <a class="offer-link" href="https://skylumo.cc" target="_blank" rel="noopener noreferrer">点击进入</a>
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
      })
    }, 10000)
  }
}