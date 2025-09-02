<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 页面头部 -->
    <div class="bg-white shadow-sm border-b">
      <div class="max-w-6xl mx-auto px-4 py-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-dark">物流信息</h1>
            <p class="text-gray-600 mt-1">实时跟踪您的包裹配送状态</p>
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
      <!-- 搜索栏 -->
      <div class="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div class="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div class="relative flex-1 max-w-md">
            <input 
              v-model="trackingNumber"
              type="text" 
              placeholder="请输入订单号或快递单号..."
              class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tertiary focus:border-transparent transition-all duration-300"
              @keyup.enter="searchTracking"
            >
            <i class="fa fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>
          <button 
            @click="searchTracking"
            class="px-6 py-3 bg-tertiary text-white rounded-lg hover:bg-tertiary/80 transition-colors duration-300"
          >
            <i class="fa fa-search mr-2"></i>
            查询物流
          </button>
        </div>
      </div>

      <!-- 快速查询 -->
      <div v-if="recentOrders.length > 0" class="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <h3 class="text-lg font-semibold text-dark mb-4">最近订单</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div 
            v-for="order in recentOrders" 
            :key="order.id"
            @click="selectOrder(order)"
            class="p-4 border border-gray-200 rounded-lg hover:border-tertiary hover:bg-tertiary/5 cursor-pointer transition-all duration-300"
          >
            <div class="flex items-center justify-between mb-2">
              <span class="font-medium text-dark">{{ order.orderNumber }}</span>
              <span class="px-2 py-1 rounded-full text-xs font-medium" :class="getStatusClass(order.status)">
                {{ getStatusLabel(order.status) }}
              </span>
            </div>
            <p class="text-sm text-gray-600 mb-2">{{ order.productName }}</p>
            <p class="text-xs text-gray-500">{{ formatDate(order.createTime) }}</p>
          </div>
        </div>
      </div>

      <!-- 物流详情 -->
      <div v-if="currentTracking" class="space-y-6">
        <!-- 基本信息 -->
        <div class="bg-white rounded-lg shadow-sm border p-6">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- 订单信息 -->
            <div>
              <h3 class="text-lg font-semibold text-dark mb-4">订单信息</h3>
              <div class="space-y-3">
                <div class="flex justify-between">
                  <span class="text-gray-600">订单号：</span>
                  <span class="font-medium">{{ currentTracking.orderNumber }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">快递单号：</span>
                  <span class="font-medium font-mono">{{ currentTracking.trackingNumber }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">快递公司：</span>
                  <span class="font-medium">{{ currentTracking.courier }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">配送状态：</span>
                  <span class="px-2 py-1 rounded-full text-xs font-medium" :class="getStatusClass(currentTracking.status)">
                    {{ getStatusLabel(currentTracking.status) }}
                  </span>
                </div>
              </div>
            </div>
            
            <!-- 配送信息 -->
            <div>
              <h3 class="text-lg font-semibold text-dark mb-4">配送信息</h3>
              <div class="space-y-3">
                <div class="flex justify-between">
                  <span class="text-gray-600">发货地址：</span>
                  <span class="font-medium text-right">{{ currentTracking.senderAddress }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">收货地址：</span>
                  <span class="font-medium text-right">{{ currentTracking.receiverAddress }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">收货人：</span>
                  <span class="font-medium">{{ currentTracking.receiverName }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">联系电话：</span>
                  <span class="font-medium">{{ currentTracking.receiverPhone }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 当前状态 -->
        <div class="bg-white rounded-lg shadow-sm border p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-semibold text-dark">当前状态</h3>
            <button 
              @click="refreshTracking"
              class="flex items-center space-x-2 px-4 py-2 text-tertiary border border-tertiary rounded-lg hover:bg-tertiary hover:text-white transition-all duration-300"
            >
              <i class="fa fa-refresh" :class="{ 'fa-spin': isRefreshing }"></i>
              <span>刷新</span>
            </button>
          </div>
          
          <div class="bg-gradient-to-r from-tertiary/10 to-blue-50 rounded-lg p-6">
            <div class="flex items-center space-x-4">
              <div class="w-16 h-16 bg-tertiary rounded-full flex items-center justify-center">
                <i class="fa fa-truck text-white text-2xl"></i>
              </div>
              <div class="flex-1">
                <h4 class="text-xl font-semibold text-dark mb-2">{{ getCurrentStatusTitle() }}</h4>
                <p class="text-gray-600 mb-2">{{ getCurrentStatusDescription() }}</p>
                <p class="text-sm text-gray-500">
                  <i class="fa fa-clock mr-1"></i>
                  {{ formatDate(currentTracking.lastUpdateTime) }}
                </p>
              </div>
              <div v-if="currentTracking.estimatedDelivery" class="text-right">
                <p class="text-sm text-gray-600 mb-1">预计送达</p>
                <p class="text-lg font-semibold text-tertiary">{{ formatDate(currentTracking.estimatedDelivery) }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 物流轨迹 -->
        <div class="bg-white rounded-lg shadow-sm border p-6">
          <h3 class="text-lg font-semibold text-dark mb-6">物流轨迹</h3>
          
          <div class="relative">
            <!-- 时间轴线 -->
            <div class="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            
            <div class="space-y-6">
              <div 
                v-for="(event, index) in currentTracking.events" 
                :key="index"
                class="relative flex items-start space-x-4"
              >
                <!-- 时间轴节点 -->
                <div class="relative z-10 w-12 h-12 rounded-full flex items-center justify-center" 
                     :class="{
                       'bg-tertiary text-white': index === 0,
                       'bg-green-500 text-white': event.status === 'completed',
                       'bg-blue-500 text-white': event.status === 'in_progress',
                       'bg-gray-300 text-gray-600': event.status === 'pending'
                     }">
                  <i :class="getEventIcon(event.type)" class="text-lg"></i>
                </div>
                
                <!-- 事件内容 -->
                <div class="flex-1 min-w-0 pb-6">
                  <div class="bg-gray-50 rounded-lg p-4">
                    <div class="flex items-center justify-between mb-2">
                      <h4 class="font-semibold text-dark">{{ event.title }}</h4>
                      <span class="text-sm text-gray-500">{{ formatDate(event.time) }}</span>
                    </div>
                    <p class="text-gray-600 mb-2">{{ event.description }}</p>
                    <div class="flex items-center space-x-4 text-sm text-gray-500">
                      <span v-if="event.location">
                        <i class="fa fa-map-marker-alt mr-1"></i>
                        {{ event.location }}
                      </span>
                      <span v-if="event.operator">
                        <i class="fa fa-user mr-1"></i>
                        {{ event.operator }}
                      </span>
                      <span v-if="event.phone">
                        <i class="fa fa-phone mr-1"></i>
                        {{ event.phone }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 配送员信息 -->
        <div v-if="currentTracking.deliveryPerson" class="bg-white rounded-lg shadow-sm border p-6">
          <h3 class="text-lg font-semibold text-dark mb-4">配送员信息</h3>
          <div class="flex items-center space-x-4">
            <div class="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
              <i class="fa fa-user text-gray-600 text-2xl"></i>
            </div>
            <div class="flex-1">
              <h4 class="font-semibold text-dark">{{ currentTracking.deliveryPerson.name }}</h4>
              <p class="text-gray-600">{{ currentTracking.deliveryPerson.company }}</p>
            </div>
            <div class="flex space-x-3">
              <button 
                @click="callDeliveryPerson"
                class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300"
              >
                <i class="fa fa-phone mr-2"></i>
                联系配送员
              </button>
              <button 
                @click="trackRealTime"
                class="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-300"
              >
                <i class="fa fa-map mr-2"></i>
                实时位置
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 空状态 -->
      <div v-if="!currentTracking && !isLoading" class="bg-white rounded-lg shadow-sm border p-12 text-center">
        <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <i class="fa fa-search text-gray-400 text-3xl"></i>
        </div>
        <h3 class="text-lg font-semibold text-gray-600 mb-2">请输入订单号或快递单号</h3>
        <p class="text-gray-500">输入完整的订单号或快递单号来查询物流信息</p>
      </div>

      <!-- 加载状态 -->
      <div v-if="isLoading" class="bg-white rounded-lg shadow-sm border p-12 text-center">
        <div class="w-16 h-16 border-4 border-tertiary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p class="text-gray-600">正在查询物流信息...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const trackingNumber = ref('')
const currentTracking = ref(null)
const isLoading = ref(false)
const isRefreshing = ref(false)

// 最近订单数据
const recentOrders = ref([
  {
    id: 1,
    orderNumber: 'PD202401150001',
    productName: 'iPhone 14 Pro Max 256GB',
    status: 'shipped',
    createTime: new Date('2024-01-15 14:30:00')
  },
  {
    id: 2,
    orderNumber: 'PD202401120002',
    productName: 'Nike Air Max 270 运动鞋',
    status: 'processing',
    createTime: new Date('2024-01-12 10:15:00')
  },
  {
    id: 3,
    orderNumber: 'PD202401080004',
    productName: 'MacBook Pro 14英寸 M2芯片',
    status: 'completed',
    createTime: new Date('2024-01-08 11:20:00')
  }
])

// 模拟物流数据
const mockTrackingData = {
  'PD202401150001': {
    orderNumber: 'PD202401150001',
    trackingNumber: 'SF1234567890123',
    courier: '顺丰速运',
    status: 'shipped',
    senderAddress: '广东省深圳市南山区科技园',
    receiverAddress: '北京市朝阳区建国门外大街1号',
    receiverName: '张三',
    receiverPhone: '138****8888',
    lastUpdateTime: new Date('2024-01-17 14:30:00'),
    estimatedDelivery: new Date('2024-01-18 18:00:00'),
    deliveryPerson: {
      name: '李师傅',
      company: '顺丰速运',
      phone: '139****9999'
    },
    events: [
      {
        type: 'out_for_delivery',
        status: 'in_progress',
        title: '正在派送',
        description: '您的快件正在派送中，配送员李师傅将为您送达',
        time: new Date('2024-01-17 14:30:00'),
        location: '北京市朝阳区建国门外大街派送点',
        operator: '李师傅',
        phone: '139****9999'
      },
      {
        type: 'arrived_at_destination',
        status: 'completed',
        title: '到达目的地',
        description: '快件已到达北京朝阳区建国门外大街派送点',
        time: new Date('2024-01-17 08:20:00'),
        location: '北京市朝阳区建国门外大街派送点'
      },
      {
        type: 'in_transit',
        status: 'completed',
        title: '运输中',
        description: '快件正在从北京转运中心发往目的地',
        time: new Date('2024-01-16 22:15:00'),
        location: '北京转运中心'
      },
      {
        type: 'arrived_at_hub',
        status: 'completed',
        title: '到达转运中心',
        description: '快件已到达北京转运中心',
        time: new Date('2024-01-16 18:30:00'),
        location: '北京转运中心'
      },
      {
        type: 'shipped',
        status: 'completed',
        title: '已发货',
        description: '商家已发货，快件已交给顺丰速运',
        time: new Date('2024-01-16 09:00:00'),
        location: '广东省深圳市南山区科技园',
        operator: '商家'
      },
      {
        type: 'order_placed',
        status: 'completed',
        title: '订单已下单',
        description: '您的订单已成功下单，商家正在准备发货',
        time: new Date('2024-01-15 14:30:00'),
        location: '线上下单'
      }
    ]
  },
  'PD202401120002': {
    orderNumber: 'PD202401120002',
    trackingNumber: 'YT9876543210987',
    courier: '圆通速递',
    status: 'processing',
    senderAddress: '福建省泉州市晋江市',
    receiverAddress: '上海市浦东新区陆家嘴金融区',
    receiverName: '李四',
    receiverPhone: '136****6666',
    lastUpdateTime: new Date('2024-01-13 16:45:00'),
    estimatedDelivery: new Date('2024-01-15 12:00:00'),
    events: [
      {
        type: 'processing',
        status: 'in_progress',
        title: '商家处理中',
        description: '商家正在准备您的商品，预计今日发货',
        time: new Date('2024-01-13 16:45:00'),
        location: '福建省泉州市晋江市',
        operator: '商家'
      },
      {
        type: 'order_placed',
        status: 'completed',
        title: '订单已下单',
        description: '您的订单已成功下单，商家将尽快处理',
        time: new Date('2024-01-12 10:15:00'),
        location: '线上下单'
      }
    ]
  }
}

// 搜索物流信息
const searchTracking = async () => {
  if (!trackingNumber.value.trim()) {
    showToast('请输入订单号或快递单号', 'error')
    return
  }
  
  isLoading.value = true
  
  try {
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const tracking = mockTrackingData[trackingNumber.value.trim()]
    if (tracking) {
      currentTracking.value = tracking
      showToast('查询成功')
    } else {
      currentTracking.value = null
      showToast('未找到相关物流信息，请检查订单号是否正确', 'error')
    }
  } catch (error) {
    console.error('查询物流信息失败:', error)
    showToast('查询失败，请稍后重试', 'error')
  } finally {
    isLoading.value = false
  }
}

// 选择订单
const selectOrder = (order) => {
  trackingNumber.value = order.orderNumber
  searchTracking()
}

// 刷新物流信息
const refreshTracking = async () => {
  if (!currentTracking.value) return
  
  isRefreshing.value = true
  
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 模拟更新最后更新时间
    currentTracking.value.lastUpdateTime = new Date()
    showToast('刷新成功')
  } catch (error) {
    console.error('刷新失败:', error)
    showToast('刷新失败，请稍后重试', 'error')
  } finally {
    isRefreshing.value = false
  }
}

// 获取状态样式
const getStatusClass = (status) => {
  const statusClasses = {
    pending_payment: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    shipped: 'bg-purple-100 text-purple-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-gray-100 text-gray-800'
  }
  return statusClasses[status] || 'bg-gray-100 text-gray-800'
}

// 获取状态标签
const getStatusLabel = (status) => {
  const statusLabels = {
    pending_payment: '待付款',
    processing: '待发货',
    shipped: '配送中',
    completed: '已完成',
    cancelled: '已取消'
  }
  return statusLabels[status] || status
}

// 获取事件图标
const getEventIcon = (type) => {
  const iconMap = {
    order_placed: 'fa fa-shopping-cart',
    processing: 'fa fa-cog',
    shipped: 'fa fa-truck',
    in_transit: 'fa fa-road',
    arrived_at_hub: 'fa fa-building',
    arrived_at_destination: 'fa fa-map-marker-alt',
    out_for_delivery: 'fa fa-motorcycle',
    delivered: 'fa fa-check-circle'
  }
  return iconMap[type] || 'fa fa-circle'
}

// 获取当前状态标题
const getCurrentStatusTitle = () => {
  if (!currentTracking.value) return ''
  
  const latestEvent = currentTracking.value.events[0]
  return latestEvent ? latestEvent.title : '状态未知'
}

// 获取当前状态描述
const getCurrentStatusDescription = () => {
  if (!currentTracking.value) return ''
  
  const latestEvent = currentTracking.value.events[0]
  return latestEvent ? latestEvent.description : '暂无详细信息'
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

// 联系配送员
const callDeliveryPerson = () => {
  if (currentTracking.value?.deliveryPerson?.phone) {
    showToast(`正在拨打 ${currentTracking.value.deliveryPerson.phone}`)
  }
}

// 实时位置跟踪
const trackRealTime = () => {
  showToast('正在打开实时位置跟踪')
}

const showToast = (message, type = 'success') => {
  const toast = document.createElement('div')
  const bgColor = type === 'error' ? 'bg-red-500' : 'bg-green-500'
  toast.className = `fixed top-20 right-4 ${bgColor} text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-all duration-300`
  toast.textContent = message
  document.body.appendChild(toast)
  
  setTimeout(() => {
    toast.style.opacity = '0'
    setTimeout(() => {
      document.body.removeChild(toast)
    }, 300)
  }, 3000)
}

// 页面加载时检查路由参数
onMounted(() => {
  const orderNumber = router.currentRoute.value.query.order
  if (orderNumber) {
    trackingNumber.value = orderNumber
    searchTracking()
  }
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>