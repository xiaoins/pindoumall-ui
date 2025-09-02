<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 页面标题 -->
    <div class="bg-white shadow-sm">
      <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold text-gray-900">图书文具</h1>
        <p class="text-gray-600 mt-2">知识的海洋，学习的伙伴，优质图书文具一站购齐</p>
      </div>
    </div>

    <div class="container mx-auto px-4 py-8">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- 左侧分类导航 -->
        <div class="lg:w-1/4">
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h2 class="text-xl font-semibold mb-4">图书分类</h2>
            <div class="space-y-2">
              <button
                v-for="category in categories"
                :key="category.id"
                @click="selectCategory(category)"
                :class="[
                  'w-full text-left px-4 py-3 rounded-lg transition-colors',
                  selectedCategory?.id === category.id
                    ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                    : 'hover:bg-gray-100 text-gray-700'
                ]"
              >

                {{ category.name }}
                <span class="float-right text-sm text-gray-500">
                  ({{ category.count }})
                </span>
              </button>
            </div>
          </div>

          <!-- 价格筛选 -->
          <div class="bg-white rounded-lg shadow-sm p-6 mt-6">
            <h3 class="text-lg font-semibold mb-4">价格筛选</h3>
            <div class="space-y-3">
              <label v-for="range in priceRanges" :key="range.id" class="flex items-center">
                <input
                  type="radio"
                  :value="range.id"
                  v-model="selectedPriceRange"
                  class="mr-3 text-indigo-600"
                >
                <span class="text-gray-700">{{ range.label }}</span>
              </label>
            </div>
          </div>

          <!-- 出版社筛选 -->
          <div class="bg-white rounded-lg shadow-sm p-6 mt-6">
            <h3 class="text-lg font-semibold mb-4">出版社</h3>
            <div class="space-y-2">
              <label v-for="publisher in publishers" :key="publisher.id" class="flex items-center">
                <input
                  type="checkbox"
                  :value="publisher.id"
                  v-model="selectedPublishers"
                  class="mr-3 text-indigo-600"
                >
                <span class="text-gray-700">{{ publisher.name }}</span>
              </label>
            </div>
          </div>

          <!-- 适用年龄筛选 -->
          <div class="bg-white rounded-lg shadow-sm p-6 mt-6">
            <h3 class="text-lg font-semibold mb-4">适用年龄</h3>
            <div class="space-y-2">
              <label v-for="age in ageGroups" :key="age.id" class="flex items-center">
                <input
                  type="checkbox"
                  :value="age.id"
                  v-model="selectedAgeGroups"
                  class="mr-3 text-indigo-600"
                >
                <span class="text-gray-700">{{ age.name }}</span>
              </label>
            </div>
          </div>
        </div>

        <!-- 右侧商品列表 -->
        <div class="lg:w-3/4">
          <!-- 工具栏 -->
          <div class="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div class="flex items-center gap-4">
                <span class="text-gray-600">
                  共找到 <span class="font-semibold text-gray-900">{{ filteredProducts.length }}</span> 件商品
                </span>
                <select v-model="sortBy" class="border border-gray-300 rounded-lg px-3 py-2">
                  <option value="default">默认排序</option>
                  <option value="price-asc">价格从低到高</option>
                  <option value="price-desc">价格从高到低</option>
                  <option value="rating">评分最高</option>
                  <option value="sales">销量最高</option>
                </select>
              </div>
              <div class="flex items-center gap-2">
                <button
                  @click="viewMode = 'grid'"
                  :class="[
                    'p-2 rounded-lg',
                    viewMode === 'grid' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:bg-gray-100'
                  ]"
                >

                </button>
                <button
                  @click="viewMode = 'list'"
                  :class="[
                    'p-2 rounded-lg',
                    viewMode === 'list' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:bg-gray-100'
                  ]"
                >

                </button>
              </div>
            </div>
          </div>

          <!-- 商品网格视图 -->
          <div v-if="viewMode === 'grid'" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="product in paginatedProducts"
              :key="product.id"
              class="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              <div class="relative">
                <img
                  :src="product.image"
                  :alt="product.name"
                  class="w-full h-48 object-cover"
                >
                <button
                  @click="toggleFavorite(product)"
                  :class="[
                    'absolute top-3 right-3 p-2 rounded-full transition-colors',
                    product.isFavorite ? 'bg-red-100 text-red-600' : 'bg-white text-gray-400 hover:text-red-600'
                  ]"
                >

                </button>
                <div v-if="product.discount" class="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-sm">
                  -{{ product.discount }}%
                </div>
              </div>
              <div class="p-4">
                <h3 class="font-semibold text-gray-900 mb-2 line-clamp-2">{{ product.name }}</h3>
                <p v-if="product.author" class="text-sm text-gray-600 mb-2">作者：{{ product.author }}</p>
                <div class="flex items-center mb-2">
                  <div class="flex text-yellow-400 mr-2">

                  </div>
                  <span class="text-sm text-gray-600">({{ product.reviews }})</span>
                </div>
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center gap-2">
                    <span class="text-xl font-bold text-indigo-600">¥{{ product.price }}</span>
                    <span v-if="product.originalPrice" class="text-sm text-gray-500 line-through">
                      ¥{{ product.originalPrice }}
                    </span>
                  </div>
                  <span class="text-sm text-gray-600">销量{{ product.sales }}</span>
                </div>
                <button
                  @click="addToCart(product)"
                  class="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >

                  加入购物车
                </button>
              </div>
            </div>
          </div>

          <!-- 商品列表视图 -->
          <div v-else class="space-y-4">
            <div
              v-for="product in paginatedProducts"
              :key="product.id"
              class="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              <div class="flex">
                <div class="relative w-48 h-32">
                  <img
                    :src="product.image"
                    :alt="product.name"
                    class="w-full h-full object-cover"
                  >
                  <div v-if="product.discount" class="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm">
                    -{{ product.discount }}%
                  </div>
                </div>
                <div class="flex-1 p-4">
                  <div class="flex justify-between items-start">
                    <div class="flex-1">
                      <h3 class="font-semibold text-gray-900 mb-2">{{ product.name }}</h3>
                      <p v-if="product.author" class="text-sm text-gray-600 mb-2">作者：{{ product.author }}</p>
                      <div class="flex items-center mb-2">
                        <div class="flex text-yellow-400 mr-2">

                        </div>
                        <span class="text-sm text-gray-600">({{ product.reviews }}条评论)</span>
                        <span class="text-sm text-gray-600 ml-4">销量{{ product.sales }}</span>
                      </div>
                      <div class="flex items-center gap-2 mb-3">
                        <span class="text-xl font-bold text-indigo-600">¥{{ product.price }}</span>
                        <span v-if="product.originalPrice" class="text-sm text-gray-500 line-through">
                          ¥{{ product.originalPrice }}
                        </span>
                      </div>
                    </div>
                    <div class="flex flex-col gap-2 ml-4">
                      <button
                        @click="toggleFavorite(product)"
                        :class="[
                          'p-2 rounded-lg transition-colors',
                          product.isFavorite ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-400 hover:text-red-600'
                        ]"
                      >

                      </button>
                      <button
                        @click="addToCart(product)"
                        class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                      >

                        加入购物车
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
                class="px-3 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                上一页
              </button>
              <button
                v-for="page in visiblePages"
                :key="page"
                @click="currentPage = page"
                :class="[
                  'px-3 py-2 rounded-lg border',
                  currentPage === page
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                ]"
              >
                {{ page }}
              </button>
              <button
                @click="currentPage = Math.min(totalPages, currentPage + 1)"
                :disabled="currentPage === totalPages"
                class="px-3 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                下一页
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useCartStore } from '../stores/cart'

