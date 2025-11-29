<template>
  <div class="min-h-screen pb-8" style="font-family: 'Montserrat', sans-serif;">
    <div class="px-4 pt-6">
      <!-- Exchange Amount Section -->
      <div class="mb-6">
        <label class="block text-[#26A17B] text-sm font-medium mb-0">
          Обмен <span class="text-[#26A17B]">*</span>
        </label>
        <div class="relative flex items-center">
          <div class="relative flex-1 flex items-center">
            <input
              v-model="amount"
              type="text"
              inputmode="decimal"
              placeholder="0"
              class="w-full px-0 pr-32 bg-transparent font-bold text-white text-[40px] placeholder:text-gray-500 focus:outline-none pt-[5px] pb-[4px]"
              @input="formatAmount"
              ref="amountInputRef"
            />
            <!-- Currency label next to input text -->
            <p 
              v-if="amount"
              class="absolute chip left-0 top-[50%] -translate-y-1/2 pointer-events-none text-gray-400 text-[25px] font-light whitespace-nowrap"
              :style="{ left: `${getAmountWidth()}px` }"
            >
              {{ exchangeType === 'buy' ? 'Руб' : 'USDT' }}
          </p>
          </div>
          <!-- Toggle Button inside input -->
          <button
            @click="toggleExchangeType"
            class="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col items-center gap-0.5"
          >
            <div class="w-10 h-10 rounded-full bg-[#1E5144] flex items-center justify-center">
              <svg
                class="w-5 h-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#26A17B"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 16V4M7 4L3 8M7 4L11 8M17 8V20M17 20L21 16M17 20L13 16"
                />
              </svg>
            </div>
            <span class="text-white text-[10px] leading-tight">{{ exchangeType === 'buy' ? 'Покупка' : 'Продажа' }}</span>
          </button>
        </div>
        <div class="mt-0 flex items-center justify-between relative">
          <div v-if="amount" class="flex items-center gap-2">
            <span class="text-gray-400 text-sm">Вы получите:</span>
            <span class="text-white text-sm font-medium">{{ convertedAmount }}</span>
          </div>
          <p class="text-gray-400 text-sm">1 USDT = {{ exchangeRate }}₽</p>
          <!-- Line after "Вы получите" block -->
          <div class="absolute bottom-[-14px] left-[-16px] right-[-16px] h-[1px] bg-[#8E8E93]/10"></div>
        </div>
      </div>

      <!-- Full Name Section -->
      <div class="mb-6">
        <BaseInput
          v-model="fullName"
          label="Ф.И.О"
          placeholder="Введите имя"
          required
          :error="errors.fullName"
          @blur="validateFullName"
        />
      </div>

      <!-- Wallet Address Section -->
      <div class="mb-4">
        <BaseInput
          v-model="walletAddress"
          label="Адрес кошелька"
          placeholder="Кошелёк TRC-20"
          required
          :error="errors.walletAddress"
          @blur="validateWalletAddress"
        />
      </div>

      <!-- Info Box -->
      <div class="mb-6 p-4 bg-[#26A17B] bg-opacity-10 rounded-xl">
        <div class="flex items-start gap-3">
          <svg
            class="w-5 h-5 text-white flex-shrink-0 mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p class="text-white text-sm leading-relaxed flex-1">
            Укажите правильный адрес вашего кошелька TRC-20. В противном случае компания не возместит сумму
          </p>
        </div>
      </div>

      <!-- Terms Checkbox -->
      <div class="mb-6">
        <BaseCheckbox v-model="acceptedTerms">
          <span>
            Я прочитал
            <a href="#" class="underline">правила</a>
            и принимаю условия сервиса
          </span>
        </BaseCheckbox>
      </div>

      <!-- Submit Button -->
      <button
        @click="handleSubmit"
        :disabled="!isFormValid"
        :class="cn(
          'w-full h-14 rounded-xl font-semibold text-white transition-colors',
          {
            'bg-[#26A17B] hover:bg-[#228B6D] active:bg-[#1F7A5F]': isFormValid,
            'bg-gray-600 opacity-50 cursor-not-allowed': !isFormValid
          }
        )"
      >
        Создать заявку
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseCheckbox from '@/components/common/BaseCheckbox.vue'
import { cn } from '@/utils/cn'
import WebApp from '@twa-dev/sdk'

const router = useRouter()
const amountInputRef = ref<HTMLInputElement | null>(null)

// Show Telegram native back button
onMounted(() => {
  if (WebApp.BackButton) {
    WebApp.BackButton.show()
    WebApp.BackButton.onClick(() => {
      router.push('/')
    })
  }
})

onBeforeUnmount(() => {
  if (WebApp.BackButton) {
    WebApp.BackButton.hide()
    WebApp.BackButton.offClick(() => {})
  }
})

type ExchangeType = 'buy' | 'sell'

