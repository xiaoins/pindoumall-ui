<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 页面头部 -->
    <div class="bg-white shadow-sm border-b">
      <div class="max-w-6xl mx-auto px-4 py-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-dark">我的订单</h1>
            <p class="text-gray-600 mt-1">查看和管理您的所有订单</p>
          </div>
          <button 
            @click="$router.go(-1)"
            class="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-tertiary transition-colors duration-300"
          >
            <i class="fa fa-arrow-left"></i>
            <span>返回</span>
          </button>
        </div>
      </div>
    </div>

    <div class="max-w-6xl mx-auto px-4 py-8">
      <!-- 订单状态导航 -->
      <div class="bg-white rounded-lg shadow-sm border mb-6">
        <div class="flex overflow-x-auto">
          <button 
            v-for="status in orderStatuses" 
            :key="status.key"
            @click="activeStatus = status.key"
            class="flex-shrink-0 px-6 py-4 text-center border-b-2 transition-all duration-300 min-w-0"
            :class="{
              'border-tertiary text-tertiary bg-tertiary/5': activeStatus === status.key,
              'border-transparent text-gray-600 hover:text-tertiary hover:bg-gray-50': activeStatus !== status.key
            }"
          >
            <div class="flex flex-col items-center space-y-1">
              <i :class="status.icon" class="text-lg"></i>
              <span class="text-sm font-medium">{{ status.label }}</span>
              <span class="text-xs text-gray-500">({{ getOrderCountByStatus(status.key) }})</span>
            </div>
          </button>
        </div>
      </div>

      <!-- 搜索和筛选 -->
      <div class="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 flex-1">
            <!-- 搜索框 -->
            <div class="relative flex-1 max-w-md">
              <input 
                v-model="searchQuery"
                type="text" 
                placeholder="搜索订单号、商品名称..."
                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tertiary focus:border-transparent transition-all duration-300"
              >
              <i class="fa fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
            
            <!-- 时间筛选 -->
            <select 
              v-model="timeFilter"
              class="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tertiary focus:border-transparent transition-all duration-300"
            >
              <option value="all">全部时间</option>
              <option value="week">最近一周</option>
              <option value="month">最近一月</option>
              <option value="quarter">最近三月</option>
              <option value="year">最近一年</option>
            </select>
            
            <!-- 金额筛选 -->
            <select 
              v-model="amountFilter"
              class="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tertiary focus:border-transparent transition-all duration-300"
            >
              <option value="all">全部金额</option>
              <option value="0-100">¥0-100</option>
              <option value="100-500">¥100-500</option>
              <option value="500-1000">¥500-1000</option>
              <option value="1000+">¥1000以上</option>
            </select>
          </div>
          
          <div class="flex items-center space-x-3">
            <span class="text-sm text-gray-600">共 {{ filteredOrders.length }} 个订单</span>
          </div>
        </div>
      </div>

      <!-- 订单列表 -->
      <div class="space-y-4">
        <div 
          v-for="order in paginatedOrders" 
          :key="order.id"
          class="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow duration-300"
        >
          <!-- 订单头部 -->
          <div class="px-6 py-4 border-b bg-gray-50">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
              <div class="flex items-center space-x-4">
                <span class="text-sm text-gray-600">订单号：</span>
                <span class="font-mono text-sm font-medium">{{ order.orderNumber }}</span>
                <span class="px-2 py-1 rounded-full text-xs font-medium" :class="getStatusClass(order.status)">
                  {{ getStatusLabel(order.status) }}
                </span>
              </div>
              <div class="flex items-center space-x-4 text-sm text-gray-600">
                <span>下单时间：{{ formatDate(order.createTime) }}</span>
                <span class="text-lg font-bold text-tertiary">¥{{ order.totalAmount }}</span>
              </div>
            </div>
          </div>
          
          <!-- 商品列表 -->
          <div class="p-6">
            <div class="space-y-4">
              <div 
                v-for="item in order.items" 
                :key="item.id"
                class="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-300"
              >
                <!-- 商品图片 -->
                <div class="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  <img 
                    :src="item.image" 
                    :alt="item.name"
                    class="w-full h-full object-cover"
                  >
                </div>
                
                <!-- 商品信息 -->
                <div class="flex-1 min-w-0">
                  <h3 class="text-lg font-semibold text-dark hover:text-tertiary cursor-pointer transition-colors duration-300">
                    {{ item.name }}
                  </h3>
                  <p class="text-gray-600 text-sm mt-1">{{ item.specs }}</p>
                  <div class="flex items-center space-x-4 mt-2">
                    <span class="text-tertiary font-semibold">¥{{ item.price }}</span>
                    <span class="text-gray-500 text-sm">x{{ item.quantity }}</span>
                  </div>
                </div>
                
                <!-- 操作按钮 -->
                <div class="flex flex-col space-y-2">
                  <button 
                    @click="viewProduct(item)"
                    class="px-4 py-2 text-sm border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors duration-300"
                  >
                    查看商品
                  </button>
                  <button 
                    v-if="order.status === 'completed'"
                    @click="reviewProduct(item)"
                    class="px-4 py-2 text-sm bg-tertiary text-white rounded-lg hover:bg-tertiary/80 transition-colors duration-300"
                  >
                    评价商品
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 订单操作 -->
          <div class="px-6 py-4 border-t bg-gray-50">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
              <div class="flex items-center space-x-4 text-sm text-gray-600">
                <span v-if="order.payTime">付款时间：{{ formatDate(order.payTime) }}</span>
                <span v-if="order.shipTime">发货时间：{{ formatDate(order.shipTime) }}</span>
                <span v-if="order.deliveryTime">送达时间：{{ formatDate(order.deliveryTime) }}</span>
              </div>
              
              <div class="flex items-center space-x-3">
                <button 
                  @click="viewOrderDetail(order)"
                  class="px-4 py-2 text-sm border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors duration-300"
                >
                  订单详情
                </button>
                
                <button 
                  v-if="order.status === 'pending_payment'"
                  @click="payOrder(order)"
                  class="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
                >
                  立即付款
                </button>
                
                <button 
                  v-if="order.status === 'pending_payment'"
                  @click="cancelOrder(order)"
                  class="px-4 py-2 text-sm border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors duration-300"
                >
                  取消订单
                </button>
                
                <button 
                  v-if="order.status === 'shipped'"
                  @click="confirmReceived(order)"
                  class="px-4 py-2 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300"
                >
                  确认收货
                </button>
                
                <button 
                  v-if="order.status === 'shipped' || order.status === 'processing'"
                  @click="trackOrder(order)"
                  class="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
                >
                  查看物流
                </button>
                
                <button 
                  v-if="order.status === 'completed' && canRefund(order)"
                  @click="requestRefund(order)"
                  class="px-4 py-2 text-sm border border-orange-300 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors duration-300"
                >
                  申请退款
                </button>
                
                <button 
                  v-if="order.status === 'completed'"
                  @click="buyAgain(order)"
                  class="px-4 py-2 text-sm bg-tertiary text-white rounded-lg hover:bg-tertiary/80 transition-colors duration-300"
                >
                  再次购买
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 空状态 -->
      <div v-if="filteredOrders.length === 0" class="bg-white rounded-lg shadow-sm border p-12 text-center">
        <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <i class="fa fa-shopping-bag text-gray-400 text-3xl"></i>
        </div>
        <h3 class="text-lg font-semibold text-gray-600 mb-2">暂无相关订单</h3>
        <p class="text-gray-500 mb-6">您还没有符合条件的订单</p>
        <button 
          @click="$router.push('/')"
          class="px-6 py-3 bg-tertiary text-white rounded-lg hover:bg-tertiary/80 transition-colors duration-300"
        >
          去购物
        </button>
      </div>

      <!-- 分页 -->
      <div v-if="filteredOrders.length > itemsPerPage" class="mt-6 flex justify-center">
        <div class="flex items-center space-x-2">
          <button 
            @click="currentPage = Math.max(1, currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors duration-300"
          >
            <i class="fa fa-chevron-left"></i>
          </button>
          
          <span class="px-4 py-2 text-sm text-gray-600">
            第 {{ currentPage }} 页，共 {{ totalPages }} 页
          </span>
          
          <button 
            @click="currentPage = Math.min(totalPages, currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors duration-300"
          >
            <i class="fa fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const activeStatus = ref('all')