const cartStore = useCartStore()

// 响应式数据
const selectedCategory = ref(null)
const selectedPriceRange = ref('all')
const selectedPublishers = ref([])
const selectedAgeGroups = ref([])
const sortBy = ref('default')
const viewMode = ref('grid')
const currentPage = ref(1)
const itemsPerPage = 12

// 图书分类
const categories = ref([
  { id: 'all', name: '全部图书', icon: 'fa fa-book', count: 42 },
  { id: 'literature', name: '文学小说', icon: 'fa fa-feather', count: 12 },
  { id: 'education', name: '教育考试', icon: 'fa fa-graduation-cap', count: 8 },
  { id: 'children', name: '童书绘本', icon: 'fa fa-child', count: 10 },
  { id: 'technology', name: '科技计算机', icon: 'fa fa-laptop', count: 6 },
  { id: 'business', name: '经济管理', icon: 'fa fa-chart-line', count: 5 },
  { id: 'stationery', name: '文具用品', icon: 'fa fa-pen', count: 15 },
  { id: 'art', name: '艺术设计', icon: 'fa fa-palette', count: 7 }
])

// 价格区间
const priceRanges = ref([
  { id: 'all', label: '全部价格' },
  { id: '0-30', label: '¥0 - ¥30' },
  { id: '30-80', label: '¥30 - ¥80' },
  { id: '80-200', label: '¥80 - ¥200' },
  { id: '200-500', label: '¥200 - ¥500' },
  { id: '500+', label: '¥500以上' }
])

