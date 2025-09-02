<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 页面标题 -->
    <div class="bg-gradient-to-r from-red-500 to-pink-600 text-white">
      <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold mb-2">🔥 特惠活动</h1>
        <p class="text-red-100">限时优惠，抢购正当时！错过再等一年</p>
      </div>
    </div>

    <div class="container mx-auto px-4 py-8">
      <!-- 活动横幅 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <!-- 主要活动横幅 -->
        <div class="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg p-8 text-white relative overflow-hidden">
          <div class="relative z-10">
            <h2 class="text-2xl font-bold mb-2"><img src="/assets/icon/礼花.svg" alt="礼花" class="inline w-6 h-6 mr-2" /> 年终大促</h2>
            <p class="text-yellow-100 mb-4">全场商品最高立减50%</p>
            <div class="flex items-center gap-4 mb-4">
              <div class="bg-white text-orange-600 px-3 py-1 rounded-full text-sm font-semibold">
                剩余时间
              </div>
              <div class="flex gap-2 text-lg font-bold">
                <span class="bg-black bg-opacity-30 px-2 py-1 rounded">{{ countdown.days }}</span>
                <span>:</span>
                <span class="bg-black bg-opacity-30 px-2 py-1 rounded">{{ countdown.hours }}</span>
                <span>:</span>
                <span class="bg-black bg-opacity-30 px-2 py-1 rounded">{{ countdown.minutes }}</span>
              </div>
            </div>
            <button class="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              立即抢购
            </button>
          </div>
          <div class="absolute -right-4 -top-4 text-6xl opacity-20">
            🎁
          </div>
        </div>

        <!-- 次要活动横幅 -->
        <div class="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg p-8 text-white relative overflow-hidden">
          <div class="relative z-10">
            <h2 class="text-2xl font-bold mb-2"><img src="/assets/icon/皇冠.svg" alt="皇冠" class="inline w-6 h-6 mr-2" /> 会员专享</h2>
            <p class="text-purple-100 mb-4">VIP会员额外享受8折优惠</p>
            <div class="mb-4">
              <span class="bg-white text-purple-600 px-3 py-1 rounded-full text-sm font-semibold">
                仅限今日
              </span>
            </div>
            <button class="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              成为会员
            </button>
          </div>
          <div class="absolute -right-4 -top-4 text-6xl opacity-20">
            👑
          </div>
        </div>
      </div>

      <!-- 活动分类标签 -->
      <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div class="flex flex-wrap gap-4 items-center justify-between">
          <div class="flex flex-wrap gap-2">
            <button
              v-for="category in dealCategories"
              :key="category.id"
              @click="selectedDealCategory = category.id"
              :class="[
                'px-4 py-2 rounded-full transition-colors',
                selectedDealCategory === category.id
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              ]"
            >
              {{ category.icon }} {{ category.name }}
            </button>
          </div>
          <div class="flex items-center gap-4">
            <select v-model="sortBy" class="border border-gray-300 rounded-lg px-3 py-2">
              <option value="discount">折扣最高</option>
              <option value="price-asc">价格从低到高</option>
              <option value="price-desc">价格从高到低</option>
              <option value="ending-soon">即将结束</option>
            </select>
            <div class="flex items-center gap-2">
              <button
                @click="viewMode = 'grid'"
                :class="[
                  'p-2 rounded-lg',
                  viewMode === 'grid' ? 'bg-red-100 text-red-700' : 'text-gray-500 hover:bg-gray-100'
                ]"
              >
                <i class="fa fa-th-large"></i>
              </button>
              <button
                @click="viewMode = 'list'"
                :class="[
                  'p-2 rounded-lg',
                  viewMode === 'list' ? 'bg-red-100 text-red-700' : 'text-gray-500 hover:bg-gray-100'
                ]"
              >
                <i class="fa fa-list"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 特惠商品网格视图 -->
      <div v-if="viewMode === 'grid'" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group relative"
        >
          <!-- 折扣标签 -->
          <div class="absolute top-3 left-3 z-10">
            <div class="bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold">
              -{{ product.discount }}%
            </div>
            <div v-if="product.isFlashSale" class="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold mt-1">
              ⚡ 秒杀
            </div>
          </div>
          
          <!-- 倒计时 -->
          <div v-if="product.endTime" class="absolute top-3 right-3 z-10">
            <div class="bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
              {{ formatTimeLeft(product.endTime) }}
            </div>
          </div>

          <div class="relative">
            <img
              :src="product.image"
              :alt="product.name"
              class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            >
            <!-- 收藏按钮 -->
            <button
              @click="toggleFavorite(product)"
              :class="[
                'absolute bottom-3 right-3 p-2 rounded-full transition-all duration-300',
                product.isFavorite ? 'bg-red-100 text-red-600' : 'bg-white text-gray-400 hover:text-red-600',
                'opacity-0 group-hover:opacity-100'
              ]"
            >
              <i :class="product.isFavorite ? 'fa fa-heart' : 'fa fa-heart-o'"></i>
            </button>
          </div>
          
          <div class="p-4">
            <h3 class="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
              {{ product.name }}
            </h3>
            <div class="flex items-center mb-2">
              <div class="flex text-yellow-400 mr-2">
                <i v-for="i in 5" :key="i" :class="i <= product.rating ? 'fa fa-star' : 'fa fa-star-o'"></i>
              </div>
              <span class="text-sm text-gray-600">({{ product.reviews }})</span>
            </div>
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center gap-2">
                <span class="text-xl font-bold text-red-600">¥{{ product.salePrice }}</span>
                <span class="text-sm text-gray-500 line-through">¥{{ product.originalPrice }}</span>
              </div>
              <span class="text-sm text-gray-600">已售{{ product.sold }}</span>
            </div>
            
            <!-- 进度条 -->
            <div v-if="product.stock" class="mb-3">
              <div class="flex justify-between text-sm text-gray-600 mb-1">
                <span>仅剩{{ product.stock }}件</span>
                <span>{{ Math.round((product.sold / (product.sold + product.stock)) * 100) }}%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div 
                  class="bg-red-500 h-2 rounded-full transition-all duration-300"
                  :style="{ width: Math.round((product.sold / (product.sold + product.stock)) * 100) + '%' }"
                ></div>
              </div>
            </div>
            
            <button
              @click="addToCart(product)"
              :disabled="product.stock === 0"
              :class="[
                'w-full py-2 rounded-lg transition-colors transform hover:scale-105',
                product.stock === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-red-600 text-white hover:bg-red-700'
              ]"
            >
              <i class="fa fa-shopping-cart mr-2"></i>
              {{ product.stock === 0 ? '已售罄' : '立即抢购' }}
            </button>
          </div>
        </div>
      </div>

      <!-- 特惠商品列表视图 -->
      <div v-else class="space-y-6">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
        >
          <div class="flex flex-col md:flex-row">
            <div class="relative md:w-64 h-48 md:h-32">
              <img
                :src="product.image"
                :alt="product.name"
                class="w-full h-full object-cover"
              >
              <div class="absolute top-2 left-2">
                <div class="bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold">
                  -{{ product.discount }}%
                </div>
                <div v-if="product.isFlashSale" class="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold mt-1">
                  ⚡ 秒杀
                </div>
              </div>
              <div v-if="product.endTime" class="absolute top-2 right-2">
                <div class="bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                  {{ formatTimeLeft(product.endTime) }}
                </div>
              </div>
            </div>
            <div class="flex-1 p-4">
              <div class="flex justify-between items-start">
                <div class="flex-1">
                  <h3 class="font-semibold text-gray-900 mb-2 text-lg">{{ product.name }}</h3>
                  <div class="flex items-center mb-2">
                    <div class="flex text-yellow-400 mr-2">
                      <i v-for="i in 5" :key="i" :class="i <= product.rating ? 'fa fa-star' : 'fa fa-star-o'"></i>
                    </div>
                    <span class="text-sm text-gray-600">({{ product.reviews }}条评论)</span>
                    <span class="text-sm text-gray-600 ml-4">已售{{ product.sold }}件</span>
                  </div>
                  <div class="flex items-center gap-3 mb-3">
                    <span class="text-2xl font-bold text-red-600">¥{{ product.salePrice }}</span>
                    <span class="text-lg text-gray-500 line-through">¥{{ product.originalPrice }}</span>
                    <span class="bg-red-100 text-red-700 px-2 py-1 rounded text-sm font-semibold">
                      省¥{{ product.originalPrice - product.salePrice }}
                    </span>
                  </div>
                  <div v-if="product.stock" class="mb-3">
                    <div class="flex justify-between text-sm text-gray-600 mb-1">
                      <span>库存仅剩{{ product.stock }}件</span>
                      <span>{{ Math.round((product.sold / (product.sold + product.stock)) * 100) }}%已售</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        class="bg-red-500 h-2 rounded-full transition-all duration-300"
                        :style="{ width: Math.round((product.sold / (product.sold + product.stock)) * 100) + '%' }"
                      ></div>
                    </div>
                  </div>
                </div>
                <div class="flex flex-col gap-3 ml-4">
                  <button
                    @click="toggleFavorite(product)"
                    :class="[
                      'p-2 rounded-lg transition-colors',
                      product.isFavorite ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-400 hover:text-red-600'
                    ]"
                  >
                    <i :class="product.isFavorite ? 'fa fa-heart' : 'fa fa-heart-o'"></i>
                  </button>
                  <button
                    @click="addToCart(product)"
                    :disabled="product.stock === 0"
                    :class="[
                      'px-6 py-2 rounded-lg transition-colors',
                      product.stock === 0
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-red-600 text-white hover:bg-red-700'
                    ]"
                  >
                    <i class="fa fa-shopping-cart mr-2"></i>
                    {{ product.stock === 0 ? '已售罄' : '立即抢购' }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 分页 -->
      <div v-if="totalPages > 1" class="flex justify-center mt-8">
        <div class="flex items-center gap-2">
          <button
            @click="currentPage = Math.max(1, currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            上一页
          </button>
          <button
            v-for="page in visiblePages"
            :key="page"
            @click="currentPage = page"
            :class="[
              'px-4 py-2 rounded-lg border',
              currentPage === page
                ? 'bg-red-600 text-white border-red-600'
                : 'border-gray-300 text-gray-600 hover:bg-gray-50'
            ]"
          >
            {{ page }}
          </button>
          <button
            @click="currentPage = Math.min(totalPages, currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            下一页
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useCartStore } from '../stores/cart'

