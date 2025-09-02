/**
 * 用户相关的Mock数据
 */

// 模拟用户数据
const users = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@pindou.com',
    phone: '13800138000',
    nickname: '管理员',
    avatar: '/assets/avatars/admin.jpg',
    gender: 'male',
    birthday: '1990-01-01',
    occupation: '系统管理员',
    bio: '系统管理员账户',
    memberLevel: 'diamond',
    points: 5000,
    balance: 10000.00,
    isVip: true,
    registerTime: '2023-01-01T00:00:00Z',
    lastLoginTime: '2024-01-20T10:30:00Z',
    status: 'active'
  },
  {
    id: 2,
    username: 'zhangsan',
    email: 'zhangsan@example.com',
    phone: '13800138001',
    nickname: '张三',
    avatar: '/assets/avatars/user1.jpg',
    gender: 'male',
    birthday: '1992-05-15',
    occupation: '软件工程师',
    bio: '热爱技术，喜欢购物，追求品质生活。',
    memberLevel: 'gold',
    points: 2500,
    balance: 1500.00,
    isVip: true,
    registerTime: '2023-06-15T08:20:00Z',
    lastLoginTime: '2024-01-20T09:15:00Z',
    status: 'active'
  },
  {
    id: 3,
    username: 'lisi',
    email: 'lisi@example.com',
    phone: '13800138002',
    nickname: '李四',
    avatar: '/assets/avatars/user2.jpg',
    gender: 'female',
    birthday: '1995-08-20',
    occupation: '设计师',
    bio: '追求美好生活的设计师',
    memberLevel: 'silver',
    points: 800,
    balance: 500.00,
    isVip: false,
    registerTime: '2023-09-10T14:30:00Z',
    lastLoginTime: '2024-01-19T16:45:00Z',
    status: 'active'
  }
]

// 模拟登录设备数据
const loginDevices = [
  {
    id: 1,
    name: 'Windows PC',
    icon: 'fa fa-desktop',
    location: '北京市',
    lastActive: '当前活跃',
    current: true,
    ip: '192.168.1.100',
    browser: 'Chrome 120.0.0.0',
    loginTime: '2024-01-20T08:00:00Z'
  },
  {
    id: 2,
    name: 'iPhone 13',
    icon: 'fa fa-mobile-alt',
    location: '上海市',
    lastActive: '2小时前',
    current: false,
    ip: '192.168.1.101',
    browser: 'Safari 17.0',
    loginTime: '2024-01-20T06:00:00Z'
  },
  {
    id: 3,
    name: 'MacBook Pro',
    icon: 'fa fa-laptop',
    location: '深圳市',
    lastActive: '1天前',
    current: false,
    ip: '192.168.1.102',
    browser: 'Safari 17.0',
    loginTime: '2024-01-19T10:00:00Z'
  }
]

// 模拟会员等级数据
const memberLevels = [
  {
    id: 1,
    name: '普通会员',
    level: 'bronze',
    minPoints: 0,
    maxPoints: 999,
    discount: 0,
    color: '#CD7F32',
    benefits: ['基础购物', '积分累积']
  },
  {
    id: 2,
    name: '银牌会员',
    level: 'silver',
    minPoints: 1000,
    maxPoints: 2999,
    discount: 0.05,
    color: '#C0C0C0',
    benefits: ['5%折扣', '免费配送', '专属客服']
  },
  {
    id: 3,
    name: '黄金会员',
    level: 'gold',
    minPoints: 3000,
    maxPoints: 9999,
    discount: 0.1,
    color: '#FFD700',
    benefits: ['10%折扣', '免费配送', '专属客服', '生日礼品']
  },
  {
    id: 4,
    name: '钻石会员',
    level: 'diamond',
    minPoints: 10000,
    maxPoints: 999999,
    discount: 0.15,
    color: '#B9F2FF',
    benefits: ['15%折扣', '免费配送', '专属客服', '生日礼品', '专属活动', '定制服务']
  }
]

// 模拟积分记录
const pointsRecords = [
  {
    id: 1,
    type: 'earn',
    description: '购买商品获得积分',
    points: 150,
    date: '2024-01-15T10:30:00Z',
    orderId: 'ORD202401150001'
  },
  {
    id: 2,
    type: 'use',
    description: '积分兑换优惠券',
    points: 100,
    date: '2024-01-10T14:20:00Z',
    couponId: 'CPN202401100001'
  },
  {
    id: 3,
    type: 'earn',
    description: '签到获得积分',
    points: 10,
    date: '2024-01-09T09:00:00Z'
  },
  {
    id: 4,
    type: 'earn',
    description: '评价商品获得积分',
    points: 20,
    date: '2024-01-08T16:45:00Z',
    orderId: 'ORD202401080001'
  },
  {
    id: 5,
    type: 'use',
    description: '积分抵扣订单',
    points: 50,
    date: '2024-01-05T11:30:00Z',
    orderId: 'ORD202401050001'
  }
]

