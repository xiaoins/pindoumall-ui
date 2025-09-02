/**
 * 商品相关的Mock数据
 */

// 商品分类数据
const categories = [
  {
    id: 1,
    name: '电子产品',
    slug: 'electronics',
    icon: 'fa fa-laptop',
    image: '/assets/categories/electronics.jpg',
    description: '手机、电脑、数码配件等',
    parentId: null,
    level: 1,
    sort: 1,
    isActive: true,
    children: [
      {
        id: 11,
        name: '手机通讯',
        slug: 'mobile-phones',
        icon: 'fa fa-mobile-alt',
        image: '/assets/categories/mobile.jpg',
        description: '智能手机、功能机、对讲机等',
        parentId: 1,
        level: 2,
        sort: 1,
        isActive: true
      },
      {
        id: 12,
        name: '电脑办公',
        slug: 'computers',
        icon: 'fa fa-desktop',
        image: '/assets/categories/computers.jpg',
        description: '笔记本、台式机、办公设备等',
        parentId: 1,
        level: 2,
        sort: 2,
        isActive: true
      },
      {
        id: 13,
        name: '数码配件',
        slug: 'digital-accessories',
        icon: 'fa fa-headphones',
        image: '/assets/categories/accessories.jpg',
        description: '耳机、充电器、数据线等',
        parentId: 1,
        level: 2,
        sort: 3,
        isActive: true
      }
    ]
  },
  {
    id: 2,
    name: '服装鞋帽',
    slug: 'fashion',
    icon: 'fa fa-tshirt',
    image: '/assets/categories/fashion.jpg',
    description: '男装、女装、鞋靴、配饰等',
    parentId: null,
    level: 1,
    sort: 2,
    isActive: true,
    children: [
      {
        id: 21,
        name: '男装',
        slug: 'mens-clothing',
        icon: 'fa fa-male',
        image: '/assets/categories/mens.jpg',
        description: '衬衫、T恤、裤子、外套等',
        parentId: 2,
        level: 2,
        sort: 1,
        isActive: true
      },
      {
        id: 22,
        name: '女装',
        slug: 'womens-clothing',
        icon: 'fa fa-female',
        image: '/assets/categories/womens.jpg',
        description: '连衣裙、上衣、裤子、外套等',
        parentId: 2,
        level: 2,
        sort: 2,
        isActive: true
      },
      {
        id: 23,
        name: '鞋靴',
        slug: 'shoes',
        icon: 'fa fa-shoe-prints',
        image: '/assets/categories/shoes.jpg',
        description: '运动鞋、皮鞋、靴子、凉鞋等',
        parentId: 2,
        level: 2,
        sort: 3,
        isActive: true
      }
    ]
  },
  {
    id: 3,
    name: '家居生活',
    slug: 'home-living',
    icon: 'fa fa-home',
    image: '/assets/categories/home.jpg',
    description: '家具、家纺、厨具、装饰等',
    parentId: null,
    level: 1,
    sort: 3,
    isActive: true,
    children: [
      {
        id: 31,
        name: '家具',
        slug: 'furniture',
        icon: 'fa fa-couch',
        image: '/assets/categories/furniture.jpg',
        description: '沙发、床、桌椅、柜子等',
        parentId: 3,
        level: 2,
        sort: 1,
        isActive: true
      },
      {
        id: 32,
        name: '家纺',
        slug: 'textiles',
        icon: 'fa fa-bed',
        image: '/assets/categories/textiles.jpg',
        description: '床上用品、窗帘、地毯等',
        parentId: 3,
        level: 2,
        sort: 2,
        isActive: true
      }
    ]
  },
  {
    id: 4,
    name: '美妆个护',
    slug: 'beauty',
    icon: 'fa fa-spa',
    image: '/assets/categories/beauty.jpg',
    description: '护肤、彩妆、个人护理等',
    parentId: null,
    level: 1,
    sort: 4,
    isActive: true,
    children: []
  },
  {
    id: 5,
    name: '运动户外',
    slug: 'sports',
    icon: 'fa fa-running',
    image: '/assets/categories/sports.jpg',
    description: '运动装备、户外用品等',
    parentId: null,
    level: 1,
    sort: 5,
    isActive: true,
    children: []
  }
]

