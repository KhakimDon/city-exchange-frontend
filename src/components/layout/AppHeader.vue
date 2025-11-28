<template>
  <header v-if="showBackButton" class="sticky top-0 z-40 bg-white border-b border-gray-200">
    <div class="container mx-auto px-4">
      <div class="flex items-center h-14">
        <BackButton />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import BackButton from '@/components/common/BackButton.vue'

const route = useRoute()

// Показывать кнопку назад на всех страницах, кроме главной
const showBackButton = computed(() => {
  return route.path !== '/'
})
</script>

