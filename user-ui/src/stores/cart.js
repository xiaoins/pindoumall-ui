import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useUserStore } from './user'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])
  const userStore = useUserStore()
  
  const totalItems = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0)
  })
  
  const totalPrice = computed(() => {
    return items.value.reduce((total, item) => total + (item.price * item.quantity), 0)
  })
  
  const addToCart = (product) => {
    // 检查用户是否已登录
    if (!userStore.requireAuth()) {
      return false
    }
    
    const existingItem = items.value.find(item => item.id === product.id)
    
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      items.value.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      })
    }
    
    userStore.showToast('商品已加入购物车', 'success')
    return true
  }
  
  const removeFromCart = (id) => {
    // 检查用户是否已登录
    if (!userStore.requireAuth()) {
      return false
    }
    
    const index = items.value.findIndex(item => item.id === id)
    if (index > -1) {
      items.value.splice(index, 1)
      userStore.showToast('商品已从购物车移除', 'success')
      return true
    }
    return false
  }
  
  const updateQuantity = (id, quantity) => {
    // 检查用户是否已登录
    if (!userStore.requireAuth()) {
      return false
    }
    
    const item = items.value.find(item => item.id === id)
    if (item) {
      if (quantity <= 0) {
        return removeFromCart(id)
      } else {
        item.quantity = quantity
        return true
      }
    }
    return false
  }
  
  const clearCart = () => {
    // 检查用户是否已登录
    if (!userStore.requireAuth()) {
      return false
    }
    
    if (items.value.length > 0 && confirm('确定要清空购物车吗？')) {
      items.value = []
      userStore.showToast('购物车已清空', 'success')
      return true
    }
    return false
  }
  
  return {
    items,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  }
})