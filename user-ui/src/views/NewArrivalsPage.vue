<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 页面标题 -->
    <div class="bg-white shadow-sm">
      <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold text-gray-900">新品上市</h1>
        <p class="text-gray-600 mt-2">发现最新上架的优质商品，抢先体验新品魅力</p>
      </div>
    </div>

    <div class="container mx-auto px-4 py-8">
      <!-- 筛选工具栏 -->
      <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div class="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div class="flex flex-wrap gap-4 items-center">
            <div class="flex items-center gap-2">
              <label class="text-gray-700 font-medium">时间范围:</label>
              <select v-model="timeRange" class="border border-gray-300 rounded-lg px-3 py-2">
                <option value="all">全部时间</option>
                <option value="today">今日新品</option>
                <option value="week">本周新品</option>
                <option value="month">本月新品</option>
              </select>
            </div>
            <div class="flex items-center gap-2">
              <label class="text-gray-700 font-medium">分类:</label>
              <select v-model="selectedCategory" class="border border-gray-300 rounded-lg px-3 py-2">
                <option value="all">全部分类</option>
                <option value="electronics">数码电器</option>
                <option value="clothing">服装鞋帽</option>
                <option value="home">家居用品</option>
                <option value="sports">运动户外</option>
                <option value="beauty">美妆护肤</option>
              </select>
            </div>
            <div class="flex items-center gap-2">
              <label class="text-gray-700 font-medium">排序:</label>
              <select v-model="sortBy" class="border border-gray-300 rounded-lg px-3 py-2">
                <option value="newest">最新上市</option>
                <option value="price-asc">价格从低到高</option>
                <option value="price-desc">价格从高到低</option>
                <option value="popularity">人气最高</option>
              </select>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-gray-600">共 {{ filteredProducts.length }} 件新品</span>
            <button
              @click="viewMode = 'grid'"
              :class="[
                'p-2 rounded-lg',
                viewMode === 'grid' ? 'bg-green-100 text-green-700' : 'text-gray-500 hover:bg-gray-100'
              ]"
            >
              <i class="fa fa-th-large"></i>
            </button>
            <button
              @click="viewMode = 'list'"
              :class="[
                'p-2 rounded-lg',
                viewMode === 'list' ? 'bg-green-100 text-green-700' : 'text-gray-500 hover:bg-gray-100'
              ]"
            >
              <i class="fa fa-list"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- 新品推荐横幅 -->
      <div v-if="showBanner" class="bg-gradient-to-r from-green-500 to-blue-600 rounded-lg p-8 mb-8 text-white relative">
        <!-- 删除按钮 -->
        <button 
          @click="removeBanner"
          class="absolute top-3 right-3 w-8 h-8 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center text-white hover:text-red-300 transition-all duration-200"
          title="删除横幅"
        >
          <i class="fa fa-times text-sm"></i>
        </button>
        
        <div class="flex flex-col lg:flex-row items-center justify-between">
          <div class="mb-4 lg:mb-0">
            <h2 class="text-2xl font-bold mb-2">🎉 本周热门新品</h2>
            <p class="text-green-100">精选本周最受欢迎的新上市商品，限时优惠中</p>
          </div>
          <button 
            @click="goToProductDetail"
            class="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            查看详情
          </button>
        </div>
      </div>

      <!-- 商品网格视图 -->
      <div v-if="viewMode === 'grid'" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div
          v-for="product in paginatedProducts"
          :key="product.id"
          class="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
        >
          <div class="relative">
            <img
              :src="product.image"
              :alt="product.name"
              class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            >
            <!-- 新品标签 -->
            <div class="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              NEW
            </div>
            <!-- 上市时间 -->
            <div class="absolute top-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
              {{ formatDate(product.releaseDate) }}
            </div>
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
            <h3 class="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
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
                <span class="text-xl font-bold text-green-600">¥{{ product.price }}</span>
                <span v-if="product.originalPrice" class="text-sm text-gray-500 line-through">
                  ¥{{ product.originalPrice }}
                </span>
              </div>
              <div class="flex items-center text-sm text-gray-600">
                <i class="fa fa-eye mr-1"></i>
                {{ product.views }}
              </div>
            </div>
            <!-- 新品特色 -->
            <div v-if="product.features" class="mb-3">
              <div class="flex flex-wrap gap-1">
                <span
                  v-for="feature in product.features.slice(0, 2)"
                  :key="feature"
                  class="bg-green-100 text-green-700 text-xs px-2 py-1 rounded"
                >
                  {{ feature }}
                </span>
              </div>
            </div>
            <button
              @click="addToCart(product)"
              class="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors transform hover:scale-105"
            >
              <i class="fa fa-shopping-cart mr-2"></i>
              立即购买
            </button>
          </div>
        </div>
      </div>

      <!-- 商品列表视图 -->
      <div v-else class="space-y-6">
        <div
          v-for="product in paginatedProducts"
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
              <div class="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                NEW
              </div>
              <div class="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                {{ formatDate(product.releaseDate) }}
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
                    <span class="text-sm text-gray-600 ml-4">
                      <i class="fa fa-eye mr-1"></i>{{ product.views }}次浏览
                    </span>
                  </div>
                  <div class="flex items-center gap-2 mb-3">
                    <span class="text-2xl font-bold text-green-600">¥{{ product.price }}</span>
                    <span v-if="product.originalPrice" class="text-lg text-gray-500 line-through">
                      ¥{{ product.originalPrice }}
                    </span>
                  </div>
                  <div v-if="product.features" class="flex flex-wrap gap-2 mb-3">
                    <span
                      v-for="feature in product.features"
                      :key="feature"
                      class="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full"
                    >
                      {{ feature }}
                    </span>
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
                    class="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <i class="fa fa-shopping-cart mr-2"></i>
                    立即购买
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
                ? 'bg-green-600 text-white border-green-600'
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
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'

