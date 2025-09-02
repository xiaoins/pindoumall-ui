<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 页面头部 -->
    <div class="bg-white shadow-sm border-b">
      <div class="max-w-6xl mx-auto px-4 py-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-dark">我的收藏</h1>
            <p class="text-gray-600 mt-1">管理您收藏的心仪商品</p>
          </div>
          <button 
            @click="$router.go(-1)"
            class="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-tertiary transition-colors duration-300"
          >
            <i class="fa fa-arrow-left"></i>
            <span>返回</span>
          </button>
        </div>
      </div>
    </div>

    <div class="max-w-6xl mx-auto px-4 py-8">
      <!-- 工具栏 -->
      <div class="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <!-- 搜索和筛选 -->
          <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 flex-1">
            <!-- 搜索框 -->
            <div class="relative flex-1 max-w-md">
              <input 
                v-model="searchQuery"
                type="text" 
                placeholder="搜索收藏的商品..."
                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tertiary focus:border-transparent transition-all duration-300"
              >
              <i class="fa fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
            
            <!-- 分类筛选 -->
            <select 
              v-model="categoryFilter"
              class="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tertiary focus:border-transparent transition-all duration-300"
            >
              <option value="all">全部分类</option>
              <option value="electronics">数码电子</option>
              <option value="clothing">服装鞋帽</option>
              <option value="home">家居用品</option>
              <option value="books">图书文具</option>
              <option value="sports">运动户外</option>
            </select>
            
            <!-- 价格筛选 -->
            <select 
              v-model="priceFilter"
              class="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tertiary focus:border-transparent transition-all duration-300"
            >
              <option value="all">全部价格</option>
              <option value="0-100">¥0-100</option>
              <option value="100-500">¥100-500</option>
              <option value="500-1000">¥500-1000</option>
              <option value="1000-5000">¥1000-5000</option>
              <option value="5000+">¥5000以上</option>
            </select>
            
            <!-- 排序 -->
            <select 
              v-model="sortBy"
              class="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tertiary focus:border-transparent transition-all duration-300"
            >
              <option value="time">收藏时间</option>
              <option value="price-asc">价格从低到高</option>
              <option value="price-desc">价格从高到低</option>
              <option value="name">商品名称</option>
            </select>
          </div>
          
          <!-- 视图切换和操作 -->
          <div class="flex items-center space-x-3">
            <!-- 视图切换 -->
            <div class="flex border border-gray-300 rounded-lg overflow-hidden">
              <button 
                @click="viewMode = 'grid'"
                class="px-3 py-2 transition-colors duration-300"
                :class="{
                  'bg-tertiary text-white': viewMode === 'grid',
                  'bg-white text-gray-600 hover:bg-gray-50': viewMode !== 'grid'
                }"
              >
                <i class="fa fa-th"></i>
              </button>
              <button 
                @click="viewMode = 'list'"
                class="px-3 py-2 transition-colors duration-300"
                :class="{
                  'bg-tertiary text-white': viewMode === 'list',
                  'bg-white text-gray-600 hover:bg-gray-50': viewMode !== 'list'
                }"
              >
                <i class="fa fa-list"></i>
              </button>
            </div>
            
            <!-- 批量操作 -->
            <button 
              @click="removeSelected"
              :disabled="selectedItems.length === 0"
              class="px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              <i class="fa fa-trash mr-2"></i>
              删除选中 ({{ selectedItems.length }})
            </button>
          </div>
        </div>
      </div>

      <!-- 统计信息 -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div class="bg-white rounded-lg shadow-sm border p-6">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <i class="fa fa-heart text-red-600 text-xl"></i>
            </div>
            <div class="ml-4">
              <h3 class="text-2xl font-bold text-dark">{{ filteredFavorites.length }}</h3>
              <p class="text-gray-600 text-sm">收藏商品</p>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-lg shadow-sm border p-6">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <i class="fa fa-tags text-green-600 text-xl"></i>
            </div>
            <div class="ml-4">
              <h3 class="text-2xl font-bold text-dark">{{ uniqueCategories }}</h3>
              <p class="text-gray-600 text-sm">收藏分类</p>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-lg shadow-sm border p-6">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <i class="fa fa-dollar-sign text-blue-600 text-xl"></i>
            </div>
            <div class="ml-4">
              <h3 class="text-2xl font-bold text-dark">¥{{ totalValue }}</h3>
              <p class="text-gray-600 text-sm">总价值</p>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-lg shadow-sm border p-6">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <i class="fa fa-calendar text-purple-600 text-xl"></i>
            </div>
            <div class="ml-4">
              <h3 class="text-2xl font-bold text-dark">{{ recentCount }}</h3>
              <p class="text-gray-600 text-sm">本周新增</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 收藏列表 -->
      <div class="bg-white rounded-lg shadow-sm border">
        <!-- 列表头部 -->
        <div class="p-6 border-b">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <label class="flex items-center">
                <input 
                  type="checkbox" 
                  :checked="isAllSelected"
                  @change="toggleSelectAll"
                  class="w-5 h-5 text-tertiary border-gray-300 rounded focus:ring-tertiary"
                >
                <span class="ml-2 text-sm text-gray-700">全选</span>
              </label>
              <span class="text-sm text-gray-600">共 {{ filteredFavorites.length }} 件商品</span>
            </div>
            <div class="flex items-center space-x-2">
              <span class="text-sm text-gray-600">每页显示：</span>
              <select 
                v-model="itemsPerPage"
                class="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-tertiary focus:border-transparent"
              >
                <option value="12">12</option>
                <option value="24">24</option>
                <option value="48">48</option>
              </select>
            </div>
          </div>
        </div>

        <!-- 网格视图 -->
        <div v-if="viewMode === 'grid' && filteredFavorites.length > 0" class="p-6">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div 
              v-for="item in paginatedFavorites" 
              :key="item.id"
              class="group relative bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <!-- 选择框 -->
              <div class="absolute top-3 left-3 z-10">
                <input 
                  type="checkbox" 
                  :value="item.id"
                  v-model="selectedItems"
                  class="w-5 h-5 text-tertiary border-gray-300 rounded focus:ring-tertiary"
                >
              </div>
              
              <!-- 收藏按钮 -->
              <button 
                @click="toggleFavorite(item.id)"
                class="absolute top-3 right-3 z-10 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center text-red-500 hover:bg-white transition-all duration-300"
              >
                <i class="fa fa-heart"></i>
              </button>
              
              <!-- 商品图片 -->
              <div class="aspect-square bg-gray-100 overflow-hidden">
                <img 
                  :src="item.image" 
                  :alt="item.name"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                >
              </div>
              
              <!-- 商品信息 -->
              <div class="p-4">
                <h3 class="text-lg font-semibold text-dark mb-2 line-clamp-2 group-hover:text-tertiary transition-colors duration-300">
                  {{ item.name }}
                </h3>
                <p class="text-gray-600 text-sm mb-3 line-clamp-2">{{ item.description }}</p>
                <div class="flex items-center justify-between mb-3">
                  <span class="text-xl font-bold text-tertiary">¥{{ item.price }}</span>
                  <span class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">{{ getCategoryName(item.category) }}</span>
                </div>
                <div class="text-xs text-gray-500 mb-4">
                  <i class="fa fa-clock mr-1"></i>
                  收藏于 {{ formatTime(item.favoriteTime) }}
                </div>
                
                <!-- 操作按钮 -->
                <div class="flex space-x-2">
                  <button 
                    @click="viewProduct(item)"
                    class="flex-1 px-3 py-2 bg-tertiary text-white rounded-lg hover:bg-tertiary/80 transition-colors duration-300 text-sm"
                  >
                    查看详情
                  </button>
                  <button 
                    @click="addToCart(item)"
                    class="flex-1 px-3 py-2 border border-tertiary text-tertiary rounded-lg hover:bg-tertiary hover:text-white transition-all duration-300 text-sm"
                  >
                    加购物车
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 列表视图 -->
        <div v-if="viewMode === 'list' && filteredFavorites.length > 0" class="divide-y">
          <div 
            v-for="item in paginatedFavorites" 
            :key="item.id"
            class="p-6 hover:bg-gray-50 transition-colors duration-300"
          >
            <div class="flex items-center space-x-4">
              <!-- 选择框 -->
              <input 
                type="checkbox" 
                :value="item.id"
                v-model="selectedItems"
                class="w-5 h-5 text-tertiary border-gray-300 rounded focus:ring-tertiary"
              >
              
              <!-- 商品图片 -->
              <div class="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                <img 
                  :src="item.image" 
                  :alt="item.name"
                  class="w-full h-full object-cover"
                >
              </div>
              
              <!-- 商品信息 -->
              <div class="flex-1 min-w-0">
                <div class="flex items-start justify-between">
                  <div class="flex-1">
                    <h3 class="text-lg font-semibold text-dark hover:text-tertiary cursor-pointer transition-colors duration-300">
                      {{ item.name }}
                    </h3>
                    <p class="text-gray-600 text-sm mt-1 line-clamp-2">{{ item.description }}</p>
                    <div class="flex items-center space-x-4 mt-3">
                      <span class="text-xl font-bold text-tertiary">¥{{ item.price }}</span>
                      <span class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">{{ getCategoryName(item.category) }}</span>
                      <span class="text-sm text-gray-500">
                        <i class="fa fa-clock mr-1"></i>
                        {{ formatTime(item.favoriteTime) }}
                      </span>
                      <div class="flex items-center space-x-1">
                        <div class="flex text-yellow-400">
                          <i v-for="i in 5" :key="i" class="fa fa-star text-xs" :class="i <= item.rating ? 'text-yellow-400' : 'text-gray-300'"></i>
                        </div>
                        <span class="text-sm text-gray-500">({{ item.reviews }})</span>
                      </div>
                    </div>
                  </div>
                  
                  <!-- 操作按钮 -->
                  <div class="flex items-center space-x-2 ml-4">
                    <button 
                      @click="viewProduct(item)"
                      class="px-4 py-2 bg-tertiary text-white rounded-lg hover:bg-tertiary/80 transition-colors duration-300 text-sm"
                    >
                      <i class="fa fa-eye mr-1"></i>
                      查看
                    </button>
                    <button 
                      @click="addToCart(item)"
                      class="px-4 py-2 border border-tertiary text-tertiary rounded-lg hover:bg-tertiary hover:text-white transition-all duration-300 text-sm"
                    >
                      <i class="fa fa-shopping-cart mr-1"></i>
                      加购物车
                    </button>
                    <button 
                      @click="toggleFavorite(item.id)"
                      class="p-2 text-red-500 hover:text-red-600 transition-colors duration-300"
                    >
                      <i class="fa fa-heart"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 空状态 -->
        <div v-if="filteredFavorites.length === 0" class="p-12 text-center">
          <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i class="fa fa-heart text-gray-400 text-3xl"></i>
          </div>
          <h3 class="text-lg font-semibold text-gray-600 mb-2">暂无收藏商品</h3>
          <p class="text-gray-500 mb-6">快去收藏您喜欢的商品吧</p>
          <button 
            @click="$router.push('/')"
            class="px-6 py-3 bg-tertiary text-white rounded-lg hover:bg-tertiary/80 transition-colors duration-300"
          >
            去逛逛
          </button>
        </div>
      </div>

      <!-- 分页 -->
      <div v-if="filteredFavorites.length > itemsPerPage" class="mt-6 flex justify-center">
        <div class="flex items-center space-x-2">
          <button 
            @click="currentPage = Math.max(1, currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors duration-300"
          >
            <i class="fa fa-chevron-left"></i>
          </button>
          
          <span class="px-4 py-2 text-sm text-gray-600">
            第 {{ currentPage }} 页，共 {{ totalPages }} 页
          </span>
          
          <button 
            @click="currentPage = Math.min(totalPages, currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors duration-300"
          >
            <i class="fa fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const searchQuery = ref('')
