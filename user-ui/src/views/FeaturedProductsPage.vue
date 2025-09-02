<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 页面头部 -->
    <div class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="py-6">
          <h1 class="text-3xl font-bold text-gray-900">精选商品</h1>
          <p class="mt-2 text-gray-600">为您精心挑选的优质商品</p>
        </div>
      </div>
    </div>

    <!-- 筛选栏 -->
    <div class="bg-white border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="py-4 flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <select v-model="selectedCategory" class="border border-gray-300 rounded-lg px-3 py-2 text-sm">
              <option value="">所有分类</option>
              <option value="electronics">数码电子</option>
              <option value="clothing">服装配饰</option>
              <option value="home">家居用品</option>
              <option value="beauty">美妆护肤</option>
            </select>
            
            <select v-model="sortBy" class="border border-gray-300 rounded-lg px-3 py-2 text-sm">
              <option value="default">默认排序</option>
              <option value="price-low">价格从低到高</option>
              <option value="price-high">价格从高到低</option>
              <option value="rating">评分最高</option>
              <option value="sales">销量最高</option>
            </select>
          </div>
          
          <div class="flex items-center space-x-2">
            <button 
              @click="viewMode = 'grid'"
              :class="viewMode === 'grid' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'"
              class="p-2 rounded-lg transition-colors"
            >
              <i class="fa fa-th"></i>
            </button>
            <button 
              @click="viewMode = 'list'"
              :class="viewMode === 'list' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'"
              class="p-2 rounded-lg transition-colors"
            >
              <i class="fa fa-list"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 商品列表 -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div 
        :class="viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'"
      >
        <div 
          v-for="product in filteredProducts" 
          :key="product.id"
          :class="viewMode === 'grid' ? 'bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow' : 'bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow flex'"
        >
          <!-- 网格视图 -->
          <template v-if="viewMode === 'grid'">
            <div class="relative">
              <img 
                :src="product.image" 
                :alt="product.name"
                class="w-full h-48 object-cover rounded-t-lg"
              >
              <div class="absolute top-2 left-2">
                <span class="bg-red-500 text-white text-xs px-2 py-1 rounded">精选</span>
              </div>
              <button 
                @click="toggleFavorite(product.id)"
                class="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
              >
                <i 
                  :class="product.isFavorite ? 'fa fa-heart text-red-500' : 'fa fa-heart-o text-gray-400'"
                ></i>
              </button>
            </div>
            
            <div class="p-4">
              <h3 class="font-semibold text-gray-900 mb-2 line-clamp-2">{{ product.name }}</h3>
              <div class="flex items-center mb-2">
                <div class="flex items-center">
                  <i v-for="i in 5" :key="i" 
                     :class="i <= product.rating ? 'fa fa-star text-yellow-400' : 'fa fa-star-o text-gray-300'"
                     class="text-sm"
                  ></i>
                </div>
                <span class="text-sm text-gray-500 ml-2">({{ product.reviews }})</span>
              </div>
              <div class="flex items-center justify-between">
                <div>
                  <span class="text-lg font-bold text-red-600">¥{{ product.price }}</span>
                  <span v-if="product.originalPrice" class="text-sm text-gray-500 line-through ml-2">¥{{ product.originalPrice }}</span>
                </div>
                <button 
                  @click="addToCart(product)"
                  class="bg-primary text-white px-3 py-1 rounded-lg text-sm hover:bg-primary/90 transition-colors"
                >
                  加入购物车
                </button>
              </div>
            </div>
          </template>
          
          <!-- 列表视图 -->
          <template v-else>
            <div class="w-32 h-32 flex-shrink-0">
              <img 
                :src="product.image" 
                :alt="product.name"
                class="w-full h-full object-cover rounded-l-lg"
              >
            </div>
            <div class="flex-1 p-4 flex justify-between">
              <div class="flex-1">
                <h3 class="font-semibold text-gray-900 mb-2">{{ product.name }}</h3>
                <div class="flex items-center mb-2">
                  <div class="flex items-center">
                    <i v-for="i in 5" :key="i" 
                       :class="i <= product.rating ? 'fa fa-star text-yellow-400' : 'fa fa-star-o text-gray-300'"
                       class="text-sm"
                    ></i>
                  </div>
                  <span class="text-sm text-gray-500 ml-2">({{ product.reviews }})</span>
                </div>
                <p class="text-gray-600 text-sm line-clamp-2">{{ product.description }}</p>
              </div>
              <div class="flex flex-col items-end justify-between ml-4">
                <div class="text-right">
                  <span class="text-lg font-bold text-red-600">¥{{ product.price }}</span>
                  <span v-if="product.originalPrice" class="text-sm text-gray-500 line-through block">¥{{ product.originalPrice }}</span>
                </div>
                <div class="flex items-center space-x-2">
                  <button 
                    @click="toggleFavorite(product.id)"
                    class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    <i 
                      :class="product.isFavorite ? 'fa fa-heart text-red-500' : 'fa fa-heart-o text-gray-400'"
                    ></i>
                  </button>
                  <button 
                    @click="addToCart(product)"
                    class="bg-primary text-white px-4 py-2 rounded-lg text-sm hover:bg-primary/90 transition-colors"
                  >
                    加入购物车
                  </button>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
      
      <!-- 加载更多 -->
      <div class="text-center mt-8" v-if="hasMore">
        <button 
          @click="loadMore"
          :disabled="loading"
          class="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {{ loading ? '加载中...' : '加载更多' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCartStore } from '../stores/cart'

