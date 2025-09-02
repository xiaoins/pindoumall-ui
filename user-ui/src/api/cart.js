import { api } from './index'

/**
 * 购物车相关 API
 */
export const cartApi = {
  /**
   * 获取购物车列表
   * @returns {Promise} 购物车商品列表
   */
  getCartItems: () => {
    return api.get('/cart')
  },

  /**
   * 添加商品到购物车
   * @param {Object} itemData - 商品数据
   * @param {string|number} itemData.productId - 商品ID
   * @param {string} itemData.sku - SKU编码
   * @param {number} itemData.quantity - 数量
   * @param {Object} itemData.specs - 商品规格
   * @returns {Promise} 添加结果
   */
  addToCart: (itemData) => {
    return api.post('/cart/items', itemData)
  },

  /**
   * 更新购物车商品数量
   * @param {string|number} itemId - 购物车商品ID
   * @param {Object} updateData - 更新数据
   * @param {number} updateData.quantity - 新数量
   * @returns {Promise} 更新结果
   */
  updateCartItem: (itemId, updateData) => {
    return api.put(`/cart/items/${itemId}`, updateData)
  },

  /**
   * 删除购物车商品
   * @param {string|number} itemId - 购物车商品ID
   * @returns {Promise} 删除结果
   */
  removeCartItem: (itemId) => {
    return api.delete(`/cart/items/${itemId}`)
  },

  /**
   * 批量删除购物车商品
   * @param {Array} itemIds - 购物车商品ID列表
   * @returns {Promise} 删除结果
   */
  removeCartItems: (itemIds) => {
    return api.delete('/cart/items', { data: { itemIds } })
  },

  /**
   * 清空购物车
   * @returns {Promise} 清空结果
   */
  clearCart: () => {
    return api.delete('/cart')
  },

  /**
   * 获取购物车统计信息
   * @returns {Promise} 统计信息（总数量、总金额等）
   */
  getCartSummary: () => {
    return api.get('/cart/summary')
  },

  /**
   * 检查购物车商品库存
   * @param {Array} itemIds - 购物车商品ID列表（可选，不传则检查全部）
   * @returns {Promise} 库存检查结果
   */
  checkCartStock: (itemIds = []) => {
    const params = itemIds.length > 0 ? { itemIds } : {}
    return api.get('/cart/check-stock', { params })
  },

  /**
   * 选择/取消选择购物车商品
   * @param {string|number} itemId - 购物车商品ID
   * @param {boolean} selected - 是否选中
   * @returns {Promise} 选择结果
   */
  selectCartItem: (itemId, selected) => {
    return api.patch(`/cart/items/${itemId}/select`, { selected })
  },

  /**
   * 批量选择/取消选择购物车商品
   * @param {Array} itemIds - 购物车商品ID列表
   * @param {boolean} selected - 是否选中
   * @returns {Promise} 选择结果
   */
  selectCartItems: (itemIds, selected) => {
    return api.patch('/cart/items/select', { itemIds, selected })
  },

  /**
   * 全选/取消全选购物车商品
   * @param {boolean} selected - 是否全选
   * @returns {Promise} 选择结果
   */
  selectAllCartItems: (selected) => {
    return api.patch('/cart/select-all', { selected })
  },

  /**
   * 获取选中的购物车商品
   * @returns {Promise} 选中的商品列表
   */
  getSelectedCartItems: () => {
    return api.get('/cart/selected')
  },

  /**
   * 移动商品到收藏夹
   * @param {string|number} itemId - 购物车商品ID
   * @returns {Promise} 移动结果
   */
  moveToFavorites: (itemId) => {
    return api.post(`/cart/items/${itemId}/move-to-favorites`)
  },

  /**
   * 批量移动商品到收藏夹
   * @param {Array} itemIds - 购物车商品ID列表
   * @returns {Promise} 移动结果
   */
  moveItemsToFavorites: (itemIds) => {
    return api.post('/cart/items/move-to-favorites', { itemIds })
  },

  /**
   * 获取购物车推荐商品
   * @param {Object} params - 查询参数
   * @param {number} params.limit - 推荐数量
   * @returns {Promise} 推荐商品列表
   */
  getCartRecommendations: (params = {}) => {
    return api.get('/cart/recommendations', { params })
  },

  /**
   * 合并购物车（用户登录后合并本地购物车）
   * @param {Array} localCartItems - 本地购物车商品列表
   * @returns {Promise} 合并结果
   */
  mergeCart: (localCartItems) => {
    return api.post('/cart/merge', { items: localCartItems })
  },

  /**
   * 同步购物车到服务器
   * @param {Array} cartItems - 购物车商品列表
   * @returns {Promise} 同步结果
   */
  syncCart: (cartItems) => {
    return api.post('/cart/sync', { items: cartItems })
  },

  /**
   * 获取购物车商品的最新价格
   * @param {Array} itemIds - 购物车商品ID列表（可选）
   * @returns {Promise} 最新价格信息
   */
  getLatestPrices: (itemIds = []) => {
    const params = itemIds.length > 0 ? { itemIds } : {}
    return api.get('/cart/latest-prices', { params })
  },

  /**
   * 应用优惠券到购物车
   * @param {string} couponCode - 优惠券代码
   * @returns {Promise} 应用结果
   */
  applyCoupon: (couponCode) => {
    return api.post('/cart/apply-coupon', { couponCode })
  },

  /**
   * 移除购物车优惠券
   * @returns {Promise} 移除结果
   */
  removeCoupon: () => {
    return api.delete('/cart/coupon')
  },

  /**
   * 获取购物车可用优惠券
   * @returns {Promise} 可用优惠券列表
   */
  getAvailableCoupons: () => {
    return api.get('/cart/available-coupons')
  },

  /**
   * 预结算（获取订单预览信息）
   * @param {Object} data - 结算数据
   * @param {Array} data.itemIds - 要结算的商品ID列表
   * @param {string} data.addressId - 收货地址ID
   * @param {string} data.couponCode - 优惠券代码
   * @returns {Promise} 订单预览信息
   */
  preCheckout: (data) => {
    return api.post('/cart/pre-checkout', data)
  }
}

export default cartApi