<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 返回按钮 - 悬停显示 -->
    <div class="fixed top-4 left-4 z-50 group">
      <button 
        @click="goBack"
        class="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-green-600 transition-all duration-300 opacity-0 group-hover:opacity-100"
        title="返回首页"
      >
        <i class="fa fa-arrow-left"></i>
      </button>
      <!-- 悬停触发区域 -->
      <div class="absolute inset-0 w-16 h-16 -m-3"></div>
    </div>

    <!-- 加载状态 -->
    <div v-if="isLoading" class="container mx-auto px-4 py-8">
      <div class="bg-white rounded-2xl shadow-lg p-8 text-center">
        <i class="fa fa-spinner fa-spin text-4xl text-tertiary mb-4"></i>
        <p class="text-gray-600">正在加载商品信息...</p>
      </div>
    </div>

    <!-- 商品不存在 -->
    <div v-else-if="notFound" class="container mx-auto px-4 py-8">
      <div class="bg-white rounded-2xl shadow-lg p-8 text-center">
        <i class="fa fa-exclamation-triangle text-4xl text-red-500 mb-4"></i>
        <h2 class="text-xl font-bold text-gray-900 mb-2">商品不存在</h2>
        <p class="text-gray-600 mb-6">抱歉，您查找的商品不存在或已下架</p>
        <button 
          @click="goBack"
          class="bg-tertiary text-white px-6 py-2 rounded-lg hover:bg-tertiary/90 transition-colors"
        >
          返回首页
        </button>
      </div>
    </div>

    <!-- 商品详情内容 -->
    <div v-else class="container mx-auto px-4 py-8">

      <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- 商品图片区域 -->
          <div class="relative bg-gradient-to-br from-orange-100 to-amber-50 p-8 flex items-center justify-center">
            <div class="relative">
              <img 
                :src="product.image" 
                :alt="product.name"
                class="w-full max-w-md h-auto object-contain drop-shadow-2xl"
              >
              <!-- AI生成标签 -->
              <div class="absolute top-4 left-4 bg-white bg-opacity-90 rounded-full px-3 py-1 text-xs text-gray-600 font-medium">
                AI生成
              </div>
              <!-- 右箭头 -->
              <button class="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors">
                <i class="fa fa-chevron-right"></i>
              </button>
            </div>
          </div>

          <!-- 商品信息区域 -->
          <div class="p-8 flex flex-col justify-center">
            <!-- 商品名称 -->
            <h1 class="text-2xl font-bold text-gray-900 mb-6">{{ product.name }}</h1>
            
            <!-- 价格信息 -->
            <div class="mb-8">
              <div class="flex items-baseline gap-2 mb-2">
                <span class="text-4xl font-bold text-gray-900">¥{{ product.price }}</span>
                <span v-if="product.originalPrice" class="text-lg text-gray-400 line-through">¥{{ product.originalPrice }}</span>
              </div>
              <div v-if="product.discount" class="inline-block bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-medium">
                限时{{ product.discount }}折
              </div>
            </div>

            <!-- 商品详细信息 -->
            <div class="space-y-4 mb-8">
              <div class="flex justify-between items-center">
                <span class="text-gray-600">上架时间:</span>
                <span class="font-medium text-gray-900">{{ product.releaseDate }}</span>
              </div>
              <div v-if="product.discountEndDate" class="flex justify-between items-center">
                <span class="text-gray-600">折扣截止:</span>
                <span class="font-medium text-red-600">{{ product.discountEndDate }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-600">生产地区:</span>
                <span class="font-medium text-gray-900">{{ product.origin }}</span>
              </div>
              <div v-if="product.material" class="flex justify-between items-center">
                <span class="text-gray-600">材质:</span>
                <span class="font-medium text-gray-900">{{ product.material }}</span>
              </div>
              <div v-if="product.brand" class="flex justify-between items-center">
                <span class="text-gray-600">品牌:</span>
                <span class="font-medium text-gray-900">{{ product.brand }}</span>
              </div>
            </div>

            <!-- 操作按钮 -->
            <div class="flex gap-4">
              <button 
                @click="buyNow"
                class="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <i class="fa fa-credit-card"></i>
                立即购买
              </button>
              <button 
                @click="addToCart"
                class="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <i class="fa fa-shopping-cart"></i>
                加入购物车
              </button>
            </div>

            <!-- 额外信息 -->
            <div class="mt-6 pt-6 border-t border-gray-200">
              <div class="flex items-center gap-4 text-sm text-gray-600">
                <div class="flex items-center gap-1">
                  <i class="fa fa-truck"></i>
                  <span>免费配送</span>
                </div>
                <div class="flex items-center gap-1">
                  <i class="fa fa-shield-alt"></i>
                  <span>品质保证</span>
                </div>
                <div class="flex items-center gap-1">
                  <i class="fa fa-undo"></i>
                  <span>7天退换</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 商品详情描述 -->
      <div class="bg-white rounded-2xl shadow-lg mt-8 p-8">
        <h2 class="text-xl font-bold text-gray-900 mb-4">商品详情</h2>
        <div class="prose max-w-none text-gray-600">
          <p>{{ product.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useUIStore } from '@/stores/ui'

const router = useRouter()
const route = useRoute()
const cartStore = useCartStore()
const uiStore = useUIStore()

// 商品数据
const product = ref({})
const isLoading = ref(true)
const notFound = ref(false)

// 模拟商品数据库
const productsDatabase = {
  1: {
    id: 1,
    name: '无线蓝牙耳机 降噪版',
    price: 299,
    originalPrice: 399,
    discount: 25,
    rating: 4.8,
    reviews: 1234,
    image: 'https://picsum.photos/id/96/400/300',
    category: 'electronics',
    badge: '热销',
    releaseDate: '2023.10.15',
    discountEndDate: '2024.01.31',
    origin: '中国深圳',
    material: '高分子材料',
    brand: 'TechSound',
    description: '这款无线蓝牙耳机采用先进的主动降噪技术，为您提供沉浸式的音乐体验。高品质音频驱动单元，确保音质清晰饱满。人体工学设计，佩戴舒适，适合长时间使用。'
  },
  2: {
    id: 2,
    name: '夏季纯棉T恤 舒适透气',
    price: 89,
    originalPrice: 129,
    discount: 31,
    rating: 4.6,
    reviews: 856,
    image: 'https://picsum.photos/id/21/400/300',
    category: 'fashion',
    badge: '新品',
    releaseDate: '2023.11.01',
    discountEndDate: '2024.02.15',
    origin: '中国广州',
    material: '100%纯棉',
    brand: 'ComfortWear',
    description: '采用优质纯棉面料制作，透气性佳，吸湿排汗。简约时尚的设计，适合日常休闲穿着。多种颜色可选，是夏季必备的基础款单品。'
  },
  3: {
    id: 3,
    name: '智能手环 运动监测',
    price: 199,
    originalPrice: 299,
    discount: 33,
    rating: 4.7,
    reviews: 642,
    image: 'https://picsum.photos/id/60/400/300',
    category: 'electronics',
    badge: '特惠',
    releaseDate: '2023.09.20',
    discountEndDate: '2024.01.20',
    origin: '中国北京',
    material: '硅胶+金属',
    brand: 'FitTracker',
    description: '多功能智能手环，支持心率监测、步数统计、睡眠分析等功能。防水设计，适合运动和日常佩戴。长续航电池，一次充电可使用7天。'
  },
  4: {
    id: 4,
    name: '北欧风格台灯 护眼LED',
    price: 159,
    originalPrice: 219,
    discount: 27,
    rating: 4.5,
    reviews: 423,
    image: 'https://picsum.photos/id/24/400/300',
    category: 'home',
    releaseDate: '2023.08.10',
    origin: '中国佛山',
    material: '金属+亚克力',
    brand: 'NordicLight',
    description: '简约北欧设计风格，LED护眼光源，无频闪无蓝光危害。三档亮度调节，满足不同使用需求。稳固底座设计，安全可靠。'
  },
  5: {
    id: 5,
    name: '保湿面霜 深层滋润',
    price: 128,
    originalPrice: 168,
    discount: 24,
    rating: 4.9,
    reviews: 789,
    image: 'https://picsum.photos/id/177/400/300',
    category: 'beauty',
    badge: '热销',
    releaseDate: '2023.07.15',
    discountEndDate: '2024.03.01',
    origin: '韩国首尔',
    material: '天然植物精华',
    brand: 'BeautyGlow',
    description: '富含多种天然植物精华，深层滋润肌肤，改善干燥粗糙。温和配方，适合各种肌肤类型。质地轻盈不油腻，快速吸收。'
  },
  6: {
    id: 6,
    name: '运动跑鞋 轻便透气',
    price: 359,
    originalPrice: 459,
    discount: 22,
    rating: 4.6,
    reviews: 567,
    image: 'https://picsum.photos/id/19/400/300',
    category: 'sports',
    releaseDate: '2023.06.01',
    origin: '中国福建',
    material: '网布+橡胶',
    brand: 'RunFast',
    description: '专业运动跑鞋，采用透气网布鞋面，保持足部干爽。缓震中底设计，减少运动冲击。防滑橡胶大底，提供优异的抓地力。'
  },
  7: {
    id: 7,
    name: '智能音箱 语音控制',
    price: 299,
    originalPrice: 399,
    discount: 25,
    rating: 4.7,
    reviews: 892,
    image: 'https://picsum.photos/id/96/400/300',
    category: 'electronics',
    badge: '新品',
    releaseDate: '2023.12.01',
    discountEndDate: '2024.02.29',
    origin: '中国杭州',
    material: '塑料+金属网',
    brand: 'SmartVoice',
    description: '智能语音助手，支持语音控制智能家居设备。高保真音质，360度环绕音效。内置多种音乐服务，随时享受音乐盛宴。'
  },
  8: {
    id: 8,
    name: '真丝围巾 优雅时尚',
    price: 189,
    originalPrice: 259,
    discount: 27,
    rating: 4.8,
    reviews: 345,
    image: 'https://picsum.photos/id/21/400/300',
    category: 'fashion',
    releaseDate: '2023.05.20',
    origin: '中国苏州',
    material: '100%真丝',
    brand: 'SilkElegance',
    description: '采用优质桑蚕丝制作，手感柔滑，光泽自然。精美印花图案，展现优雅气质。多种佩戴方式，是时尚搭配的完美选择。'
  }
}

// 方法
const goBack = () => {
  router.push('/')
}

const buyNow = () => {
  // 立即购买逻辑
  addToCart()
  router.push('/checkout')
}

const addToCart = () => {
  cartStore.addItem({
    id: product.value.id,
    name: product.value.name,
    price: product.value.price,
    image: product.value.image,
    quantity: 1
  })
  
  uiStore.showToast('商品已添加到购物车', 'success')
}

// 加载商品数据
const loadProduct = async (productId) => {
  isLoading.value = true
  notFound.value = false
  
  try {
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const productData = productsDatabase[productId]
    if (productData) {
      product.value = productData
    } else {
      notFound.value = true
      uiStore.showToast('商品不存在', 'error')
    }
  } catch (error) {
    console.error('加载商品数据失败:', error)
    uiStore.showToast('加载商品数据失败', 'error')
    notFound.value = true
  } finally {
    isLoading.value = false
  }
}

// 根据路由参数加载商品数据
onMounted(() => {
  const productId = parseInt(route.params.id)
  if (productId) {
    loadProduct(productId)
  } else {
    notFound.value = true
    isLoading.value = false
  }
})
</script>

<style scoped>
.prose p {
  line-height: 1.7;
  margin-bottom: 1rem;
}

/* 悬停区域样式 */
.group:hover .group-hover\:opacity-100 {
  opacity: 1;
}
</style>