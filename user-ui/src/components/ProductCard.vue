<template>
  <div class="card-hover bg-white rounded-xl shadow-md overflow-hidden group">
    <div class="relative overflow-hidden">
      <img 
        :src="product.image" 
        :alt="product.name" 
        class="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
      >
      <div class="absolute top-3 left-3">
        <span 
          v-if="product.badge" 
          class="badge"
          :class="{
            'bg-red-500': product.badge === '热销',
            'bg-blue-500': product.badge === '新品',
            'bg-green-500': product.badge === '特惠'
          }"
        >
          {{ product.badge }}
        </span>
      </div>
      <div class="absolute top-3 right-3">
        <button 
          class="w-8 h-8 bg-white/80 rounded-full flex items-center justify-center text-gray-600 hover:text-red-500 hover:bg-white transition-all duration-300"
          @click="toggleFavorite"
        >
          <i :class="isFavorite ? 'fa fa-heart text-red-500' : 'fa fa-heart-o'"></i>
        </button>
      </div>
      <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
        <button 
          class="bg-tertiary text-white px-4 py-2 rounded-lg font-medium opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-tertiary/90"
          @click="quickView"
        >
          <img src="/assets/icon/预览.svg" alt="预览" class="w-4 h-4 mr-2 inline-block" style="filter: brightness(0) invert(1);">快速查看
        </button>
      </div>
    </div>
    
    <div class="p-4">
      <h3 class="font-semibold text-dark mb-2 line-clamp-2 group-hover:text-tertiary transition-colors duration-300">
        {{ product.name }}
      </h3>
      
      <div class="flex items-center mb-3">
        <div class="flex items-center mr-2">
          <i 
            v-for="star in 5" 
            :key="star"
            :class="star <= product.rating ? 'fa fa-star text-yellow-400' : 'fa fa-star-o text-gray-300'"
            class="text-sm"
          ></i>
        </div>
        <span class="text-sm text-gray-500">({{ product.reviews }})</span>
      </div>
      
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-2">
          <span class="text-xl font-bold text-tertiary">¥{{ product.price }}</span>
          <span 
            v-if="product.originalPrice" 
            class="text-sm text-gray-400 line-through"
          >
            ¥{{ product.originalPrice }}
          </span>
        </div>
        <span 
          v-if="product.discount" 
          class="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-medium"
        >
          -{{ product.discount }}%
        </span>
      </div>
      
      <button 
        class="w-full bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-lg font-medium transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
        @click="addToCart"
        :disabled="isAdding"
      >
        <i v-if="!isAdding" class="fa fa-shopping-cart mr-2"></i>
        <i v-else class="fa fa-spinner fa-spin mr-2"></i>
        {{ isAdding ? '添加中...' : '加入购物车' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { useUserStore } from '../stores/user'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const router = useRouter()
const cartStore = useCartStore()
const userStore = useUserStore()
const isFavorite = ref(false)
const isAdding = ref(false)

const toggleFavorite = () => {
  if (!userStore.isAuthenticated) {
    userStore.showToast('请先登录后再收藏商品', 'warning')
    return
  }
  
  isFavorite.value = !isFavorite.value
  userStore.showToast(isFavorite.value ? '已添加到收藏' : '已取消收藏', 'success')
  // 这里可以实现收藏功能
}

const quickView = () => {
  // 导航到商品详情页，传递商品ID参数
  router.push({ name: 'ProductDetail', params: { id: props.product.id } })
}

const addToCart = async () => {
  if (!userStore.isAuthenticated) {
    userStore.showToast('请先登录后再添加商品到购物车', 'warning')
    return
  }
  
  isAdding.value = true
  
  // 模拟添加延迟
  await new Promise(resolve => setTimeout(resolve, 500))
  
  cartStore.addToCart({
    id: props.product.id,
    name: props.product.name,
    price: props.product.price,
    image: props.product.image,
    quantity: 1
  })
  
  isAdding.value = false
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>