<template>
  <section class="py-16 bg-gradient-to-r from-primary to-secondary">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
          我们的成就
        </h2>
        <p class="text-white/90 max-w-2xl mx-auto">
          数字见证品质，用户信赖是我们前进的动力
        </p>
      </div>
      
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div 
          v-for="(stat, index) in stats" 
          :key="stat.id"
          class="text-center group"
          ref="statElements"
        >
          <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 group-hover:bg-white/20 transition-all duration-300 group-hover:scale-105">
            <div class="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
              <i :class="stat.icon" class="text-2xl text-white"></i>
            </div>
            <div class="text-3xl md:text-4xl font-bold text-white mb-2">
              {{ animatedValues[index] }}{{ stat.suffix }}
            </div>
            <div class="text-white/90 font-medium">
              {{ stat.label }}
            </div>
            <div class="text-white/70 text-sm mt-1">
              {{ stat.description }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const statElements = ref([])
const animatedValues = ref([0, 0, 0, 0])
const hasAnimated = ref(false)

const stats = [
  {
    id: 1,
    icon: 'fa fa-box',
    value: 50000,
    suffix: '+',
    label: '优质商品',
    description: '精选全球好物'
  },
  {
    id: 2,
    icon: 'fa fa-users',
    value: 100000,
    suffix: '+',
    label: '满意客户',
    description: '信赖我们的选择'
  },
  {
    id: 3,
    icon: 'fa fa-shopping-bag',
    value: 500000,
    suffix: '+',
    label: '成功订单',
    description: '安全快速配送'
  },
  {
    id: 4,
    icon: 'fa fa-map-marker-alt',
    value: 200,
    suffix: '+',
    label: '覆盖城市',
    description: '全国配送网络'
  }
]

const animateNumber = (finalValue, index, duration = 2000) => {
  const startTime = Date.now()
  const startValue = 0
  
  const updateValue = () => {
    const elapsed = Date.now() - startTime
    const progress = Math.min(elapsed / duration, 1)
    
    // 使用缓动函数
    const easeOutQuart = 1 - Math.pow(1 - progress, 4)
    const currentValue = Math.floor(startValue + (finalValue - startValue) * easeOutQuart)
    
    animatedValues.value[index] = currentValue
    
    if (progress < 1) {
      requestAnimationFrame(updateValue)
    } else {
      animatedValues.value[index] = finalValue
    }
  }
  
  requestAnimationFrame(updateValue)
}

const startAnimation = () => {
  if (hasAnimated.value) return
  
  stats.forEach((stat, index) => {
    setTimeout(() => {
      animateNumber(stat.value, index)
    }, index * 200) // 错开动画时间
  })
  
  hasAnimated.value = true
}

const checkInViewport = () => {
  if (hasAnimated.value) return
  
  const section = statElements.value[0]?.closest('section')
  if (!section) return
  
  const rect = section.getBoundingClientRect()
  const windowHeight = window.innerHeight
  
  // 当元素进入视口时开始动画
  if (rect.top < windowHeight * 0.8 && rect.bottom > 0) {
    startAnimation()
  }
}

const handleScroll = () => {
  checkInViewport()
}

const handleResize = () => {
  checkInViewport()
}

onMounted(() => {
  // 初始检查
  setTimeout(checkInViewport, 100)
  
  // 监听滚动事件
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', handleResize, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleResize)
})
</script>