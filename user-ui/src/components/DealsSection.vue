<template>
  <section id="deals" class="py-16 bg-gradient-to-br from-red-50 to-orange-50">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <h2 class="section-title text-red-600">限时特惠</h2>
        <p class="text-gray-600 max-w-2xl mx-auto">
          抢购倒计时，错过再等一年！超值优惠等你来抢
        </p>
      </div>
      
      <!-- 倒计时器 -->
      <div class="bg-white rounded-2xl shadow-xl p-8 mb-12 text-center">
        <h3 class="text-2xl font-bold text-dark mb-4">距离活动结束还有</h3>
        <div class="flex justify-center items-center space-x-4 mb-6">
          <div class="bg-red-500 text-white rounded-lg p-4 min-w-[80px]">
            <div class="text-3xl font-bold">{{ countdown.days }}</div>
            <div class="text-sm">天</div>
          </div>
          <div class="text-2xl font-bold text-red-500">:</div>
          <div class="bg-red-500 text-white rounded-lg p-4 min-w-[80px]">
            <div class="text-3xl font-bold">{{ countdown.hours }}</div>
            <div class="text-sm">时</div>
          </div>
          <div class="text-2xl font-bold text-red-500">:</div>
          <div class="bg-red-500 text-white rounded-lg p-4 min-w-[80px]">
            <div class="text-3xl font-bold">{{ countdown.minutes }}</div>
            <div class="text-sm">分</div>
          </div>
          <div class="text-2xl font-bold text-red-500">:</div>
          <div class="bg-red-500 text-white rounded-lg p-4 min-w-[80px]">
            <div class="text-3xl font-bold">{{ countdown.seconds }}</div>
            <div class="text-sm">秒</div>
          </div>
        </div>
        <p class="text-gray-600">全场商品最高享受7折优惠</p>
      </div>
      
      <!-- 特惠商品网格 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- 主要特惠商品 -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div class="relative">
              <img 
                src="https://picsum.photos/id/96/800/400" 
                alt="特惠商品" 
                class="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              >
              <div class="absolute top-4 left-4">
                <span class="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  限时7折
                </span>
              </div>
              <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <h3 class="text-white text-2xl font-bold mb-2">智能家居套装</h3>
                <p class="text-white/90 mb-4">全屋智能，一键控制</p>
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-2">
                    <span class="text-white text-3xl font-bold">¥1,999</span>
                    <span class="text-white/70 line-through">¥2,899</span>
                  </div>
                  <button class="bg-white text-red-500 px-6 py-2 rounded-lg font-medium hover:bg-red-50 transition-colors">
                    立即抢购
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 侧边特惠商品 -->
        <div class="space-y-6">
          <div 
            v-for="deal in sideDeals" 
            :key="deal.id"
            class="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-lg transition-all duration-300 cursor-pointer"
            @click="handleDealClick(deal)"
          >
            <div class="flex">
              <img 
                :src="deal.image" 
                :alt="deal.name" 
                class="w-24 h-24 object-cover group-hover:scale-110 transition-transform duration-300"
              >
              <div class="flex-1 p-4">
                <h4 class="font-semibold text-dark mb-1 group-hover:text-red-500 transition-colors">
                  {{ deal.name }}
                </h4>
                <div class="flex items-center space-x-2 mb-2">
                  <span class="text-red-500 font-bold">¥{{ deal.price }}</span>
                  <span class="text-gray-400 text-sm line-through">¥{{ deal.originalPrice }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                    -{{ deal.discount }}%
                  </span>
                  <span class="text-xs text-gray-500">剩余{{ deal.stock }}件</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 更多特惠 -->
      <div class="mt-12">
        <h3 class="text-xl font-bold text-dark mb-6 text-center">
          <button 
            @click="goToDealsPage"
            class="hover:text-red-500 transition-colors cursor-pointer"
          >
            更多特惠商品
          </button>
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ProductCard 
            v-for="product in dealProducts" 
            :key="product.id"
            :product="product"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import ProductCard from './ProductCard.vue'

const router = useRouter()

const countdown = ref({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0
})

const countdownInterval = ref(null)

const sideDeals = ref([
  {
    id: 1,
    name: '无线蓝牙耳机',
    price: 199,
    originalPrice: 299,
    discount: 33,
    stock: 15,
    image: 'https://picsum.photos/id/96/200/200'
  },
  {
    id: 2,
    name: '智能手环',
    price: 159,
    originalPrice: 229,
    discount: 31,
    stock: 8,
    image: 'https://picsum.photos/id/60/200/200'
  },
  {
    id: 3,
    name: '便携充电宝',
    price: 89,
    originalPrice: 129,
    discount: 31,
    stock: 23,
    image: 'https://picsum.photos/id/96/200/200'
  }
])

const dealProducts = ref([
  {
    id: 201,
    name: '夏季连衣裙 清新款',
    price: 129,
    originalPrice: 199,
    discount: 35,
    rating: 4.8,
    reviews: 456,
    image: 'https://picsum.photos/id/21/400/300',
    category: 'fashion',
    badge: '特惠'
  },
  {
    id: 202,
    name: '运动鞋 透气款',
    price: 259,
    originalPrice: 399,
    discount: 35,
    rating: 4.7,
    reviews: 234,
    image: 'https://picsum.photos/id/19/400/300',
    category: 'sports',
    badge: '特惠'
  },
  {
    id: 203,
    name: '护肤精华 补水款',
    price: 189,
    originalPrice: 289,
    discount: 35,
    rating: 4.9,
    reviews: 678,
    image: 'https://picsum.photos/id/177/400/300',
    category: 'beauty',
    badge: '特惠'
  },
  {
    id: 204,
    name: '咖啡机 全自动',
    price: 899,
    originalPrice: 1299,
    discount: 31,
    rating: 4.6,
    reviews: 123,
    image: 'https://picsum.photos/id/24/400/300',
    category: 'home',
    badge: '特惠'
  }
])

const updateCountdown = () => {
  // 设置活动结束时间（3天后）
  const endTime = new Date().getTime() + (3 * 24 * 60 * 60 * 1000)
  const now = new Date().getTime()
  const timeLeft = endTime - now
  
  if (timeLeft > 0) {
    countdown.value.days = Math.floor(timeLeft / (1000 * 60 * 60 * 24))
    countdown.value.hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    countdown.value.minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))
    countdown.value.seconds = Math.floor((timeLeft % (1000 * 60)) / 1000)
  } else {
    // 活动结束
    countdown.value = { days: 0, hours: 0, minutes: 0, seconds: 0 }
    if (countdownInterval.value) {
      clearInterval(countdownInterval.value)
    }
  }
}

const handleDealClick = (deal) => {
  console.log('点击特惠商品:', deal.name)
  showToast(`${deal.name} 已加入购物车`)
}

const goToDealsPage = () => {
  router.push('/deals')
}

const showToast = (message) => {
  const toast = document.createElement('div')
  toast.className = 'fixed top-20 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-all duration-300'
  toast.textContent = message
  document.body.appendChild(toast)
  
  setTimeout(() => {
    toast.style.opacity = '0'
    setTimeout(() => {
      document.body.removeChild(toast)
    }, 300)
  }, 2000)
}

onMounted(() => {
  updateCountdown()
  countdownInterval.value = setInterval(updateCountdown, 1000)
})

onUnmounted(() => {
  if (countdownInterval.value) {
    clearInterval(countdownInterval.value)
  }
})
</script>