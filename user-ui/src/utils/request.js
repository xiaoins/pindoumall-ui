import { api } from '../api/index'
import { ElMessage, ElMessageBox } from 'element-plus'
import router from '../router'
import { useUserStore } from '../stores/user'

/**
 * 请求工具类
 * 提供统一的请求处理、错误处理、加载状态管理等功能
 */
export class RequestUtil {
  /**
   * 发送请求并处理加载状态
   * @param {Function} requestFn - 请求函数
   * @param {Object} options - 配置选项
   * @param {boolean} options.showLoading - 是否显示加载状态
   * @param {string} options.loadingText - 加载提示文本
   * @param {boolean} options.showError - 是否显示错误提示
   * @param {boolean} options.showSuccess - 是否显示成功提示
   * @param {string} options.successText - 成功提示文本
   * @param {Function} options.onSuccess - 成功回调
   * @param {Function} options.onError - 错误回调
   * @returns {Promise} 请求结果
   */
  static async request(requestFn, options = {}) {
    const {
      showLoading = false,
      loadingText = '加载中...',
      showError = true,
      showSuccess = false,
      successText = '操作成功',
      onSuccess,
      onError
    } = options

    let loadingInstance = null

    try {
      // 显示加载状态
      if (showLoading) {
        loadingInstance = ElLoading.service({
          lock: true,
          text: loadingText,
          background: 'rgba(0, 0, 0, 0.7)'
        })
      }

      // 执行请求
      const response = await requestFn()
      
      // 显示成功提示
      if (showSuccess) {
        ElMessage.success(successText)
      }

      // 执行成功回调
      if (onSuccess) {
        onSuccess(response)
      }

      return response
    } catch (error) {
      // 显示错误提示
      if (showError) {
        const errorMessage = error.response?.data?.message || error.message || '请求失败'
        ElMessage.error(errorMessage)
      }

      // 执行错误回调
      if (onError) {
        onError(error)
      }

      throw error
    } finally {
      // 关闭加载状态
      if (loadingInstance) {
        loadingInstance.close()
      }
    }
  }

  /**
   * 分页请求封装
   * @param {Function} requestFn - 请求函数
   * @param {Object} params - 请求参数
   * @param {number} params.page - 页码
   * @param {number} params.limit - 每页数量
   * @returns {Promise} 分页数据
   */
  static async paginate(requestFn, params = {}) {
    const { page = 1, limit = 10, ...otherParams } = params
    
    try {
      const response = await requestFn({
        page,
        limit,
        ...otherParams
      })
      
      return {
        data: response.data?.list || response.data?.data || [],
        total: response.data?.total || 0,
        page: response.data?.page || page,
        limit: response.data?.limit || limit,
        hasMore: response.data?.hasMore || false
      }
    } catch (error) {
      console.error('分页请求失败:', error)
      return {
        data: [],
        total: 0,
        page,
        limit,
        hasMore: false
      }
    }
  }

