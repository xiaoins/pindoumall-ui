<template>
  <!-- 用户侧边栏 -->
  <div 
    class="fixed inset-0 z-50 transition-opacity duration-300"
    :class="{
      'opacity-100 pointer-events-auto': uiStore.isUserSidebarOpen,
      'opacity-0 pointer-events-none': !uiStore.isUserSidebarOpen
    }"
  >
    <!-- 遮罩层 -->
    <div 
      class="absolute inset-0 bg-black/50 transition-opacity duration-300"
      @click="uiStore.closeUserSidebar()"
    ></div>
    
    <!-- 侧边栏内容 -->
    <div 
      class="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-xl transform transition-transform duration-300 flex flex-col"
      :class="{
        'translate-x-0': uiStore.isUserSidebarOpen,
        'translate-x-full': !uiStore.isUserSidebarOpen
      }"
    >
      <!-- 头部 -->
      <div class="flex items-center justify-between p-6 border-b bg-gradient-to-r from-primary to-secondary">
        <div class="flex items-center space-x-3">
          <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center">
            <img src="/assets/icon/个人.svg" alt="个人" class="w-6 h-6" style="filter: hue-rotate(120deg) saturate(2) brightness(0.8);">
          </div>
          <div>
            <h3 class="text-white font-semibold">{{ userStore.displayName }}</h3>
            <p class="text-white/80 text-sm">{{ userStore.userInfo.email || '未登录' }}</p>
          </div>
        </div>
        <button 
          class="text-white/80 hover:text-white text-xl"
          @click="uiStore.closeUserSidebar()"
        >
          <i class="fa fa-times"></i>
        </button>
      </div>
      
      <!-- 用户菜单 -->
      <div class="flex-1 overflow-y-auto">
        <div class="p-4 space-y-2">
          <div 
            v-for="item in menuItems" 
            :key="item.id"
            class="group"
          >
            <button 
              class="w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-all duration-300 hover:bg-gray-50 group-hover:text-tertiary"
              @click="handleMenuClick(item)"
            >
              <div class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-tertiary/10 transition-colors duration-300">
                <img :src="item.icon" :alt="item.title" class="w-5 h-5" style="filter: hue-rotate(120deg) saturate(2) brightness(0.8);">
              </div>
              <div class="flex-1">
                <h4 class="font-medium text-dark group-hover:text-tertiary transition-colors duration-300">
                  {{ item.title }}
                </h4>
                <p class="text-sm text-gray-500">{{ item.description }}</p>
              </div>
              <i class="fa fa-chevron-right text-gray-400 group-hover:text-tertiary transition-colors duration-300"></i>
            </button>
          </div>
        </div>
        
        <!-- 分割线 -->
        <div class="border-t mx-4 my-4"></div>
        
        <!-- 设置和退出 -->
        <div class="p-4 space-y-2">
          <button 
            class="w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-all duration-300 hover:bg-gray-50 group"
            @click="openSettings"
          >
            <div class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-blue-50 transition-colors duration-300">
              <img src="/assets/icon/设置.svg" alt="设置" class="w-5 h-5" style="filter: hue-rotate(120deg) saturate(2) brightness(0.8);">
            </div>
            <div class="flex-1">
              <h4 class="font-medium text-dark group-hover:text-blue-500 transition-colors duration-300">设置</h4>
              <p class="text-sm text-gray-500">个人设置和偏好</p>
            </div>
            <i class="fa fa-chevron-right text-gray-400 group-hover:text-blue-500 transition-colors duration-300"></i>
          </button>
          
          <button 
            v-if="userStore.isAuthenticated"
            class="w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-all duration-300 hover:bg-red-50 group"
            @click="logout"
          >
            <div class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-red-50 transition-colors duration-300">
              <img src="/assets/icon/退出.svg" alt="退出" class="w-5 h-5" style="filter: hue-rotate(120deg) saturate(2) brightness(0.8);">
            </div>
            <div class="flex-1">
              <h4 class="font-medium text-dark group-hover:text-red-500 transition-colors duration-300">退出登录</h4>
              <p class="text-sm text-gray-500">安全退出账户</p>
            </div>
          </button>
          
          <button 
            v-else
            class="w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-all duration-300 hover:bg-green-50 group"
            @click="login"
          >
            <div class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-green-50 transition-colors duration-300">
              <img src="/assets/icon/登录.svg" alt="登录" class="w-5 h-5 text-gray-600 group-hover:text-green-500 transition-colors duration-300" />
            </div>
            <div class="flex-1">
              <h4 class="font-medium text-dark group-hover:text-green-500 transition-colors duration-300">登录</h4>
              <p class="text-sm text-gray-500">登录您的账户</p>
            </div>
          </button>
        </div>
      </div>
      
      <!-- 底部信息 -->
      <div class="border-t p-4 bg-gray-50">
        <div class="text-center text-sm text-gray-500">
          <p>优购商城 v1.0.0</p>
          <p class="mt-1">为您提供优质购物体验</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUIStore } from '../stores/ui'
