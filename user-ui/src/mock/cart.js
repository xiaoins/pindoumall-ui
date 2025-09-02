/**
 * 购物车相关的Mock数据
 */

// 模拟购物车数据
const carts = [
  {
    id: 1,
    userId: 2,
    items: [
      {
        id: 1,
        productId: 1,
        productName: 'iPhone 15 Pro Max',
        productImage: '/assets/products/iphone15-thumb.jpg',
        price: 9999.00,
        originalPrice: 10999.00,
        quantity: 1,
        maxQuantity: 5,
        sku: 'APL-IP15PM-256-NT',
        attributes: [
          { name: '颜色', value: '自然钛金色' },
          { name: '存储容量', value: '256GB' }
        ],
        isSelected: true,
        isAvailable: true,
        stock: 50,
        addedAt: '2024-01-20T10:30:00Z'
      },
      {
        id: 2,
        productId: 3,
        productName: 'AirPods Pro 第三代',
        productImage: '/assets/products/airpods-thumb.jpg',
        price: 1899.00,
        originalPrice: 1999.00,
        quantity: 2,
        maxQuantity: 10,
        sku: 'APL-APP3-WHT',
        attributes: [
          { name: '颜色', value: '白色' }
        ],
        isSelected: true,
        isAvailable: true,
        stock: 100,
        addedAt: '2024-01-19T14:20:00Z'
      },
      {
        id: 3,
        productId: 5,
        productName: '华为MateBook X Pro',
        productImage: '/assets/products/matebook-thumb.jpg',
        price: 8999.00,
        originalPrice: 9999.00,
        quantity: 1,
        maxQuantity: 3,
        sku: 'HW-MBXP-I7-1TB-SLV',
        attributes: [
          { name: '颜色', value: '皓月银' },
          { name: '处理器', value: 'i7-1360P' },
          { name: '内存', value: '16GB' },
          { name: '存储', value: '1TB SSD' }
        ],
        isSelected: false,
        isAvailable: true,
        stock: 45,
        addedAt: '2024-01-18T09:15:00Z'
      }
    ],
    updatedAt: '2024-01-20T10:30:00Z'
  }
]

// 优惠券数据
const coupons = [
  {
    id: 1,
    name: '新用户专享券',
    code: 'NEW100',
    type: 'fixed', // fixed: 固定金额, percent: 百分比
    value: 100.00,
    minAmount: 500.00,
    maxDiscount: null,
    description: '满500减100',
    startTime: '2024-01-01T00:00:00Z',
    endTime: '2024-12-31T23:59:59Z',
    isAvailable: true,
    isUsed: false,
    applicableCategories: [], // 空数组表示全品类
    applicableProducts: []
  },
  {
    id: 2,
    name: '电子产品专享券',
    code: 'ELEC200',
    type: 'fixed',
    value: 200.00,
    minAmount: 2000.00,
    maxDiscount: null,
    description: '电子产品满2000减200',
    startTime: '2024-01-01T00:00:00Z',
    endTime: '2024-06-30T23:59:59Z',
    isAvailable: true,
    isUsed: false,
    applicableCategories: [1], // 电子产品分类ID
    applicableProducts: []
  },
  {
    id: 3,
    name: '全场通用券',
    code: 'ALL10',
    type: 'percent',
    value: 10, // 10%
    minAmount: 1000.00,
    maxDiscount: 500.00,
    description: '全场满1000享9折，最高减500',
    startTime: '2024-01-01T00:00:00Z',
    endTime: '2024-03-31T23:59:59Z',
    isAvailable: true,
    isUsed: false,
    applicableCategories: [],
    applicableProducts: []
  }
]