const cartStore = useCartStore()

// 响应式数据
const selectedDealCategory = ref('all')
const sortBy = ref('discount')
const viewMode = ref('grid')
const currentPage = ref(1)
const itemsPerPage = 12
const countdown = ref({ days: 0, hours: 0, minutes: 0, seconds: 0 })

// 活动分类
const dealCategories = ref([
  { id: 'all', name: '全部活动', icon: '🔥' },
  { id: 'flash', name: '限时秒杀', icon: '⚡' },
  { id: 'clearance', name: '清仓特卖', icon: '💥' },
  { id: 'bundle', name: '买一送一', icon: '🎁' },
  { id: 'member', name: '会员专享', icon: '👑' }
])

// 特惠商品数据
const products = ref([
  {
    id: 1,
    name: 'iPhone 14 Pro 128GB 深紫色',
    originalPrice: 7999,
    salePrice: 5999,
    discount: 25,
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400',
    rating: 5,
    reviews: 234,
    sold: 1567,
    stock: 23,
    category: 'flash',
    isFlashSale: true,
    endTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2小时后结束
    isFavorite: false
  },
  {
    id: 2,
    name: 'Nike Air Max 90 经典复古跑鞋',
    originalPrice: 899,
    salePrice: 449,
    discount: 50,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
    rating: 4,
    reviews: 456,
    sold: 2341,
    stock: 67,
    category: 'clearance',
    isFlashSale: false,
    endTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24小时后结束
    isFavorite: false
  },
  {
    id: 3,
    name: 'MacBook Air M2 13英寸 256GB',
    originalPrice: 9499,
    salePrice: 7599,
    discount: 20,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
    rating: 5,
    reviews: 189,
    sold: 892,
    stock: 12,
    category: 'member',
    isFlashSale: false,
    endTime: new Date(Date.now() + 48 * 60 * 60 * 1000), // 48小时后结束
    isFavorite: false
  },
  {
    id: 4,
    name: 'Sony WH-1000XM5 无线降噪耳机',
    originalPrice: 2399,
    salePrice: 1799,
    discount: 25,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    rating: 5,
    reviews: 567,
    sold: 3456,
    stock: 89,
    category: 'bundle',
    isFlashSale: false,
    endTime: new Date(Date.now() + 12 * 60 * 60 * 1000), // 12小时后结束
    isFavorite: false
  },
  {
    id: 5,
    name: 'Dyson V12 Detect Slim 无线吸尘器',
    originalPrice: 3990,
    salePrice: 2990,
    discount: 25,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    rating: 4,
    reviews: 234,
    sold: 1234,
    stock: 34,
    category: 'flash',
    isFlashSale: true,
    endTime: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6小时后结束
    isFavorite: false
  },
  {
    id: 6,
    name: 'iPad Pro 11英寸 M2芯片 128GB',
    originalPrice: 6799,
    salePrice: 5439,
    discount: 20,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400',
    rating: 5,
    reviews: 345,
    sold: 2567,
    stock: 0, // 已售罄
    category: 'clearance',
    isFlashSale: false,
    endTime: null,
    isFavorite: false
  }
])

