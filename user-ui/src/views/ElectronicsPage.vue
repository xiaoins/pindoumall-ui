<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 页面标题 -->
    <div class="bg-white shadow-sm">
      <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold text-gray-900">数码电子</h1>
        <p class="text-gray-600 mt-2">精选数码电子产品，科技改变生活</p>
      </div>
    </div>

    <div class="container mx-auto px-4 py-8">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- 左侧分类导航 -->
        <div class="lg:w-1/4">
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h2 class="text-xl font-semibold mb-4">数码分类</h2>
            <div class="space-y-2">
              <button
                v-for="category in categories"
                :key="category.id"
                @click="selectCategory(category)"
                :class="[
                  'w-full text-left px-4 py-3 rounded-lg transition-colors',
                  selectedCategory?.id === category.id
                    ? 'bg-green-100 text-green-700 border border-green-200'
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
                  class="mr-3 text-green-600"
                >
                <span class="text-gray-700">{{ range.label }}</span>
              </label>
            </div>
          </div>

          <!-- 品牌筛选 -->
          <div class="bg-white rounded-lg shadow-sm p-6 mt-6">
            <h3 class="text-lg font-semibold mb-4">热门品牌</h3>
            <div class="space-y-2">
              <label v-for="brand in brands" :key="brand.id" class="flex items-center">
                <input
                  type="checkbox"
                  :value="brand.id"
                  v-model="selectedBrands"
                  class="mr-3 text-green-600"
                >
                <span class="text-gray-700">{{ brand.name }}</span>
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
                    viewMode === 'grid' ? 'bg-green-100 text-green-700' : 'text-gray-500 hover:bg-gray-100'
                  ]"
                >

                </button>
                <button
                  @click="viewMode = 'list'"
                  :class="[
                    'p-2 rounded-lg',
                    viewMode === 'list' ? 'bg-green-100 text-green-700' : 'text-gray-500 hover:bg-gray-100'
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
                <div class="flex items-center mb-2">
                  <div class="flex text-yellow-400 mr-2">

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
                  <span class="text-sm text-gray-600">销量{{ product.sales }}</span>
                </div>
                <button
                  @click="addToCart(product)"
                  class="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
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
                      <div class="flex items-center mb-2">
                        <div class="flex text-yellow-400 mr-2">

                        </div>
                        <span class="text-sm text-gray-600">({{ product.reviews }}条评论)</span>
                        <span class="text-sm text-gray-600 ml-4">销量{{ product.sales }}</span>
                      </div>
                      <div class="flex items-center gap-2 mb-3">
                        <span class="text-xl font-bold text-green-600">¥{{ product.price }}</span>
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
                        class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
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
                    ? 'bg-green-600 text-white border-green-600'
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
const selectedBrands = ref([])
const sortBy = ref('default')
const viewMode = ref('grid')
const currentPage = ref(1)
const itemsPerPage = 12

// 数码电子分类
const categories = ref([
  { id: 'all', name: '全部数码', icon: 'fa fa-th', count: 24 },
  { id: 'phone', name: '手机通讯', icon: 'fa fa-mobile', count: 8 },
  { id: 'computer', name: '电脑办公', icon: 'fa fa-laptop', count: 6 },
  { id: 'camera', name: '摄影摄像', icon: 'fa fa-camera', count: 4 },
  { id: 'audio', name: '影音娱乐', icon: 'fa fa-headphones', count: 3 },
  { id: 'smart', name: '智能设备', icon: 'fa fa-microchip', count: 3 }
])

// 价格区间
const priceRanges = ref([
  { id: 'all', label: '全部价格' },
  { id: '0-500', label: '¥0 - ¥500' },
  { id: '500-2000', label: '¥500 - ¥2000' },
  { id: '2000-5000', label: '¥2000 - ¥5000' },
  { id: '5000-10000', label: '¥5000 - ¥10000' },
  { id: '10000+', label: '¥10000以上' }
])

// 品牌列表
const brands = ref([
  { id: 'apple', name: 'Apple' },
  { id: 'samsung', name: 'Samsung' },
  { id: 'huawei', name: 'Huawei' },
  { id: 'xiaomi', name: 'Xiaomi' },
  { id: 'sony', name: 'Sony' },
  { id: 'dell', name: 'Dell' },
  { id: 'lenovo', name: 'Lenovo' }
])

// 数码电子商品数据
const products = ref([
  {
    id: 1,
    name: 'iPhone 15 Pro Max 256GB 深空黑色',
    price: 9999,
    originalPrice: 10999,
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400',
    rating: 5,
    reviews: 128,
    sales: 256,
    category: 'phone',
    brand: 'apple',
    discount: 9,
    isFavorite: false
  },
  {
    id: 2,
    name: 'Samsung Galaxy S24 Ultra 512GB',
    price: 8999,
    originalPrice: 9999,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
    rating: 5,
    reviews: 67,
    sales: 189,
    category: 'phone',
    brand: 'samsung',
    discount: 10,
    isFavorite: false
  },
  {
    id: 3,
    name: 'MacBook Pro 14英寸 M3芯片',
    price: 14999,
    originalPrice: 16999,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
    rating: 5,
    reviews: 89,
    sales: 145,
    category: 'computer',
    brand: 'apple',
    discount: 12,
    isFavorite: false
  },
  {
    id: 4,
    name: 'Dell XPS 13 超轻薄笔记本',
    price: 7999,
    originalPrice: 8999,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400',
    rating: 4,
    reviews: 156,
    sales: 234,
    category: 'computer',
    brand: 'dell',
    discount: 11,
    isFavorite: false
  },
  {
    id: 5,
    name: 'Sony A7R5 全画幅微单相机',
    price: 25999,
    originalPrice: 27999,
    image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400',
    rating: 5,
    reviews: 45,
    sales: 78,
    category: 'camera',
    brand: 'sony',
    discount: 7,
    isFavorite: false
  },
  {
    id: 6,
    name: 'AirPods Pro 第三代 无线耳机',
    price: 1899,
    originalPrice: 2199,
    image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400',
    rating: 5,
    reviews: 234,
    sales: 567,
    category: 'audio',
    brand: 'apple',
    discount: 14,
    isFavorite: false
  },
  {
    id: 7,
    name: 'Xiaomi 14 Ultra 摄影旗舰',
    price: 5999,
    originalPrice: 6499,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
    rating: 4,
    reviews: 123,
    sales: 345,
    category: 'phone',
    brand: 'xiaomi',
    discount: 8,
    isFavorite: false
  },
  {
    id: 8,
    name: 'Huawei MateBook X Pro 触屏笔记本',
    price: 9999,
    originalPrice: 11999,
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400',
    rating: 4,
    reviews: 89,
    sales: 167,
    category: 'computer',
    brand: 'huawei',
    discount: 17,
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

  // 按品牌筛选
  if (selectedBrands.value.length > 0) {
    filtered = filtered.filter(product => 
      product.brand && selectedBrands.value.includes(product.brand)
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
watch([selectedPriceRange, selectedBrands, sortBy], () => {
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