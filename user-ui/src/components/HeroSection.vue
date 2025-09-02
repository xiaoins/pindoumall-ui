<template>
  <section 
    id="home" 
    class="pt-28 pb-16 md:pt-40 md:pb-24 bg-gradient-to-br from-primary/30 to-light relative overflow-hidden"
  >

    <div class="container mx-auto px-4 relative z-10">
      <div class="flex flex-col md:flex-row items-center">
        <div class="md:w-1/2 mb-10 md:mb-0">
          <span class="inline-block bg-secondary/20 text-tertiary font-medium py-1 px-4 rounded-full mb-6 transition-all duration-300 hover:bg-secondary/30 hover:scale-105 cursor-pointer">
            夏季大促 · 全场5折起
          </span>
          <h1 class="text-[clamp(2.5rem,5vw,4rem)] font-bold text-dark leading-tight text-shadow mb-6 transition-all duration-300 hover:text-primary hover:scale-105 cursor-pointer">
            发现优质好物<br>提升生活品质
          </h1>
          <p class="text-[clamp(1rem,2vw,1.25rem)] text-gray-700 mb-8 max-w-lg transition-all duration-300 hover:text-gray-900 hover:scale-105 cursor-pointer">
            精选全球优质商品，为您提供高品质的购物体验。限时优惠，立即选购！
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <a 
              href="#featured" 
              class="btn-primary text-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
              @click="scrollToSection"
            >
              <i class="fa fa-shopping-basket mr-2"></i> 立即抢购
            </a>
            <a 
              href="#deals" 
              class="btn-secondary text-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
              @click="scrollToSection"
            >
              <i class="fa fa-tag mr-2"></i> 查看特惠
            </a>
          </div>
          <div class="flex items-center mt-10 space-x-6">
            <div class="flex -space-x-2">
              <img 
                src="https://picsum.photos/id/64/100/100" 
                alt="用户头像" 
                class="w-10 h-10 rounded-full border-2 border-white transition-all duration-300 hover:scale-125 hover:border-primary cursor-pointer"
              >
              <img 
                src="https://picsum.photos/id/65/100/100" 
                alt="用户头像" 
                class="w-10 h-10 rounded-full border-2 border-white transition-all duration-300 hover:scale-125 hover:border-primary cursor-pointer"
              >
              <img 
                src="https://picsum.photos/id/66/100/100" 
                alt="用户头像" 
                class="w-10 h-10 rounded-full border-2 border-white transition-all duration-300 hover:scale-125 hover:border-primary cursor-pointer"
              >
            </div>
            <p class="text-sm text-gray-600 transition-all duration-300 hover:text-gray-800 cursor-pointer">
              <span class="font-semibold text-tertiary transition-all duration-300 hover:text-primary hover:scale-110 inline-block cursor-pointer">10,000+</span> 满意顾客的选择
            </p>
          </div>
        </div>
        <div class="md:w-1/2 relative">
          <img 
            src="/assets/拼豆.svg" 
            alt="精选商品" 
            class="w-full h-auto transition-transform duration-300 hover:scale-105 cursor-pointer"
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const isHovered = ref(false)

const scrollToSection = (e) => {
  e.preventDefault()
  const targetId = e.target.closest('a').getAttribute('href')
  const targetElement = document.querySelector(targetId)
  
  if (targetElement) {
    window.scrollTo({
      top: targetElement.offsetTop - 80,
      behavior: 'smooth'
    })
  }
}
</script>