// 计算属性
const filteredProducts = computed(() => {
  let filtered = products.value

  // 按活动分类筛选
  if (selectedDealCategory.value !== 'all') {
    filtered = filtered.filter(product => product.category === selectedDealCategory.value)
  }

  // 排序
  switch (sortBy.value) {
    case 'discount':
      filtered.sort((a, b) => b.discount - a.discount)
      break
    case 'price-asc':
      filtered.sort((a, b) => a.salePrice - b.salePrice)
      break
    case 'price-desc':
      filtered.sort((a, b) => b.salePrice - a.salePrice)
      break
    case 'ending-soon':
      filtered.sort((a, b) => {
        if (!a.endTime) return 1
        if (!b.endTime) return -1
        return a.endTime - b.endTime
      })
      break
  }

  return filtered
})

const totalPages = computed(() => {
  return Math.ceil(filteredProducts.value.length / itemsPerPage)
})

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredProducts.value.slice(start, end)
})

const visiblePages = computed(() => {
  const pages = []
  const total = totalPages.value
  const current = currentPage.value
  
  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) {
        pages.push(i)
      }
      pages.push('...', total)
    } else if (current >= total - 3) {
      pages.push(1, '...')
      for (let i = total - 4; i <= total; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1, '...')
      for (let i = current - 1; i <= current + 1; i++) {
        pages.push(i)
      }
      pages.push('...', total)
    }
  }
  
  return pages.filter(page => page !== '...' || pages.indexOf(page) === pages.lastIndexOf(page))
})