// 收货地址数据
const addresses = [
  {
    id: 1,
    userId: 2,
    receiverName: '张三',
    receiverPhone: '13800138001',
    province: '北京市',
    city: '北京市',
    district: '朝阳区',
    street: '建国路88号',
    detailAddress: 'SOHO现代城A座1001室',
    postalCode: '100020',
    isDefault: true,
    tag: '家',
    createdAt: '2023-06-15T08:20:00Z',
    updatedAt: '2024-01-10T14:30:00Z'
  },
  {
    id: 2,
    userId: 2,
    receiverName: '张三',
    receiverPhone: '13800138001',
    province: '上海市',
    city: '上海市',
    district: '浦东新区',
    street: '陆家嘴环路1000号',
    detailAddress: '恒生银行大厦20楼',
    postalCode: '200120',
    isDefault: false,
    tag: '公司',
    createdAt: '2023-08-20T16:45:00Z',
    updatedAt: '2023-08-20T16:45:00Z'
  },
  {
    id: 3,
    userId: 2,
    receiverName: '李四',
    receiverPhone: '13800138002',
    province: '广东省',
    city: '深圳市',
    district: '南山区',
    street: '科技园南区',
    detailAddress: '腾讯大厦35楼',
    postalCode: '518000',
    isDefault: false,
    tag: '朋友',
    createdAt: '2023-10-12T11:20:00Z',
    updatedAt: '2023-10-12T11:20:00Z'
  }
]

