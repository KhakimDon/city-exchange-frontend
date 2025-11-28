<template>
  <nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 safe-area-bottom">
    <div class="container mx-auto px-4">
      <div class="flex justify-around items-center h-16">
        <router-link
          v-for="item in navigationItems"
          :key="item.name"
          :to="item.path"
          :class="cn(
            'flex flex-col items-center justify-center flex-1 h-full transition-colors',
            {
              'text-blue-600': isActive(item.path),
              'text-gray-500 hover:text-gray-700': !isActive(item.path)
            }
          )"
        >
          <svg
            v-if="item.icon === 'exchange'"
            :class="cn('w-6 h-6 mb-1', {
              'fill-current': isActive(item.path)
            })"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 16V4M7 4L3 8M7 4L11 8M17 8V20M17 20L21 16M17 20L13 16"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <svg
            v-else-if="item.icon === 'orders'"
            :class="cn('w-6 h-6 mb-1', {
              'fill-current': isActive(item.path)
            })"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <svg
            v-else-if="item.icon === 'referral'"
            :class="cn('w-6 h-6 mb-1', {
              'fill-current': isActive(item.path)
            })"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7Z"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <svg
            v-else-if="item.icon === 'support'"
            :class="cn('w-6 h-6 mb-1', {
              'fill-current': isActive(item.path)
            })"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span class="text-xs font-medium">{{ item.label }}</span>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { cn } from '@/utils/cn'

interface NavigationItem {
  name: string
  path: string
  label: string
  icon: 'exchange' | 'orders' | 'referral' | 'support'
}

const navigationItems: NavigationItem[] = [
  {
    name: 'buy-sell',
    path: '/buy-sell',
    label: 'Купить/Продать',
    icon: 'exchange'
  },
  {
    name: 'orders',
    path: '/orders',
    label: 'Заявки',
    icon: 'orders'
  },
  {
    name: 'referral',
    path: '/referral',
    label: 'Рефералка',
    icon: 'referral'
  },
  {
    name: 'support',
    path: '/support',
    label: 'Поддержка',
    icon: 'support'
  }
]

const route = useRoute()

const isActive = (path: string): boolean => {
  return route.path === path
}
</script>

