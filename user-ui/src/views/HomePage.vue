<template>
  <div class="font-inter bg-light text-gray-800">
    <!-- 导航栏 -->
    <AppHeader />
    
    <!-- 购物车侧边栏 -->
    <CartSidebar />
    
    <!-- 个人中心侧边栏 -->
    <UserSidebar />
    
    <!-- 遮罩层 -->
    <div 
      v-show="uiStore.isCartSidebarOpen || uiStore.isUserSidebarOpen"
      class="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
      :class="{
        'opacity-100': uiStore.isCartSidebarOpen || uiStore.isUserSidebarOpen,
        'opacity-0': !uiStore.isCartSidebarOpen && !uiStore.isUserSidebarOpen
      }"
      @click="uiStore.closeAllSidebars()"
    ></div>

    <!-- 英雄区域 -->
    <HeroSection />

    <!-- 特色分类 -->
    <CategoryGrid />

    <!-- 精选商品 -->
    <FeaturedProducts />

    <!-- 新品上市 -->
    <NewArrivals />

    <!-- 特惠活动 -->
    <DealsSection />

    <!-- 统计数据 -->
    <StatsSection />

    <!-- 页脚 -->
    <AppFooter />

    <!-- 回到顶部按钮 -->
    <BackToTop />

    <!-- Toast通知 -->
    <ToastNotification />
  </div>
</template>

<script setup>
import { useUIStore } from '@/stores/ui'
import AppHeader from '@/components/AppHeader.vue'
import CartSidebar from '@/components/CartSidebar.vue'
import UserSidebar from '@/components/UserSidebar.vue'
import HeroSection from '@/components/HeroSection.vue'
import CategoryGrid from '@/components/CategoryGrid.vue'
import FeaturedProducts from '@/components/FeaturedProducts.vue'
import NewArrivals from '@/components/NewArrivals.vue'
import DealsSection from '@/components/DealsSection.vue'
import StatsSection from '@/components/StatsSection.vue'
import AppFooter from '@/components/AppFooter.vue'
import BackToTop from '@/components/BackToTop.vue'
import ToastNotification from '@/components/ToastNotification.vue'

const uiStore = useUIStore()
</script>

<style scoped>

</style>