const exchangeType = ref<ExchangeType>('sell')
const amount = ref<string>('')
const fullName = ref<string>('')
const walletAddress = ref<string>('')
const acceptedTerms = ref<boolean>(false)

const errors = ref({
  fullName: '',
  walletAddress: ''
})

const exchangeRate = computed(() => {
  return exchangeType.value === 'buy' ? '92,36' : '91,87'
})

const convertedAmount = computed(() => {
  if (!amount.value) return ''
  
  // Remove spaces for calculation
  const amountValue = parseFloat(amount.value.replace(/\s/g, ''))
  if (isNaN(amountValue) || amountValue <= 0) return ''
  
  const rate = parseFloat(exchangeRate.value.replace(',', '.'))
  
  if (exchangeType.value === 'sell') {
    // Selling USDT, getting rubles
    const rubles = amountValue * rate
    return formatCurrency(rubles) + ' ₽'
  } else {
    // Buying USDT with rubles, getting USDT
    const usdt = amountValue / rate
    return formatCurrency(usdt) + ' USDT'
  }
})

const formatCurrency = (value: number): string => {
  // Format with 2 decimal places and spaces for thousands
  const rounded = Math.round(value * 100) / 100
  const parts = rounded.toString().split('.')
  const integerPart = parts[0]
  const decimalPart = parts[1] || '00'
  
  // Add spaces for thousands
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  
  return `${formattedInteger},${decimalPart.padEnd(2, '0')}`
}

const toggleExchangeType = () => {
  exchangeType.value = exchangeType.value === 'buy' ? 'sell' : 'buy'
}

const formatAmount = (event: Event) => {
  const input = event.target as HTMLInputElement
  let value = input.value.replace(/[^\d.,]/g, '')
  value = value.replace(',', '.')
  const parts = value.split('.')
  if (parts.length > 2) {
    value = parts[0] + '.' + parts.slice(1).join('')
  }
  
  // Check limit: max 9 digits (100 000 000)
  const [integerPart, decimalPart] = value.split('.')
  if (integerPart && integerPart.length > 9) {
    // If exceeds limit, truncate to 9 digits
    const truncatedInteger = integerPart.slice(0, 9)
    value = decimalPart !== undefined ? `${truncatedInteger}.${decimalPart}` : truncatedInteger
  }
  
  // Format with spaces for thousands
  const [finalIntegerPart, finalDecimalPart] = value.split('.')
  if (finalIntegerPart) {
    // If at max limit (9 digits), show without spaces for compactness
    if (finalIntegerPart.length === 9) {
      amount.value = finalDecimalPart !== undefined ? `${finalIntegerPart}.${finalDecimalPart}` : finalIntegerPart
    } else {
      const formattedInteger = finalIntegerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
      amount.value = finalDecimalPart !== undefined ? `${formattedInteger}.${finalDecimalPart}` : formattedInteger
    }
  } else {
    amount.value = value
  }
}

const getAmountWidth = () => {
  if (!amount.value || !amountInputRef.value) return 0
  // Create a temporary span to measure text width
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  if (!context) return 0
  const computedStyle = window.getComputedStyle(amountInputRef.value)
  context.font = `${computedStyle.fontWeight} ${computedStyle.fontSize} ${computedStyle.fontFamily}`
  // Measure text WITH spaces for accurate positioning
  const metrics = context.measureText(amount.value)
  return metrics.width + 4 // Add small padding
}

const validateFullName = () => {
  if (!fullName.value.trim()) {
    errors.value.fullName = 'Обязательное поле'
  } else if (fullName.value.trim().length < 2) {
    errors.value.fullName = 'Минимум 2 символа'
  } else {
    errors.value.fullName = ''
  }
}

const validateWalletAddress = () => {
  if (!walletAddress.value.trim()) {
    errors.value.walletAddress = 'Обязательное поле'
  } else {
    const trc20Pattern = /^T[1-9A-HJ-NP-Za-km-z]{33}$/
    if (!trc20Pattern.test(walletAddress.value.trim())) {
      errors.value.walletAddress = 'Неверный формат адреса TRC-20'
    } else {
      errors.value.walletAddress = ''
    }
  }
}

const isFormValid = computed(() => {
  // Remove spaces for validation
  const amountWithoutSpaces = amount.value.replace(/\s/g, '')
  return (
    amountWithoutSpaces &&
    parseFloat(amountWithoutSpaces) > 0 &&
    fullName.value.trim().length >= 2 &&
    walletAddress.value.trim() &&
    !errors.value.fullName &&
    !errors.value.walletAddress &&
    acceptedTerms.value
  )
})

const handleSubmit = () => {
  if (!isFormValid.value) return

  validateFullName()
  validateWalletAddress()

  if (isFormValid.value) {
    // TODO: Submit form to API
    // Navigate to success page or show success message
    router.push('/orders')
  }
}
</script>


<style scoped>
.chip {
  font-weight: 100 !important;
}
</style>