// 购物车相关的Mock API方法
const cartMock = {
  // 获取购物车
  getCart: (userId) => {
    const userCart = carts.find(c => c.userId === userId)
    if (!userCart) {
      return {
        id: null,
        userId,
        items: [],
        updatedAt: new Date().toISOString()
      }
    }
    
    // 计算购物车统计信息
    const selectedItems = userCart.items.filter(item => item.isSelected && item.isAvailable)
    const totalQuantity = selectedItems.reduce((sum, item) => sum + item.quantity, 0)
    const totalAmount = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const totalOriginalAmount = selectedItems.reduce((sum, item) => sum + (item.originalPrice * item.quantity), 0)
    const totalDiscount = totalOriginalAmount - totalAmount
    
    return {
      ...userCart,
      summary: {
        totalItems: userCart.items.length,
        selectedItems: selectedItems.length,
        totalQuantity,
        totalAmount,
        totalOriginalAmount,
        totalDiscount,
        isAllSelected: userCart.items.length > 0 && userCart.items.every(item => item.isSelected || !item.isAvailable)
      }
    }
  },
  
  // 添加商品到购物车
  addToCart: (userId, productData) => {
    const {
      productId,
      productName,
      productImage,
      price,
      originalPrice,
      quantity = 1,
      sku,
      attributes,
      maxQuantity,
      stock
    } = productData
    
    let userCart = carts.find(c => c.userId === userId)
    
    // 如果用户没有购物车，创建一个
    if (!userCart) {
      userCart = {
        id: carts.length + 1,
        userId,
        items: [],
        updatedAt: new Date().toISOString()
      }
      carts.push(userCart)
    }
    
    // 检查商品是否已存在（相同商品ID和SKU）
    const existingItemIndex = userCart.items.findIndex(item => 
      item.productId === productId && item.sku === sku
    )
    
    if (existingItemIndex !== -1) {
      // 商品已存在，增加数量
      const existingItem = userCart.items[existingItemIndex]
      const newQuantity = existingItem.quantity + quantity
      
      if (newQuantity > maxQuantity) {
        throw new Error(`商品数量不能超过${maxQuantity}件`)
      }
      
      if (newQuantity > stock) {
        throw new Error('商品库存不足')
      }
      
      userCart.items[existingItemIndex].quantity = newQuantity
      userCart.items[existingItemIndex].isSelected = true
    } else {
      // 新商品，添加到购物车
      if (quantity > maxQuantity) {
        throw new Error(`商品数量不能超过${maxQuantity}件`)
      }
      
      if (quantity > stock) {
        throw new Error('商品库存不足')
      }
      
      const newItem = {
        id: Date.now(), // 简单的ID生成
        productId,
        productName,
        productImage,
        price,
        originalPrice: originalPrice || price,
        quantity,
        maxQuantity,
        sku,
        attributes: attributes || [],
        isSelected: true,
        isAvailable: true,
        stock,
        addedAt: new Date().toISOString()
      }
      
      userCart.items.push(newItem)
    }
    
    userCart.updatedAt = new Date().toISOString()
    
    return cartMock.getCart(userId)
  },
  
  // 更新购物车商品数量
  updateCartItem: (userId, itemId, quantity) => {
    const userCart = carts.find(c => c.userId === userId)
    if (!userCart) {
      throw new Error('购物车不存在')
    }
    
    const itemIndex = userCart.items.findIndex(item => item.id === itemId)
    if (itemIndex === -1) {
      throw new Error('商品不存在')
    }
    
    const item = userCart.items[itemIndex]
    
    if (quantity <= 0) {
      throw new Error('商品数量必须大于0')
    }
    
    if (quantity > item.maxQuantity) {
      throw new Error(`商品数量不能超过${item.maxQuantity}件`)
    }
    
    if (quantity > item.stock) {
      throw new Error('商品库存不足')
    }
    
    userCart.items[itemIndex].quantity = quantity
    userCart.updatedAt = new Date().toISOString()
    
    return cartMock.getCart(userId)
  },
  
  // 删除购物车商品
  removeCartItem: (userId, itemId) => {
    const userCart = carts.find(c => c.userId === userId)
    if (!userCart) {
      throw new Error('购物车不存在')
    }
    
    const itemIndex = userCart.items.findIndex(item => item.id === itemId)
    if (itemIndex === -1) {
      throw new Error('商品不存在')
    }
    
    userCart.items.splice(itemIndex, 1)
    userCart.updatedAt = new Date().toISOString()
    
    return cartMock.getCart(userId)
  },
  
  // 批量删除购物车商品
  removeCartItems: (userId, itemIds) => {
    const userCart = carts.find(c => c.userId === userId)
    if (!userCart) {
      throw new Error('购物车不存在')
    }
    
    userCart.items = userCart.items.filter(item => !itemIds.includes(item.id))
    userCart.updatedAt = new Date().toISOString()
    
    return cartMock.getCart(userId)
  },
  
  // 清空购物车
  clearCart: (userId) => {
    const userCart = carts.find(c => c.userId === userId)
    if (!userCart) {
      throw new Error('购物车不存在')
    }
    
    userCart.items = []
    userCart.updatedAt = new Date().toISOString()
    
    return cartMock.getCart(userId)
  },
  
  // 选择/取消选择商品
  selectCartItem: (userId, itemId, isSelected) => {
    const userCart = carts.find(c => c.userId === userId)
    if (!userCart) {
      throw new Error('购物车不存在')
    }
    
    const itemIndex = userCart.items.findIndex(item => item.id === itemId)
    if (itemIndex === -1) {
      throw new Error('商品不存在')
    }
    
    userCart.items[itemIndex].isSelected = isSelected
    userCart.updatedAt = new Date().toISOString()
    
    return cartMock.getCart(userId)
  },
  
  // 全选/取消全选
  selectAllCartItems: (userId, isSelected) => {
    const userCart = carts.find(c => c.userId === userId)
    if (!userCart) {
      throw new Error('购物车不存在')
    }
    
    userCart.items.forEach(item => {
      if (item.isAvailable) {
        item.isSelected = isSelected
      }
    })
    userCart.updatedAt = new Date().toISOString()
    
    return cartMock.getCart(userId)
  },
  
  // 获取可用优惠券
  getAvailableCoupons: (userId, totalAmount, categoryIds = [], productIds = []) => {
    const now = new Date()
    
    return coupons.filter(coupon => {
      // 检查是否可用
      if (!coupon.isAvailable || coupon.isUsed) {
        return false
      }
      
      // 检查时间范围
      if (now < new Date(coupon.startTime) || now > new Date(coupon.endTime)) {
        return false
      }
      
      // 检查最低消费金额
      if (totalAmount < coupon.minAmount) {
        return false
      }
      
      // 检查适用分类
      if (coupon.applicableCategories.length > 0) {
        const hasApplicableCategory = coupon.applicableCategories.some(catId => 
          categoryIds.includes(catId)
        )
        if (!hasApplicableCategory) {
          return false
        }
      }
      
      // 检查适用商品
      if (coupon.applicableProducts.length > 0) {
        const hasApplicableProduct = coupon.applicableProducts.some(prodId => 
          productIds.includes(prodId)
        )
        if (!hasApplicableProduct) {
          return false
        }
      }
      
      return true
    }).map(coupon => {
      // 计算优惠金额
      let discountAmount = 0
      if (coupon.type === 'fixed') {
        discountAmount = coupon.value
      } else if (coupon.type === 'percent') {
        discountAmount = totalAmount * (coupon.value / 100)
        if (coupon.maxDiscount && discountAmount > coupon.maxDiscount) {
          discountAmount = coupon.maxDiscount
        }
      }
      
      return {
        ...coupon,
        discountAmount
      }
    })
  },
  
  // 获取收货地址列表
  getAddresses: (userId) => {
    return addresses.filter(addr => addr.userId === userId)
      .sort((a, b) => {
        // 默认地址排在前面
        if (a.isDefault && !b.isDefault) return -1
        if (!a.isDefault && b.isDefault) return 1
        // 按更新时间倒序
        return new Date(b.updatedAt) - new Date(a.updatedAt)
      })
  },
  
  // 添加收货地址
  addAddress: (userId, addressData) => {
    const {
      receiverName,
      receiverPhone,
      province,
      city,
      district,
      street,
      detailAddress,
      postalCode,
      isDefault = false,
      tag = ''
    } = addressData
    
    // 如果设置为默认地址，取消其他默认地址
    if (isDefault) {
      addresses.forEach(addr => {
        if (addr.userId === userId && addr.isDefault) {
          addr.isDefault = false
        }
      })
    }
    
    const newAddress = {
      id: addresses.length + 1,
      userId,
      receiverName,
      receiverPhone,
      province,
      city,
      district,
      street,
      detailAddress,
      postalCode,
      isDefault,
      tag,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    addresses.push(newAddress)
    return newAddress
  },
  
  // 更新收货地址
  updateAddress: (userId, addressId, addressData) => {
    const addressIndex = addresses.findIndex(addr => 
      addr.id === addressId && addr.userId === userId
    )
    
    if (addressIndex === -1) {
      throw new Error('地址不存在')
    }
    
    // 如果设置为默认地址，取消其他默认地址
    if (addressData.isDefault) {
      addresses.forEach(addr => {
        if (addr.userId === userId && addr.id !== addressId && addr.isDefault) {
          addr.isDefault = false
        }
      })
    }
    
    addresses[addressIndex] = {
      ...addresses[addressIndex],
      ...addressData,
      updatedAt: new Date().toISOString()
    }
    
    return addresses[addressIndex]
  },
  
  // 删除收货地址
  deleteAddress: (userId, addressId) => {
    const addressIndex = addresses.findIndex(addr => 
      addr.id === addressId && addr.userId === userId
    )
    
    if (addressIndex === -1) {
      throw new Error('地址不存在')
    }
    
    addresses.splice(addressIndex, 1)
    return { message: '地址删除成功' }
  },
  
  // 设置默认地址
  setDefaultAddress: (userId, addressId) => {
    // 取消所有默认地址
    addresses.forEach(addr => {
      if (addr.userId === userId) {
        addr.isDefault = false
      }
    })
    
    // 设置新的默认地址
    const addressIndex = addresses.findIndex(addr => 
      addr.id === addressId && addr.userId === userId
    )
    
    if (addressIndex === -1) {
      throw new Error('地址不存在')
    }
    
    addresses[addressIndex].isDefault = true
    addresses[addressIndex].updatedAt = new Date().toISOString()
    
    return addresses[addressIndex]
  }
}

export default cartMock