<template>
  <!-- 购物车侧边栏 -->
  <div 
    class="fixed inset-0 z-50 transition-opacity duration-300"
    :class="{
      'opacity-100 pointer-events-auto': uiStore.isCartSidebarOpen,
      'opacity-0 pointer-events-none': !uiStore.isCartSidebarOpen
    }"
  >
    <!-- 遮罩层 -->
    <div 
      class="absolute inset-0 bg-black/50 transition-opacity duration-300"
      @click="uiStore.closeCartSidebar()"
    ></div>
    
    <!-- 侧边栏内容 -->
    <div 
      class="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 flex flex-col"
      :class="{
        'translate-x-0': uiStore.isCartSidebarOpen,
        'translate-x-full': !uiStore.isCartSidebarOpen
      }"
    >
      <!-- 头部 -->
      <div class="flex items-center justify-between p-6 border-b">
        <h3 class="text-lg font-semibold text-dark">
          购物车 ({{ cartStore.totalItems }})
        </h3>
        <button 
          class="text-gray-400 hover:text-gray-600 text-xl"
          @click="uiStore.closeCartSidebar()"
        >
          <i class="fa fa-times"></i>
        </button>
      </div>
      
      <!-- 购物车内容 -->
      <div class="flex-1 overflow-y-auto">
        <!-- 未登录状态 -->
        <div 
          v-if="!userStore.isAuthenticated"
          class="flex flex-col items-center justify-center h-full p-6 text-center"
        >
          <img src="/assets/icon/个人.svg" alt="登录" class="w-16 h-16 text-gray-300 mb-4" />
          <h4 class="text-lg font-medium text-gray-600 mb-2">请先登录</h4>
          <p class="text-gray-500 mb-6">登录后即可查看购物车商品</p>
          <button 
            class="btn-primary"
            @click="goToLogin"
          >
            立即登录
          </button>
        </div>
        
        <!-- 空购物车状态 -->
        <div 
          v-else-if="cartStore.items.length === 0"
          class="flex flex-col items-center justify-center h-full p-6 text-center"
        >
          <img src="/assets/icon/16act_清空.svg" alt="清空" class="w-16 h-16 text-gray-300 mb-4" />
          <h4 class="text-lg font-medium text-gray-600 mb-2">购物车是空的</h4>
          <p class="text-gray-500 mb-6">快去挑选您喜欢的商品吧！</p>
          <button 
            class="btn-primary"
            @click="goShopping"
          >
            去购物
          </button>
        </div>
        
        <!-- 购物车商品列表 -->
        <div v-else-if="userStore.isAuthenticated" class="p-4 space-y-4">
          <div 
            v-for="item in cartStore.items" 
            :key="item.id"
            class="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
          >
            <img 
              :src="item.image" 
              :alt="item.name" 
              class="w-16 h-16 object-cover rounded-lg"
            >
            <div class="flex-1 min-w-0">
              <h4 class="font-medium text-dark truncate">{{ item.name }}</h4>
              <p class="text-tertiary font-semibold">¥{{ item.price }}</p>
            </div>
            <div class="flex items-center space-x-2">
              <button 
                class="w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-tertiary border"
                @click="decreaseQuantity(item)"
                :disabled="item.quantity <= 1"
              >
                <i class="fa fa-minus text-xs"></i>
              </button>
              <span class="w-8 text-center font-medium">{{ item.quantity }}</span>
              <button 
                class="w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-tertiary border"
                @click="increaseQuantity(item)"
              >
                <i class="fa fa-plus text-xs"></i>
              </button>
            </div>
            <button 
              class="text-gray-400 hover:text-red-500 transition-colors"
              @click="removeItem(item)"
            >
              <i class="fa fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
      
      <!-- 底部结算区域 -->
      <div 
        v-if="userStore.isAuthenticated && cartStore.items.length > 0"
        class="border-t p-6 space-y-4"
      >
        <div class="flex justify-between items-center text-lg font-semibold">
          <span>总计:</span>
          <span class="text-tertiary">¥{{ cartStore.totalPrice.toFixed(2) }}</span>
        </div>
        
        <div class="space-y-3">
          <button 
            class="w-full btn-primary"
            @click="checkout"
          >
            立即结算
          </button>
          <button 
            class="w-full btn-secondary"
            @click="clearCart"
          >
            清空购物车
          </button>
        </div>
        
        <!-- 优惠信息 -->
        <div class="text-sm text-gray-600 bg-green-50 p-3 rounded-lg">
          <i class="fa fa-gift text-green-500 mr-2"></i>
          满¥299免运费，还差¥{{ Math.max(0, 299 - cartStore.totalPrice).toFixed(2) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { useUIStore } from '../stores/ui'
import { useUserStore } from '../stores/user'

const router = useRouter()
const cartStore = useCartStore()
const uiStore = useUIStore()
const userStore = useUserStore()

const decreaseQuantity = (item) => {
  if (item.quantity > 1) {
    cartStore.updateQuantity(item.id, item.quantity - 1)
  }
}

const increaseQuantity = (item) => {
  cartStore.updateQuantity(item.id, item.quantity + 1)
}

const removeItem = (item) => {
  if (!userStore.isAuthenticated) {
    userStore.showToast('请先登录', 'warning')
    return
  }
  cartStore.removeFromCart(item.id)
}

const clearCart = () => {
  if (!userStore.isAuthenticated) {
    userStore.showToast('请先登录', 'warning')
    return
  }
  if (confirm('确定要清空购物车吗？')) {
    cartStore.clearCart()
  }
}

const checkout = () => {
  if (!userStore.isAuthenticated) {
    userStore.showToast('请先登录后再结算', 'warning')
    return
  }
  console.log('前往结算页面')
  uiStore.closeCartSidebar()
  router.push('/checkout')
}

const goShopping = () => {
  uiStore.closeCartSidebar()
  // 滚动到商品区域
  const featuredSection = document.querySelector('#featured')
  if (featuredSection) {
    window.scrollTo({
      top: featuredSection.offsetTop - 80,
      behavior: 'smooth'
    })
  }
}

const goToLogin = () => {
  uiStore.closeCartSidebar()
  router.push('/login')
}

// 移除showToast函数，使用userStore.showToast
</script>