const searchQuery = ref('')
const timeFilter = ref('all')
const amountFilter = ref('all')
const currentPage = ref(1)
const itemsPerPage = ref(5)

// 订单状态配置
const orderStatuses = [
  { key: 'all', label: '全部订单', icon: 'fa fa-list' },
  { key: 'pending_payment', label: '待付款', icon: 'fa fa-clock' },
  { key: 'processing', label: '待发货', icon: 'fa fa-box' },
  { key: 'shipped', label: '待收货', icon: 'fa fa-truck' },
  { key: 'completed', label: '已完成', icon: 'fa fa-check-circle' },
  { key: 'cancelled', label: '已取消', icon: 'fa fa-times-circle' },
  { key: 'refunded', label: '已退款', icon: 'fa fa-undo' }
]

// 模拟订单数据
const ordersData = ref([
  {
    id: 1,
    orderNumber: 'PD202401150001',
    status: 'completed',
    totalAmount: 8999,
    createTime: new Date('2024-01-15 14:30:00'),
    payTime: new Date('2024-01-15 14:35:00'),
    shipTime: new Date('2024-01-16 09:00:00'),
    deliveryTime: new Date('2024-01-18 16:20:00'),
    items: [
      {
        id: 1,
        name: 'iPhone 14 Pro Max 256GB 深空黑色',
        specs: '深空黑色 / 256GB',
        price: 8999,
        quantity: 1,
        image: 'https://via.placeholder.com/80x80?text=iPhone'
      }
    ]
  },
  {
    id: 2,
    orderNumber: 'PD202401120002',
    status: 'shipped',
    totalAmount: 1598,
    createTime: new Date('2024-01-12 10:15:00'),
    payTime: new Date('2024-01-12 10:20:00'),
    shipTime: new Date('2024-01-13 15:30:00'),
    items: [
      {
        id: 2,
        name: 'Nike Air Max 270 运动鞋',
        specs: '白色 / 42码',
        price: 899,
        quantity: 1,
        image: 'https://via.placeholder.com/80x80?text=Nike'
      },
      {
        id: 3,
        name: '小米空气净化器Pro H',
        specs: '白色',
        price: 699,
        quantity: 1,
        image: 'https://via.placeholder.com/80x80?text=Xiaomi'
      }
    ]
  },
  {
    id: 3,
    orderNumber: 'PD202401100003',
    status: 'pending_payment',
    totalAmount: 1167,
    createTime: new Date('2024-01-10 16:45:00'),
    items: [
      {
        id: 4,
        name: '《深度学习》花书 中文版',
        specs: '平装版',
        price: 168,
        quantity: 1,
        image: 'https://via.placeholder.com/80x80?text=Book'
      },
      {
        id: 5,
        name: 'YONEX 尤尼克斯羽毛球拍',
        specs: '红色 / 4U',
        price: 599,
        quantity: 1,
        image: 'https://via.placeholder.com/80x80?text=YONEX'
      },
      {
        id: 6,
        name: 'IKEA 宜家 书桌椅套装',
        specs: '白色',
        price: 400,
        quantity: 1,
        image: 'https://via.placeholder.com/80x80?text=IKEA'
      }
    ]
  },
  {
    id: 4,
    orderNumber: 'PD202401080004',
    status: 'processing',
    totalAmount: 15999,
    createTime: new Date('2024-01-08 11:20:00'),
    payTime: new Date('2024-01-08 11:25:00'),
    items: [
      {
        id: 7,
        name: 'MacBook Pro 14英寸 M2芯片',
        specs: '深空灰色 / 512GB',
        price: 15999,
        quantity: 1,
        image: 'https://via.placeholder.com/80x80?text=MacBook'
      }
    ]
  },
  {
    id: 5,
    orderNumber: 'PD202401050005',
    status: 'cancelled',
    totalAmount: 299,
    createTime: new Date('2024-01-05 09:30:00'),
    items: [
      {
        id: 8,
        name: 'Uniqlo 优衣库 羊毛衫',
        specs: '黑色 / L码',
        price: 299,
        quantity: 1,
        image: 'https://via.placeholder.com/80x80?text=Uniqlo'
      }
    ]
  }
])

