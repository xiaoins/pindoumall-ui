<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 页面头部 -->
    <div class="bg-white shadow-sm border-b">
      <div class="max-w-6xl mx-auto px-4 py-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-dark">浏览历史</h1>
            <p class="text-gray-600 mt-1">查看您最近浏览过的商品</p>
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
        <div class="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <!-- 搜索和筛选 -->
          <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 flex-1">
            <!-- 搜索框 -->
            <div class="relative flex-1 max-w-md">
              <input 
                v-model="searchQuery"
                type="text" 
                placeholder="搜索浏览过的商品..."
                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tertiary focus:border-transparent transition-all duration-300"
              >
              <i class="fa fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
            
            <!-- 时间筛选 -->
            <select 
              v-model="timeFilter"
              class="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tertiary focus:border-transparent transition-all duration-300"
            >
              <option value="all">全部时间</option>
              <option value="today">今天</option>
              <option value="week">最近一周</option>
              <option value="month">最近一月</option>
            </select>
            
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
          </div>
          
          <!-- 操作按钮 -->
          <div class="flex space-x-3">
            <button 
              @click="clearSelected"
              :disabled="selectedItems.length === 0"
              class="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              <i class="fa fa-trash mr-2"></i>
              删除选中 ({{ selectedItems.length }})
            </button>
            <button 
              @click="clearAll"
              class="px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-all duration-300"
            >
              <i class="fa fa-trash-alt mr-2"></i>
              清空全部
            </button>
          </div>
        </div>
      </div>

      <!-- 统计信息 -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div class="bg-white rounded-lg shadow-sm border p-6">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <i class="fa fa-eye text-blue-600 text-xl"></i>
            </div>
            <div class="ml-4">
              <h3 class="text-2xl font-bold text-dark">{{ filteredHistory.length }}</h3>
              <p class="text-gray-600 text-sm">浏览商品</p>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-lg shadow-sm border p-6">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <i class="fa fa-calendar text-green-600 text-xl"></i>
            </div>
            <div class="ml-4">
              <h3 class="text-2xl font-bold text-dark">{{ todayCount }}</h3>
              <p class="text-gray-600 text-sm">今日浏览</p>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-lg shadow-sm border p-6">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <i class="fa fa-tags text-purple-600 text-xl"></i>
            </div>
            <div class="ml-4">
              <h3 class="text-2xl font-bold text-dark">{{ uniqueCategories }}</h3>
              <p class="text-gray-600 text-sm">浏览分类</p>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-lg shadow-sm border p-6">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <i class="fa fa-clock text-orange-600 text-xl"></i>
            </div>
            <div class="ml-4">
              <h3 class="text-2xl font-bold text-dark">{{ averageTime }}</h3>
              <p class="text-gray-600 text-sm">平均停留</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 浏览历史列表 -->
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
              <span class="text-sm text-gray-600">共 {{ filteredHistory.length }} 条记录</span>
            </div>
            <div class="flex items-center space-x-2">
              <span class="text-sm text-gray-600">排序：</span>
              <select 
                v-model="sortBy"
                class="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-tertiary focus:border-transparent"
              >
                <option value="time">浏览时间</option>
                <option value="name">商品名称</option>
                <option value="price">商品价格</option>
                <option value="category">商品分类</option>
              </select>
            </div>
          </div>
        </div>

        <!-- 历史记录列表 -->
        <div v-if="filteredHistory.length > 0" class="divide-y">
          <div 
            v-for="item in paginatedHistory" 
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
              <div class="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
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
                    <p class="text-gray-600 text-sm mt-1">{{ item.description }}</p>
                    <div class="flex items-center space-x-4 mt-2">
                      <span class="text-lg font-bold text-tertiary">¥{{ item.price }}</span>
                      <span class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">{{ getCategoryName(item.category) }}</span>
                      <span class="text-sm text-gray-500">
                        <i class="fa fa-clock mr-1"></i>
                        {{ formatTime(item.viewTime) }}
                      </span>
                      <span class="text-sm text-gray-500">
                        <i class="fa fa-eye mr-1"></i>
                        停留 {{ item.duration }}
                      </span>
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
                      @click="removeItem(item.id)"
                      class="p-2 text-gray-400 hover:text-red-500 transition-colors duration-300"
                    >
                      <i class="fa fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 空状态 -->
        <div v-else class="p-12 text-center">
          <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i class="fa fa-history text-gray-400 text-3xl"></i>
          </div>
          <h3 class="text-lg font-semibold text-gray-600 mb-2">暂无浏览历史</h3>
          <p class="text-gray-500 mb-6">您还没有浏览过任何商品</p>
          <button 
            @click="$router.push('/')"
            class="px-6 py-3 bg-tertiary text-white rounded-lg hover:bg-tertiary/80 transition-colors duration-300"
          >
            去逛逛
          </button>
        </div>
      </div>

      <!-- 分页 -->
      <div v-if="filteredHistory.length > itemsPerPage" class="mt-6 flex justify-center">
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
const timeFilter = ref('all')
const categoryFilter = ref('all')
const sortBy = ref('time')
const selectedItems = ref([])
const currentPage = ref(1)
const itemsPerPage = ref(10)

