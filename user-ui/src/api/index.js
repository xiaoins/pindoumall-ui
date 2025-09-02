import axios from 'axios'

// API 基础配置
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true' || false

// 导入mock数据
import userMock from '../mock/user.js'
import productMock from '../mock/product.js'
import orderMock from '../mock/order.js'
import cartMock from '../mock/cart.js'
import { mockRequest } from '../mock/index.js'

// 创建axios实例
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    return response.data
  },
  (error) => {
    // 对响应错误做点什么
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 未授权，清除token并跳转到登录页
          localStorage.removeItem('token')
          localStorage.removeItem('userInfo')
          window.location.href = '/login'
          break
        case 403:
          // 禁止访问
          console.error('禁止访问')
          break
        case 404:
          // 资源不存在
          console.error('请求的资源不存在')
          break
        case 500:
          // 服务器错误
          console.error('服务器内部错误')
          break
        default:
          console.error('请求失败:', error.response.data.message || '未知错误')
      }
    } else if (error.request) {
      // 请求已发出但没有收到响应
      console.error('网络错误，请检查网络连接')
    } else {
      // 发生了一些问题
      console.error('请求配置错误:', error.message)
    }
    return Promise.reject(error)
  }
)

// API方法封装
const apiMethods = {
  // 用户相关API
  user: {
    login: (data) => USE_MOCK ? mockRequest(() => userMock.login(data)) : api.post('/user/login', data),
    register: (data) => USE_MOCK ? mockRequest(() => userMock.register(data)) : api.post('/user/register', data),
    getUserInfo: () => USE_MOCK ? mockRequest(() => userMock.getUserInfo()) : api.get('/user/info'),
    updateUserInfo: (data) => USE_MOCK ? mockRequest(() => userMock.updateUserInfo(data)) : api.put('/user/info', data),
    changePassword: (data) => USE_MOCK ? mockRequest(() => userMock.changePassword(data)) : api.put('/user/password', data),
    sendVerifyCode: (data) => USE_MOCK ? mockRequest(() => userMock.sendVerifyCode(data)) : api.post('/user/verify-code', data),
    verifyCode: (data) => USE_MOCK ? mockRequest(() => userMock.verifyCode(data)) : api.post('/user/verify-code/check', data),
    refreshToken: () => USE_MOCK ? mockRequest(() => userMock.refreshToken()) : api.post('/user/refresh-token'),
    logout: () => USE_MOCK ? mockRequest(() => userMock.logout()) : api.post('/user/logout'),
    getLoginDevices: () => USE_MOCK ? mockRequest(() => userMock.getLoginDevices()) : api.get('/user/devices'),
    removeLoginDevice: (deviceId) => USE_MOCK ? mockRequest(() => userMock.removeLoginDevice(deviceId)) : api.delete(`/user/devices/${deviceId}`),
    getMembershipLevel: () => USE_MOCK ? mockRequest(() => userMock.getMembershipLevel()) : api.get('/user/membership'),
    getPointsHistory: (params) => USE_MOCK ? mockRequest(() => userMock.getPointsHistory(params)) : api.get('/user/points', { params })
  },
  
  // 商品相关API
  product: {
    getProducts: (params) => USE_MOCK ? mockRequest(() => productMock.getProducts(params)) : api.get('/products', { params }),
    getProductDetail: (id) => USE_MOCK ? mockRequest(() => productMock.getProductDetail(id)) : api.get(`/products/${id}`),
    getCategories: () => USE_MOCK ? mockRequest(() => productMock.getCategories()) : api.get('/categories'),
    getBrands: (params) => USE_MOCK ? mockRequest(() => productMock.getBrands(params)) : api.get('/brands', { params }),
    searchProducts: (params) => USE_MOCK ? mockRequest(() => productMock.searchProducts(params)) : api.get('/products/search', { params }),
    getHotProducts: (params) => USE_MOCK ? mockRequest(() => productMock.getHotProducts(params)) : api.get('/products/hot', { params }),
    getNewProducts: (params) => USE_MOCK ? mockRequest(() => productMock.getNewProducts(params)) : api.get('/products/new', { params }),
    getRecommendedProducts: (params) => USE_MOCK ? mockRequest(() => productMock.getRecommendedProducts(params)) : api.get('/products/recommended', { params }),
    getProductReviews: (productId, params) => USE_MOCK ? mockRequest(() => productMock.getProductReviews(productId, params)) : api.get(`/products/${productId}/reviews`, { params })
  },
  
  // 订单相关API
  order: {
    getOrders: (params) => USE_MOCK ? mockRequest(() => orderMock.getOrders(params)) : api.get('/orders', { params }),
    getOrderDetail: (id) => USE_MOCK ? mockRequest(() => orderMock.getOrderDetail(id)) : api.get(`/orders/${id}`),
    createOrder: (data) => USE_MOCK ? mockRequest(() => orderMock.createOrder(data)) : api.post('/orders', data),
    payOrder: (orderId, data) => USE_MOCK ? mockRequest(() => orderMock.payOrder(orderId, data)) : api.post(`/orders/${orderId}/pay`, data),
    cancelOrder: (orderId, data) => USE_MOCK ? mockRequest(() => orderMock.cancelOrder(orderId, data)) : api.post(`/orders/${orderId}/cancel`, data),
    confirmOrder: (orderId) => USE_MOCK ? mockRequest(() => orderMock.confirmOrder(orderId)) : api.post(`/orders/${orderId}/confirm`),
    getOrderLogistics: (orderId) => USE_MOCK ? mockRequest(() => orderMock.getOrderLogistics(orderId)) : api.get(`/orders/${orderId}/logistics`),
    applyRefund: (orderId, data) => USE_MOCK ? mockRequest(() => orderMock.applyRefund(orderId, data)) : api.post(`/orders/${orderId}/refund`, data),
    getRefunds: (params) => USE_MOCK ? mockRequest(() => orderMock.getRefunds(params)) : api.get('/refunds', { params }),
    getOrderStats: () => USE_MOCK ? mockRequest(() => orderMock.getOrderStats()) : api.get('/orders/stats')
  },
  
  // 购物车相关API
  cart: {
    getCart: () => USE_MOCK ? mockRequest(() => cartMock.getCart(2)) : api.get('/cart'), // 默认用户ID为2
    addToCart: (data) => USE_MOCK ? mockRequest(() => cartMock.addToCart(2, data)) : api.post('/cart', data),
    updateCartItem: (itemId, data) => USE_MOCK ? mockRequest(() => cartMock.updateCartItem(2, itemId, data.quantity)) : api.put(`/cart/${itemId}`, data),
    removeCartItem: (itemId) => USE_MOCK ? mockRequest(() => cartMock.removeCartItem(2, itemId)) : api.delete(`/cart/${itemId}`),
    removeCartItems: (itemIds) => USE_MOCK ? mockRequest(() => cartMock.removeCartItems(2, itemIds)) : api.delete('/cart/batch', { data: { itemIds } }),
    clearCart: () => USE_MOCK ? mockRequest(() => cartMock.clearCart(2)) : api.delete('/cart'),
    selectCartItem: (itemId, isSelected) => USE_MOCK ? mockRequest(() => cartMock.selectCartItem(2, itemId, isSelected)) : api.put(`/cart/${itemId}/select`, { isSelected }),
    selectAllCartItems: (isSelected) => USE_MOCK ? mockRequest(() => cartMock.selectAllCartItems(2, isSelected)) : api.put('/cart/select-all', { isSelected }),
    getAvailableCoupons: (params) => USE_MOCK ? mockRequest(() => cartMock.getAvailableCoupons(2, params.totalAmount, params.categoryIds, params.productIds)) : api.get('/coupons/available', { params }),
    getAddresses: () => USE_MOCK ? mockRequest(() => cartMock.getAddresses(2)) : api.get('/addresses'),
    addAddress: (data) => USE_MOCK ? mockRequest(() => cartMock.addAddress(2, data)) : api.post('/addresses', data),
    updateAddress: (addressId, data) => USE_MOCK ? mockRequest(() => cartMock.updateAddress(2, addressId, data)) : api.put(`/addresses/${addressId}`, data),
    deleteAddress: (addressId) => USE_MOCK ? mockRequest(() => cartMock.deleteAddress(2, addressId)) : api.delete(`/addresses/${addressId}`),
    setDefaultAddress: (addressId) => USE_MOCK ? mockRequest(() => cartMock.setDefaultAddress(2, addressId)) : api.put(`/addresses/${addressId}/default`)
  }
}

// 导出常用的 HTTP 方法
export const apiClient = {
  get: (url, config) => api.get(url, config),
  post: (url, data, config) => api.post(url, data, config),
  put: (url, data, config) => api.put(url, data, config),
  delete: (url, config) => api.delete(url, config),
  patch: (url, data, config) => api.patch(url, data, config)
}

// 导出API客户端和方法
export default apiClient
export { api, apiMethods, USE_MOCK }