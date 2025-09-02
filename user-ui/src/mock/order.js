/**
 * 订单相关的Mock数据
 */

// 订单状态枚举
const ORDER_STATUS = {
  PENDING_PAYMENT: 'pending_payment',    // 待付款
  PENDING_SHIPMENT: 'pending_shipment',  // 待发货
  SHIPPED: 'shipped',                    // 已发货
  DELIVERED: 'delivered',                // 已送达
  COMPLETED: 'completed',                // 已完成
  CANCELLED: 'cancelled',                // 已取消
  REFUNDING: 'refunding',                // 退款中
  REFUNDED: 'refunded'                   // 已退款
}

// 支付方式枚举
const PAYMENT_METHOD = {
  ALIPAY: 'alipay',
  WECHAT: 'wechat',
  BANK_CARD: 'bank_card',
  BALANCE: 'balance',
  POINTS: 'points'
}

// 配送方式枚举
const SHIPPING_METHOD = {
  STANDARD: 'standard',    // 标准配送
  EXPRESS: 'express',      // 快速配送
  SAME_DAY: 'same_day',    // 当日达
  PICKUP: 'pickup'         // 自提
}

// 模拟订单数据
const orders = [
  {
    id: 1,
    orderNo: 'ORD202401200001',
    userId: 2,
    status: ORDER_STATUS.DELIVERED,
    statusText: '已送达',
    totalAmount: 9999.00,
    discountAmount: 1000.00,
    shippingFee: 0.00,
    actualAmount: 8999.00,
    paymentMethod: PAYMENT_METHOD.ALIPAY,
    paymentMethodText: '支付宝',
    shippingMethod: SHIPPING_METHOD.EXPRESS,
    shippingMethodText: '快速配送',
    remark: '请放在门卫处',
    createdAt: '2024-01-15T10:30:00Z',
    paidAt: '2024-01-15T10:35:00Z',
    shippedAt: '2024-01-16T09:00:00Z',
    deliveredAt: '2024-01-17T14:20:00Z',
    completedAt: null,
    cancelledAt: null,
    // 收货地址
    shippingAddress: {
      id: 1,
      receiverName: '张三',
      receiverPhone: '13800138001',
      province: '北京市',
      city: '北京市',
      district: '朝阳区',
      street: '建国路88号',
      detailAddress: 'SOHO现代城A座1001室',
      postalCode: '100020',
      isDefault: true
    },
    // 订单商品
    items: [
      {
        id: 1,
        productId: 1,
        productName: 'iPhone 15 Pro Max',
        productImage: '/assets/products/iphone15-thumb.jpg',
        sku: 'APL-IP15PM-256-NT',
        price: 9999.00,
        quantity: 1,
        totalPrice: 9999.00,
        attributes: [
          { name: '颜色', value: '自然钛金色' },
          { name: '存储容量', value: '256GB' }
        ]
      }
    ],
    // 物流信息
    logistics: {
      company: '顺丰速运',
      trackingNo: 'SF1234567890',
      status: '已签收',
      tracks: [
        {
          time: '2024-01-17T14:20:00Z',
          description: '快件已签收，签收人：张三',
          location: '北京市朝阳区建国路营业点'
        },
        {
          time: '2024-01-17T09:30:00Z',
          description: '快件正在派送中，派送员：李师傅 13912345678',
          location: '北京市朝阳区建国路营业点'
        },
        {
          time: '2024-01-17T06:00:00Z',
          description: '快件已到达目的地网点',
          location: '北京市朝阳区建国路营业点'
        },
        {
          time: '2024-01-16T20:30:00Z',
          description: '快件正在运输途中',
          location: '北京转运中心'
        },
        {
          time: '2024-01-16T09:00:00Z',
          description: '快件已发出',
          location: '深圳华强北营业点'
        }
      ]
    },
    // 发票信息
    invoice: {
      type: 'electronic',
      title: '个人',
      content: '商品明细',
      email: 'zhangsan@example.com'
    }
  },
  {
    id: 2,
    orderNo: 'ORD202401190001',
    userId: 2,
    status: ORDER_STATUS.SHIPPED,
    statusText: '已发货',
    totalAmount: 1899.00,
    discountAmount: 100.00,
    shippingFee: 0.00,
    actualAmount: 1799.00,
    paymentMethod: PAYMENT_METHOD.WECHAT,
    paymentMethodText: '微信支付',
    shippingMethod: SHIPPING_METHOD.STANDARD,
    shippingMethodText: '标准配送',
    remark: '',
    createdAt: '2024-01-18T16:45:00Z',
    paidAt: '2024-01-18T16:50:00Z',
    shippedAt: '2024-01-19T10:00:00Z',
    deliveredAt: null,
    completedAt: null,
    cancelledAt: null,
    shippingAddress: {
      id: 1,
      receiverName: '张三',
      receiverPhone: '13800138001',
      province: '北京市',
      city: '北京市',
      district: '朝阳区',
      street: '建国路88号',
      detailAddress: 'SOHO现代城A座1001室',
      postalCode: '100020',
      isDefault: true
    },
    items: [
      {
        id: 2,
        productId: 3,
        productName: 'AirPods Pro 第三代',
        productImage: '/assets/products/airpods-thumb.jpg',
        sku: 'APL-APP3-WHT',
        price: 1899.00,
        quantity: 1,
        totalPrice: 1899.00,
        attributes: [
          { name: '颜色', value: '白色' }
        ]
      }
    ],
    logistics: {
      company: '中通快递',
      trackingNo: 'ZT9876543210',
      status: '运输中',
      tracks: [
        {
          time: '2024-01-19T18:30:00Z',
          description: '快件正在运输途中',
          location: '北京转运中心'
        },
        {
          time: '2024-01-19T10:00:00Z',
          description: '快件已发出',
          location: '深圳华强北营业点'
        }
      ]
    },
    invoice: null
  },
  {
    id: 3,
    orderNo: 'ORD202401180001',
    userId: 2,
    status: ORDER_STATUS.PENDING_PAYMENT,
    statusText: '待付款',
    totalAmount: 15999.00,
    discountAmount: 1000.00,
    shippingFee: 0.00,
    actualAmount: 14999.00,
    paymentMethod: null,
    paymentMethodText: '',
    shippingMethod: SHIPPING_METHOD.EXPRESS,
    shippingMethodText: '快速配送',
    remark: '请尽快发货',
    createdAt: '2024-01-18T14:20:00Z',
    paidAt: null,
    shippedAt: null,
    deliveredAt: null,
    completedAt: null,
    cancelledAt: null,
    // 订单过期时间（创建后30分钟）
    expireAt: '2024-01-18T14:50:00Z',
    shippingAddress: {
      id: 2,
      receiverName: '李四',
      receiverPhone: '13800138002',
      province: '上海市',
      city: '上海市',
      district: '浦东新区',
      street: '陆家嘴环路1000号',
      detailAddress: '恒生银行大厦20楼',
      postalCode: '200120',
      isDefault: false
    },
    items: [
      {
        id: 3,
        productId: 2,
        productName: 'MacBook Pro 14英寸',
        productImage: '/assets/products/macbook-thumb.jpg',
        sku: 'APL-MBP14-M3P-512-SG',
        price: 15999.00,
        quantity: 1,
        totalPrice: 15999.00,
        attributes: [
          { name: '颜色', value: '深空灰色' },
          { name: '芯片', value: 'M3 Pro' },
          { name: '内存', value: '18GB' },
          { name: '存储', value: '512GB SSD' }
        ]
      }
    ],
    logistics: null,
    invoice: {
      type: 'company',
      title: '上海某某科技有限公司',
      taxNo: '91310000123456789X',
      content: '办公用品',
      email: 'finance@company.com'
    }
  },
  {
    id: 4,
    orderNo: 'ORD202401170001',
    userId: 2,
    status: ORDER_STATUS.CANCELLED,
    statusText: '已取消',
    totalAmount: 5999.00,
    discountAmount: 300.00,
    shippingFee: 15.00,
    actualAmount: 5714.00,
    paymentMethod: null,
    paymentMethodText: '',
    shippingMethod: SHIPPING_METHOD.STANDARD,
    shippingMethodText: '标准配送',
    remark: '',
    createdAt: '2024-01-17T09:15:00Z',
    paidAt: null,
    shippedAt: null,
    deliveredAt: null,
    completedAt: null,
    cancelledAt: '2024-01-17T10:30:00Z',
    cancelReason: '不想要了',
    shippingAddress: {
      id: 1,
      receiverName: '张三',
      receiverPhone: '13800138001',
      province: '北京市',
      city: '北京市',
      district: '朝阳区',
      street: '建国路88号',
      detailAddress: 'SOHO现代城A座1001室',
      postalCode: '100020',
      isDefault: true
    },
    items: [
      {
        id: 4,
        productId: 4,
        productName: '小米14 Ultra',
        productImage: '/assets/products/xiaomi14-thumb.jpg',
        sku: 'XM-14U-512-BLK',
        price: 5999.00,
        quantity: 1,
        totalPrice: 5999.00,
        attributes: [
          { name: '颜色', value: '黑色' },
          { name: '存储', value: '512GB' },
          { name: '内存', value: '16GB' }
        ]
      }
    ],
    logistics: null,
    invoice: null
  }
]

