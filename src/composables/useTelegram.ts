import { onMounted, onUnmounted } from 'vue'
import { WebApp } from '@twa-dev/sdk'

export function useTelegram() {
  onMounted(() => {
    WebApp.ready()
    WebApp.expand()
  })

  const close = () => {
    WebApp.close()
  }

  const sendData = (data: string) => {
    WebApp.sendData(data)
  }

  const showAlert = (message: string, callback?: () => void) => {
    WebApp.showAlert(message, callback)
  }

  const showConfirm = (message: string, callback?: (confirmed: boolean) => void) => {
    WebApp.showConfirm(message, callback)
  }

  const showPopup = (params: {
    title?: string
    message: string
    buttons?: Array<{ id?: string; type?: 'default' | 'ok' | 'close' | 'cancel' | 'destructive'; text: string }>
  }, callback?: (buttonId: string) => void) => {
    WebApp.showPopup(params, callback)
  }

  const openLink = (url: string, options?: { try_instant_view?: boolean }) => {
    WebApp.openLink(url, options)
  }

  const openTelegramLink = (url: string) => {
    WebApp.openTelegramLink(url)
  }

  const openInvoice = (url: string, callback?: (status: string) => void) => {
    WebApp.openInvoice(url, callback)
  }

  return {
    WebApp,
    close,
    sendData,
    showAlert,
    showConfirm,
    showPopup,
    openLink,
    openTelegramLink,
    openInvoice,
    initData: WebApp.initData,
    initDataUnsafe: WebApp.initDataUnsafe,
    version: WebApp.version,
    platform: WebApp.platform,
    colorScheme: WebApp.colorScheme,
    themeParams: WebApp.themeParams,
    isExpanded: WebApp.isExpanded,
    viewportHeight: WebApp.viewportHeight,
    viewportStableHeight: WebApp.viewportStableHeight,
    headerColor: WebApp.headerColor,
    backgroundColor: WebApp.backgroundColor,
    isClosingConfirmationEnabled: WebApp.isClosingConfirmationEnabled,
    BackButton: WebApp.BackButton,
    MainButton: WebApp.MainButton,
    HapticFeedback: WebApp.HapticFeedback,
    CloudStorage: WebApp.CloudStorage,
    BiometricManager: WebApp.BiometricManager
  }
}

