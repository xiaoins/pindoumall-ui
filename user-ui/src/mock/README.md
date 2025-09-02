# Mock 数据系统

本项目包含了完整的 Mock 数据系统，用于在开发阶段模拟后端 API 接口，无需依赖真实的后端服务。

## 文件结构

```
src/mock/
├── index.js          # Mock 系统核心文件，提供通用方法
├── user.js           # 用户相关的 Mock 数据和 API
├── product.js        # 商品相关的 Mock 数据和 API
├── order.js          # 订单相关的 Mock 数据和 API
├── cart.js           # 购物车相关的 Mock 数据和 API
└── README.md         # 本说明文件
```

## 使用方法

### 1. 启用 Mock 模式

在项目根目录的 `.env.development` 文件中设置：

```env
VITE_USE_MOCK=true
```

### 2. 使用 API 方法

在组件中导入并使用 API 方法：

```javascript
import { apiMethods } from '@/api/index.js'

// 用户登录
const loginResult = await apiMethods.user.login({
  username: 'testuser',
  password: '123456'
})

// 获取商品列表
const products = await apiMethods.product.getProducts({
  page: 1,
  size: 10
})

// 添加商品到购物车
const cartResult = await apiMethods.cart.addToCart({
  productId: 1,
  quantity: 2
})
```

### 3. 环境配置

- **开发环境** (`.env.development`)：默认启用 Mock 模式
- **生产环境** (`.env.production`)：默认禁用 Mock 模式，使用真实 API

## Mock 数据特性

### 用户系统 (user.js)
- 用户注册、登录、登出
- 用户信息管理
- 密码修改
- 验证码发送与验证
- 登录设备管理
- 会员等级和积分系统

### 商品系统 (product.js)
- 商品列表和详情
- 商品分类和品牌
- 商品搜索
- 热门商品、新品、推荐商品
- 商品评价

### 订单系统 (order.js)
- 订单创建、支付、取消
- 订单列表和详情
- 订单状态管理
- 物流信息
- 退款申请和管理
- 订单统计

### 购物车系统 (cart.js)
- 购物车商品管理
- 商品选择和数量修改
- 优惠券系统
- 收货地址管理

## 数据持久化

当前 Mock 数据存储在内存中，页面刷新后会重置。如需持久化，可以：

1. 使用 `localStorage` 存储数据
2. 集成 `json-server` 等工具
3. 使用 `IndexedDB` 进行本地存储

## 自定义 Mock 数据

### 添加新的 Mock 数据

1. 在对应的 Mock 文件中添加数据：

```javascript
// 在 product.js 中添加新商品
const products = [
  // 现有商品...
  {
    id: 999,
    name: '新商品',
    price: 199.00,
    // 其他属性...
  }
]
```

2. 添加新的 API 方法：

```javascript
// 在 productMock 对象中添加新方法
const productMock = {
  // 现有方法...
  getNewMethod: (params) => {
    // 自定义逻辑
    return mockPagination(data, params)
  }
}
```

3. 在 `api/index.js` 中注册新的 API：

```javascript
product: {
  // 现有 API...
  getNewMethod: (params) => USE_MOCK ? 
    mockRequest(() => productMock.getNewMethod(params)) : 
    api.get('/products/new-endpoint', { params })
}
```

## 注意事项

1. Mock 数据仅用于开发环境，生产环境请确保使用真实 API
2. Mock 数据的结构应与真实 API 返回的数据结构保持一致
3. 定期更新 Mock 数据以反映最新的业务需求
4. 在切换到真实 API 时，确保所有接口都已实现

## 故障排除

### 常见问题

1. **Mock 数据不生效**
   - 检查 `.env.development` 中的 `VITE_USE_MOCK` 是否设置为 `true`
   - 确认项目已重启

2. **API 调用失败**
   - 检查 Mock 方法是否正确导入
   - 确认 API 方法名称是否正确

3. **数据格式错误**
   - 检查 Mock 数据结构是否与组件期望的格式一致
   - 查看浏览器控制台的错误信息

如有其他问题，请查看项目文档或联系开发团队。