const categoryFilter = ref('all')
const priceFilter = ref('all')
const sortBy = ref('time')
const viewMode = ref('grid')
const selectedItems = ref([])
const currentPage = ref(1)
const itemsPerPage = ref(12)

// 模拟收藏数据
const favoritesData = ref([
  {
    id: 1,
    name: 'iPhone 14 Pro Max 256GB 深空黑色',
    description: 'Apple iPhone 14 Pro Max，搭载A16仿生芯片，支持灵动岛',
    price: 8999,
    image: 'https://via.placeholder.com/300x300?text=iPhone',
    category: 'electronics',
    favoriteTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    rating: 5,
    reviews: 1234
  },
  {
    id: 2,
    name: 'Nike Air Max 270 运动鞋',
    description: '舒适透气，时尚百搭的运动休闲鞋，适合日常穿着',
    price: 899,
    image: 'https://via.placeholder.com/300x300?text=Nike',
    category: 'clothing',
    favoriteTime: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    rating: 4,
    reviews: 567
  },
  {
    id: 3,
    name: '小米空气净化器Pro H',
    description: '高效除甲醛，智能控制空气质量，守护家人健康',
    price: 1699,
    image: 'https://via.placeholder.com/300x300?text=Xiaomi',
    category: 'home',
    favoriteTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    rating: 5,
    reviews: 890
  },
  {
    id: 4,
    name: '《深度学习》花书 中文版',
    description: 'Ian Goodfellow等著，人工智能领域经典教材',
    price: 168,
    image: 'https://via.placeholder.com/300x300?text=Book',
    category: 'books',
    favoriteTime: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    rating: 5,
    reviews: 234
  },
  {
    id: 5,
    name: 'YONEX 尤尼克斯羽毛球拍',
    description: '专业级羽毛球拍，轻量化设计，提升运动表现',
    price: 599,
    image: 'https://via.placeholder.com/300x300?text=YONEX',
    category: 'sports',
    favoriteTime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    rating: 4,
    reviews: 345
  },
  {
    id: 6,
    name: 'MacBook Pro 14英寸 M2芯片',
    description: 'Apple MacBook Pro，配备M2 Pro芯片，专业性能',
    price: 15999,
    image: 'https://via.placeholder.com/300x300?text=MacBook',
    category: 'electronics',
    favoriteTime: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    rating: 5,
    reviews: 678
  },
  {
    id: 7,
    name: 'Uniqlo 优衣库 羊毛衫',
    description: '100%美利奴羊毛，柔软舒适，经典款式',
    price: 299,
    image: 'https://via.placeholder.com/300x300?text=Uniqlo',
    category: 'clothing',
    favoriteTime: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    rating: 4,
    reviews: 456
  },
  {
    id: 8,
    name: 'IKEA 宜家 书桌椅套装',
    description: '简约现代风格，适合家庭办公，人体工学设计',
    price: 799,
    image: 'https://via.placeholder.com/300x300?text=IKEA',
    category: 'home',
    favoriteTime: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
    rating: 4,
    reviews: 123
  }
])

