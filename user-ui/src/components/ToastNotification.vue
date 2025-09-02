<template>
  <div class="fixed top-20 right-4 z-50 space-y-2">
    <div 
      v-for="toast in toasts" 
      :key="toast.id"
      class="bg-white border-l-4 rounded-lg shadow-lg p-4 min-w-[300px] transform transition-all duration-300"
      :class="{
        'border-green-500': toast.type === 'success',
        'border-red-500': toast.type === 'error',
        'border-yellow-500': toast.type === 'warning',
        'border-blue-500': toast.type === 'info',
        'translate-x-0 opacity-100': toast.visible,
        'translate-x-full opacity-0': !toast.visible
      }"
    >
      <div class="flex items-start">
        <div class="flex-shrink-0 mr-3">
          <i 
            :class="getToastIcon(toast.type)"
            class="text-xl"
            :style="{ color: getToastColor(toast.type) }"
          ></i>
        </div>
        <div class="flex-1">
          <h4 
            v-if="toast.title" 
            class="font-semibold text-dark mb-1"
          >
            {{ toast.title }}
          </h4>
          <p class="text-gray-600 text-sm">
            {{ toast.message }}
          </p>
        </div>
        <button 
          class="flex-shrink-0 ml-3 text-gray-400 hover:text-gray-600 transition-colors"
          @click="removeToast(toast.id)"
        >
          <i class="fa fa-times"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const toasts = ref([])
let toastId = 0

const addToast = (message, type = 'info', title = '', duration = 3000) => {
  const id = ++toastId
  const toast = {
    id,
    message,
    type,
    title,
    visible: false
  }
  
  toasts.value.push(toast)
  
  // 延迟显示动画
  setTimeout(() => {
    toast.visible = true
  }, 10)
  
  // 自动移除
  if (duration > 0) {
    setTimeout(() => {
      removeToast(id)
    }, duration)
  }
  
  return id
}

const removeToast = (id) => {
  const toast = toasts.value.find(t => t.id === id)
  if (toast) {
    toast.visible = false
    setTimeout(() => {
      const index = toasts.value.findIndex(t => t.id === id)
      if (index > -1) {
        toasts.value.splice(index, 1)
      }
    }, 300)
  }
}

const getToastIcon = (type) => {
  switch (type) {
    case 'success':
      return 'fa fa-check-circle'
    case 'error':
      return 'fa fa-times-circle'
    case 'warning':
      return 'fa fa-exclamation-triangle'
    case 'info':
    default:
      return 'fa fa-info-circle'
  }
}

const getToastColor = (type) => {
  switch (type) {
    case 'success':
      return '#10b981'
    case 'error':
      return '#ef4444'
    case 'warning':
      return '#f59e0b'
    case 'info':
    default:
      return '#3b82f6'
  }
}

// 全局方法
const showToast = {
  success: (message, title = '成功', duration = 3000) => addToast(message, 'success', title, duration),
  error: (message, title = '错误', duration = 5000) => addToast(message, 'error', title, duration),
  warning: (message, title = '警告', duration = 4000) => addToast(message, 'warning', title, duration),
  info: (message, title = '提示', duration = 3000) => addToast(message, 'info', title, duration)
}

// 暴露给全局使用
defineExpose({
  addToast,
  removeToast,
  showToast
})

onMounted(() => {
  // 将toast方法挂载到全局
  window.$toast = showToast
})
</script>