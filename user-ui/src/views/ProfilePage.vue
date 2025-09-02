<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 页面头部 -->
    <div class="bg-white shadow-sm border-b">
      <div class="max-w-4xl mx-auto px-4 py-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-dark">个人资料</h1>
            <p class="text-gray-600 mt-1">管理您的个人信息和账户设置</p>
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

    <div class="max-w-4xl mx-auto px-4 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- 左侧导航 -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow-sm border">
            <div class="p-6">
              <h3 class="text-lg font-semibold text-dark mb-4">设置菜单</h3>
              <nav class="space-y-2">
                <button 
                  v-for="tab in tabs" 
                  :key="tab.id"
                  @click="activeTab = tab.id"
                  class="w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-all duration-300"
                  :class="{
                    'bg-tertiary text-white': activeTab === tab.id,
                    'text-gray-700 hover:bg-gray-50': activeTab !== tab.id
                  }"
                >
                  <span class="font-medium">{{ tab.name }}</span>
                </button>
              </nav>
            </div>
          </div>
        </div>

        <!-- 右侧内容 -->
        <div class="lg:col-span-2">
          <!-- 基本信息 -->
          <div v-if="activeTab === 'basic'" class="bg-white rounded-lg shadow-sm border">
            <div class="p-6 border-b">
              <h3 class="text-lg font-semibold text-dark">基本信息</h3>
              <p class="text-gray-600 mt-1">更新您的个人基本信息</p>
            </div>
            <div class="p-6">
              <!-- 头像上传 -->
              <div class="flex items-center space-x-6 mb-8">
                <div class="relative">
                  <div class="w-24 h-24 bg-gradient-to-br from-tertiary to-secondary rounded-full flex items-center justify-center text-white text-2xl font-bold overflow-hidden">
                    <img v-if="userInfo.avatar" :src="userInfo.avatar" alt="头像" class="w-full h-full object-cover" />
                    <span v-else>{{ userInfo.name.charAt(0) }}</span>
                  </div>
                  <button 
                    @click="triggerFileUpload"
                    class="absolute -bottom-2 -right-2 w-8 h-8 bg-tertiary text-white rounded-full flex items-center justify-center hover:bg-tertiary/80 transition-colors duration-300"
                  >
                    <i class="fa fa-camera text-sm"></i>
                  </button>
                  <input 
                    ref="fileInput"
                    type="file" 
                    accept="image/*" 
                    @change="handleAvatarUpload"
                    class="hidden"
                  />
                </div>
                <div>
                  <h4 class="text-lg font-semibold text-dark">{{ userInfo.name }}</h4>
                  <p class="text-gray-600">{{ userInfo.email }}</p>
                  <button 
                    @click="triggerFileUpload"
                    class="text-tertiary hover:text-tertiary/80 text-sm mt-2 transition-colors duration-300"
                  >
                    更换头像
                  </button>
                </div>
              </div>

              <!-- 表单 -->
              <form @submit.prevent="saveBasicInfo" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">姓名</label>
                    <input 
                      v-model="userInfo.name"
                      type="text" 
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tertiary focus:border-transparent transition-all duration-300"
                      placeholder="请输入您的姓名"
                    >
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">昵称</label>
                    <input 
                      v-model="userInfo.nickname"
                      type="text" 
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tertiary focus:border-transparent transition-all duration-300"
                      placeholder="请输入您的昵称"
                    >
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">手机号</label>
                    <input 
                      v-model="userInfo.phone"
                      type="tel" 
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tertiary focus:border-transparent transition-all duration-300"
                      placeholder="请输入您的手机号"
                    >
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">性别</label>
                    <select 
                      v-model="userInfo.gender"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tertiary focus:border-transparent transition-all duration-300"
                    >
                      <option value="">请选择性别</option>
                      <option value="male">男</option>
                      <option value="female">女</option>
                      <option value="other">其他</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">生日</label>
                    <input 
                      v-model="userInfo.birthday"
                      type="date" 
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tertiary focus:border-transparent transition-all duration-300"
                    >
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">职业</label>
                    <input 
                      v-model="userInfo.occupation"
                      type="text" 
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tertiary focus:border-transparent transition-all duration-300"
                      placeholder="请输入您的职业"
                    >
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">个人简介</label>
                  <textarea 
                    v-model="userInfo.bio"
                    rows="4" 
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tertiary focus:border-transparent transition-all duration-300"
                    placeholder="介绍一下您自己..."
                  ></textarea>
                </div>
                <div class="flex justify-end">
                  <button 
                    type="submit"
                    class="px-6 py-3 bg-tertiary text-white rounded-lg hover:bg-tertiary/80 transition-colors duration-300 font-medium"
                  >
                    保存更改
                  </button>
                </div>
              </form>
            </div>
          </div>

          <!-- 账户安全 -->
          <div v-if="activeTab === 'security'" class="bg-white rounded-lg shadow-sm border">
            <div class="p-6 border-b">
              <h3 class="text-lg font-semibold text-dark">账户安全</h3>
              <p class="text-gray-600 mt-1">管理您的密码和安全设置</p>
            </div>
            <div class="p-6 space-y-6">
              <!-- 修改密码 -->
              <div class="border rounded-lg p-6">
                <h4 class="text-lg font-semibold text-dark mb-4">修改密码</h4>
                <form @submit.prevent="changePassword" class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">当前密码</label>
                    <input 
                      v-model="passwordForm.currentPassword"
                      type="password" 
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tertiary focus:border-transparent transition-all duration-300"
                      placeholder="请输入当前密码"
                    >
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">新密码</label>
                    <input 
                      v-model="passwordForm.newPassword"
                      type="password" 
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tertiary focus:border-transparent transition-all duration-300"
                      placeholder="请输入新密码"
                    >
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">确认新密码</label>
                    <input 
                      v-model="passwordForm.confirmPassword"
                      type="password" 
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tertiary focus:border-transparent transition-all duration-300"
                      placeholder="请再次输入新密码"
                    >
                  </div>
                  <button 
                    type="submit"
                    class="px-6 py-3 bg-tertiary text-white rounded-lg hover:bg-tertiary/80 transition-colors duration-300 font-medium"
                  >
                    更新密码
                  </button>
                </form>
              </div>

              <!-- 两步验证 -->
              <div class="border rounded-lg p-6">
                <div class="flex items-center justify-between mb-4">
                  <div>
                    <h4 class="text-lg font-semibold text-dark">两步验证</h4>
                    <p class="text-gray-600 text-sm">为您的账户添加额外的安全保护</p>
                  </div>
                  <div class="flex items-center">
                    <input 
                      v-model="securitySettings.twoFactorEnabled"
                      type="checkbox" 
                      class="w-5 h-5 text-tertiary border-gray-300 rounded focus:ring-tertiary"
                    >
                    <label class="ml-2 text-sm text-gray-700">启用</label>
                  </div>
                </div>
                <p class="text-sm text-gray-500">启用两步验证后，登录时需要输入手机验证码</p>
              </div>

              <!-- 登录设备 -->
              <div class="border rounded-lg p-6">
                <h4 class="text-lg font-semibold text-dark mb-4">登录设备</h4>
                <div class="space-y-4">
                  <div v-for="device in loginDevices" :key="device.id" class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div class="flex items-center space-x-3">
                      <i :class="device.icon" class="text-gray-600 text-xl"></i>
                      <div>
                        <h5 class="font-medium text-dark">{{ device.name }}</h5>
                        <p class="text-sm text-gray-600">{{ device.location }} • {{ device.lastActive }}</p>
                      </div>
                    </div>
                    <div class="flex items-center space-x-2">
                      <span v-if="device.current" class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">当前设备</span>
                      <button v-else class="text-red-600 hover:text-red-800 text-sm transition-colors duration-300">
                        移除
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 隐私设置 -->
          <div v-if="activeTab === 'privacy'" class="bg-white rounded-lg shadow-sm border">
            <div class="p-6 border-b">
              <h3 class="text-lg font-semibold text-dark">隐私设置</h3>
              <p class="text-gray-600 mt-1">控制您的隐私和数据使用偏好</p>
            </div>
            <div class="p-6 space-y-6">
              <div v-for="setting in privacySettings" :key="setting.id" class="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 class="font-medium text-dark">{{ setting.title }}</h4>
                  <p class="text-sm text-gray-600 mt-1">{{ setting.description }}</p>
                </div>
                <div class="flex items-center">
                  <input 
                    v-model="setting.enabled"
                    type="checkbox" 
                    class="w-5 h-5 text-tertiary border-gray-300 rounded focus:ring-tertiary"
                  >
                  <label class="ml-2 text-sm text-gray-700">{{ setting.enabled ? '启用' : '禁用' }}</label>
                </div>
              </div>
            </div>
          </div>

          <!-- 通知设置 -->
          <div v-if="activeTab === 'notifications'" class="bg-white rounded-lg shadow-sm border">
            <div class="p-6 border-b">
              <h3 class="text-lg font-semibold text-dark">通知设置</h3>
              <p class="text-gray-600 mt-1">管理您接收通知的方式和频率</p>
            </div>
            <div class="p-6 space-y-6">
              <div v-for="notification in notificationSettings" :key="notification.id" class="border rounded-lg p-4">
                <div class="flex items-center justify-between mb-3">
                  <h4 class="font-medium text-dark">{{ notification.title }}</h4>
                  <div class="flex items-center">
                    <input 
                      v-model="notification.enabled"
                      type="checkbox" 
                      class="w-5 h-5 text-tertiary border-gray-300 rounded focus:ring-tertiary"
                    >
                    <label class="ml-2 text-sm text-gray-700">启用</label>
                  </div>
                </div>
                <p class="text-sm text-gray-600 mb-3">{{ notification.description }}</p>
                <div v-if="notification.enabled" class="space-y-2">
                  <div class="flex items-center space-x-4">
                    <label class="flex items-center">
                      <input 
                        v-model="notification.methods"
                        type="checkbox" 
                        value="email"
                        class="w-4 h-4 text-tertiary border-gray-300 rounded focus:ring-tertiary"
                      >
                      <span class="ml-2 text-sm text-gray-700">邮件</span>
                    </label>
                    <label class="flex items-center">
                      <input 
                        v-model="notification.methods"
                        type="checkbox" 
                        value="sms"
                        class="w-4 h-4 text-tertiary border-gray-300 rounded focus:ring-tertiary"
                      >
                      <span class="ml-2 text-sm text-gray-700">短信</span>
                    </label>
                    <label class="flex items-center">
                      <input 
                        v-model="notification.methods"
                        type="checkbox" 
                        value="push"
                        class="w-4 h-4 text-tertiary border-gray-300 rounded focus:ring-tertiary"
                      >
                      <span class="ml-2 text-sm text-gray-700">推送</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('basic')
