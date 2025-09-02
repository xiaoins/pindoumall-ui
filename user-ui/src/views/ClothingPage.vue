<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 页面标题 -->
    <div class="bg-white shadow-sm">
      <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold text-gray-900">服装配饰</h1>
        <p class="text-gray-600 mt-2">时尚潮流，品质生活，展现个人魅力</p>
      </div>
    </div>

    <div class="container mx-auto px-4 py-8">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- 左侧分类导航 -->
        <div class="lg:w-1/4">
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h2 class="text-xl font-semibold mb-4">服装分类</h2>
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

          <!-- 尺码筛选 -->
          <div class="bg-white rounded-lg shadow-sm p-6 mt-6">
            <h3 class="text-lg font-semibold mb-4">尺码</h3>
            <div class="grid grid-cols-3 gap-2">
              <button
                v-for="size in sizes"
                :key="size"
                @click="toggleSize(size)"
                :class="[
                  'px-3 py-2 border rounded-lg text-sm transition-colors',
                  selectedSizes.includes(size)
                    ? 'bg-green-100 text-green-700 border-green-200'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                ]"
              >
                {{ size }}
              </button>
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
const selectedSizes = ref([])
const sortBy = ref('default')
const viewMode = ref('grid')
const currentPage = ref(1)
const itemsPerPage = 12

// 服装分类
const categories = ref([
  { id: 'all', name: '全部服装', icon: '/assets/icon/全部.svg', count: 32 },
  { id: 'men', name: '男装', icon: '/assets/icon/男装.svg', count: 12 },
  { id: 'women', name: '女装', icon: '/assets/icon/女装.svg', count: 15 },
  { id: 'shoes', name: '鞋靴', icon: '/assets/icon/鞋靴.svg', count: 8 },
  { id: 'bags', name: '箱包', icon: '/assets/icon/箱包.svg', count: 5 },
  { id: 'accessories', name: '配饰', icon: 'fa fa-gem', count: 6 }
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
  { id: 'uniqlo', name: 'Uniqlo' },
  { id: 'nike', name: 'Nike' },
  { id: 'adidas', name: 'Adidas' },
  { id: 'zara', name: 'Zara' },
  { id: 'hm', name: 'H&M' },
  { id: 'gucci', name: 'Gucci' },
  { id: 'lv', name: 'Louis Vuitton' }
])

// 尺码选项
const sizes = ref(['XS', 'S', 'M', 'L', 'XL', 'XXL', '36', '37', '38', '39', '40', '41', '42', '43', '44'])

// 服装商品数据
const products = ref([
  {
    id: 1,
    name: 'Uniqlo 优衣库 男装 圆领T恤',
    price: 59,
    originalPrice: 99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
    rating: 4,
    reviews: 234,
    sales: 1024,
    category: 'men',
    brand: 'uniqlo',
    discount: 40,
    isFavorite: false
  },
  {
    id: 2,
    name: 'Nike Air Max 270 运动鞋 男女同款',
    price: 899,
    originalPrice: 1299,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
    rating: 4,
    reviews: 89,
    sales: 432,
    category: 'shoes',
    brand: 'nike',
    discount: 31,
    isFavorite: false
  },
  {
    id: 3,
    name: 'Zara 女装 修身连衣裙',
    price: 299,
    originalPrice: 399,
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400',
    rating: 5,
    reviews: 156,
    sales: 678,
    category: 'women',
    brand: 'zara',
    discount: 25,
    isFavorite: false
  },
  {
    id: 4,
    name: 'Adidas Ultraboost 22 跑步鞋',
    price: 1299,
    originalPrice: 1599,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400',
    rating: 5,
    reviews: 92,
    sales: 345,
    category: 'shoes',
    brand: 'adidas',
    discount: 19,
    isFavorite: false
  },
  {
    id: 5,
    name: 'H&M 女装 针织开衫',
    price: 199,
    originalPrice: 299,
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400',
    rating: 4,
    reviews: 123,
    sales: 567,
    category: 'women',
    brand: 'hm',
    discount: 33,
    isFavorite: false
  },
  {
    id: 6,
    name: 'Gucci 经典款手提包',
    price: 15999,
    originalPrice: 18999,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
    rating: 5,
    reviews: 45,
    sales: 89,
    category: 'bags',
    brand: 'gucci',
    discount: 16,
    isFavorite: false
  },
  {
    id: 7,
    name: 'Nike 男装 运动套装',
    price: 599,
    originalPrice: 799,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400',
    rating: 4,
    reviews: 178,
    sales: 456,
    category: 'men',
    brand: 'nike',
    discount: 25,
    isFavorite: false
  },
  {
    id: 8,
    name: 'Louis Vuitton 经典钱包',
    price: 3999,
    originalPrice: 4599,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
    rating: 5,
    reviews: 67,
    sales: 123,
    category: 'accessories',
    brand: 'lv',
    discount: 13,
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

const toggleSize = (size) => {
  const index = selectedSizes.value.indexOf(size)
  if (index > -1) {
    selectedSizes.value.splice(index, 1)
  } else {
    selectedSizes.value.push(size)
  }
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