// 商品数据
const products = [
  {
    id: 1,
    name: 'iPhone 15 Pro Max',
    slug: 'iphone-15-pro-max',
    description: '苹果最新旗舰手机，搭载A17 Pro芯片，钛金属机身，专业级摄影系统',
    shortDescription: '苹果最新旗舰手机',
    price: 9999.00,
    originalPrice: 10999.00,
    discount: 9,
    stock: 50,
    sales: 1250,
    rating: 4.8,
    reviews: 328,
    categoryId: 11,
    categoryName: '手机通讯',
    brand: 'Apple',
    model: 'iPhone 15 Pro Max',
    sku: 'APL-IP15PM-256-NT',
    weight: 221,
    dimensions: '159.9×76.7×8.25mm',
    images: [
      '/assets/products/iphone15-1.jpg',
      '/assets/products/iphone15-2.jpg',
      '/assets/products/iphone15-3.jpg',
      '/assets/products/iphone15-4.jpg'
    ],
    thumbnail: '/assets/products/iphone15-thumb.jpg',
    badges: ['新品', '热销', '推荐'],
    tags: ['苹果', '5G', '拍照', '游戏'],
    attributes: [
      { name: '颜色', value: '自然钛金色', options: ['自然钛金色', '蓝色钛金属', '白色钛金属', '黑色钛金属'] },
      { name: '存储容量', value: '256GB', options: ['128GB', '256GB', '512GB', '1TB'] },
      { name: '网络', value: '5G', options: ['5G'] },
      { name: '屏幕尺寸', value: '6.7英寸', options: ['6.7英寸'] }
    ],
    specifications: [
      { group: '基本信息', items: [
        { name: '品牌', value: 'Apple' },
        { name: '型号', value: 'iPhone 15 Pro Max' },
        { name: '上市时间', value: '2023年9月' },
        { name: '操作系统', value: 'iOS 17' }
      ]},
      { group: '屏幕显示', items: [
        { name: '屏幕尺寸', value: '6.7英寸' },
        { name: '分辨率', value: '2796×1290像素' },
        { name: '屏幕材质', value: 'Super Retina XDR OLED' },
        { name: '刷新率', value: '120Hz' }
      ]},
      { group: '性能配置', items: [
        { name: '处理器', value: 'A17 Pro芯片' },
        { name: '存储容量', value: '256GB' },
        { name: '运行内存', value: '8GB' }
      ]}
    ],
    isActive: true,
    isFeatured: true,
    isNew: true,
    isHot: true,
    createdAt: '2023-09-15T00:00:00Z',
    updatedAt: '2024-01-20T10:00:00Z'
  },
  {
    id: 2,
    name: 'MacBook Pro 14英寸',
    slug: 'macbook-pro-14',
    description: 'Apple M3 Pro芯片，14英寸Liquid Retina XDR显示屏，专业级性能',
    shortDescription: '苹果专业级笔记本电脑',
    price: 15999.00,
    originalPrice: 16999.00,
    discount: 6,
    stock: 30,
    sales: 856,
    rating: 4.9,
    reviews: 142,
    categoryId: 12,
    categoryName: '电脑办公',
    brand: 'Apple',
    model: 'MacBook Pro 14',
    sku: 'APL-MBP14-M3P-512-SG',
    weight: 1600,
    dimensions: '312.6×221.2×15.5mm',
    images: [
      '/assets/products/macbook-1.jpg',
      '/assets/products/macbook-2.jpg',
      '/assets/products/macbook-3.jpg'
    ],
    thumbnail: '/assets/products/macbook-thumb.jpg',
    badges: ['专业', '推荐'],
    tags: ['苹果', 'M3芯片', '专业', '设计'],
    attributes: [
      { name: '颜色', value: '深空灰色', options: ['深空灰色', '银色'] },
      { name: '芯片', value: 'M3 Pro', options: ['M3 Pro', 'M3 Max'] },
      { name: '内存', value: '18GB', options: ['18GB', '36GB'] },
      { name: '存储', value: '512GB SSD', options: ['512GB SSD', '1TB SSD', '2TB SSD'] }
    ],
    specifications: [
      { group: '基本信息', items: [
        { name: '品牌', value: 'Apple' },
        { name: '型号', value: 'MacBook Pro 14' },
        { name: '上市时间', value: '2023年10月' },
        { name: '操作系统', value: 'macOS Sonoma' }
      ]},
      { group: '显示屏', items: [
        { name: '屏幕尺寸', value: '14.2英寸' },
        { name: '分辨率', value: '3024×1964像素' },
        { name: '屏幕技术', value: 'Liquid Retina XDR' },
        { name: '亮度', value: '1000尼特' }
      ]}
    ],
    isActive: true,
    isFeatured: true,
    isNew: false,
    isHot: true,
    createdAt: '2023-10-30T00:00:00Z',
    updatedAt: '2024-01-18T14:30:00Z'
  },
  {
    id: 3,
    name: 'AirPods Pro 第三代',
    slug: 'airpods-pro-3rd',
    description: '主动降噪无线耳机，空间音频，自适应透明模式',
    shortDescription: '苹果主动降噪无线耳机',
    price: 1899.00,
    originalPrice: 1999.00,
    discount: 5,
    stock: 100,
    sales: 2340,
    rating: 4.7,
    reviews: 567,
    categoryId: 13,
    categoryName: '数码配件',
    brand: 'Apple',
    model: 'AirPods Pro 3rd',
    sku: 'APL-APP3-WHT',
    weight: 50.8,
    dimensions: '30.9×21.8×24.0mm',
    images: [
      '/assets/products/airpods-1.jpg',
      '/assets/products/airpods-2.jpg',
      '/assets/products/airpods-3.jpg'
    ],
    thumbnail: '/assets/products/airpods-thumb.jpg',
    badges: ['热销', '推荐'],
    tags: ['苹果', '降噪', '无线', '音乐'],
    attributes: [
      { name: '颜色', value: '白色', options: ['白色'] },
      { name: '连接方式', value: '蓝牙5.3', options: ['蓝牙5.3'] },
      { name: '降噪', value: '主动降噪', options: ['主动降噪'] }
    ],
    specifications: [
      { group: '基本信息', items: [
        { name: '品牌', value: 'Apple' },
        { name: '型号', value: 'AirPods Pro 第三代' },
        { name: '类型', value: '入耳式无线耳机' },
        { name: '连接方式', value: '蓝牙5.3' }
      ]},
      { group: '音频特性', items: [
        { name: '降噪功能', value: '主动降噪' },
        { name: '空间音频', value: '支持' },
        { name: '自适应均衡', value: '支持' },
        { name: '透明模式', value: '自适应透明模式' }
      ]}
    ],
    isActive: true,
    isFeatured: false,
    isNew: false,
    isHot: true,
    createdAt: '2023-09-12T00:00:00Z',
    updatedAt: '2024-01-15T09:20:00Z'
  },
  {
    id: 4,
    name: '小米14 Ultra',
    slug: 'xiaomi-14-ultra',
    description: '徕卡专业四摄，骁龙8 Gen3，2K 120Hz屏幕',
    shortDescription: '小米旗舰拍照手机',
    price: 5999.00,
    originalPrice: 6299.00,
    discount: 5,
    stock: 80,
    sales: 890,
    rating: 4.6,
    reviews: 234,
    categoryId: 11,
    categoryName: '手机通讯',
    brand: '小米',
    model: 'Xiaomi 14 Ultra',
    sku: 'XM-14U-512-BLK',
    weight: 224,
    dimensions: '161.4×75.3×9.2mm',
    images: [
      '/assets/products/xiaomi14-1.jpg',
      '/assets/products/xiaomi14-2.jpg',
      '/assets/products/xiaomi14-3.jpg'
    ],
    thumbnail: '/assets/products/xiaomi14-thumb.jpg',
    badges: ['新品', '拍照'],
    tags: ['小米', '徕卡', '拍照', '5G'],
    attributes: [
      { name: '颜色', value: '黑色', options: ['黑色', '白色', '蓝色'] },
      { name: '存储', value: '512GB', options: ['256GB', '512GB', '1TB'] },
      { name: '内存', value: '16GB', options: ['12GB', '16GB'] }
    ],
    specifications: [],
    isActive: true,
    isFeatured: true,
    isNew: true,
    isHot: false,
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-01-20T11:15:00Z'
  },
  {
    id: 5,
    name: '华为MateBook X Pro',
    slug: 'huawei-matebook-x-pro',
    description: '13.9英寸3K触控全面屏，第13代英特尔酷睿处理器',
    shortDescription: '华为轻薄笔记本电脑',
    price: 8999.00,
    originalPrice: 9999.00,
    discount: 10,
    stock: 45,
    sales: 456,
    rating: 4.5,
    reviews: 89,
    categoryId: 12,
    categoryName: '电脑办公',
    brand: '华为',
    model: 'MateBook X Pro',
    sku: 'HW-MBXP-I7-1TB-SLV',
    weight: 1260,
    dimensions: '304×220×14.6mm',
    images: [
      '/assets/products/matebook-1.jpg',
      '/assets/products/matebook-2.jpg'
    ],
    thumbnail: '/assets/products/matebook-thumb.jpg',
    badges: ['轻薄', '触控'],
    tags: ['华为', '轻薄', '触控', '商务'],
    attributes: [
      { name: '颜色', value: '皓月银', options: ['皓月银', '深空灰'] },
      { name: '处理器', value: 'i7-1360P', options: ['i5-1340P', 'i7-1360P'] },
      { name: '内存', value: '16GB', options: ['16GB', '32GB'] },
      { name: '存储', value: '1TB SSD', options: ['512GB SSD', '1TB SSD'] }
    ],
    specifications: [],
    isActive: true,
    isFeatured: false,
    isNew: false,
    isHot: false,
    createdAt: '2023-11-20T00:00:00Z',
    updatedAt: '2024-01-12T16:45:00Z'
  }
]

