<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 页面头部 -->
    <div class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center space-x-4">
            <button @click="$router.go(-1)" class="text-gray-600 hover:text-gray-900">
              <i class="fa fa-arrow-left text-lg"></i>
            </button>
            <h1 class="text-xl font-semibold text-gray-900">我的优惠券</h1>
          </div>
          <div class="text-sm text-gray-500">
            共 {{ totalCoupons }} 张优惠券
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <!-- 筛选栏 -->
      <div class="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div class="flex flex-wrap items-center gap-4">
          <!-- 状态筛选 -->
          <div class="flex items-center space-x-2">
            <span class="text-sm font-medium text-gray-700">状态：</span>
            <div class="flex space-x-2">
              <button
                v-for="status in statusOptions"
                :key="status.value"
                @click="selectedStatus = status.value"
                :class="[
                  'px-3 py-1 rounded-full text-sm font-medium transition-colors',
                  selectedStatus === status.value
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                ]"
              >
                {{ status.label }}
              </button>
            </div>
          </div>

          <!-- 类型筛选 -->
          <div class="flex items-center space-x-2">
            <span class="text-sm font-medium text-gray-700">类型：</span>
            <select
              v-model="selectedType"
              class="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">全部类型</option>
              <option value="discount">满减券</option>
              <option value="percentage">折扣券</option>
              <option value="shipping">包邮券</option>
              <option value="newuser">新人券</option>
            </select>
          </div>

          <!-- 搜索 -->
          <div class="flex-1 max-w-md">
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="搜索优惠券名称..."
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
              <i class="fa fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- 优惠券列表 -->
      <div class="space-y-4">
        <div
          v-for="coupon in filteredCoupons"
          :key="coupon.id"
          class="bg-white rounded-lg shadow-sm overflow-hidden"
        >
          <div class="flex">
            <!-- 优惠券左侧 -->
            <div :class="[
              'flex-shrink-0 w-32 flex flex-col items-center justify-center text-white relative',
              coupon.status === 'available' ? 'bg-gradient-to-br from-red-500 to-red-600' :
              coupon.status === 'used' ? 'bg-gray-400' : 'bg-gray-300'
            ]">
              <div class="text-center">
                <div v-if="coupon.type === 'percentage'" class="text-2xl font-bold">
                  {{ coupon.discount }}折
                </div>
                <div v-else-if="coupon.type === 'discount'" class="text-center">
                  <div class="text-lg font-bold">￥{{ coupon.amount }}</div>
                  <div class="text-xs">满{{ coupon.minAmount }}元</div>
                </div>
                <div v-else-if="coupon.type === 'shipping'" class="text-lg font-bold">
                  包邮券
                </div>
                <div v-else class="text-lg font-bold">
                  新人券
                </div>
              </div>
              
              <!-- 圆形缺口装饰 -->
              <div class="absolute -right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-gray-50 rounded-full"></div>
            </div>

            <!-- 优惠券右侧 -->
            <div class="flex-1 p-4">
              <div class="flex justify-between items-start">
                <div class="flex-1">
                  <h3 class="text-lg font-semibold text-gray-900 mb-1">{{ coupon.name }}</h3>
                  <p class="text-sm text-gray-600 mb-2">{{ coupon.description }}</p>
                  
                  <div class="flex items-center space-x-4 text-xs text-gray-500">
                    <span>有效期：{{ formatDate(coupon.startDate) }} - {{ formatDate(coupon.endDate) }}</span>
                    <span v-if="coupon.scope">适用：{{ coupon.scope }}</span>
                  </div>
                  
                  <div v-if="coupon.status === 'expired'" class="mt-2">
                    <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      <i class="fa fa-clock mr-1"></i>
                      已过期
                    </span>
                  </div>
                  
                  <div v-else-if="coupon.status === 'used'" class="mt-2">
                    <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <i class="fa fa-check mr-1"></i>
                      已使用
                    </span>
                  </div>
                </div>

                <!-- 操作按钮 -->
                <div class="flex flex-col space-y-2 ml-4">
                  <button
                    v-if="coupon.status === 'available'"
                    @click="useCoupon(coupon)"
                    class="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors text-sm font-medium"
                  >
                    立即使用
                  </button>
                  
                  <button
                    @click="viewCouponDetails(coupon)"
                    class="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm"
                  >
                    查看详情
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 空状态 -->
      <div v-if="filteredCoupons.length === 0" class="text-center py-12">
        <div class="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <i class="fa fa-ticket-alt text-3xl text-gray-400"></i>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">暂无优惠券</h3>
        <p class="text-gray-500 mb-4">您还没有符合条件的优惠券</p>
        <button
          @click="$router.push('/')"
          class="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
        >
          <i class="fa fa-shopping-bag mr-2"></i>
          去购物
        </button>
      </div>

      <!-- 分页 -->
      <div v-if="totalPages > 1" class="flex justify-center mt-8">
        <nav class="flex items-center space-x-2">
          <button
            @click="currentPage = Math.max(1, currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            上一页
          </button>
          
          <span class="px-3 py-2 text-sm text-gray-700">
            第 {{ currentPage }} 页，共 {{ totalPages }} 页
          </span>
          
          <button
            @click="currentPage = Math.min(totalPages, currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            下一页
          </button>
        </nav>
      </div>
    </div>

    <!-- 优惠券详情弹窗 -->
    <div v-if="showCouponModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click="showCouponModal = false">
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4" @click.stop>
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold">优惠券详情</h3>
          <button @click="showCouponModal = false" class="text-gray-400 hover:text-gray-600">
            <i class="fa fa-times"></i>
          </button>
        </div>
        
        <div v-if="selectedCoupon" class="space-y-4">
          <div>
            <h4 class="font-medium text-gray-900">{{ selectedCoupon.name }}</h4>
            <p class="text-sm text-gray-600 mt-1">{{ selectedCoupon.description }}</p>
          </div>
          
          <div class="border-t pt-4">
            <h5 class="font-medium text-gray-900 mb-2">使用条件</h5>
            <ul class="text-sm text-gray-600 space-y-1">
              <li v-if="selectedCoupon.minAmount">• 订单满 ￥{{ selectedCoupon.minAmount }} 可用</li>
              <li v-if="selectedCoupon.scope">• 适用范围：{{ selectedCoupon.scope }}</li>
              <li>• 有效期：{{ formatDate(selectedCoupon.startDate) }} - {{ formatDate(selectedCoupon.endDate) }}</li>
              <li>• 每人限用 1 次</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CouponsPage',
  data() {
    return {
      selectedStatus: '',
      selectedType: '',
      searchQuery: '',
      currentPage: 1,
      pageSize: 10,
      showCouponModal: false,
      selectedCoupon: null,
      statusOptions: [
        { label: '全部', value: '' },
        { label: '可使用', value: 'available' },
        { label: '已使用', value: 'used' },
        { label: '已过期', value: 'expired' }
      ],
      coupons: [
        {
          id: 1,
          name: '新用户专享优惠券',
          description: '新用户首次购买专享',
          type: 'discount',
          amount: 20,
          minAmount: 100,
          status: 'available',
          startDate: '2024-01-01',
          endDate: '2024-12-31',
          scope: '全场商品'
        },
        {
          id: 2,
          name: '8折优惠券',
          description: '全场商品8折优惠',
          type: 'percentage',
          discount: 8,
          minAmount: 200,
          status: 'available',
          startDate: '2024-01-01',
          endDate: '2024-06-30',
          scope: '全场商品'
        },
        {
          id: 3,
          name: '包邮券',
          description: '免运费优惠券',
          type: 'shipping',
          status: 'used',
          startDate: '2024-01-01',
          endDate: '2024-12-31',
          scope: '全场商品',
          usedDate: '2024-01-15'
        },
        {
          id: 4,
          name: '满减优惠券',
          description: '满300减50优惠券',
          type: 'discount',
          amount: 50,
          minAmount: 300,
          status: 'expired',
          startDate: '2023-12-01',
          endDate: '2023-12-31',
          scope: '服装类商品'
        },
        {
          id: 5,
          name: '电子产品专享券',
          description: '电子产品类专享优惠',
          type: 'discount',
          amount: 100,
          minAmount: 1000,
          status: 'available',
          startDate: '2024-01-01',
          endDate: '2024-03-31',
          scope: '电子产品'
        }
      ]
    }
  },
  computed: {
    filteredCoupons() {
      let filtered = this.coupons
      
      // 状态筛选
      if (this.selectedStatus) {
        filtered = filtered.filter(coupon => coupon.status === this.selectedStatus)
      }
      
      // 类型筛选
      if (this.selectedType) {
        filtered = filtered.filter(coupon => coupon.type === this.selectedType)
      }
      
      // 搜索筛选
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase()
        filtered = filtered.filter(coupon => 
          coupon.name.toLowerCase().includes(query) ||
          coupon.description.toLowerCase().includes(query)
        )
      }
      
      // 分页
      const start = (this.currentPage - 1) * this.pageSize
      const end = start + this.pageSize
      return filtered.slice(start, end)
    },
    totalCoupons() {
      return this.coupons.length
    },
    totalPages() {
      let filtered = this.coupons
      
      if (this.selectedStatus) {
        filtered = filtered.filter(coupon => coupon.status === this.selectedStatus)
      }
      
      if (this.selectedType) {
        filtered = filtered.filter(coupon => coupon.type === this.selectedType)
      }
      
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase()
        filtered = filtered.filter(coupon => 
          coupon.name.toLowerCase().includes(query) ||
          coupon.description.toLowerCase().includes(query)
        )
      }
      
      return Math.ceil(filtered.length / this.pageSize)
    }
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('zh-CN')
    },
    useCoupon(coupon) {
      // 跳转到购物页面并应用优惠券
      this.$router.push({
        path: '/',
        query: { coupon: coupon.id }
      })
    },
    viewCouponDetails(coupon) {
      this.selectedCoupon = coupon
      this.showCouponModal = true
    }
  },
  watch: {
    selectedStatus() {
      this.currentPage = 1
    },
    selectedType() {
      this.currentPage = 1
    },
    searchQuery() {
      this.currentPage = 1
    }
  }
}
</script>

<style scoped>
.bg-primary {
  background-color: #10b981;
}

.bg-primary-dark {
  background-color: #059669;
}

.text-primary {
  color: #10b981;
}

.border-primary {
  border-color: #10b981;
}

.ring-primary {
  --tw-ring-color: #10b981;
}
</style>