// 筛选后的收藏
const filteredFavorites = computed(() => {
  let filtered = favoritesData.value
  
  // 搜索筛选
  if (searchQuery.value) {
    filtered = filtered.filter(item => 
      item.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }
  
  // 分类筛选
  if (categoryFilter.value !== 'all') {
    filtered = filtered.filter(item => item.category === categoryFilter.value)
  }
  
  // 价格筛选
  if (priceFilter.value !== 'all') {
    filtered = filtered.filter(item => {
      const price = item.price
      switch (priceFilter.value) {
        case '0-100':
          return price >= 0 && price <= 100
        case '100-500':
          return price > 100 && price <= 500
        case '500-1000':
          return price > 500 && price <= 1000
        case '1000-5000':
          return price > 1000 && price <= 5000
        case '5000+':
          return price > 5000
        default:
          return true
      }
    })
  }
  
  // 排序
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'time':
        return b.favoriteTime - a.favoriteTime
      case 'price-asc':
        return a.price - b.price
      case 'price-desc':
        return b.price - a.price
      case 'name':
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })
  
  return filtered
})

// 分页后的收藏
const paginatedFavorites = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredFavorites.value.slice(start, end)
})

// 总页数
const totalPages = computed(() => {
  return Math.ceil(filteredFavorites.value.length / itemsPerPage.value)
})

