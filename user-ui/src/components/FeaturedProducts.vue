<template>
  <section id="featured" class="py-16 bg-gray-50">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <h2 class="section-title">精选商品</h2>
        <p class="text-gray-600 max-w-2xl mx-auto">
          为您精心挑选的优质商品，品质保证，价格优惠
        </p>
      </div>
      
      <!-- 筛选器 -->
      <div class="flex flex-wrap justify-center gap-4 mb-8">
        <button 
          v-for="filter in filters" 
          :key="filter.value"
          class="px-6 py-2 rounded-full font-medium transition-all duration-300"
          :class="{
            'bg-tertiary text-white shadow-lg': activeFilter === filter.value,
            'bg-white text-gray-600 hover:bg-gray-100': activeFilter !== filter.value
          }"
          @click="setActiveFilter(filter.value)"
        >
          {{ filter.label }}
        </button>
      </div>
      
      <!-- 排序和价格筛选 -->
      <div class="flex flex-wrap justify-between items-center mb-8 gap-4">
        <div class="flex items-center space-x-4">
          <select 
            v-model="sortBy" 
            class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tertiary/50"
            @change="sortProducts"
          >
            <option value="default">默认排序</option>
            <option value="price-low">价格从低到高</option>
            <option value="price-high">价格从高到低</option>
            <option value="rating">评分最高</option>
            <option value="newest">最新上架</option>
          </select>
          
          <select 
            v-model="priceRange" 
            class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tertiary/50"
            @change="filterByPrice"
          >
            <option value="all">全部价格</option>
            <option value="0-100">¥0 - ¥100</option>
            <option value="100-500">¥100 - ¥500</option>
            <option value="500-1000">¥500 - ¥1000</option>
            <option value="1000+">¥1000+</option>
          </select>
        </div>
        
        <div class="text-sm text-gray-600">
          共 {{ filteredProducts.length }} 件商品
        </div>
      </div>
      
      <!-- 商品网格 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <ProductCard 
          v-for="product in filteredProducts" 
          :key="product.id"
          :product="product"
        />
      </div>
      
      <!-- 查看更多按钮 -->
      <div class="text-center mt-12">
        <button 
          class="btn-secondary"
          @click="goToFeaturedPage"
        >
          查看更多精选商品
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ProductCard from './ProductCard.vue'

const router = useRouter()

const activeFilter = ref('all')
const sortBy = ref('default')
const priceRange = ref('all')
const isLoading = ref(false)
const hasMore = ref(true)

const filters = [
  { label: '全部', value: 'all' },
  { label: '数码电子', value: 'electronics' },
  { label: '服装配饰', value: 'fashion' },
  { label: '家居生活', value: 'home' },
  { label: '美妆护肤', value: 'beauty' },
  { label: '运动户外', value: 'sports' }
]

const products = ref([
  {
    id: 1,
    name: '无线蓝牙耳机 降噪版',
    price: 299,
    originalPrice: 399,
    discount: 25,
    rating: 4.8,
    reviews: 1234,
    image: 'https://picsum.photos/id/96/400/300',
    category: 'electronics',
    badge: '热销'
  },
  {
    id: 2,
    name: '夏季纯棉T恤 舒适透气',
    price: 89,
    originalPrice: 129,
    discount: 31,
    rating: 4.6,
    reviews: 856,
    image: 'https://picsum.photos/id/21/400/300',
    category: 'fashion',
    badge: '新品'
  },
  {
    id: 3,
    name: '智能手环 运动监测',
    price: 199,
    originalPrice: 299,
    discount: 33,
    rating: 4.7,
    reviews: 642,
    image: 'https://picsum.photos/id/60/400/300',
    category: 'electronics',
    badge: '特惠'
  },
  {
    id: 4,
    name: '北欧风格台灯 护眼LED',
    price: 159,
    originalPrice: 219,
    discount: 27,
    rating: 4.5,
    reviews: 423,
    image: 'https://picsum.photos/id/24/400/300',
    category: 'home'
  },
  {
    id: 5,
    name: '保湿面霜 深层滋润',
    price: 128,
    originalPrice: 168,
    discount: 24,
    rating: 4.9,
    reviews: 789,
    image: 'https://picsum.photos/id/177/400/300',
    category: 'beauty',
    badge: '热销'
  },
  {
    id: 6,
    name: '运动跑鞋 轻便透气',
    price: 359,
    originalPrice: 459,
    discount: 22,
    rating: 4.6,
    reviews: 567,
    image: 'https://picsum.photos/id/19/400/300',
    category: 'sports'
  },
  {
    id: 7,
    name: '智能音箱 语音控制',
    price: 299,
    originalPrice: 399,
    discount: 25,
    rating: 4.7,
    reviews: 892,
    image: 'https://picsum.photos/id/96/400/300',
    category: 'electronics',
    badge: '新品'
  },
  {
    id: 8,
    name: '真丝围巾 优雅时尚',
    price: 189,
    originalPrice: 259,
    discount: 27,
    rating: 4.8,
    reviews: 345,
    image: 'https://picsum.photos/id/21/400/300',
    category: 'fashion'
  }
])

const filteredProducts = computed(() => {
  let filtered = products.value
  
  // 按分类筛选
  if (activeFilter.value !== 'all') {
    filtered = filtered.filter(product => product.category === activeFilter.value)
  }
  
  // 按价格筛选
  if (priceRange.value !== 'all') {
    const [min, max] = priceRange.value.split('-').map(Number)
    if (max) {
      filtered = filtered.filter(product => product.price >= min && product.price <= max)
    } else {
      filtered = filtered.filter(product => product.price >= min)
    }
  }
  
  // 排序
  switch (sortBy.value) {
    case 'price-low':
      filtered.sort((a, b) => a.price - b.price)
      break
    case 'price-high':
      filtered.sort((a, b) => b.price - a.price)
      break
    case 'rating':
      filtered.sort((a, b) => b.rating - a.rating)
      break
    case 'newest':
      filtered.sort((a, b) => b.id - a.id)
      break
  }
  
  return filtered
})

const setActiveFilter = (filter) => {
  activeFilter.value = filter
}

const sortProducts = () => {
  // 排序逻辑已在computed中处理
}

const filterByPrice = () => {
  // 价格筛选逻辑已在computed中处理
}

const goToFeaturedPage = () => {
  router.push('/featured-products')
}

onMounted(() => {
  // 组件挂载时的初始化逻辑
})
</script>