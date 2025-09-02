import { api } from './index'

/**
 * 商品相关 API
 */
export const productsApi = {
  /**
   * 获取商品列表
   * @param {Object} params - 查询参数
   * @param {number} params.page - 页码
   * @param {number} params.limit - 每页数量
   * @param {string} params.category - 分类ID
   * @param {string} params.keyword - 搜索关键词
   * @param {string} params.sortBy - 排序字段: 'price' | 'sales' | 'rating' | 'created_at'
   * @param {string} params.sortOrder - 排序方向: 'asc' | 'desc'
   * @param {number} params.minPrice - 最低价格
   * @param {number} params.maxPrice - 最高价格
   * @param {string} params.brand - 品牌
   * @param {boolean} params.inStock - 是否有库存
   * @returns {Promise} 商品列表
   */
  getProducts: (params = {}) => {
    return api.get('/products', { params })
  },

  /**
   * 获取商品详情
   * @param {string|number} productId - 商品ID
   * @returns {Promise} 商品详情
   */
  getProductById: (productId) => {
    return api.get(`/products/${productId}`)
  },

  /**
   * 获取精选商品
   * @param {Object} params - 查询参数
   * @param {number} params.limit - 数量限制
   * @returns {Promise} 精选商品列表
   */
  getFeaturedProducts: (params = {}) => {
    return api.get('/products/featured', { params })
  },

  /**
   * 获取新品上市
   * @param {Object} params - 查询参数
   * @param {number} params.limit - 数量限制
   * @param {number} params.days - 多少天内的新品
   * @returns {Promise} 新品列表
   */
  getNewArrivals: (params = {}) => {
    return api.get('/products/new-arrivals', { params })
  },

  /**
   * 获取热销商品
   * @param {Object} params - 查询参数
   * @param {number} params.limit - 数量限制
   * @returns {Promise} 热销商品列表
   */
  getHotProducts: (params = {}) => {
    return api.get('/products/hot', { params })
  },

  /**
   * 获取特惠商品
   * @param {Object} params - 查询参数
   * @param {number} params.limit - 数量限制
   * @returns {Promise} 特惠商品列表
   */
  getDealsProducts: (params = {}) => {
    return api.get('/products/deals', { params })
  },

  /**
   * 获取推荐商品
   * @param {Object} params - 查询参数
   * @param {string} params.userId - 用户ID（用于个性化推荐）
   * @param {string} params.productId - 商品ID（用于相关推荐）
   * @param {number} params.limit - 数量限制
   * @returns {Promise} 推荐商品列表
   */
  getRecommendedProducts: (params = {}) => {
    return api.get('/products/recommended', { params })
  },

  /**
   * 搜索商品
   * @param {Object} params - 搜索参数
   * @param {string} params.q - 搜索关键词
   * @param {number} params.page - 页码
   * @param {number} params.limit - 每页数量
   * @param {string} params.category - 分类筛选
   * @param {string} params.sortBy - 排序字段
   * @param {string} params.sortOrder - 排序方向
   * @returns {Promise} 搜索结果
   */
  searchProducts: (params) => {
    return api.get('/products/search', { params })
  },

  /**
   * 获取商品分类
   * @param {Object} params - 查询参数
   * @param {string} params.parentId - 父分类ID
   * @param {number} params.level - 分类层级
   * @returns {Promise} 分类列表
   */
  getCategories: (params = {}) => {
    return api.get('/products/categories', { params })
  },

  /**
   * 获取分类详情
   * @param {string|number} categoryId - 分类ID
   * @returns {Promise} 分类详情
   */
  getCategoryById: (categoryId) => {
    return api.get(`/products/categories/${categoryId}`)
  },

  /**
   * 获取品牌列表
   * @param {Object} params - 查询参数
   * @param {string} params.category - 分类ID
   * @returns {Promise} 品牌列表
   */
  getBrands: (params = {}) => {
    return api.get('/products/brands', { params })
  },

  /**
   * 获取商品评价
   * @param {string|number} productId - 商品ID
   * @param {Object} params - 查询参数
   * @param {number} params.page - 页码
   * @param {number} params.limit - 每页数量
   * @param {number} params.rating - 评分筛选
   * @param {string} params.sortBy - 排序字段
   * @returns {Promise} 评价列表
   */
  getProductReviews: (productId, params = {}) => {
    return api.get(`/products/${productId}/reviews`, { params })
  },

  /**
   * 添加商品评价
   * @param {string|number} productId - 商品ID
   * @param {Object} reviewData - 评价数据
   * @param {number} reviewData.rating - 评分 (1-5)
   * @param {string} reviewData.comment - 评价内容
   * @param {Array} reviewData.images - 评价图片
   * @returns {Promise} 添加结果
   */
  addProductReview: (productId, reviewData) => {
    return api.post(`/products/${productId}/reviews`, reviewData)
  },

  /**
   * 获取商品库存
   * @param {string|number} productId - 商品ID
   * @param {string} sku - SKU编码
   * @returns {Promise} 库存信息
   */
  getProductStock: (productId, sku) => {
    return api.get(`/products/${productId}/stock`, { params: { sku } })
  },

  /**
   * 获取商品规格
   * @param {string|number} productId - 商品ID
   * @returns {Promise} 规格信息
   */
  getProductSpecs: (productId) => {
    return api.get(`/products/${productId}/specs`)
  },

  /**
   * 获取商品价格历史
   * @param {string|number} productId - 商品ID
   * @param {Object} params - 查询参数
   * @param {number} params.days - 查询天数
   * @returns {Promise} 价格历史
   */
  getProductPriceHistory: (productId, params = {}) => {
    return api.get(`/products/${productId}/price-history`, { params })
  },

  /**
   * 收藏商品
   * @param {string|number} productId - 商品ID
   * @returns {Promise} 收藏结果
   */
  favoriteProduct: (productId) => {
    return api.post(`/products/${productId}/favorite`)
  },

  /**
   * 取消收藏商品
   * @param {string|number} productId - 商品ID
   * @returns {Promise} 取消收藏结果
   */
  unfavoriteProduct: (productId) => {
    return api.delete(`/products/${productId}/favorite`)
  },

  /**
   * 检查商品是否已收藏
   * @param {string|number} productId - 商品ID
   * @returns {Promise} 收藏状态
   */
  checkFavoriteStatus: (productId) => {
    return api.get(`/products/${productId}/favorite-status`)
  }
}

export default productsApi