// 方法
const formatTimeLeft = (endTime) => {
  if (!endTime) return ''
  
  const now = new Date()
  const diff = endTime - now
  
  if (diff <= 0) return '已结束'
  
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  
  if (hours > 0) {
    return `${hours}小时${minutes}分钟`
  } else {
    return `${minutes}分钟`
  }
}

const updateCountdown = () => {
  const targetDate = new Date()
  targetDate.setDate(targetDate.getDate() + 7) // 7天后结束
  
  const now = new Date()
  const diff = targetDate - now
  
  if (diff > 0) {
    countdown.value.days = Math.floor(diff / (1000 * 60 * 60 * 24))
    countdown.value.hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    countdown.value.minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    countdown.value.seconds = Math.floor((diff % (1000 * 60)) / 1000)
  }
}

const toggleFavorite = (product) => {
  product.isFavorite = !product.isFavorite
}

const addToCart = (product) => {
  if (product.stock === 0) return
  
  cartStore.addItem({
    id: product.id,
    name: product.name,
    price: product.salePrice,
    image: product.image,
    quantity: 1
  })
}

// 生命周期
let countdownInterval

onMounted(() => {
  updateCountdown()
  countdownInterval = setInterval(updateCountdown, 1000)
})

onUnmounted(() => {
  if (countdownInterval) {
    clearInterval(countdownInterval)
  }
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>