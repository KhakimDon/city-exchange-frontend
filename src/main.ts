import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/css/main.css'
import WebApp from '@twa-dev/sdk'

// Initialize Telegram WebApp
if (typeof window !== 'undefined') {
  try {
    WebApp.ready()
    WebApp.expand()
    
    // Disable caching in development mode
    if (import.meta.env.DEV) {
      // Add cache-busting parameter to force reload
      const url = new URL(window.location.href)
      if (!url.searchParams.has('_t')) {
        url.searchParams.set('_t', Date.now().toString())
        window.history.replaceState({}, '', url.toString())
      }
    }
    
    // Set theme colors from Telegram
    if (WebApp.themeParams.bg_color) {
      document.documentElement.style.setProperty('--tg-theme-bg-color', WebApp.themeParams.bg_color)
    }
    if (WebApp.themeParams.text_color) {
      document.documentElement.style.setProperty('--tg-theme-text-color', WebApp.themeParams.text_color)
    }
    if (WebApp.themeParams.hint_color) {
      document.documentElement.style.setProperty('--tg-theme-hint-color', WebApp.themeParams.hint_color)
    }
    if (WebApp.themeParams.link_color) {
      document.documentElement.style.setProperty('--tg-theme-link-color', WebApp.themeParams.link_color)
    }
    if (WebApp.themeParams.button_color) {
      document.documentElement.style.setProperty('--tg-theme-button-color', WebApp.themeParams.button_color)
    }
    if (WebApp.themeParams.button_text_color) {
      document.documentElement.style.setProperty('--tg-theme-button-text-color', WebApp.themeParams.button_text_color)
    }
  } catch (error) {
    // Not running in Telegram, continue normally
  }
}

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