// 品牌数据
const brands = [
  { id: 1, name: 'Apple', logo: '/assets/brands/apple.png', isActive: true },
  { id: 2, name: '小米', logo: '/assets/brands/xiaomi.png', isActive: true },
  { id: 3, name: '华为', logo: '/assets/brands/huawei.png', isActive: true },
  { id: 4, name: '三星', logo: '/assets/brands/samsung.png', isActive: true },
  { id: 5, name: 'OPPO', logo: '/assets/brands/oppo.png', isActive: true },
  { id: 6, name: 'vivo', logo: '/assets/brands/vivo.png', isActive: true },
  { id: 7, name: '联想', logo: '/assets/brands/lenovo.png', isActive: true },
  { id: 8, name: '戴尔', logo: '/assets/brands/dell.png', isActive: true }
]

// 商品相关的Mock API方法
const productMock = {
  // 获取商品列表
  getProducts: (params = {}) => {
    const {
      page = 1,
      pageSize = 12,
      categoryId,
      brandId,
      keyword,
      minPrice,
      maxPrice,
      sortBy = 'default',
      isNew,
      isHot,
      isFeatured
    } = params
    
    let filteredProducts = [...products]
    
    // 分类筛选
    if (categoryId) {
      filteredProducts = filteredProducts.filter(p => p.categoryId === categoryId)
    }
    
    // 品牌筛选
    if (brandId) {
      const brand = brands.find(b => b.id === brandId)
      if (brand) {
        filteredProducts = filteredProducts.filter(p => p.brand === brand.name)
      }
    }
    
    // 关键词搜索
    if (keyword) {
      const searchTerm = keyword.toLowerCase()
      filteredProducts = filteredProducts.filter(p => 
        p.name.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm) ||
        p.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      )
    }
    
    // 价格筛选
    if (minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.price >= minPrice)
    }
    if (maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.price <= maxPrice)
    }
    
    // 特殊标签筛选
    if (isNew) {
      filteredProducts = filteredProducts.filter(p => p.isNew)
    }
    if (isHot) {
      filteredProducts = filteredProducts.filter(p => p.isHot)
    }
    if (isFeatured) {
      filteredProducts = filteredProducts.filter(p => p.isFeatured)
    }
    
    // 排序
    switch (sortBy) {
      case 'price_asc':
        filteredProducts.sort((a, b) => a.price - b.price)
        break
      case 'price_desc':
        filteredProducts.sort((a, b) => b.price - a.price)
        break
      case 'sales_desc':
        filteredProducts.sort((a, b) => b.sales - a.sales)
        break
      case 'rating_desc':
        filteredProducts.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        filteredProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        break
      default:
        // 默认排序：推荐商品在前，然后按销量
        filteredProducts.sort((a, b) => {
          if (a.isFeatured && !b.isFeatured) return -1
          if (!a.isFeatured && b.isFeatured) return 1
          return b.sales - a.sales
        })
    }
    
    // 分页
    const total = filteredProducts.length
    const totalPages = Math.ceil(total / pageSize)
    const start = (page - 1) * pageSize
    const end = start + pageSize
    const items = filteredProducts.slice(start, end)
    
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
      filters: {
        categories: categories.filter(c => c.level === 1),
        brands: brands.filter(b => b.isActive),
        priceRange: {
          min: Math.min(...products.map(p => p.price)),
          max: Math.max(...products.map(p => p.price))
        }
      }
    }
  },
  
  // 获取商品详情
  getProductDetail: (productId) => {
    const product = products.find(p => p.id === productId)
    if (!product) {
      throw new Error('商品不存在')
    }
    
    // 模拟相关商品推荐
    const relatedProducts = products
      .filter(p => p.id !== productId && p.categoryId === product.categoryId)
      .slice(0, 4)
    
    return {
      ...product,
      relatedProducts
    }
  },
  
  // 获取商品分类
  getCategories: (level = null) => {
    if (level === null) {
      return categories
    }
    return categories.filter(c => c.level === level)
  },
  
  // 获取品牌列表
  getBrands: () => {
    return brands.filter(b => b.isActive)
  },
  
  // 搜索商品
  searchProducts: (keyword, page = 1, pageSize = 12) => {
    return productMock.getProducts({ keyword, page, pageSize })
  },
  
  // 获取热门商品
  getHotProducts: (limit = 8) => {
    return products
      .filter(p => p.isHot)
      .sort((a, b) => b.sales - a.sales)
      .slice(0, limit)
  },
  
  // 获取新品
  getNewProducts: (limit = 8) => {
    return products
      .filter(p => p.isNew)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, limit)
  },
  
  // 获取推荐商品
  getFeaturedProducts: (limit = 8) => {
    return products
      .filter(p => p.isFeatured)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit)
  },
  
  // 获取商品评价
  getProductReviews: (productId, page = 1, pageSize = 10) => {
    // 模拟评价数据
    const reviews = [
      {
        id: 1,
        userId: 2,
        userName: '张三',
        userAvatar: '/assets/avatars/user1.jpg',
        rating: 5,
        content: '商品质量很好，物流很快，包装也很精美，非常满意！',
        images: ['/assets/reviews/review1-1.jpg', '/assets/reviews/review1-2.jpg'],
        createdAt: '2024-01-15T10:30:00Z',
        isVerified: true,
        attributes: [
          { name: '颜色', value: '黑色' },
          { name: '存储', value: '256GB' }
        ]
      },
      {
        id: 2,
        userId: 3,
        userName: '李四',
        userAvatar: '/assets/avatars/user2.jpg',
        rating: 4,
        content: '整体不错，就是价格有点贵，但是品质确实好。',
        images: [],
        createdAt: '2024-01-12T14:20:00Z',
        isVerified: true,
        attributes: [
          { name: '颜色', value: '白色' },
          { name: '存储', value: '512GB' }
        ]
      }
    ]
    
    const total = reviews.length
    const totalPages = Math.ceil(total / pageSize)
    const start = (page - 1) * pageSize
    const end = start + pageSize
    const items = reviews.slice(start, end)
    
    return {
      items,
      pagination: {
        page,
        pageSize,
        total,
        totalPages
      },
      summary: {
        averageRating: 4.5,
        totalReviews: total,
        ratingDistribution: {
          5: 60,
          4: 25,
          3: 10,
          2: 3,
          1: 2
        }
      }
    }
  }
}

export default productMock