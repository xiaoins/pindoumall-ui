/**
 * Mock数据管理中心
 * 用于模拟后端API响应数据
 */

// 导入各个模块的mock数据
import userMock from './user.js'
import productMock from './product.js'
import orderMock from './order.js'
import cartMock from './cart.js'

// 模拟API响应的延迟
const MOCK_DELAY = 500 // 毫秒

/**
 * 模拟API请求的通用方法
 * @param {*} data - 要返回的数据
 * @param {number} delay - 延迟时间（毫秒）
 * @param {boolean} success - 是否成功
 * @returns {Promise} 模拟的API响应
 */
const mockRequest = (data, delay = MOCK_DELAY, success = true) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (success) {
        resolve({
          code: 200,
          message: '请求成功',
          data: data,
          timestamp: Date.now()
        })
      } else {
        reject({
          code: 500,
          message: '请求失败',
          data: null,
          timestamp: Date.now()
        })
      }
    }, delay)
  })
}

/**
 * 模拟分页响应
 * @param {Array} data - 数据数组
 * @param {number} page - 当前页码
 * @param {number} pageSize - 每页大小
 * @returns {Object} 分页数据
 */
const mockPagination = (data, page = 1, pageSize = 10) => {
  const total = data.length
  const totalPages = Math.ceil(total / pageSize)
  const start = (page - 1) * pageSize
  const end = start + pageSize
  const items = data.slice(start, end)

  return {
    items,
    pagination: {
      page,
      pageSize,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1
    }
  }
}

// 导出所有mock数据和工具方法
export {
  userMock,
  productMock,
  orderMock,
  cartMock,
  mockRequest,
  mockPagination
}

// 默认导出
export default {
  user: userMock,
  product: productMock,
  order: orderMock,
  cart: cartMock,
  request: mockRequest,
  pagination: mockPagination
}