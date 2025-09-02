<template>
  <section id="new-arrivals" class="py-16 bg-white">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <h2 class="section-title">新品上市</h2>
        <p class="text-gray-600 max-w-2xl mx-auto">
          最新上架的精选商品，抢先体验最新潮流
        </p>
      </div>
      
      <div class="relative">
        <!-- 轮播容器 -->
        <div class="overflow-hidden rounded-xl" ref="carouselContainer">
          <div 
            class="flex transition-transform duration-500 ease-in-out"
            :style="{ transform: `translateX(-${currentSlide * slideWidth}%)` }"
          >
            <div 
              v-for="(slide, index) in slides" 
              :key="index"
              class="w-full flex-shrink-0"
            >
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-2">
                <ProductCard 
                  v-for="product in slide" 
                  :key="product.id"
                  :product="product"
                />
              </div>
            </div>
          </div>
        </div>
        
        <!-- 导航按钮 -->
        <button 
          class="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-tertiary hover:shadow-xl transition-all duration-300 z-10"
          @click="prevSlide"
          :disabled="currentSlide === 0"
          :class="{ 'opacity-50 cursor-not-allowed': currentSlide === 0 }"
        >
          <i class="fa fa-chevron-left"></i>
        </button>
        
        <button 
          class="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-tertiary hover:shadow-xl transition-all duration-300 z-10"
          @click="nextSlide"
          :disabled="currentSlide === slides.length - 1"
          :class="{ 'opacity-50 cursor-not-allowed': currentSlide === slides.length - 1 }"
        >
          <i class="fa fa-chevron-right"></i>
        </button>
        
        <!-- 指示器 -->
        <div class="flex justify-center mt-8 space-x-2">
          <button 
            v-for="(slide, index) in slides" 
            :key="index"
            class="w-3 h-3 rounded-full transition-all duration-300"
            :class="{
              'bg-tertiary': currentSlide === index,
              'bg-gray-300 hover:bg-gray-400': currentSlide !== index
            }"
            @click="goToSlide(index)"
          ></button>
        </div>
      </div>
      
      <!-- 查看更多按钮 -->
      <div class="text-center mt-12">
        <button 
          class="btn-secondary"
          @click="goToNewArrivals"
        >
          查看更多新品
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import ProductCard from './ProductCard.vue'

const router = useRouter()

const currentSlide = ref(0)
const slideWidth = ref(100)
const carouselContainer = ref(null)
const autoPlayInterval = ref(null)

const newProducts = ref([
  {
    id: 101,
    name: '智能手表 Pro 运动版',
    price: 1299,
    originalPrice: 1599,
    discount: 19,
    rating: 4.9,
    reviews: 234,
    image: 'https://picsum.photos/id/96/400/300',
    category: 'electronics',
    badge: '新品'
  },
  {
    id: 102,
    name: '无线充电器 快充版',
    price: 199,
    originalPrice: 299,
    discount: 33,
    rating: 4.7,
    reviews: 156,
    image: 'https://picsum.photos/id/60/400/300',
    category: 'electronics',
    badge: '新品'
  },
  {
    id: 103,
    name: '时尚背包 商务款',
    price: 299,
    originalPrice: 399,
    discount: 25,
    rating: 4.8,
    reviews: 89,
    image: 'https://picsum.photos/id/21/400/300',
    category: 'fashion',
    badge: '新品'
  },
  {
    id: 104,
    name: '蓝牙音箱 便携版',
    price: 399,
    originalPrice: 499,
    discount: 20,
    rating: 4.6,
    reviews: 167,
    image: 'https://picsum.photos/id/96/400/300',
    category: 'electronics',
    badge: '新品'
  },
  {
    id: 105,
    name: '护肤套装 深层清洁',
    price: 259,
    originalPrice: 359,
    discount: 28,
    rating: 4.9,
    reviews: 345,
    image: 'https://picsum.photos/id/177/400/300',
    category: 'beauty',
    badge: '新品'
  },
  {
    id: 106,
    name: '瑜伽垫 防滑加厚',
    price: 129,
    originalPrice: 179,
    discount: 28,
    rating: 4.7,
    reviews: 123,
    image: 'https://picsum.photos/id/19/400/300',
    category: 'sports',
    badge: '新品'
  },
  {
    id: 107,
    name: '智能台灯 护眼版',
    price: 199,
    originalPrice: 279,
    discount: 29,
    rating: 4.8,
    reviews: 78,
    image: 'https://picsum.photos/id/24/400/300',
    category: 'home',
    badge: '新品'
  },
  {
    id: 108,
    name: '运动水杯 保温款',
    price: 89,
    originalPrice: 129,
    discount: 31,
    rating: 4.5,
    reviews: 234,
    image: 'https://picsum.photos/id/19/400/300',
    category: 'sports',
    badge: '新品'
  }
])

// 将商品分组为幻灯片
const slides = computed(() => {
  const itemsPerSlide = 4
  const slideArray = []
  
  for (let i = 0; i < newProducts.value.length; i += itemsPerSlide) {
    slideArray.push(newProducts.value.slice(i, i + itemsPerSlide))
  }
  
  return slideArray
})

const nextSlide = () => {
  if (currentSlide.value < slides.value.length - 1) {
    currentSlide.value++
  } else {
    currentSlide.value = 0 // 循环到第一张
  }
}

const prevSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--
  } else {
    currentSlide.value = slides.value.length - 1 // 循环到最后一张
  }
}

const goToSlide = (index) => {
  currentSlide.value = index
}

const startAutoPlay = () => {
  autoPlayInterval.value = setInterval(() => {
    nextSlide()
  }, 5000) // 每5秒自动切换
}

const stopAutoPlay = () => {
  if (autoPlayInterval.value) {
    clearInterval(autoPlayInterval.value)
    autoPlayInterval.value = null
  }
}

const goToNewArrivals = () => {
  router.push('/new-arrivals')
}

// 键盘导航
const handleKeydown = (e) => {
  if (e.key === 'ArrowLeft') {
    prevSlide()
  } else if (e.key === 'ArrowRight') {
    nextSlide()
  }
}

onMounted(() => {
  startAutoPlay()
  window.addEventListener('keydown', handleKeydown)
  
  // 鼠标悬停时停止自动播放
  if (carouselContainer.value) {
    carouselContainer.value.addEventListener('mouseenter', stopAutoPlay)
    carouselContainer.value.addEventListener('mouseleave', startAutoPlay)
  }
})

onUnmounted(() => {
  stopAutoPlay()
  window.removeEventListener('keydown', handleKeydown)
})
</script>