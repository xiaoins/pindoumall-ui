import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authApi } from '../api/auth'
import { userApi } from '../api/user'
import router from '../router'

export const useUserStore = defineStore('user', () => {
  // 用户信息
  const userInfo = ref({
    id: null,
    username: '',
    email: '',
    phone: '',
    nickname: '',
    avatar: '',
    gender: '',
    birthday: '',
    bio: '',
    membershipLevel: 'bronze',
    points: 0,
    isEmailVerified: false,
    isPhoneVerified: false
  })

  // 认证状态
  const isLoggedIn = ref(false)
  const token = ref('')
  const refreshToken = ref('')
  const loginLoading = ref(false)
  const registerLoading = ref(false)

  // 计算属性
  const isAuthenticated = computed(() => {
    return isLoggedIn.value && token.value
  })

  const displayName = computed(() => {
    return userInfo.value.nickname || userInfo.value.username || userInfo.value.email
  })

  const avatarUrl = computed(() => {
    return userInfo.value.avatar || '/assets/icon/个人.svg'
  })

  // 初始化用户状态（从localStorage恢复）
  const initializeAuth = () => {
    try {
      const savedToken = localStorage.getItem('access_token')
      const savedRefreshToken = localStorage.getItem('refresh_token')
      const savedUserInfo = localStorage.getItem('user_info')

      if (savedToken && savedUserInfo) {
        token.value = savedToken
        refreshToken.value = savedRefreshToken || ''
        userInfo.value = JSON.parse(savedUserInfo)
        isLoggedIn.value = true

        // 验证token有效性
        validateToken()
      }
    } catch (error) {
      console.error('初始化认证状态失败:', error)
      clearAuth()
    }
  }

  // 验证token有效性
  const validateToken = async () => {
    if (!token.value) return false

    try {
      await authApi.validateToken(token.value)
      return true
    } catch (error) {
      console.error('Token验证失败:', error)
      // 尝试刷新token
      if (refreshToken.value) {
        return await refreshAccessToken()
      } else {
        clearAuth()
        return false
      }
    }
  }

  // 刷新访问令牌
  const refreshAccessToken = async () => {
    if (!refreshToken.value) {
      clearAuth()
      return false
    }

    try {
      const response = await authApi.refreshToken(refreshToken.value)
      const { access_token, refresh_token } = response.data

      token.value = access_token
      if (refresh_token) {
        refreshToken.value = refresh_token
      }

      // 保存到localStorage
      localStorage.setItem('access_token', access_token)
      if (refresh_token) {
        localStorage.setItem('refresh_token', refresh_token)
      }

      return true
    } catch (error) {
      console.error('刷新token失败:', error)
      clearAuth()
      return false
    }
  }

  // 用户登录
  const login = async (loginData) => {
    loginLoading.value = true
    try {
      const response = await authApi.login(loginData)
      const { user, access_token, refresh_token } = response.data

      // 更新状态
      userInfo.value = user
      token.value = access_token
      refreshToken.value = refresh_token || ''
      isLoggedIn.value = true

      // 保存到localStorage
      localStorage.setItem('access_token', access_token)
      localStorage.setItem('user_info', JSON.stringify(user))
      if (refresh_token) {
        localStorage.setItem('refresh_token', refresh_token)
      }

      return { success: true, data: response.data }
    } catch (error) {
      console.error('登录失败:', error)
      return {
        success: false,
        message: error.response?.data?.message || '登录失败，请稍后重试'
      }
    } finally {
      loginLoading.value = false
    }
  }

  // 用户注册
  const register = async (registerData) => {
    registerLoading.value = true
    try {
      const response = await authApi.register(registerData)
      const { user, access_token, refresh_token } = response.data

      // 注册成功后自动登录
      userInfo.value = user
      token.value = access_token
      refreshToken.value = refresh_token || ''
      isLoggedIn.value = true

      // 保存到localStorage
      localStorage.setItem('access_token', access_token)
      localStorage.setItem('user_info', JSON.stringify(user))
      if (refresh_token) {
        localStorage.setItem('refresh_token', refresh_token)
      }

      return { success: true, data: response.data }
    } catch (error) {
      console.error('注册失败:', error)
      return {
        success: false,
        message: error.response?.data?.message || '注册失败，请稍后重试'
      }
    } finally {
      registerLoading.value = false
    }
  }

  // 用户登出
  const logout = async (showConfirm = true) => {
    if (showConfirm && !confirm('确定要退出登录吗？')) {
      return
    }

    try {
      // 调用后端登出接口
      if (token.value) {
        await authApi.logout()
      }
    } catch (error) {
      console.error('登出接口调用失败:', error)
      // 即使接口失败也要清除本地状态
    } finally {
      clearAuth()
      // 跳转到首页
      router.push('/')
    }
  }

  // 清除认证状态
  const clearAuth = () => {
    userInfo.value = {
      id: null,
      username: '',
      email: '',
      phone: '',
      nickname: '',
      avatar: '',
      gender: '',
      birthday: '',
      bio: '',
      membershipLevel: 'bronze',
      points: 0,
      isEmailVerified: false,
      isPhoneVerified: false
    }
    isLoggedIn.value = false
    token.value = ''
    refreshToken.value = ''

    // 清除localStorage
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('user_info')
  }

  // 更新用户信息
  const updateUserInfo = async (updateData) => {
    try {
      const response = await userApi.updateUserProfile(updateData)
      const updatedUser = response.data

      // 更新本地状态
      userInfo.value = { ...userInfo.value, ...updatedUser }

      // 更新localStorage
      localStorage.setItem('user_info', JSON.stringify(userInfo.value))

      return { success: true, data: updatedUser }
    } catch (error) {
      console.error('更新用户信息失败:', error)
      return {
        success: false,
        message: error.response?.data?.message || '更新失败，请稍后重试'
      }
    }
  }

  // 获取当前用户信息
  const fetchUserInfo = async () => {
    if (!isAuthenticated.value) return

    try {
      const response = await authApi.getCurrentUser()
      const user = response.data

      userInfo.value = user
      localStorage.setItem('user_info', JSON.stringify(user))

      return { success: true, data: user }
    } catch (error) {
      console.error('获取用户信息失败:', error)
      return {
        success: false,
        message: error.response?.data?.message || '获取用户信息失败'
      }
    }
  }

  // 修改密码
  const changePassword = async (passwordData) => {
    try {
      await authApi.changePassword(passwordData)
      return { success: true, message: '密码修改成功' }
    } catch (error) {
      console.error('修改密码失败:', error)
      return {
        success: false,
        message: error.response?.data?.message || '修改密码失败'
      }
    }
  }

  // 发送验证码
  const sendVerificationCode = async (data) => {
    try {
      await authApi.sendVerificationCode(data)
      return { success: true, message: '验证码已发送' }
    } catch (error) {
      console.error('发送验证码失败:', error)
      return {
        success: false,
        message: error.response?.data?.message || '发送验证码失败'
      }
    }
  }

  // 验证验证码
  const verifyCode = async (data) => {
    try {
      const response = await authApi.verifyCode(data)
      return { success: true, data: response.data }
    } catch (error) {
      console.error('验证码验证失败:', error)
      return {
        success: false,
        message: error.response?.data?.message || '验证码验证失败'
      }
    }
  }

  // 检查登录状态的中间件
  const requireAuth = (showMessage = true) => {
    if (!isAuthenticated.value) {
      if (showMessage) {
        showToast('请先登录后再进行此操作', 'warning')
      }
      router.push('/login')
      return false
    }
    return true
  }

  // 显示提示消息
  const showToast = (message, type = 'info') => {
    const toast = document.createElement('div')
    const bgColor = {
      success: 'bg-green-500',
      error: 'bg-red-500',
      warning: 'bg-yellow-500',
      info: 'bg-blue-500'
    }[type] || 'bg-blue-500'
    
    toast.className = `fixed top-20 right-4 ${bgColor} text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-all duration-300`
    toast.textContent = message
    document.body.appendChild(toast)
    
    setTimeout(() => {
      toast.style.opacity = '0'
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast)
        }
      }, 300)
    }, 3000)
  }

  return {
    // 状态
    userInfo,
    isLoggedIn,
    token,
    refreshToken,
    loginLoading,
    registerLoading,
    
    // 计算属性
    isAuthenticated,
    displayName,
    avatarUrl,
    
    // 方法
    initializeAuth,
    validateToken,
    refreshAccessToken,
    login,
    register,
    logout,
    clearAuth,
    updateUserInfo,
    fetchUserInfo,
    changePassword,
    sendVerificationCode,
    verifyCode,
    requireAuth,
    showToast
  }
})