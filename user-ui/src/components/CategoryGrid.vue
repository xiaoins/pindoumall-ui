<template>
  <section id="categories" class="py-16 bg-white">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <h2 class="section-title">热门分类</h2>
        <p class="text-gray-600 max-w-2xl mx-auto">
          精选热门商品分类，满足您的各种购物需求
        </p>
      </div>
      
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        <div 
          v-for="category in categories" 
          :key="category.id"
          class="group cursor-pointer"
          @click="handleCategoryClick(category)"
        >
          <div class="bg-gray-50 rounded-2xl p-6 text-center transition-all duration-300 group-hover:bg-primary/10 group-hover:shadow-lg group-hover:-translate-y-2">
            <div class="w-16 h-16 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300">
              <img :src="category.icon" :alt="category.name" class="w-8 h-8" />
            </div>
            <h3 class="font-semibold text-dark mb-2 group-hover:text-tertiary transition-colors duration-300">
              {{ category.name }}
            </h3>
            <p class="text-sm text-gray-500">
              {{ category.count }}+ 商品
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const categories = [
  {
    id: 1,
    name: '数码电子',
    icon: '/assets/icon/shumadianzi.svg',
    count: 1200,
    route: '/electronics'
  },
  {
    id: 2,
    name: '服装配饰',
    icon: '/assets/icon/fuzhuangpeishi.svg',
    count: 2500,
    route: '/clothing'
  },
  {
    id: 3,
    name: '家居生活',
    icon: '/assets/icon/jiajushenghuo.svg',
    count: 800,
    route: '/home-life'
  },
  {
    id: 4,
    name: '美妆护肤',
    icon: '/assets/icon/meizhuanghufu.svg',
    count: 600,
    route: '/beauty'
  },
  {
    id: 5,
    name: '运动户外',
    icon: '/assets/icon/yundonghuwai.svg',
    count: 450,
    route: '/sports'
  },
  {
    id: 6,
    name: '图书文具',
    icon: '/assets/icon/tushuwenju.svg',
    count: 300,
    route: '/books'
  }
]

const handleCategoryClick = (category) => {
  console.log('选择分类:', category.name)
  // 跳转到对应的分类页面
  router.push(category.route)
}
</script>