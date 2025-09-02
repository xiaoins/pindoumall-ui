import { api, USE_MOCK } from './index'
import { userMock } from '../mock/index.js'

/**
 * 用户认证相关 API
 */
export const authApi = {
  /**
   * 用户登录
   * @param {Object} loginData - 登录数据
   * @param {string} loginData.username - 用户名/邮箱/手机号
   * @param {string} loginData.password - 密码
   * @param {string} loginData.loginType - 登录类型: 'username' | 'email' | 'phone'
   * @returns {Promise} 登录结果
   */
  login: (loginData) => {
    if (USE_MOCK) {
      return userMock.login(loginData)
    }
    return api.post('/auth/login', loginData)
  },

  /**
   * 用户注册
   * @param {Object} registerData - 注册数据
   * @param {string} registerData.username - 用户名
   * @param {string} registerData.email - 邮箱
   * @param {string} registerData.password - 密码
   * @param {string} registerData.confirmPassword - 确认密码
   * @param {string} registerData.phone - 手机号
   * @param {string} registerData.verificationCode - 验证码
   * @returns {Promise} 注册结果
   */
  register: (registerData) => {
    if (USE_MOCK) {
      return userMock.register(registerData)
    }
    return api.post('/auth/register', registerData)
  },

  /**
   * 用户登出
   * @returns {Promise} 登出结果
   */
  logout: () => {
    if (USE_MOCK) {
      return userMock.logout()
    }
    return api.post('/auth/logout')
  },

  /**
   * 刷新访问令牌
   * @param {string} refreshToken - 刷新令牌
   * @returns {Promise} 新的访问令牌
   */
  refreshToken: (refreshToken) => {
    return api.post('/auth/refresh', { refreshToken })
  },

  /**
   * 发送验证码
   * @param {Object} data - 验证码数据
   * @param {string} data.phone - 手机号
   * @param {string} data.email - 邮箱
   * @param {string} data.type - 验证码类型: 'register' | 'login' | 'reset_password'
   * @returns {Promise} 发送结果
   */
  sendVerificationCode: (data) => {
    return api.post('/auth/send-code', data)
  },

  /**
   * 验证验证码
   * @param {Object} data - 验证数据
   * @param {string} data.phone - 手机号
   * @param {string} data.email - 邮箱
   * @param {string} data.code - 验证码
   * @param {string} data.type - 验证码类型
   * @returns {Promise} 验证结果
   */
  verifyCode: (data) => {
    return api.post('/auth/verify-code', data)
  },

  /**
   * 忘记密码
   * @param {Object} data - 重置密码数据
   * @param {string} data.email - 邮箱
   * @param {string} data.phone - 手机号
   * @returns {Promise} 重置结果
   */
  forgotPassword: (data) => {
    return api.post('/auth/forgot-password', data)
  },

  /**
   * 重置密码
   * @param {Object} data - 重置密码数据
   * @param {string} data.token - 重置令牌
   * @param {string} data.newPassword - 新密码
   * @param {string} data.confirmPassword - 确认新密码
   * @returns {Promise} 重置结果
   */
  resetPassword: (data) => {
    return api.post('/auth/reset-password', data)
  },

  /**
   * 修改密码
   * @param {Object} data - 修改密码数据
   * @param {string} data.oldPassword - 旧密码
   * @param {string} data.newPassword - 新密码
   * @param {string} data.confirmPassword - 确认新密码
   * @returns {Promise} 修改结果
   */
  changePassword: (data) => {
    return api.post('/auth/change-password', data)
  },

  /**
   * 检查用户名是否可用
   * @param {string} username - 用户名
   * @returns {Promise} 检查结果
   */
  checkUsername: (username) => {
    return api.get(`/auth/check-username?username=${username}`)
  },

  /**
   * 检查邮箱是否可用
   * @param {string} email - 邮箱
   * @returns {Promise} 检查结果
   */
  checkEmail: (email) => {
    return api.get(`/auth/check-email?email=${email}`)
  },

  /**
   * 检查手机号是否可用
   * @param {string} phone - 手机号
   * @returns {Promise} 检查结果
   */
  checkPhone: (phone) => {
    return api.get(`/auth/check-phone?phone=${phone}`)
  },

  /**
   * 获取当前用户信息
   * @returns {Promise} 用户信息
   */
  getCurrentUser: () => {
    return api.get('/auth/me')
  },

  /**
   * 验证令牌有效性
   * @param {string} token - 访问令牌
   * @returns {Promise} 验证结果
   */
  validateToken: (token) => {
    return api.post('/auth/validate-token', { token })
  }
}

export default authApi