  /**
   * 文件上传封装
   * @param {File} file - 文件对象
   * @param {Object} options - 上传选项
   * @param {string} options.url - 上传地址
   * @param {string} options.fieldName - 文件字段名
   * @param {Object} options.data - 额外数据
   * @param {Function} options.onProgress - 进度回调
   * @returns {Promise} 上传结果
   */
  static async uploadFile(file, options = {}) {
    const {
      url = '/upload',
      fieldName = 'file',
      data = {},
      onProgress
    } = options

    const formData = new FormData()
    formData.append(fieldName, file)
    
    // 添加额外数据
    Object.keys(data).forEach(key => {
      formData.append(key, data[key])
    })

    try {
      const response = await api.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          if (onProgress) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            )
            onProgress(percentCompleted)
          }
        }
      })
      
      return response
    } catch (error) {
      console.error('文件上传失败:', error)
      throw error
    }
  }

  /**
   * 批量请求封装
   * @param {Array} requests - 请求数组
   * @param {Object} options - 配置选项
   * @param {number} options.concurrency - 并发数量
   * @param {boolean} options.failFast - 是否快速失败
   * @returns {Promise} 批量请求结果
   */
  static async batchRequest(requests, options = {}) {
    const { concurrency = 5, failFast = false } = options
    
    if (failFast) {
      // 快速失败模式：任何一个请求失败都会导致整体失败
      return Promise.all(requests)
    } else {
      // 容错模式：收集所有结果，包括成功和失败的
      const results = []
      
      for (let i = 0; i < requests.length; i += concurrency) {
        const batch = requests.slice(i, i + concurrency)
        const batchResults = await Promise.allSettled(batch)
        results.push(...batchResults)
      }
      
      return results
    }
  }

  /**
   * 重试请求封装
   * @param {Function} requestFn - 请求函数
   * @param {Object} options - 重试选项
   * @param {number} options.maxRetries - 最大重试次数
   * @param {number} options.delay - 重试延迟（毫秒）
   * @param {Function} options.shouldRetry - 是否应该重试的判断函数
   * @returns {Promise} 请求结果
   */
  static async retryRequest(requestFn, options = {}) {
    const {
      maxRetries = 3,
      delay = 1000,
      shouldRetry = (error) => error.response?.status >= 500
    } = options

    let lastError
    
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await requestFn()
      } catch (error) {
        lastError = error
        
        // 如果是最后一次尝试或不应该重试，直接抛出错误
        if (attempt === maxRetries || !shouldRetry(error)) {
          throw error
        }
        
        // 等待后重试
        await new Promise(resolve => setTimeout(resolve, delay * (attempt + 1)))
      }
    }
    
    throw lastError
  }

  /**
   * 缓存请求封装
   * @param {string} key - 缓存键
   * @param {Function} requestFn - 请求函数
   * @param {Object} options - 缓存选项
   * @param {number} options.ttl - 缓存时间（毫秒）
   * @param {boolean} options.force - 是否强制刷新
   * @returns {Promise} 请求结果
   */
  static async cachedRequest(key, requestFn, options = {}) {
    const { ttl = 5 * 60 * 1000, force = false } = options // 默认5分钟缓存
    
    if (!force) {
      // 尝试从缓存获取
      const cached = this.getCache(key)
      if (cached && Date.now() - cached.timestamp < ttl) {
        return cached.data
      }
    }
    
    try {
      // 发送请求
      const response = await requestFn()
      
      // 缓存结果
      this.setCache(key, {
        data: response,
        timestamp: Date.now()
      })
      
      return response
    } catch (error) {
      // 如果请求失败且有缓存，返回缓存数据
      const cached = this.getCache(key)
      if (cached) {
        console.warn('请求失败，返回缓存数据:', error)
        return cached.data
      }
      
      throw error
    }
  }

  /**
   * 获取缓存
   * @param {string} key - 缓存键
   * @returns {any} 缓存数据
   */
  static getCache(key) {
    try {
      const cached = localStorage.getItem(`request_cache_${key}`)
      return cached ? JSON.parse(cached) : null
    } catch (error) {
      console.error('获取缓存失败:', error)
      return null
    }
  }

  /**
   * 设置缓存
   * @param {string} key - 缓存键
   * @param {any} data - 缓存数据
   */
  static setCache(key, data) {
    try {
      localStorage.setItem(`request_cache_${key}`, JSON.stringify(data))
    } catch (error) {
      console.error('设置缓存失败:', error)
    }
  }

  /**
   * 清除缓存
   * @param {string} key - 缓存键，不传则清除所有请求缓存
   */
  static clearCache(key) {
    if (key) {
      localStorage.removeItem(`request_cache_${key}`)
    } else {
      // 清除所有请求缓存
      const keys = Object.keys(localStorage)
      keys.forEach(k => {
        if (k.startsWith('request_cache_')) {
          localStorage.removeItem(k)
        }
      })
    }
  }
}

/**
 * 请求状态管理
 */
export class RequestState {
  constructor() {
    this.loadingStates = new Map()
    this.errorStates = new Map()
  }

  /**
   * 设置加载状态
   * @param {string} key - 状态键
   * @param {boolean} loading - 加载状态
   */
  setLoading(key, loading) {
    this.loadingStates.set(key, loading)
  }

  /**
   * 获取加载状态
   * @param {string} key - 状态键
   * @returns {boolean} 加载状态
   */
  getLoading(key) {
    return this.loadingStates.get(key) || false
  }

  /**
   * 设置错误状态
   * @param {string} key - 状态键
   * @param {any} error - 错误信息
   */
  setError(key, error) {
    this.errorStates.set(key, error)
  }

  /**
   * 获取错误状态
   * @param {string} key - 状态键
   * @returns {any} 错误信息
   */
  getError(key) {
    return this.errorStates.get(key) || null
  }

  /**
   * 清除状态
   * @param {string} key - 状态键
   */
  clear(key) {
    this.loadingStates.delete(key)
    this.errorStates.delete(key)
  }

  /**
   * 清除所有状态
   */
  clearAll() {
    this.loadingStates.clear()
    this.errorStates.clear()
  }
}

// 导出单例实例
export const requestState = new RequestState()

// 导出常用的请求方法
export const request = RequestUtil.request
export const paginate = RequestUtil.paginate
export const uploadFile = RequestUtil.uploadFile
export const batchRequest = RequestUtil.batchRequest
export const retryRequest = RequestUtil.retryRequest
export const cachedRequest = RequestUtil.cachedRequest

export default RequestUtil