// 统计信息
const uniqueCategories = computed(() => {
  const categories = new Set(favoritesData.value.map(item => item.category))
  return categories.size
})

const totalValue = computed(() => {
  return favoritesData.value.reduce((sum, item) => sum + item.price, 0).toLocaleString()
})

const recentCount = computed(() => {
  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  return favoritesData.value.filter(item => item.favoriteTime > oneWeekAgo).length
})

// 全选状态
const isAllSelected = computed(() => {
  return paginatedFavorites.value.length > 0 && 
         selectedItems.value.length === paginatedFavorites.value.length &&
         paginatedFavorites.value.every(item => selectedItems.value.includes(item.id))
})

// 切换全选
const toggleSelectAll = () => {
  if (isAllSelected.value) {
    selectedItems.value = selectedItems.value.filter(id => 
      !paginatedFavorites.value.some(item => item.id === id)
    )
  } else {
    const currentPageIds = paginatedFavorites.value.map(item => item.id)
    selectedItems.value = [...new Set([...selectedItems.value, ...currentPageIds])]
  }
}

// 获取分类名称
const getCategoryName = (category) => {
  const categoryMap = {
    electronics: '数码电子',
    clothing: '服装鞋帽',
    home: '家居用品',
    books: '图书文具',
    sports: '运动户外'
  }
  return categoryMap[category] || category
}