// 用户相关的Mock API方法
const userMock = {
  // 用户登录
  login: (credentials) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const { username, password, loginType } = credentials
        
        // 模拟登录验证
        let user = null
        if (loginType === 'username') {
          user = users.find(u => u.username === username)
        } else if (loginType === 'email') {
          user = users.find(u => u.email === username)
        } else if (loginType === 'phone') {
          user = users.find(u => u.phone === username)
        }
        
        if (user && password === '123456') { // 模拟密码验证
          resolve({
            data: {
              user: {
                ...user,
                password: undefined // 不返回密码
              },
              access_token: `mock_token_${user.id}_${Date.now()}`,
              refresh_token: `mock_refresh_token_${user.id}_${Date.now()}`,
              expiresIn: 7200 // 2小时
            }
          })
        } else {
          reject({
            response: {
              data: {
                message: '用户名或密码错误'
              }
            }
          })
        }
      }, 500) // 模拟网络延迟
    })
  },
  
  // 用户注册
  register: (registerData) => {
    const { username, email, password, phone, verificationCode } = registerData
    
    // 模拟验证码验证
    if (verificationCode !== '123456') {
      throw new Error('验证码错误')
    }
    
    // 检查用户名是否已存在
    if (users.find(u => u.username === username)) {
      throw new Error('用户名已存在')
    }
    
    // 检查邮箱是否已存在
    if (users.find(u => u.email === email)) {
      throw new Error('邮箱已被注册')
    }
    
    // 创建新用户
    const newUser = {
      id: users.length + 1,
      username,
      email,
      phone,
      nickname: username,
      avatar: '/assets/avatars/default.jpg',
      gender: '',
      birthday: '',
      occupation: '',
      bio: '',
      memberLevel: 'bronze',
      points: 0,
      balance: 0,
      isVip: false,
      registerTime: new Date().toISOString(),
      lastLoginTime: new Date().toISOString(),
      status: 'active'
    }
    
    users.push(newUser)
    
    return {
      user: newUser,
      token: `mock_token_${newUser.id}_${Date.now()}`,
      refreshToken: `mock_refresh_token_${newUser.id}_${Date.now()}`,
      expiresIn: 7200
    }
  },
  
  // 获取用户信息
  getUserInfo: (userId) => {
    const user = users.find(u => u.id === userId)
    if (!user) {
      throw new Error('用户不存在')
    }
    return {
      ...user,
      password: undefined
    }
  },
  
  // 更新用户信息
  updateUserInfo: (userId, updateData) => {
    const userIndex = users.findIndex(u => u.id === userId)
    if (userIndex === -1) {
      throw new Error('用户不存在')
    }
    
    users[userIndex] = {
      ...users[userIndex],
      ...updateData,
      id: userId // 确保ID不被修改
    }
    
    return {
      ...users[userIndex],
      password: undefined
    }
  },
  
  // 修改密码
  changePassword: (userId, passwordData) => {
    const { currentPassword, newPassword } = passwordData
    const user = users.find(u => u.id === userId)
    
    if (!user) {
      throw new Error('用户不存在')
    }
    
    // 模拟当前密码验证
    if (currentPassword !== '123456') {
      throw new Error('当前密码错误')
    }
    
    // 这里只是模拟，实际不会存储密码
    return { message: '密码修改成功' }
  },
  
  // 发送验证码
  sendVerificationCode: (data) => {
    const { phone, type } = data
    
    // 模拟发送验证码
    console.log(`发送验证码到 ${phone}，类型：${type}，验证码：123456`)
    
    return {
      message: '验证码发送成功',
      expireTime: 300 // 5分钟过期
    }
  },
  
  // 验证验证码
  verifyCode: (data) => {
    const { phone, code, type } = data
    
    if (code === '123456') {
      return { message: '验证码验证成功' }
    } else {
      throw new Error('验证码错误或已过期')
    }
  },
  
  // 获取登录设备列表
  getLoginDevices: (userId) => {
    return loginDevices
  },
  
  // 移除登录设备
  removeLoginDevice: (userId, deviceId) => {
    const deviceIndex = loginDevices.findIndex(d => d.id === deviceId)
    if (deviceIndex !== -1) {
      loginDevices.splice(deviceIndex, 1)
    }
    return { message: '设备移除成功' }
  },
  
  // 获取会员等级信息
  getMemberLevels: () => {
    return memberLevels
  },
  
  // 获取积分记录
  getPointsRecords: (userId, page = 1, pageSize = 10) => {
    const start = (page - 1) * pageSize
    const end = start + pageSize
    const records = pointsRecords.slice(start, end)
    
    return {
      records,
      pagination: {
        page,
        pageSize,
        total: pointsRecords.length,
        totalPages: Math.ceil(pointsRecords.length / pageSize)
      }
    }
  },
  
  // 刷新Token
  refreshToken: (refreshToken) => {
    // 模拟token刷新
    const userId = refreshToken.split('_')[3] // 从refreshToken中提取用户ID
    return {
      token: `mock_token_${userId}_${Date.now()}`,
      refreshToken: `mock_refresh_token_${userId}_${Date.now()}`,
      expiresIn: 7200
    }
  },
  
  // 用户登出
  logout: () => {
    return { message: '登出成功' }
  }
}

export default userMock