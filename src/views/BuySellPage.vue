<template>
  <div class="min-h-screen pb-8" style="font-family: 'Montserrat', sans-serif;">
    <div class="px-4 pt-6">
      <!-- Exchange Amount Section -->
      <div class="mb-[28px]">
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
              class="absolute chip left-0 top-[60%] -translate-y-1/2 pointer-events-none text-gray-400 text-[25px] font-light whitespace-nowrap"
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
      <div class="mb-[14px]">
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
      <div class="mb-[14px]">
        <BaseInput
          v-model="walletAddress"
          label="Адрес кошелька"
          placeholder="Кошелёк TRC-20"
          required
          :line="false"
          :error="errors.walletAddress"
          @blur="validateWalletAddress"
        />
      </div>

      <!-- Info Box -->
      <div class="mb-6 pl-[12px] pt-[6px] pb-[8px] pr-[6px]  bg-[#26A17B]  border-[#26A17B] border-l-[4px]  bg-opacity-20 rounded-[4px]">
        <div class="flex items-start gap-[10px]">
          <p class="text-white text-[15px] font-[Roboto] opacity-80 leading-relaxed flex-1">
            Укажите правильный адрес вашего кошелька TRC-20. В противном случае компания не возместит сумму
          </p>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.06801 7.70898C3.21287 7.33648 2.92566 6.95777 2.57177 6.77201C1.93461 6.43756 1.5 5.76953 1.5 5C1.5 3.89543 2.39543 3 3.5 3C4.60206 3 5.49594 3.89137 5.49999 4.99248C5.5 4.99499 5.50001 4.99749 5.50001 5C5.50001 6.54807 5.22855 7.67136 4.93202 8.43388C4.78422 8.81393 4.63168 9.10051 4.50706 9.30228C4.44482 9.40305 4.38972 9.48239 4.34589 9.54141C4.32399 9.57092 4.30491 9.59534 4.28919 9.6148C4.28287 9.62262 4.26705 9.64137 4.25789 9.65222C4.25564 9.65488 4.25259 9.6585 4.25259 9.6585C3.88891 10.0741 3.25715 10.1163 2.84151 9.75258C2.43082 9.39322 2.38481 8.77213 2.73463 8.35642L2.74007 8.34921C2.75094 8.33458 2.77396 8.3023 2.80547 8.25129C2.86835 8.14949 2.96581 7.97178 3.06801 7.70898Z" fill="#26A17B"/>
<path d="M4.25968 9.65032L4.25423 9.65663L4.25596 9.65464L4.25968 9.65032Z" fill="#26A17B"/>
<path d="M8.06801 7.70898C8.21287 7.33648 7.92566 6.95777 7.57177 6.77201C6.93461 6.43756 6.5 5.76953 6.5 5C6.5 3.89543 7.39543 3 8.5 3C9.60206 3 10.4959 3.89137 10.5 4.99248C10.5 4.99499 10.5 4.99749 10.5 5C10.5 6.54807 10.2286 7.67136 9.93202 8.43388C9.78422 8.81393 9.63168 9.10051 9.50706 9.30228C9.44482 9.40305 9.38972 9.48239 9.34589 9.54141C9.32399 9.57092 9.30491 9.59534 9.28919 9.6148C9.28287 9.62262 9.26705 9.64137 9.25789 9.65222C9.25564 9.65488 9.25259 9.6585 9.25259 9.6585C8.88891 10.0741 8.25715 10.1163 7.84151 9.75258C7.43082 9.39322 7.38481 8.77213 7.73463 8.35642L7.74007 8.34921C7.75094 8.33458 7.77396 8.3023 7.80547 8.25129C7.86835 8.14949 7.96581 7.97178 8.06801 7.70898Z" fill="#26A17B"/>
<path d="M9.25968 9.65032L9.25423 9.65663L9.25596 9.65464L9.25968 9.65032Z" fill="#26A17B"/>
</svg>

        </div>
      </div>

    </div>
    
    <!-- Fixed bottom section -->
    <div class="fixed bottom-[160px] left-0 right-0 bg-[#181B20] px-4 pt-4">
      <!-- Terms Checkbox -->
      <div class="mb-4">
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