// 筛选后的订单
const filteredOrders = computed(() => {
  let filtered = ordersData.value
  
  // 状态筛选
  if (activeStatus.value !== 'all') {
    filtered = filtered.filter(order => order.status === activeStatus.value)
  }
  
  // 搜索筛选
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(order => 
      order.orderNumber.toLowerCase().includes(query) ||
      order.items.some(item => item.name.toLowerCase().includes(query))
    )
  }
  
  // 时间筛选
  if (timeFilter.value !== 'all') {
    const now = new Date()
    filtered = filtered.filter(order => {
      const diffTime = now - order.createTime
      const diffDays = diffTime / (1000 * 60 * 60 * 24)
      
      switch (timeFilter.value) {
        case 'week':
          return diffDays <= 7
        case 'month':
          return diffDays <= 30
        case 'quarter':
          return diffDays <= 90
        case 'year':
          return diffDays <= 365
        default:
          return true
      }
    })
  }
  
  // 金额筛选
  if (amountFilter.value !== 'all') {
    filtered = filtered.filter(order => {
      const amount = order.totalAmount
      switch (amountFilter.value) {
        case '0-100':
          return amount >= 0 && amount <= 100
        case '100-500':
          return amount > 100 && amount <= 500
        case '500-1000':
          return amount > 500 && amount <= 1000
        case '1000+':
          return amount > 1000
        default:
          return true
      }
    })
  }
  
  // 按创建时间倒序排列
  return filtered.sort((a, b) => b.createTime - a.createTime)
})