// 退款/售后数据
const refunds = [
  {
    id: 1,
    orderNo: 'ORD202401150001',
    refundNo: 'REF202401200001',
    userId: 2,
    type: 'refund_only',  // 仅退款
    reason: '商品质量问题',
    description: '收到商品有划痕',
    amount: 1899.00,
    status: 'approved',
    statusText: '退款成功',
    images: ['/assets/refunds/ref1-1.jpg', '/assets/refunds/ref1-2.jpg'],
    createdAt: '2024-01-18T10:00:00Z',
    processedAt: '2024-01-19T14:30:00Z',
    completedAt: '2024-01-20T09:15:00Z',
    adminRemark: '已核实，同意退款',
    items: [
      {
        productId: 3,
        productName: 'AirPods Pro 第三代',
        quantity: 1,
        refundAmount: 1899.00
      }
    ]
  }
]

// 订单相关的Mock API方法
const orderMock = {
  // 获取订单列表
  getOrders: (params = {}) => {
    const {
      userId,
      page = 1,
      pageSize = 10,
      status,
      startDate,
      endDate,
      keyword
    } = params
    
    let filteredOrders = [...orders]
    
    // 用户筛选
    if (userId) {
      filteredOrders = filteredOrders.filter(o => o.userId === userId)
    }
    
    // 状态筛选
    if (status) {
      filteredOrders = filteredOrders.filter(o => o.status === status)
    }
    
    // 日期筛选
    if (startDate) {
      filteredOrders = filteredOrders.filter(o => new Date(o.createdAt) >= new Date(startDate))
    }
    if (endDate) {
      filteredOrders = filteredOrders.filter(o => new Date(o.createdAt) <= new Date(endDate))
    }
    
    // 关键词搜索（订单号、商品名称）
    if (keyword) {
      const searchTerm = keyword.toLowerCase()
      filteredOrders = filteredOrders.filter(o => 
        o.orderNo.toLowerCase().includes(searchTerm) ||
        o.items.some(item => item.productName.toLowerCase().includes(searchTerm))
      )
    }
    
    // 按创建时间倒序排列
    filteredOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    
    // 分页
    const total = filteredOrders.length
    const totalPages = Math.ceil(total / pageSize)
    const start = (page - 1) * pageSize
    const end = start + pageSize
    const items = filteredOrders.slice(start, end)
    
    return {
      items,
      pagination: {
        page,
        pageSize,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      },
      summary: {
        totalOrders: orders.filter(o => userId ? o.userId === userId : true).length,
        pendingPayment: orders.filter(o => (userId ? o.userId === userId : true) && o.status === ORDER_STATUS.PENDING_PAYMENT).length,
        pendingShipment: orders.filter(o => (userId ? o.userId === userId : true) && o.status === ORDER_STATUS.PENDING_SHIPMENT).length,
        shipped: orders.filter(o => (userId ? o.userId === userId : true) && o.status === ORDER_STATUS.SHIPPED).length,
        completed: orders.filter(o => (userId ? o.userId === userId : true) && o.status === ORDER_STATUS.COMPLETED).length
      }
    }
  },
  
  // 获取订单详情
  getOrderDetail: (orderNo) => {
    const order = orders.find(o => o.orderNo === orderNo)
    if (!order) {
      throw new Error('订单不存在')
    }
    return order
  },
  
  // 创建订单
  createOrder: (orderData) => {
    const {
      userId,
      items,
      shippingAddressId,
      shippingMethod,
      paymentMethod,
      remark,
      invoice,
      couponId
    } = orderData
    
    // 计算订单金额
    const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const discountAmount = couponId ? 100 : 0 // 模拟优惠券折扣
    const shippingFee = shippingMethod === SHIPPING_METHOD.EXPRESS ? 0 : (totalAmount < 99 ? 15 : 0)
    const actualAmount = totalAmount - discountAmount + shippingFee
    
    const newOrder = {
      id: orders.length + 1,
      orderNo: `ORD${new Date().toISOString().slice(0, 10).replace(/-/g, '')}${String(orders.length + 1).padStart(4, '0')}`,
      userId,
      status: ORDER_STATUS.PENDING_PAYMENT,
      statusText: '待付款',
      totalAmount,
      discountAmount,
      shippingFee,
      actualAmount,
      paymentMethod: null,
      paymentMethodText: '',
      shippingMethod,
      shippingMethodText: shippingMethod === SHIPPING_METHOD.EXPRESS ? '快速配送' : '标准配送',
      remark: remark || '',
      createdAt: new Date().toISOString(),
      paidAt: null,
      shippedAt: null,
      deliveredAt: null,
      completedAt: null,
      cancelledAt: null,
      expireAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30分钟后过期
      shippingAddress: {
        id: shippingAddressId,
        receiverName: '张三',
        receiverPhone: '13800138001',
        province: '北京市',
        city: '北京市',
        district: '朝阳区',
        street: '建国路88号',
        detailAddress: 'SOHO现代城A座1001室',
        postalCode: '100020',
        isDefault: true
      },
      items: items.map((item, index) => ({
        id: orders.length * 10 + index + 1,
        ...item,
        totalPrice: item.price * item.quantity
      })),
      logistics: null,
      invoice
    }
    
    orders.push(newOrder)
    return newOrder
  },
  
  // 支付订单
  payOrder: (orderNo, paymentMethod) => {
    const orderIndex = orders.findIndex(o => o.orderNo === orderNo)
    if (orderIndex === -1) {
      throw new Error('订单不存在')
    }
    
    const order = orders[orderIndex]
    if (order.status !== ORDER_STATUS.PENDING_PAYMENT) {
      throw new Error('订单状态不正确')
    }
    
    // 检查订单是否过期
    if (new Date() > new Date(order.expireAt)) {
      orders[orderIndex].status = ORDER_STATUS.CANCELLED
      orders[orderIndex].statusText = '已取消'
      orders[orderIndex].cancelledAt = new Date().toISOString()
      orders[orderIndex].cancelReason = '订单超时未支付'
      throw new Error('订单已过期')
    }
    
    // 更新订单状态
    orders[orderIndex].status = ORDER_STATUS.PENDING_SHIPMENT
    orders[orderIndex].statusText = '待发货'
    orders[orderIndex].paymentMethod = paymentMethod
    orders[orderIndex].paymentMethodText = {
      [PAYMENT_METHOD.ALIPAY]: '支付宝',
      [PAYMENT_METHOD.WECHAT]: '微信支付',
      [PAYMENT_METHOD.BANK_CARD]: '银行卡',
      [PAYMENT_METHOD.BALANCE]: '余额支付',
      [PAYMENT_METHOD.POINTS]: '积分支付'
    }[paymentMethod]
    orders[orderIndex].paidAt = new Date().toISOString()
    
    return {
      message: '支付成功',
      order: orders[orderIndex]
    }
  },
  
  // 取消订单
  cancelOrder: (orderNo, reason) => {
    const orderIndex = orders.findIndex(o => o.orderNo === orderNo)
    if (orderIndex === -1) {
      throw new Error('订单不存在')
    }
    
    const order = orders[orderIndex]
    if (![ORDER_STATUS.PENDING_PAYMENT, ORDER_STATUS.PENDING_SHIPMENT].includes(order.status)) {
      throw new Error('当前订单状态不支持取消')
    }
    
    orders[orderIndex].status = ORDER_STATUS.CANCELLED
    orders[orderIndex].statusText = '已取消'
    orders[orderIndex].cancelledAt = new Date().toISOString()
    orders[orderIndex].cancelReason = reason
    
    return {
      message: '订单取消成功',
      order: orders[orderIndex]
    }
  },
  
  // 确认收货
  confirmOrder: (orderNo) => {
    const orderIndex = orders.findIndex(o => o.orderNo === orderNo)
    if (orderIndex === -1) {
      throw new Error('订单不存在')
    }
    
    const order = orders[orderIndex]
    if (order.status !== ORDER_STATUS.DELIVERED) {
      throw new Error('订单状态不正确')
    }
    
    orders[orderIndex].status = ORDER_STATUS.COMPLETED
    orders[orderIndex].statusText = '已完成'
    orders[orderIndex].completedAt = new Date().toISOString()
    
    return {
      message: '确认收货成功',
      order: orders[orderIndex]
    }
  },
  
  // 获取物流信息
  getLogistics: (orderNo) => {
    const order = orders.find(o => o.orderNo === orderNo)
    if (!order) {
      throw new Error('订单不存在')
    }
    
    if (!order.logistics) {
      throw new Error('暂无物流信息')
    }
    
    return order.logistics
  },
  
  // 申请退款
  applyRefund: (refundData) => {
    const {
      orderNo,
      userId,
      type,
      reason,
      description,
      amount,
      images,
      items
    } = refundData
    
    const order = orders.find(o => o.orderNo === orderNo)
    if (!order) {
      throw new Error('订单不存在')
    }
    
    if (order.userId !== userId) {
      throw new Error('无权限操作此订单')
    }
    
    const newRefund = {
      id: refunds.length + 1,
      orderNo,
      refundNo: `REF${new Date().toISOString().slice(0, 10).replace(/-/g, '')}${String(refunds.length + 1).padStart(4, '0')}`,
      userId,
      type,
      reason,
      description,
      amount,
      status: 'pending',
      statusText: '待审核',
      images: images || [],
      createdAt: new Date().toISOString(),
      processedAt: null,
      completedAt: null,
      adminRemark: '',
      items
    }
    
    refunds.push(newRefund)
    
    // 更新订单状态
    const orderIndex = orders.findIndex(o => o.orderNo === orderNo)
    if (orderIndex !== -1) {
      orders[orderIndex].status = ORDER_STATUS.REFUNDING
      orders[orderIndex].statusText = '退款中'
    }
    
    return newRefund
  },
  
  // 获取退款列表
  getRefunds: (userId, page = 1, pageSize = 10) => {
    let filteredRefunds = refunds.filter(r => r.userId === userId)
    
    // 按创建时间倒序排列
    filteredRefunds.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    
    // 分页
    const total = filteredRefunds.length
    const totalPages = Math.ceil(total / pageSize)
    const start = (page - 1) * pageSize
    const end = start + pageSize
    const items = filteredRefunds.slice(start, end)
    
    return {
      items,
      pagination: {
        page,
        pageSize,
        total,
        totalPages
      }
    }
  },
  
  // 获取订单统计
  getOrderStats: (userId) => {
    const userOrders = orders.filter(o => o.userId === userId)
    
    return {
      totalOrders: userOrders.length,
      totalAmount: userOrders.reduce((sum, o) => sum + o.actualAmount, 0),
      pendingPayment: userOrders.filter(o => o.status === ORDER_STATUS.PENDING_PAYMENT).length,
      pendingShipment: userOrders.filter(o => o.status === ORDER_STATUS.PENDING_SHIPMENT).length,
      shipped: userOrders.filter(o => o.status === ORDER_STATUS.SHIPPED).length,
      delivered: userOrders.filter(o => o.status === ORDER_STATUS.DELIVERED).length,
      completed: userOrders.filter(o => o.status === ORDER_STATUS.COMPLETED).length,
      cancelled: userOrders.filter(o => o.status === ORDER_STATUS.CANCELLED).length,
      refunding: userOrders.filter(o => o.status === ORDER_STATUS.REFUNDING).length
    }
  }
}

export {
  ORDER_STATUS,
  PAYMENT_METHOD,
  SHIPPING_METHOD
}

export default orderMock