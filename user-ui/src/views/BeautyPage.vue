<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 页面标题 -->
    <div class="bg-white shadow-sm">
      <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold text-gray-900">美妆护肤</h1>
        <p class="text-gray-600 mt-2">精选美妆护肤产品，让你绽放自然美丽</p>
      </div>
    </div>

    <div class="container mx-auto px-4 py-8">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- 左侧分类导航 -->
        <div class="lg:w-1/4">
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h2 class="text-xl font-semibold mb-4">美妆分类</h2>
            <div class="space-y-2">
              <button
                v-for="category in categories"
                :key="category.id"
                @click="selectCategory(category)"
                :class="[
                  'w-full text-left px-4 py-3 rounded-lg transition-colors',
                  selectedCategory?.id === category.id
                    ? 'bg-pink-100 text-pink-700 border border-pink-200'
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
                  class="mr-3 text-pink-600"
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
                  class="mr-3 text-pink-600"
                >
                <span class="text-gray-700">{{ brand.name }}</span>
              </label>
            </div>
          </div>

          <!-- 肤质筛选 -->
          <div class="bg-white rounded-lg shadow-sm p-6 mt-6">
            <h3 class="text-lg font-semibold mb-4">适合肤质</h3>
            <div class="space-y-2">
              <label v-for="skinType in skinTypes" :key="skinType.id" class="flex items-center">
                <input
                  type="checkbox"
                  :value="skinType.id"
                  v-model="selectedSkinTypes"
                  class="mr-3 text-pink-600"
                >
                <span class="text-gray-700">{{ skinType.name }}</span>
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
                    viewMode === 'grid' ? 'bg-pink-100 text-pink-700' : 'text-gray-500 hover:bg-gray-100'
                  ]"
                >

                </button>
                <button
                  @click="viewMode = 'list'"
                  :class="[
                    'p-2 rounded-lg',
                    viewMode === 'list' ? 'bg-pink-100 text-pink-700' : 'text-gray-500 hover:bg-gray-100'
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
                    <span class="text-xl font-bold text-pink-600">¥{{ product.price }}</span>
                    <span v-if="product.originalPrice" class="text-sm text-gray-500 line-through">
                      ¥{{ product.originalPrice }}
                    </span>
                  </div>
                  <span class="text-sm text-gray-600">销量{{ product.sales }}</span>
                </div>
                <button
                  @click="addToCart(product)"
                  class="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition-colors"
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
                        <span class="text-xl font-bold text-pink-600">¥{{ product.price }}</span>
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
                        class="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors"
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
                    ? 'bg-pink-600 text-white border-pink-600'
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
const selectedSkinTypes = ref([])
const sortBy = ref('default')
const viewMode = ref('grid')
const currentPage = ref(1)
const itemsPerPage = 12

// 美妆分类
const categories = ref([
  { id: 'all', name: '全部美妆', icon: 'fa fa-palette', count: 32 },
  { id: 'skincare', name: '护肤', icon: 'fa fa-leaf', count: 12 },
  { id: 'makeup', name: '彩妆', icon: 'fa fa-paint-brush', count: 10 },
  { id: 'fragrance', name: '香水', icon: 'fa fa-spray-can', count: 6 },
  { id: 'haircare', name: '护发', icon: 'fa fa-cut', count: 8 },
  { id: 'bodycare', name: '身体护理', icon: 'fa fa-hand-holding-heart', count: 7 },
  { id: 'tools', name: '美妆工具', icon: 'fa fa-brush', count: 5 }
])

// 价格区间
const priceRanges = ref([
  { id: 'all', label: '全部价格' },
  { id: '0-100', label: '¥0 - ¥100' },
  { id: '100-300', label: '¥100 - ¥300' },
  { id: '300-800', label: '¥300 - ¥800' },
  { id: '800-2000', label: '¥800 - ¥2000' },
  { id: '2000+', label: '¥2000以上' }
])

// 品牌列表
const brands = ref([
  { id: 'lancome', name: '兰蔻' },
  { id: 'estee-lauder', name: '雅诗兰黛' },
  { id: 'sk2', name: 'SK-II' },
  { id: 'lamer', name: '海蓝之谜' },
  { id: 'chanel', name: '香奈儿' },
  { id: 'dior', name: '迪奥' },
  { id: 'ysl', name: '圣罗兰' },
  { id: 'mac', name: 'MAC' }
])

// 肤质类型
const skinTypes = ref([
  { id: 'dry', name: '干性肌肤' },
  { id: 'oily', name: '油性肌肤' },
  { id: 'combination', name: '混合性肌肤' },
  { id: 'sensitive', name: '敏感肌肤' },
  { id: 'normal', name: '中性肌肤' },
  { id: 'mature', name: '熟龄肌肤' }
])

// 美妆商品数据
const products = ref([
  {
    id: 1,
    name: '兰蔻小黑瓶精华液 50ml',
    price: 1280,
    originalPrice: 1580,
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400',
    rating: 5,
    reviews: 2456,
    sales: 1234,
    category: 'skincare',
    brand: 'lancome',
    discount: 19,
    isFavorite: false
  },
  {
    id: 2,
    name: '雅诗兰黛红石榴洁面乳',
    price: 380,
    originalPrice: 450,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
    rating: 4,
    reviews: 1567,
    sales: 2345,
    category: 'skincare',
    brand: 'estee-lauder',
    discount: 16,
    isFavorite: false
  },
  {
    id: 3,
    name: 'SK-II 神仙水 230ml',
    price: 1699,
    originalPrice: 1999,
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400',
    rating: 5,
    reviews: 3456,
    sales: 987,
    category: 'skincare',
    brand: 'sk2',
    discount: 15,
    isFavorite: false
  },
  {
    id: 4,
    name: '香奈儿口红 经典红色',
    price: 350,
    originalPrice: 420,
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400',
    rating: 5,
    reviews: 1890,
    sales: 3456,
    category: 'makeup',
    brand: 'chanel',
    discount: 17,
    isFavorite: false
  },
  {
    id: 5,
    name: '迪奥999口红 经典正红',
    price: 320,
    originalPrice: 380,
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400',
    rating: 5,
    reviews: 2234,
    sales: 4567,
    category: 'makeup',
    brand: 'dior',
    discount: 16,
    isFavorite: false
  },
  {
    id: 6,
    name: '圣罗兰香水 黑鸦片',
    price: 890,
    originalPrice: 1080,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400',
    rating: 4,
    reviews: 876,
    sales: 567,
    category: 'fragrance',
    brand: 'ysl',
    discount: 18,
    isFavorite: false
  },
  {
    id: 7,
    name: '海蓝之谜面霜 60ml',
    price: 2680,
    originalPrice: 3200,
    image: 'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=400',
    rating: 5,
    reviews: 1234,
    sales: 345,
    category: 'skincare',
    brand: 'lamer',
    discount: 16,
    isFavorite: false
  },
  {
    id: 8,
    name: 'MAC 魅可粉底液',
    price: 280,
    originalPrice: 350,
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400',
    rating: 4,
    reviews: 1567,
    sales: 2345,
    category: 'makeup',
    brand: 'mac',
    discount: 20,
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
watch([selectedPriceRange, selectedBrands, selectedSkinTypes, sortBy], () => {
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