// 模拟浏览历史数据
const historyData = ref([
  {
    id: 1,
    name: 'iPhone 14 Pro Max 256GB 深空黑色',
    description: 'Apple iPhone 14 Pro Max，搭载A16仿生芯片',
    price: 8999,
    image: 'https://via.placeholder.com/200x200?text=iPhone',
    category: 'electronics',
    viewTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2小时前
    duration: '5分钟'
  },
  {
    id: 2,
    name: 'Nike Air Max 270 运动鞋',
    description: '舒适透气，时尚百搭的运动休闲鞋',
    price: 899,
    image: 'https://via.placeholder.com/200x200?text=Nike',
    category: 'clothing',
    viewTime: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5小时前
    duration: '3分钟'
  },
  {
    id: 3,
    name: '小米空气净化器Pro H',
    description: '高效除甲醛，智能控制空气质量',
    price: 1699,
    image: 'https://via.placeholder.com/200x200?text=Xiaomi',
    category: 'home',
    viewTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1天前
    duration: '8分钟'
  },
  {
    id: 4,
    name: '《深度学习》花书 中文版',
    description: 'Ian Goodfellow等著，人工智能经典教材',
    price: 168,
    image: 'https://via.placeholder.com/200x200?text=Book',
    category: 'books',
    viewTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2天前
    duration: '12分钟'
  },
  {
    id: 5,
    name: 'YONEX 尤尼克斯羽毛球拍',
    description: '专业级羽毛球拍，轻量化设计',
    price: 599,
    image: 'https://via.placeholder.com/200x200?text=YONEX',
    category: 'sports',
    viewTime: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3天前
    duration: '6分钟'
  },
  {
    id: 6,
    name: 'MacBook Pro 14英寸 M2芯片',
    description: 'Apple MacBook Pro，配备M2 Pro芯片',
    price: 15999,
    image: 'https://via.placeholder.com/200x200?text=MacBook',
    category: 'electronics',
    viewTime: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4天前
    duration: '15分钟'
  },
  {
    id: 7,
    name: 'Uniqlo 优衣库 羊毛衫',
    description: '100%美利奴羊毛，柔软舒适',
    price: 299,
    image: 'https://via.placeholder.com/200x200?text=Uniqlo',
    category: 'clothing',
    viewTime: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5天前
    duration: '4分钟'
  },
  {
    id: 8,
    name: 'IKEA 宜家 书桌椅套装',
    description: '简约现代风格，适合家庭办公',
    price: 799,
    image: 'https://via.placeholder.com/200x200?text=IKEA',
    category: 'home',
    viewTime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7天前
    duration: '10分钟'
  }
])

// 筛选后的历史记录
const filteredHistory = computed(() => {
  let filtered = historyData.value
  
  // 搜索筛选
  if (searchQuery.value) {
    filtered = filtered.filter(item => 
      item.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }
  
  // 时间筛选
  if (timeFilter.value !== 'all') {
    const now = new Date()
    filtered = filtered.filter(item => {
      const diffTime = now - item.viewTime
      const diffDays = diffTime / (1000 * 60 * 60 * 24)
      
      switch (timeFilter.value) {
        case 'today':
          return diffDays < 1
        case 'week':
          return diffDays < 7
        case 'month':
          return diffDays < 30
        default:
          return true
      }
    })
  }
  
  // 分类筛选
  if (categoryFilter.value !== 'all') {
    filtered = filtered.filter(item => item.category === categoryFilter.value)
  }
  
  // 排序
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'time':
        return b.viewTime - a.viewTime
      case 'name':
        return a.name.localeCompare(b.name)
      case 'price':
        return b.price - a.price
      case 'category':
        return a.category.localeCompare(b.category)
      default:
        return 0
    }
  })
  
  return filtered
})

// 分页后的历史记录
const paginatedHistory = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredHistory.value.slice(start, end)
})

// 总页数
const totalPages = computed(() => {
  return Math.ceil(filteredHistory.value.length / itemsPerPage.value)
})

// 统计信息
const todayCount = computed(() => {
  const today = new Date()
  return historyData.value.filter(item => {
    const diffTime = today - item.viewTime
    const diffDays = diffTime / (1000 * 60 * 60 * 24)
    return diffDays < 1
  }).length
})

const uniqueCategories = computed(() => {
  const categories = new Set(historyData.value.map(item => item.category))
  return categories.size
})

const averageTime = computed(() => {
  if (historyData.value.length === 0) return '0分钟'
  // 简化计算，返回固定值
  return '7分钟'
})

// 全选状态
const isAllSelected = computed(() => {
  return paginatedHistory.value.length > 0 && 
         selectedItems.value.length === paginatedHistory.value.length &&
         paginatedHistory.value.every(item => selectedItems.value.includes(item.id))
})

// 切换全选
const toggleSelectAll = () => {
  if (isAllSelected.value) {
    selectedItems.value = selectedItems.value.filter(id => 
      !paginatedHistory.value.some(item => item.id === id)
    )
  } else {
    const currentPageIds = paginatedHistory.value.map(item => item.id)
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
  const diffMinutes = Math.floor(diffTime / (1000 * 60))
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60))
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffMinutes < 60) {
    return `${diffMinutes}分钟前`
  } else if (diffHours < 24) {
    return `${diffHours}小时前`
  } else {
    return `${diffDays}天前`
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

// 删除单个记录
const removeItem = (id) => {
  if (confirm('确定要删除这条浏览记录吗？')) {
    historyData.value = historyData.value.filter(item => item.id !== id)
    selectedItems.value = selectedItems.value.filter(itemId => itemId !== id)
    showToast('已删除浏览记录')
  }
}

// 删除选中记录
const clearSelected = () => {
  if (selectedItems.value.length === 0) return
  
  if (confirm(`确定要删除选中的 ${selectedItems.value.length} 条记录吗？`)) {
    historyData.value = historyData.value.filter(item => !selectedItems.value.includes(item.id))
    selectedItems.value = []
    showToast('已删除选中记录')
  }
}

// 清空全部记录
const clearAll = () => {
  if (confirm('确定要清空所有浏览记录吗？此操作不可恢复。')) {
    historyData.value = []
    selectedItems.value = []
    showToast('已清空所有记录')
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
watch([searchQuery, timeFilter, categoryFilter], () => {
  currentPage.value = 1
})
</script>