const router = useRouter()
const cartStore = useCartStore()

// 响应式数据
const timeRange = ref('all')
const selectedCategory = ref('all')
const sortBy = ref('newest')
const viewMode = ref('grid')
const currentPage = ref(1)
const itemsPerPage = 12
const showBanner = ref(true)

// 新品数据
const products = ref([
  {
    id: 1,
    name: 'iPhone 15 Pro Max 1TB 钛金属',
    price: 12999,
    originalPrice: 13999,
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400',
    rating: 5,
    reviews: 45,
    views: 1234,
    category: 'electronics',
    releaseDate: new Date('2024-01-15'),
    features: ['A17 Pro芯片', '钛金属机身', '5倍光学变焦'],
    isFavorite: false
  },
  {
    id: 2,
    name: 'Nike Air Jordan 1 Retro High OG 2024限定版',
    price: 1899,
    originalPrice: 2199,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
    rating: 5,
    reviews: 89,
    views: 2156,
    category: 'sports',
    releaseDate: new Date('2024-01-12'),
    features: ['限量发售', '经典配色', '优质皮革'],
    isFavorite: false
  },
  {
    id: 3,
    name: 'MacBook Pro 16英寸 M3 Max芯片',
    price: 25999,
    originalPrice: 27999,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
    rating: 5,
    reviews: 67,
    views: 3421,
    category: 'electronics',
    releaseDate: new Date('2024-01-10'),
    features: ['M3 Max芯片', '36GB内存', '1TB存储'],
    isFavorite: false
  },
  {
    id: 4,
    name: 'Dyson V15 Detect 无线吸尘器',
    price: 4999,
    originalPrice: 5499,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    rating: 4,
    reviews: 123,
    views: 1876,
    category: 'home',
    releaseDate: new Date('2024-01-08'),
    features: ['激光检测', '60分钟续航', '智能感应'],
    isFavorite: false
  },
  {
    id: 5,
    name: 'Tesla Model Y 2024款 长续航版',
    price: 299900,
    originalPrice: 319900,
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400',
    rating: 5,
    reviews: 234,
    views: 5432,
    category: 'electronics',
    releaseDate: new Date('2024-01-05'),
    features: ['688km续航', '自动驾驶', '超充网络'],
    isFavorite: false
  },
  {
    id: 6,
    name: 'Hermès Kelly 25 手袋 2024春季新色',
    price: 89999,
    originalPrice: 95999,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
    rating: 5,
    reviews: 12,
    views: 987,
    category: 'clothing',
    releaseDate: new Date('2024-01-03'),
    features: ['手工制作', '顶级皮革', '限量发售'],
    isFavorite: false
  },
  {
    id: 7,
    name: 'Sony PlayStation 5 Pro',
    price: 5999,
    originalPrice: 6499,
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400',
    rating: 5,
    reviews: 456,
    views: 7890,
    category: 'electronics',
    releaseDate: new Date('2024-01-01'),
    features: ['8K游戏', '2TB存储', '光线追踪'],
    isFavorite: false
  },
  {
    id: 8,
    name: 'Adidas Yeezy Boost 350 V3',
    price: 1599,
    originalPrice: 1799,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400',
    rating: 4,
    reviews: 234,
    views: 3456,
    category: 'sports',
    releaseDate: new Date('2023-12-28'),
    features: ['Boost科技', 'Primeknit鞋面', '限量配色'],
    isFavorite: false
  }
])

// 计算属性
const filteredProducts = computed(() => {
  let filtered = products.value

  // 按时间范围筛选
  const now = new Date()
  switch (timeRange.value) {
    case 'today':
      filtered = filtered.filter(product => {
        const diff = now - product.releaseDate
        return diff <= 24 * 60 * 60 * 1000 // 24小时内
      })
      break
    case 'week':
      filtered = filtered.filter(product => {
        const diff = now - product.releaseDate
        return diff <= 7 * 24 * 60 * 60 * 1000 // 7天内
      })
      break
    case 'month':
      filtered = filtered.filter(product => {
        const diff = now - product.releaseDate
        return diff <= 30 * 24 * 60 * 60 * 1000 // 30天内
      })
      break
  }

  // 按分类筛选
  if (selectedCategory.value !== 'all') {
    filtered = filtered.filter(product => product.category === selectedCategory.value)
  }

  // 排序
  switch (sortBy.value) {
    case 'newest':
      filtered.sort((a, b) => b.releaseDate - a.releaseDate)
      break
    case 'price-asc':
      filtered.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      filtered.sort((a, b) => b.price - a.price)
      break
    case 'popularity':
      filtered.sort((a, b) => b.views - a.views)
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
const formatDate = (date) => {
  const now = new Date()
  const diff = now - date
  const days = Math.floor(diff / (24 * 60 * 60 * 1000))
  
  if (days === 0) {
    return '今日上市'
  } else if (days === 1) {
    return '昨日上市'
  } else if (days <= 7) {
    return `${days}天前`
  } else {
    return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })
  }
}

const toggleFavorite = (product) => {
  product.isFavorite = !product.isFavorite
}

const addToCart = (product) => {
  cartStore.addItem({
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
    quantity: 1
  })
}

const removeBanner = () => {
  showBanner.value = false
}

const goToProductDetail = () => {
  // 跳转到热门新品的详情页面
  router.push('/product/1')
}

// 监听筛选条件变化，重置页码
watch([timeRange, selectedCategory, sortBy], () => {
  currentPage.value = 1
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