const fileInput = ref(null)

const tabs = [
  { id: 'basic', name: '基本信息' },
  { id: 'security', name: '账户安全' },
  { id: 'privacy', name: '隐私设置' },
  { id: 'notifications', name: '通知设置' }
]

const userInfo = ref({
  name: '张三',
  nickname: '小张',
  email: 'zhangsan@example.com',
  phone: '13800138000',
  gender: 'male',
  birthday: '1990-01-01',
  occupation: '软件工程师',
  bio: '热爱技术，喜欢购物，追求品质生活。',
  avatar: ''
})

const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const securitySettings = ref({
  twoFactorEnabled: false
})

const loginDevices = ref([
  {
    id: 1,
    name: 'Windows PC',
    icon: 'fa fa-desktop',
    location: '北京市',
    lastActive: '当前活跃',
    current: true
  },
  {
    id: 2,
    name: 'iPhone 13',
    icon: 'fa fa-mobile-alt',
    location: '上海市',
    lastActive: '2小时前',
    current: false
  },
  {
    id: 3,
    name: 'MacBook Pro',
    icon: 'fa fa-laptop',
    location: '深圳市',
    lastActive: '1天前',
    current: false
  }
])

const privacySettings = ref([
  {
    id: 1,
    title: '个人资料可见性',
    description: '允许其他用户查看您的基本信息',
    enabled: true
  },
  {
    id: 2,
    title: '购买历史',
    description: '允许商家查看您的购买历史以提供个性化推荐',
    enabled: true
  },
  {
    id: 3,
    title: '位置信息',
    description: '允许应用访问您的位置信息以提供本地化服务',
    enabled: false
  },
  {
    id: 4,
    title: '数据分析',
    description: '允许我们分析您的使用数据以改善服务质量',
    enabled: true
  }
])