// 出版社列表
const publishers = ref([
  { id: 'peoples', name: '人民文学出版社' },
  { id: 'commercial', name: '商务印书馆' },
  { id: 'zhonghua', name: '中华书局' },
  { id: 'machinery', name: '机械工业出版社' },
  { id: 'electronics', name: '电子工业出版社' },
  { id: 'tsinghua', name: '清华大学出版社' },
  { id: 'posts', name: '人民邮电出版社' }
])

// 适用年龄
const ageGroups = ref([
  { id: 'infant', name: '0-3岁' },
  { id: 'preschool', name: '3-6岁' },
  { id: 'primary', name: '6-12岁' },
  { id: 'teen', name: '12-18岁' },
  { id: 'adult', name: '成人' },
  { id: 'senior', name: '老年' }
])

// 图书文具商品数据
const products = ref([
  {
    id: 1,
    name: '《活着》余华著 经典文学作品',
    price: 29.8,
    originalPrice: 39.8,
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400',
    rating: 5,
    reviews: 12456,
    sales: 23456,
    category: 'literature',
    publisher: 'peoples',
    author: '余华',
    discount: 25,
    isFavorite: false
  },
  {
    id: 2,
    name: '《算法导论》第三版 计算机经典教材',
    price: 128,
    originalPrice: 158,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400',
    rating: 5,
    reviews: 3456,
    sales: 5678,
    category: 'technology',
    publisher: 'machinery',
    author: 'Thomas H.Cormen',
    discount: 19,
    isFavorite: false
  },
  {
    id: 3,
    name: '晨光文具套装 学生用品大礼包',
    price: 89,
    originalPrice: 119,
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400',
    rating: 4,
    reviews: 2345,
    sales: 8901,
    category: 'stationery',
    publisher: null,
    author: null,
    discount: 25,
    isFavorite: false
  },
  {
    id: 4,
    name: '《小王子》经典童话绘本',
    price: 35,
    originalPrice: 45,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    rating: 5,
    reviews: 5678,
    sales: 12345,
    category: 'children',
    publisher: 'peoples',
    author: '圣埃克苏佩里',
    discount: 22,
    isFavorite: false
  },
  {
    id: 5,
    name: '《经济学原理》曼昆 第七版',
    price: 98,
    originalPrice: 128,
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400',
    rating: 4,
    reviews: 1234,
    sales: 3456,
    category: 'business',
    publisher: 'commercial',
    author: 'N.格里高利·曼昆',
    discount: 23,
    isFavorite: false
  },
  {
    id: 6,
    name: '《高等数学》同济大学第七版',
    price: 59,
    originalPrice: 79,
    image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400',
    rating: 4,
    reviews: 8901,
    sales: 15678,
    category: 'education',
    publisher: 'tsinghua',
    author: '同济大学数学系',
    discount: 25,
    isFavorite: false
  },
  {
    id: 7,
    name: '《设计心理学》唐纳德·诺曼',
    price: 49,
    originalPrice: 65,
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400',
    rating: 5,
    reviews: 2345,
    sales: 4567,
    category: 'art',
    publisher: 'electronics',
    author: '唐纳德·诺曼',
    discount: 25,
    isFavorite: false
  },
  {
    id: 8,
    name: '得力钢笔套装 学生练字专用',
    price: 45,
    originalPrice: 60,
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400',
    rating: 4,
    reviews: 1567,
    sales: 6789,
    category: 'stationery',
    publisher: null,
    author: null,
    discount: 25,
    isFavorite: false
  }
])

// 计算属性
const filteredProducts = computed(() => {
  let filtered = products.value

  // 按分类筛选
  if (selectedCategory.value && selectedCategory.value.id !== 'all') {
    filtered = filtered.filter(product => product.category === selectedCategory.value.id)
  }

  // 按价格筛选
  if (selectedPriceRange.value !== 'all') {
    const [min, max] = selectedPriceRange.value.split('-').map(Number)
    if (max) {
      filtered = filtered.filter(product => product.price >= min && product.price <= max)
    } else {
      filtered = filtered.filter(product => product.price >= min)
    }
  }

  // 按出版社筛选
  if (selectedPublishers.value.length > 0) {
    filtered = filtered.filter(product => 
      product.publisher && selectedPublishers.value.includes(product.publisher)
    )
  }

  // 排序
  switch (sortBy.value) {
    case 'price-asc':
      filtered.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      filtered.sort((a, b) => b.price - a.price)
      break
    case 'rating':
      filtered.sort((a, b) => b.rating - a.rating)
      break
    case 'sales':
      filtered.sort((a, b) => b.sales - a.sales)
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
const selectCategory = (category) => {
  selectedCategory.value = category
  currentPage.value = 1
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

// 监听筛选条件变化，重置页码
watch([selectedPriceRange, selectedPublishers, selectedAgeGroups, sortBy], () => {
  currentPage.value = 1
})

// 初始化选择全部分类
selectCategory(categories.value[0])
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>