const cartStore = useCartStore()

const selectedCategory = ref('')
const sortBy = ref('default')
const viewMode = ref('grid')
const loading = ref(false)
const hasMore = ref(true)

const products = ref([
  {
    id: 1,
    name: 'iPhone 15 Pro Max 256GB',
    description: '全新A17 Pro芯片，钛金属设计，专业级摄像系统',
    price: 9999,
    originalPrice: 10999,
    image: '/images/bgs/1.webp',
    category: 'electronics',
    rating: 5,
    reviews: 1234,
    isFavorite: false,
    sales: 5000
  },
  {
    id: 2,
    name: '时尚休闲连衣裙',
    description: '优质面料，舒适透气，多色可选',
    price: 299,
    originalPrice: 399,
    image: '/images/bgs/1.webp',
    category: 'clothing',
    rating: 4,
    reviews: 567,
    isFavorite: true,
    sales: 2000
  },
  {
    id: 3,
    name: '北欧风格台灯',
    description: '简约设计，护眼光源，适合书房卧室',
    price: 199,
    originalPrice: null,
    image: '/images/bgs/1.webp',
    category: 'home',
    rating: 4,
    reviews: 234,
    isFavorite: false,
    sales: 800
  },
  {
    id: 4,
    name: '兰蔻小黑瓶精华',
    description: '修护肌肤，抗衰老，提亮肤色',
    price: 899,
    originalPrice: 999,
    image: '/images/bgs/1.webp',
    category: 'beauty',
    rating: 5,
    reviews: 890,
    isFavorite: false,
    sales: 1500
  },
  {
    id: 5,
    name: 'MacBook Air M3',
    description: '轻薄便携，强劲性能，超长续航',
    price: 8999,
    originalPrice: 9999,
    image: '/images/bgs/1.webp',
    category: 'electronics',
    rating: 5,
    reviews: 678,
    isFavorite: true,
    sales: 3000
  },
  {
    id: 6,
    name: '真丝围巾',
    description: '100%桑蚕丝，柔软亲肤，多种图案',
    price: 159,
    originalPrice: 199,
    image: '/images/bgs/1.webp',
    category: 'clothing',
    rating: 4,
    reviews: 345,
    isFavorite: false,
    sales: 1200
  }
])

const filteredProducts = computed(() => {
  let filtered = products.value
  
  // 分类筛选
  if (selectedCategory.value) {
    filtered = filtered.filter(product => product.category === selectedCategory.value)
  }
  
  // 排序
  switch (sortBy.value) {
    case 'price-low':
      filtered = [...filtered].sort((a, b) => a.price - b.price)
      break
    case 'price-high':
      filtered = [...filtered].sort((a, b) => b.price - a.price)
      break
    case 'rating':
      filtered = [...filtered].sort((a, b) => b.rating - a.rating)
      break
    case 'sales':
      filtered = [...filtered].sort((a, b) => b.sales - a.sales)
      break
  }
  
  return filtered
})

const toggleFavorite = (productId) => {
  const product = products.value.find(p => p.id === productId)
  if (product) {
    product.isFavorite = !product.isFavorite
    showToast(product.isFavorite ? '已添加到收藏' : '已取消收藏')
  }
}

const addToCart = (product) => {
  cartStore.addItem({
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
    quantity: 1
  })
  showToast('已添加到购物车')
}

const loadMore = () => {
  loading.value = true
  // 模拟加载更多数据
  setTimeout(() => {
    loading.value = false
    hasMore.value = false
  }, 1000)
}

const showToast = (message) => {
  const toast = document.createElement('div')
  toast.className = 'fixed top-20 right-4 bg-dark text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-all duration-300'
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
  // 页面加载时的初始化逻辑
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