const notificationSettings = ref([
  {
    id: 1,
    title: '订单通知',
    description: '接收订单状态更新、发货和配送通知',
    enabled: true,
    methods: ['email', 'sms', 'push']
  },
  {
    id: 2,
    title: '促销活动',
    description: '接收特惠活动、优惠券和新品上市通知',
    enabled: true,
    methods: ['email', 'push']
  },
  {
    id: 3,
    title: '账户安全',
    description: '接收登录异常、密码修改等安全相关通知',
    enabled: true,
    methods: ['email', 'sms']
  },
  {
    id: 4,
    title: '系统消息',
    description: '接收系统维护、政策更新等重要消息',
    enabled: false,
    methods: ['email']
  }
])

const saveBasicInfo = () => {
  console.log('保存基本信息:', userInfo.value)
  showToast('个人信息已保存')
}

const changePassword = () => {
  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    showToast('两次输入的密码不一致', 'error')
    return
  }
  console.log('修改密码')
  showToast('密码修改成功')
  passwordForm.value = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  }
}

// 触发文件上传
const triggerFileUpload = () => {
  fileInput.value?.click()
}

// 处理头像上传
const handleAvatarUpload = (event) => {
  const file = event.target.files[0]
  if (!file) return

  // 验证文件类型
  if (!file.type.startsWith('image/')) {
    showToast('请选择图片文件', 'error')
    return
  }

  // 验证文件大小（限制为5MB）
  if (file.size > 5 * 1024 * 1024) {
    showToast('图片大小不能超过5MB', 'error')
    return
  }

  // 创建FileReader来预览图片
  const reader = new FileReader()
  reader.onload = (e) => {
    userInfo.value.avatar = e.target.result
    showToast('头像上传成功')
  }
  reader.readAsDataURL(file)

  // 这里可以添加实际的上传逻辑
  // uploadAvatar(file)
}

// 实际上传头像到服务器（示例）
const uploadAvatar = async (file) => {
  try {
    const formData = new FormData()
    formData.append('avatar', file)
    
    // 这里应该调用实际的API
    // const response = await userApi.uploadAvatar(formData)
    // userInfo.value.avatar = response.data.avatarUrl
    
    showToast('头像上传成功')
  } catch (error) {
    console.error('头像上传失败:', error)
    showToast('头像上传失败，请重试', 'error')
  }
}

const showToast = (message, type = 'success') => {
  const toast = document.createElement('div')
  toast.className = `fixed top-20 right-4 px-4 py-2 rounded-lg shadow-lg z-50 transition-all duration-300 ${
    type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
  }`
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