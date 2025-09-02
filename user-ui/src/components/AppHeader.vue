<template>
  <header 
    ref="navbar"
    class="fixed w-full z-50 transition-all duration-300"
    :class="{
      'bg-white shadow-md py-2': isScrolled,
      'py-4': !isScrolled
    }"
  >
    <div class="container mx-auto px-4 py-4 flex items-center justify-between">
      <!-- Logo -->
      <a href="#" class="flex items-center" @click="scrollToTop">
        <img src="/assets/logo.svg" alt="优购商城" class="h-10 w-auto mr-3" />
        <img src="/assets/pindou-font.svg" alt="优购商城" class="h-8 w-auto" />
      </a>
      
      <!-- 桌面导航 -->
      <nav class="hidden md:flex space-x-8">
        <router-link 
          v-for="item in navItems" 
          :key="item.to"
          :to="item.to" 
          class="font-medium text-dark hover:text-tertiary transition-colors"
          active-class="text-tertiary"
        >
          {{ item.text }}
        </router-link>
      </nav>
      
      <!-- 用户功能区 -->
      <div class="flex items-center space-x-4">
        <button 
          class="relative text-dark hover:text-tertiary transition-colors" 
          @click="uiStore.toggleSearch()"
        >
          <img src="/assets/icon/搜索.svg" alt="搜索" class="w-5 h-5">
        </button>
        
        <button 
          class="relative text-dark hover:text-tertiary transition-colors" 
          @click="uiStore.openCartSidebar()"
        >
          <img src="/assets/icon/购物车.svg" alt="购物车" class="w-5 h-5">
          <span 
            v-if="cartStore.totalItems > 0"
            class="cart-count"
          >
            {{ cartStore.totalItems }}
          </span>
        </button>
        
        <button 
          class="relative text-dark hover:text-tertiary transition-colors" 
          @click="uiStore.openUserSidebar()"
        >
          <img src="/assets/icon/顶部个人.svg" alt="个人" class="w-5 h-5">
        </button>
        
        <!-- 立即购买按钮 -->
        <router-link 
          to="/featured" 
          class="hidden md:block btn-primary"
        >
          立即购买
        </router-link>
      </div>
      
      <!-- 移动端菜单按钮 -->
      <button 
        class="md:hidden text-dark text-2xl"
        @click="uiStore.toggleMobileMenu()"
      >
        <i :class="uiStore.isMobileMenuOpen ? 'fa fa-times' : 'fa fa-bars'"></i>
      </button>
    </div>
    
    <!-- 搜索框 -->
    <div 
      v-show="uiStore.isSearchOpen"
      class="bg-white shadow-lg absolute w-full py-4 transition-all duration-300"
    >
      <div class="container mx-auto px-4">
        <div class="relative">
          <input 
            type="text" 
            placeholder="搜索商品..." 
            class="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-tertiary/50 focus:border-tertiary pl-10"
            v-model="searchQuery"
            @keyup.enter="handleSearch"
          >
          <i class="fa fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
        </div>
      </div>
    </div>
    
    <!-- 移动端导航菜单 -->
    <div 
      v-show="uiStore.isMobileMenuOpen"
      class="md:hidden bg-white shadow-lg absolute w-full transition-all duration-300"
    >
      <div class="container mx-auto px-4 py-4 flex flex-col space-y-4">
        <router-link 
          v-for="item in navItems" 
          :key="item.to"
          :to="item.to" 
          class="font-medium text-dark hover:text-tertiary transition-colors py-2"
          active-class="text-tertiary"
          @click="uiStore.closeMobileMenu()"
        >
          {{ item.text }}
        </router-link>
        <router-link 
          to="/featured" 
          class="btn-primary text-center"
          @click="uiStore.closeMobileMenu()"
        >
          立即购买
        </router-link>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useCartStore } from '../stores/cart'
import { useUIStore } from '../stores/ui'

const cartStore = useCartStore()
const uiStore = useUIStore()

const navbar = ref(null)
const isScrolled = ref(false)
const searchQuery = ref('')

const navItems = [
  { to: '/', text: '首页' },
  { to: '/featured', text: '精选商品' },
  { to: '/categories', text: '商品分类' },
  { to: '/new-arrivals', text: '新品上市' },
  { to: '/deals', text: '特惠活动' }
]

const handleScroll = () => {
  isScrolled.value = window.scrollY > 100
  uiStore.setBackToTopVisibility(window.scrollY > 100)
}

const scrollToTop = (e) => {
  e.preventDefault()
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

const handleNavClick = (e) => {
  e.preventDefault()
  const targetId = e.target.getAttribute('href')
  const targetElement = document.querySelector(targetId)
  
  if (targetElement) {
    window.scrollTo({
      top: targetElement.offsetTop - 80,
      behavior: 'smooth'
    })
  }
}

const handleMobileNavClick = (e) => {
  handleNavClick(e)
  uiStore.closeMobileMenu()
}

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    console.log('搜索:', searchQuery.value)
    // 这里可以实现搜索功能
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>