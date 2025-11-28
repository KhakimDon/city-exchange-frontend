import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import AppLayout from '@/components/layout/AppLayout.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        path: '',
        name: 'main',
        component: () => import('@/views/MainPage.vue')
      },
      {
        path: 'buy-sell',
        name: 'buy-sell',
        component: () => import('@/views/BuySellPage.vue')
      },
      {
        path: 'orders',
        name: 'orders',
        component: () => import('@/views/OrdersPage.vue')
      },
      {
        path: 'referral',
        name: 'referral',
        component: () => import('@/views/ReferralPage.vue')
      },
      {
        path: 'support',
        name: 'support',
        component: () => import('@/views/SupportPage.vue')
      }
    ]
  },
  {
    path: '/aml',
    name: 'aml',
    component: AppLayout,
    children: [
      {
        path: '',
        component: () => import('@/views/AMLPage.vue')
      }
    ]
  },
  {
    path: '/cityex24',
    name: 'cityex24',
    component: AppLayout,
    children: [
      {
        path: '',
        component: () => import('@/views/Cityex24Page.vue')
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    component: AppLayout,
    children: [
      {
        path: '',
        component: () => import('@/views/AboutPage.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router