import { useUserStore } from '../stores/user'

const uiStore = useUIStore()
const router = useRouter()
const userStore = useUserStore()

const menuItems = [
  {
    id: 1,
    title: '个人资料',
    description: '查看和编辑个人信息',
    icon: '/assets/icon/个人.svg',
    action: 'profile'
  },
  {
    id: 2,
    title: '浏览历史',
    description: '查看最近浏览的商品',
    icon: '/assets/icon/浏览历史.svg',
    action: 'history'
  },
  {
    id: 3,
    title: '我的收藏',
    description: '管理收藏的商品',
    icon: '/assets/icon/收藏.svg',
    action: 'favorites'
  },
  {
    id: 4,
    title: '我的订单',
    description: '查看订单状态和历史',
    icon: '/assets/icon/订单.svg',
    action: 'orders'
  },
  {
    id: 5,
    title: '物流信息',
    description: '跟踪包裹配送状态',
    icon: '/assets/icon/物流.svg',
    action: 'logistics'
  },
  {
    id: 6,
    title: '优惠券',
    description: '查看可用优惠券',
    icon: '/assets/icon/优惠卷-线性2-0.svg',
    action: 'coupons'
  },
  {
    id: 7,
    title: '会员中心',
    description: '会员等级和权益',
    icon: '/assets/icon/会员.svg',
    action: 'membership'
  },
  {
    id: 8,
    title: '地址管理',
    description: '管理收货地址',
    icon: '/assets/icon/地址.svg',
    action: 'addresses'
  },
  {
    id: 9,
    title: '客服帮助',
    description: '联系客服获取帮助',
    icon: '/assets/icon/客服.svg',
    action: 'help'
  }
]

const handleMenuClick = (item) => {
  console.log('点击菜单:', item.title)
  
  // 检查是否需要登录
  if (!userStore.isAuthenticated) {
    userStore.showToast('请先登录后再访问此功能', 'warning')
    return
  }
  
  switch (item.action) {
    case 'profile':
      router.push('/profile')
      break
    case 'history':
      router.push('/history')
      break
    case 'favorites':
      router.push('/favorites')
      break
    case 'orders':
      router.push('/orders')
      break
    case 'logistics':
      router.push('/logistics')
      break
    case 'coupons':
      router.push('/coupons')
      break
    case 'membership':
      router.push('/membership')
      break
    case 'addresses':
      userStore.showToast('地址管理功能开发中...', 'info')
      break
    case 'help':
      userStore.showToast('客服功能开发中...', 'info')
      break
    default:
      userStore.showToast('功能开发中...', 'info')
  }
  
  // 关闭侧边栏
  uiStore.closeUserSidebar()
}

const openSettings = () => {
  console.log('打开设置')
  userStore.showToast('设置功能开发中...', 'info')
  uiStore.closeUserSidebar()
}

const login = () => {
  console.log('用户登录')
  uiStore.closeUserSidebar()
  router.push('/login')
}

const logout = async () => {
  uiStore.closeUserSidebar()
  await userStore.logout()
}

// 移除showToast函数，使用userStore.showToast
</script>