// 分页后的订单
const paginatedOrders = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredOrders.value.slice(start, end)
})

// 总页数
const totalPages = computed(() => {
  return Math.ceil(filteredOrders.value.length / itemsPerPage.value)
})

// 获取各状态订单数量
const getOrderCountByStatus = (status) => {
  if (status === 'all') {
    return ordersData.value.length
  }
  return ordersData.value.filter(order => order.status === status).length
}

// 获取状态样式
const getStatusClass = (status) => {
  const statusClasses = {
    pending_payment: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    shipped: 'bg-purple-100 text-purple-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-gray-100 text-gray-800',
    refunded: 'bg-orange-100 text-orange-800'
  }
  return statusClasses[status] || 'bg-gray-100 text-gray-800'
}

// 获取状态标签
const getStatusLabel = (status) => {
  const statusLabels = {
    pending_payment: '待付款',
    processing: '待发货',
    shipped: '待收货',
    completed: '已完成',
    cancelled: '已取消',
    refunded: '已退款'
  }
  return statusLabels[status] || status
}

// 格式化日期
const formatDate = (date) => {
  if (!date) return ''
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// 是否可以退款
const canRefund = (order) => {
  if (!order.deliveryTime) return false
  const diffTime = new Date() - order.deliveryTime
  const diffDays = diffTime / (1000 * 60 * 60 * 24)
  return diffDays <= 7 // 7天内可退款
}

// 查看商品
const viewProduct = (item) => {
  console.log('查看商品:', item.name)
  showToast('跳转到商品详情页')
}

// 评价商品
const reviewProduct = (item) => {
  console.log('评价商品:', item.name)
  showToast('跳转到商品评价页')
}

// 查看订单详情
const viewOrderDetail = (order) => {
  console.log('查看订单详情:', order.orderNumber)
  showToast('跳转到订单详情页')
}

// 付款
const payOrder = (order) => {
  console.log('付款订单:', order.orderNumber)
  showToast('跳转到付款页面')
}

// 取消订单
const cancelOrder = (order) => {
  if (confirm(`确定要取消订单 ${order.orderNumber} 吗？`)) {
    order.status = 'cancelled'
    showToast('订单已取消')
  }
}

// 确认收货
const confirmReceived = (order) => {
  if (confirm(`确定已收到订单 ${order.orderNumber} 的商品吗？`)) {
    order.status = 'completed'
    order.deliveryTime = new Date()
    showToast('确认收货成功')
  }
}

// 查看物流
const trackOrder = (order) => {
  console.log('查看物流:', order.orderNumber)
  router.push('/logistics')
}

// 申请退款
const requestRefund = (order) => {
  console.log('申请退款:', order.orderNumber)
  showToast('跳转到退款申请页')
}

// 再次购买
const buyAgain = (order) => {
  console.log('再次购买:', order.orderNumber)
  showToast('商品已加入购物车')
}

const showToast = (message) => {
  const toast = document.createElement('div')
  toast.className = 'fixed top-20 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-all duration-300'
  toast.textContent = message
  document.body.appendChild(toast)
  
  setTimeout(() => {
    toast.style.opacity = '0'
    setTimeout(() => {
      document.body.removeChild(toast)
    }, 300)
  }, 2000)
}

// 监听筛选条件变化，重置页码
watch([activeStatus, searchQuery, timeFilter, amountFilter], () => {
  currentPage.value = 1
})
</script>

<style scoped>
/* 自定义样式 */
</style>