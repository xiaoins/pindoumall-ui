<template>
  <button 
    class="fixed bottom-6 right-6 w-12 h-12 bg-tertiary text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 z-40 hover:bg-tertiary/90 hover:shadow-xl hover:scale-110"
    :class="{
      'opacity-100 translate-y-0 pointer-events-auto': uiStore.isBackToTopVisible,
      'opacity-0 translate-y-4 pointer-events-none': !uiStore.isBackToTopVisible
    }"
    @click="scrollToTop"
    title="返回顶部"
  >
    <i class="fa fa-chevron-up text-lg"></i>
  </button>
</template>

<script setup>
import { useUIStore } from '../stores/ui'

const uiStore = useUIStore()

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>