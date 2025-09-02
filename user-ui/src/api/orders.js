import { api } from './index'

/**
 * 订单相关 API
 */
export const ordersApi = {
  /**
   * 获取订单列表
   * @param {Object} params - 查询参数
   * @param {number} params.page - 页码
   * @param {number} params.limit - 每页数量
   * @param {string} params.status - 订单状态: 'pending_payment' | 'processing' | 'shipped' | 'completed' | 'cancelled'
   * @param {string} params.startDate - 开始日期
   * @param {string} params.endDate - 结束日期
   * @param {string} params.keyword - 搜索关键词（订单号、商品名称）
   * @returns {Promise} 订单列表
   */
  getOrders: (params = {}) => {
    return api.get('/orders', { params })
  },

  /**
   * 获取订单详情
   * @param {string|number} orderId - 订单ID
   * @returns {Promise} 订单详情
   */
  getOrderById: (orderId) => {
    return api.get(`/orders/${orderId}`)
  },

  /**
   * 创建订单
   * @param {Object} orderData - 订单数据
   * @param {Array} orderData.items - 订单商品列表
   * @param {Object} orderData.shippingAddress - 收货地址
   * @param {string} orderData.paymentMethod - 支付方式
   * @param {string} orderData.couponCode - 优惠券代码
   * @param {string} orderData.remark - 订单备注
   * @returns {Promise} 创建结果
   */
  createOrder: (orderData) => {
    return api.post('/orders', orderData)
  },

  /**
   * 取消订单
   * @param {string|number} orderId - 订单ID
   * @param {Object} data - 取消原因
   * @param {string} data.reason - 取消原因
   * @returns {Promise} 取消结果
   */
  cancelOrder: (orderId, data) => {
    return api.post(`/orders/${orderId}/cancel`, data)
  },

  /**
   * 确认收货
   * @param {string|number} orderId - 订单ID
   * @returns {Promise} 确认结果
   */
  confirmOrder: (orderId) => {
    return api.post(`/orders/${orderId}/confirm`)
  },

  /**
   * 申请退款
   * @param {string|number} orderId - 订单ID
   * @param {Object} refundData - 退款数据
   * @param {string} refundData.reason - 退款原因
   * @param {number} refundData.amount - 退款金额
   * @param {Array} refundData.images - 退款凭证图片
   * @param {string} refundData.description - 详细说明
   * @returns {Promise} 申请结果
   */
  requestRefund: (orderId, refundData) => {
    return api.post(`/orders/${orderId}/refund`, refundData)
  },

  /**
   * 获取退款详情
   * @param {string|number} orderId - 订单ID
   * @returns {Promise} 退款详情
   */
  getRefundDetails: (orderId) => {
    return api.get(`/orders/${orderId}/refund`)
  },

  /**
   * 获取订单物流信息
   * @param {string|number} orderId - 订单ID
   * @returns {Promise} 物流信息
   */
  getOrderLogistics: (orderId) => {
    return api.get(`/orders/${orderId}/logistics`)
  },

  /**
   * 获取订单发票
   * @param {string|number} orderId - 订单ID
   * @returns {Promise} 发票信息
   */
  getOrderInvoice: (orderId) => {
    return api.get(`/orders/${orderId}/invoice`)
  },

  /**
   * 申请开票
   * @param {string|number} orderId - 订单ID
   * @param {Object} invoiceData - 发票数据
   * @param {string} invoiceData.type - 发票类型: 'personal' | 'company'
   * @param {string} invoiceData.title - 发票抬头
   * @param {string} invoiceData.taxNumber - 税号
   * @param {string} invoiceData.email - 接收邮箱
   * @returns {Promise} 申请结果
   */
  requestInvoice: (orderId, invoiceData) => {
    return api.post(`/orders/${orderId}/invoice`, invoiceData)
  },

  /**
   * 重新下单（再次购买）
   * @param {string|number} orderId - 原订单ID
   * @returns {Promise} 重新下单结果
   */
  reorder: (orderId) => {
    return api.post(`/orders/${orderId}/reorder`)
  },

  /**
   * 获取订单统计
   * @param {Object} params - 查询参数
   * @param {string} params.period - 统计周期: 'week' | 'month' | 'year'
   * @returns {Promise} 订单统计
   */
  getOrderStats: (params = {}) => {
    return api.get('/orders/stats', { params })
  },

  /**
   * 预估订单金额
   * @param {Object} orderData - 订单数据
   * @param {Array} orderData.items - 商品列表
   * @param {string} orderData.couponCode - 优惠券代码
   * @param {Object} orderData.shippingAddress - 收货地址
   * @returns {Promise} 预估金额
   */
  estimateOrderAmount: (orderData) => {
    return api.post('/orders/estimate', orderData)
  },

  /**
   * 获取可用优惠券
   * @param {Object} params - 查询参数
   * @param {Array} params.productIds - 商品ID列表
   * @param {number} params.totalAmount - 订单总金额
   * @returns {Promise} 可用优惠券列表
   */
  getAvailableCoupons: (params) => {
    return api.get('/orders/available-coupons', { params })
  },

  /**
   * 验证优惠券
   * @param {Object} data - 验证数据
   * @param {string} data.couponCode - 优惠券代码
   * @param {Array} data.productIds - 商品ID列表
   * @param {number} data.totalAmount - 订单总金额
   * @returns {Promise} 验证结果
   */
  validateCoupon: (data) => {
    return api.post('/orders/validate-coupon', data)
  },

  /**
   * 获取配送方式
   * @param {Object} params - 查询参数
   * @param {string} params.addressId - 收货地址ID
   * @param {Array} params.productIds - 商品ID列表
   * @returns {Promise} 配送方式列表
   */
  getShippingMethods: (params) => {
    return api.get('/orders/shipping-methods', { params })
  },

  /**
   * 计算配送费用
   * @param {Object} data - 计算数据
   * @param {string} data.shippingMethodId - 配送方式ID
   * @param {string} data.addressId - 收货地址ID
   * @param {Array} data.items - 商品列表
   * @returns {Promise} 配送费用
   */
  calculateShippingFee: (data) => {
    return api.post('/orders/calculate-shipping', data)
  },

  /**
   * 获取支付方式
   * @returns {Promise} 支付方式列表
   */
  getPaymentMethods: () => {
    return api.get('/orders/payment-methods')
  },

  /**
   * 创建支付订单
   * @param {string|number} orderId - 订单ID
   * @param {Object} paymentData - 支付数据
   * @param {string} paymentData.paymentMethod - 支付方式
   * @param {string} paymentData.returnUrl - 支付成功回调地址
   * @returns {Promise} 支付订单信息
   */
  createPayment: (orderId, paymentData) => {
    return api.post(`/orders/${orderId}/payment`, paymentData)
  },

  /**
   * 查询支付状态
   * @param {string|number} orderId - 订单ID
   * @returns {Promise} 支付状态
   */
  getPaymentStatus: (orderId) => {
    return api.get(`/orders/${orderId}/payment-status`)
  }
}

export default ordersApi