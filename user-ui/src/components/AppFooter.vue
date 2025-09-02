<template>
  <footer class="bg-dark text-white">
    <div class="container mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- 公司信息 -->
        <div>
          <div class="flex items-center mb-6">
            <img src="/assets/logo.svg" alt="优购商城" class="h-8 w-auto mr-3" />
        <img src="/assets/pindou-font.svg" alt="优购商城" class="h-6 w-auto" />
          </div>
          <p class="text-gray-300 mb-4 leading-relaxed">
            致力于为用户提供优质的购物体验，精选全球好物，品质保证，价格优惠。
          </p>
          <div class="flex justify-center">
              <img src="/assets/icon/微信公众号.jpg" alt="微信公众号" style="width: 100px; height: 100px;" />
            </div>
        </div>
        
        <!-- 快速链接 -->
        <div>
          <h3 class="text-lg font-semibold mb-6">快速链接</h3>
          <ul class="space-y-3">
            <li v-for="link in quickLinks" :key="link.name">
              <a 
                :href="link.href" 
                class="text-gray-300 hover:text-tertiary transition-colors duration-300 flex items-center"
                @click="handleLinkClick"
              >
                <img v-if="link.icon.startsWith('/')" :src="link.icon" :alt="link.name" class="mr-2 w-4 h-4" />
                <i v-else :class="link.icon" class="mr-2 w-4"></i>
                {{ link.name }}
              </a>
            </li>
          </ul>
        </div>
        
        <!-- 客户服务 -->
        <div>
          <h3 class="text-lg font-semibold mb-6">客户服务</h3>
          <ul class="space-y-3">
            <li v-for="service in customerServices" :key="service.name">
              <a 
                href="#" 
                class="text-gray-300 hover:text-tertiary transition-colors duration-300 flex items-center"
                @click.prevent="handleServiceClick(service)"
              >
                <img v-if="service.icon.startsWith('/')" :src="service.icon" :alt="service.name" class="mr-2 w-4 h-4" />
                <i v-else :class="service.icon" class="mr-2 w-4"></i>
                {{ service.name }}
              </a>
            </li>
          </ul>
        </div>
        
        <!-- 下载APP -->
        <div>
          <h3 class="text-lg font-semibold mb-6">下载APP</h3>
          <p class="text-gray-300 mb-4">扫码下载，享受更多优惠</p>
          <div class="space-y-3">
            <a 
              href="#" 
              class="flex items-center p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-300"
              @click.prevent="handleAppDownload('ios')"
            >
              <img src="/assets/icon/苹果 (1).svg" alt="Apple" class="w-8 h-8 mr-3" />
              <div>
                <div class="text-sm text-gray-400">Download on the</div>
                <div class="font-semibold">App Store</div>
              </div>
            </a>
            <a 
              href="#" 
              class="flex items-center p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-300"
              @click.prevent="handleAppDownload('android')"
            >
              <img src="/assets/icon/谷歌商店.svg" alt="Google Store" class="w-8 h-8 mr-3" />
              <div>
                <div class="text-sm text-gray-400">Download on the</div>
                <div class="font-semibold">Google Store</div>
              </div>
            </a>
          </div>
        </div>
      </div>
      
      <!-- 分割线 -->
      <div class="border-t border-gray-700 mt-12 pt-8">
        <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div class="text-gray-400 text-sm">
            © 2024 优购商城. 保留所有权利.
          </div>
          <div class="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
            <a 
              v-for="policy in policies" 
              :key="policy.name"
              href="#" 
              class="text-gray-400 hover:text-tertiary transition-colors duration-300"
              @click.prevent="handlePolicyClick(policy)"
            >
              {{ policy.name }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const quickLinks = [
  { name: '首页', href: '#home', icon: 'fa fa-home' },
  { name: '精选商品', href: '#featured', icon: 'fa fa-star' },
  { name: '商品分类', href: '#categories', icon: 'fa fa-th-large' },
  { name: '新品上市', href: '#new-arrivals', icon: 'fa fa-gift' },
  { name: '特惠活动', href: '#deals', icon: 'fa fa-tag' }
]

const customerServices = [
  { name: '联系客服', icon: '/assets/icon/客服 白.svg', action: 'contact' },
  { name: '退换货政策', icon: 'fa fa-undo', action: 'return-policy' },
  { name: '配送说明', icon: 'fa fa-truck', action: 'shipping' },
  { name: '支付方式', icon: 'fa fa-credit-card', action: 'payment' },
  { name: '常见问题', icon: 'fa fa-question-circle', action: 'faq' }
]

const policies = [
  { name: '隐私政策', action: 'privacy' },
  { name: '使用条款', action: 'terms' },
  { name: 'Cookie政策', action: 'cookie' }
]

const handleLinkClick = (e) => {
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

const handleSocialClick = (platform) => {
  console.log('点击社交媒体:', platform)
  showToast(`${platform}功能开发中...`)
}

const handleServiceClick = (service) => {
  console.log('点击客服功能:', service.name)
  showToast(`${service.name}功能开发中...`)
}

const handleAppDownload = (platform) => {
  console.log('下载APP:', platform)
  showToast(`${platform === 'ios' ? 'iOS' : 'Android'} APP下载功能开发中...`)
}

const handlePolicyClick = (policy) => {
  console.log('查看政策:', policy.name)
  showToast(`${policy.name}功能开发中...`)
}

const showToast = (message) => {
  const toast = document.createElement('div')
  toast.className = 'fixed top-20 right-4 bg-dark text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-all duration-300'
  toast.textContent = message
  document.body.appendChild(toast)
  
  setTimeout(() => {
    toast.style.opacity = '0'
    setTimeout(() => {
      document.body.removeChild(toast)
    }, 300)
  }, 2000)
}
</script>