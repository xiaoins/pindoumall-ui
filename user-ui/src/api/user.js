import { api } from './index'

/**
 * 用户信息相关 API
 */
export const userApi = {
  /**
   * 获取用户个人信息
   * @returns {Promise} 用户信息
   */
  getUserProfile: () => {
    return api.get('/user/profile')
  },

  /**
   * 更新用户个人信息
   * @param {Object} profileData - 用户信息
   * @param {string} profileData.nickname - 昵称
   * @param {string} profileData.avatar - 头像URL
   * @param {string} profileData.gender - 性别: 'male' | 'female' | 'other'
   * @param {string} profileData.birthday - 生日
   * @param {string} profileData.bio - 个人简介
   * @returns {Promise} 更新结果
   */
  updateUserProfile: (profileData) => {
    return api.put('/user/profile', profileData)
  },

  /**
   * 上传用户头像
   * @param {File} avatarFile - 头像文件
   * @returns {Promise} 上传结果
   */
  uploadAvatar: (avatarFile) => {
    const formData = new FormData()
    formData.append('avatar', avatarFile)
    return api.post('/user/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },

  /**
   * 获取用户收货地址列表
   * @returns {Promise} 地址列表
   */
  getAddresses: () => {
    return api.get('/user/addresses')
  },

  /**
   * 添加收货地址
   * @param {Object} addressData - 地址数据
   * @param {string} addressData.name - 收货人姓名
   * @param {string} addressData.phone - 收货人电话
   * @param {string} addressData.province - 省份
   * @param {string} addressData.city - 城市
   * @param {string} addressData.district - 区县
   * @param {string} addressData.street - 详细地址
   * @param {string} addressData.postalCode - 邮政编码
   * @param {boolean} addressData.isDefault - 是否默认地址
   * @returns {Promise} 添加结果
   */
  addAddress: (addressData) => {
    return api.post('/user/addresses', addressData)
  },

  /**
   * 更新收货地址
   * @param {string|number} addressId - 地址ID
   * @param {Object} addressData - 地址数据
   * @returns {Promise} 更新结果
   */
  updateAddress: (addressId, addressData) => {
    return api.put(`/user/addresses/${addressId}`, addressData)
  },

  /**
   * 删除收货地址
   * @param {string|number} addressId - 地址ID
   * @returns {Promise} 删除结果
   */
  deleteAddress: (addressId) => {
    return api.delete(`/user/addresses/${addressId}`)
  },

  /**
   * 设置默认收货地址
   * @param {string|number} addressId - 地址ID
   * @returns {Promise} 设置结果
   */
  setDefaultAddress: (addressId) => {
    return api.post(`/user/addresses/${addressId}/set-default`)
  },

  /**
   * 获取用户收藏列表
   * @param {Object} params - 查询参数
   * @param {number} params.page - 页码
   * @param {number} params.limit - 每页数量
   * @param {string} params.category - 分类筛选
   * @returns {Promise} 收藏列表
   */
  getFavorites: (params = {}) => {
    return api.get('/user/favorites', { params })
  },

  /**
   * 添加商品到收藏
   * @param {string|number} productId - 商品ID
   * @returns {Promise} 添加结果
   */
  addToFavorites: (productId) => {
    return api.post('/user/favorites', { productId })
  },

  /**
   * 从收藏中移除商品
   * @param {string|number} productId - 商品ID
   * @returns {Promise} 移除结果
   */
  removeFromFavorites: (productId) => {
    return api.delete(`/user/favorites/${productId}`)
  },

  /**
   * 批量移除收藏商品
   * @param {Array} productIds - 商品ID列表
   * @returns {Promise} 移除结果
   */
  removeFavorites: (productIds) => {
    return api.delete('/user/favorites', { data: { productIds } })
  },

  /**
   * 检查商品是否已收藏
   * @param {string|number} productId - 商品ID
   * @returns {Promise} 收藏状态
   */
  checkFavoriteStatus: (productId) => {
    return api.get(`/user/favorites/${productId}/status`)
  },

  /**
   * 获取用户浏览历史
   * @param {Object} params - 查询参数
   * @param {number} params.page - 页码
   * @param {number} params.limit - 每页数量
   * @param {string} params.category - 分类筛选
   * @returns {Promise} 浏览历史
   */
  getBrowsingHistory: (params = {}) => {
    return api.get('/user/history', { params })
  },

  /**
   * 添加浏览记录
   * @param {string|number} productId - 商品ID
   * @returns {Promise} 添加结果
   */
  addBrowsingHistory: (productId) => {
    return api.post('/user/history', { productId })
  },

  /**
   * 删除浏览记录
   * @param {string|number} historyId - 历史记录ID
   * @returns {Promise} 删除结果
   */
  deleteBrowsingHistory: (historyId) => {
    return api.delete(`/user/history/${historyId}`)
  },

  /**
   * 批量删除浏览记录
   * @param {Array} historyIds - 历史记录ID列表
   * @returns {Promise} 删除结果
   */
  deleteBrowsingHistories: (historyIds) => {
    return api.delete('/user/history', { data: { historyIds } })
  },

  /**
   * 清空浏览历史
   * @returns {Promise} 清空结果
   */
  clearBrowsingHistory: () => {
    return api.delete('/user/history/all')
  },

  /**
   * 获取用户优惠券
   * @param {Object} params - 查询参数
   * @param {string} params.status - 优惠券状态: 'unused' | 'used' | 'expired'
   * @param {number} params.page - 页码
   * @param {number} params.limit - 每页数量
   * @returns {Promise} 优惠券列表
   */
  getCoupons: (params = {}) => {
    return api.get('/user/coupons', { params })
  },

  /**
   * 领取优惠券
   * @param {string|number} couponId - 优惠券ID
   * @returns {Promise} 领取结果
   */
  claimCoupon: (couponId) => {
    return api.post(`/user/coupons/${couponId}/claim`)
  },

  /**
   * 使用优惠券
   * @param {string|number} couponId - 优惠券ID
   * @param {string|number} orderId - 订单ID
   * @returns {Promise} 使用结果
   */
  useCoupon: (couponId, orderId) => {
    return api.post(`/user/coupons/${couponId}/use`, { orderId })
  },

  /**
   * 获取用户积分信息
   * @returns {Promise} 积分信息
   */
  getPoints: () => {
    return api.get('/user/points')
  },

  /**
   * 获取积分历史记录
   * @param {Object} params - 查询参数
   * @param {number} params.page - 页码
   * @param {number} params.limit - 每页数量
   * @param {string} params.type - 积分类型: 'earn' | 'spend'
   * @returns {Promise} 积分历史
   */
  getPointsHistory: (params = {}) => {
    return api.get('/user/points/history', { params })
  },

  /**
   * 获取用户会员信息
   * @returns {Promise} 会员信息
   */
  getMembershipInfo: () => {
    return api.get('/user/membership')
  },

  /**
   * 获取会员权益
   * @returns {Promise} 会员权益列表
   */
  getMembershipBenefits: () => {
    return api.get('/user/membership/benefits')
  },

  /**
   * 升级会员
   * @param {string} membershipLevel - 会员等级
   * @returns {Promise} 升级结果
   */
  upgradeMembership: (membershipLevel) => {
    return api.post('/user/membership/upgrade', { membershipLevel })
  },

  /**
   * 获取用户消息通知
   * @param {Object} params - 查询参数
   * @param {number} params.page - 页码
   * @param {number} params.limit - 每页数量
   * @param {string} params.type - 消息类型
   * @param {boolean} params.unreadOnly - 仅未读消息
   * @returns {Promise} 消息列表
   */
  getNotifications: (params = {}) => {
    return api.get('/user/notifications', { params })
  },

  /**
   * 标记消息为已读
   * @param {string|number} notificationId - 消息ID
   * @returns {Promise} 标记结果
   */
  markNotificationAsRead: (notificationId) => {
    return api.post(`/user/notifications/${notificationId}/read`)
  },

  /**
   * 批量标记消息为已读
   * @param {Array} notificationIds - 消息ID列表
   * @returns {Promise} 标记结果
   */
  markNotificationsAsRead: (notificationIds) => {
    return api.post('/user/notifications/read', { notificationIds })
  },

  /**
   * 删除消息
   * @param {string|number} notificationId - 消息ID
   * @returns {Promise} 删除结果
   */
  deleteNotification: (notificationId) => {
    return api.delete(`/user/notifications/${notificationId}`)
  },

  /**
   * 获取用户设置
   * @returns {Promise} 用户设置
   */
  getUserSettings: () => {
    return api.get('/user/settings')
  },

  /**
   * 更新用户设置
   * @param {Object} settings - 设置数据
   * @returns {Promise} 更新结果
   */
  updateUserSettings: (settings) => {
    return api.put('/user/settings', settings)
  },

  /**
   * 绑定手机号
   * @param {Object} data - 绑定数据
   * @param {string} data.phone - 手机号
   * @param {string} data.verificationCode - 验证码
   * @returns {Promise} 绑定结果
   */
  bindPhone: (data) => {
    return api.post('/user/bind-phone', data)
  },

  /**
   * 绑定邮箱
   * @param {Object} data - 绑定数据
   * @param {string} data.email - 邮箱
   * @param {string} data.verificationCode - 验证码
   * @returns {Promise} 绑定结果
   */
  bindEmail: (data) => {
    return api.post('/user/bind-email', data)
  },

  /**
   * 注销账户
   * @param {Object} data - 注销数据
   * @param {string} data.password - 密码确认
   * @param {string} data.reason - 注销原因
   * @returns {Promise} 注销结果
   */
  deleteAccount: (data) => {
    return api.post('/user/delete-account', data)
  }
}

export default userApi