// 格式化时间
const formatTime = (time) => {
  const now = new Date()
  const diffTime = now - time
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) {
    return '今天'
  } else if (diffDays === 1) {
    return '昨天'
  } else if (diffDays < 7) {
    return `${diffDays}天前`
  } else {
    return time.toLocaleDateString()
  }
}

// 查看商品
const viewProduct = (item) => {
  console.log('查看商品:', item.name)
  showToast('跳转到商品详情页')
}

// 加入购物车
const addToCart = (item) => {
  console.log('加入购物车:', item.name)
  showToast('已加入购物车')
}

// 切换收藏状态
const toggleFavorite = (id) => {
  if (confirm('确定要取消收藏这件商品吗？')) {
    favoritesData.value = favoritesData.value.filter(item => item.id !== id)
    selectedItems.value = selectedItems.value.filter(itemId => itemId !== id)
    showToast('已取消收藏')
  }
}

// 删除选中收藏
const removeSelected = () => {
  if (selectedItems.value.length === 0) return
  
  if (confirm(`确定要取消收藏选中的 ${selectedItems.value.length} 件商品吗？`)) {
    favoritesData.value = favoritesData.value.filter(item => !selectedItems.value.includes(item.id))
    selectedItems.value = []
    showToast('已取消选中收藏')
  }
}

const showToast = (message) => {
  const toast = document.createElement('div')
  toast.className = 'fixed top-20 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-all duration-300'
  toast.textContent = message
  document.body.appendChild(toast)
  
  setTimeout(() => {
    toast.style.opacity = '0'
    setTimeout(() => {
      document.body.removeChild(toast)
    }, 300)
  }, 2000)
}

// 监听筛选条件变化，重置页码
watch([searchQuery, categoryFilter, priceFilter, sortBy], () => {
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