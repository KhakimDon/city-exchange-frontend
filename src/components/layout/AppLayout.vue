<template>
  <div class="min-h-screen bg-gray-50" :class="{ 'pb-16': shouldShowBottomNav }">
    <AppHeader />
    <slot />
    <BottomNavigation v-if="shouldShowBottomNav" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import BottomNavigation from './BottomNavigation.vue'
import AppHeader from './AppHeader.vue'

interface Props {
  showBottomNav?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showBottomNav: true
})

const route = useRoute()

const shouldShowBottomNav = computed(() => {
  if (!props.showBottomNav) return false
  // Hide bottom nav on specific pages if needed
  const hideNavRoutes = ['/aml', '/cityex24', '/about']
  return !hideNavRoutes.includes(route.path)
})
</script>

