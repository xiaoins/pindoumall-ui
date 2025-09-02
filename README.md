# 拼豆商城 - 现代化电商前端解决方案

<div align="center">

![Vue.js](https://img.shields.io/badge/Vue.js-3.4-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**🛍️ 企业级电商前端解决方案 | 开箱即用 | 高度可定制**

[📖 项目概览](./PROJECT_OVERVIEW.md) • [🔧 后端指南](./BACKEND_GUIDE.md) • [🚀 在线演示](http://localhost:3000)

</div>

---

## 🎯 项目简介

拼豆商城是一个**功能完整、技术先进**的电商前端解决方案，采用 Vue 3 生态系统构建。项目不仅提供了完整的电商核心功能，还具备优秀的代码架构和开发体验，适合作为**商业项目基础**或**学习参考**。

### ⭐ 核心亮点

- 🚀 **最新技术栈**：Vue 3 + Vite + Pinia + Tailwind CSS
- 🎨 **精美界面**：现代化设计 + 响应式布局
- 🔐 **完整认证**：JWT + 自动刷新 + 权限控制
- 🛒 **电商功能**：用户、商品、购物车、订单全流程
- 🔌 **灵活对接**：Mock 数据 ↔ 真实 API 无缝切换
- ⚡ **极致性能**：懒加载 + 代码分割 + 缓存优化

## 🛠 技术栈

| 类别 | 技术 | 版本 | 说明 |
|------|------|------|------|
| **框架** | Vue.js | 3.4+ | 渐进式 JavaScript 框架 |
| **构建** | Vite | 5.0+ | 下一代前端构建工具 |
| **路由** | Vue Router | 4.0+ | 官方路由管理器 |
| **状态** | Pinia | 2.1+ | 新一代状态管理 |
| **样式** | Tailwind CSS | 3.4+ | 原子化 CSS 框架 |
| **组件** | Naive UI | 2.38+ | Vue 3 组件库 |
| **HTTP** | Axios | 1.6+ | HTTP 客户端 |

## 📁 项目结构

```
📦 src/
├── 🔌 api/          # API 接口层
├── 🧩 components/   # 可复用组件  
├── 📄 views/        # 页面组件
├── 🗃️ stores/       # 状态管理
├── 🛣️ router/       # 路由配置
├── 🎭 mock/         # Mock 数据
├── 🔧 utils/        # 工具函数
└── 🎨 styles/       # 样式文件
```

> 📖 **详细架构说明**：查看 [项目概览文档](./PROJECT_OVERVIEW.md#项目结构)

## 📚 文档导航

| 文档 | 说明 | 适用人群 |
|------|------|----------|
| 📖 [项目概览](./PROJECT_OVERVIEW.md) | 完整的项目介绍、架构设计、功能特性 | 所有人员 |
| 🔧 [后端开发指南](./BACKEND_GUIDE.md) | 详细的 API 规范、数据库设计、实现指南 | 后端开发者 |
| 🚀 [快速开始](#快速开始) | 项目安装、配置、运行指南 | 前端开发者 |

## 🎯 核心功能

### ✅ 已实现功能

- **👤 用户系统**：注册/登录、个人中心、头像上传、地址管理
- **🛍️ 商品系统**：商品浏览、分类筛选、详情展示、搜索功能
- **🛒 购物车**：添加商品、数量管理、批量操作、实时计算
- **📦 订单系统**：订单创建、状态管理、订单查询、取消订单
- **🎫 营销系统**：优惠券管理、会员体系、积分系统
- **📱 响应式设计**：完美适配桌面端、平板、移动端

### 🔄 Mock 数据支持

项目内置完整的 Mock 数据，支持：
- 🎭 **无缝切换**：Mock 数据 ↔ 真实 API
- 📊 **完整数据**：用户、商品、订单、购物车等
- 🔧 **易于扩展**：简单修改即可添加新数据

## 🚀 快速开始

### 📋 环境要求

- **Node.js**: >= 18.0.0
- **包管理器**: npm >= 9.0.0 或 yarn >= 1.22.0

### ⚡ 一键启动

```bash
# 1️⃣ 克隆项目
git clone <repository-url>
cd pindou-ui/user-ui

# 2️⃣ 安装依赖
npm install

# 3️⃣ 启动开发服务器
npm run dev

# 🎉 打开浏览器访问 http://localhost:3000
```

### ⚙️ 环境配置

```bash
# 📝 复制环境配置文件
cp .env.example .env.local

# ✏️ 编辑配置（可选）
# VITE_USE_MOCK=true          # 是否使用 Mock 数据
# VITE_API_BASE_URL=...        # 后端 API 地址
```

### 📜 常用命令

| 命令 | 说明 |
|------|------|
| `npm run dev` | 🔥 启动开发服务器 |
| `npm run build` | 📦 构建生产版本 |
| `npm run preview` | 👀 预览构建结果 |
| `npm run lint` | 🔍 代码检查 |

> 🎯 **更多详细说明**：查看 [项目概览文档](./PROJECT_OVERVIEW.md#快速开始)

## 🔌 后端对接

### 快速切换到真实 API

```bash
# 1. 修改环境变量
echo "VITE_USE_MOCK=false" > .env.local
echo "VITE_API_BASE_URL=https://your-api.com/api" >> .env.local

# 2. 重启开发服务器
npm run dev
```

### API 接口要求

后端需要实现以下核心接口：

| 模块 | 接口数量 | 核心接口 |
|------|----------|----------|
| **认证** | 4个 | 登录、注册、刷新、登出 |
| **用户** | 6个 | 用户信息、头像上传、地址管理 |
| **商品** | 5个 | 商品列表、详情、分类、搜索 |
| **购物车** | 4个 | 查询、添加、修改、删除 |
| **订单** | 6个 | 创建、查询、详情、取消 |

> 🔧 **详细 API 规范**：查看 [后端开发指南](./BACKEND_GUIDE.md)

## ⚙️ 环境配置

### 开发环境 (.env.development)
```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_USE_MOCK=true
```

### 生产环境 (.env.production)
```env
VITE_API_BASE_URL=https://api.yourdomain.com/api
VITE_USE_MOCK=false
```

## 📱 页面路由

| 路径 | 组件 | 说明 | 权限要求 |
|------|------|------|----------|
| `/` | HomePage | 首页 | 无 |
| `/login` | LoginPage | 登录页 | 无 |
| `/categories` | CategoriesPage | 分类页 | 无 |
| `/product/:id` | ProductDetailPage | 商品详情 | 无 |
| `/profile` | ProfilePage | 个人中心 | 需登录 |
| `/orders` | OrdersPage | 订单管理 | 需登录 |
| `/favorites` | FavoritesPage | 收藏夹 | 需登录 |
| `/history` | HistoryPage | 浏览历史 | 需登录 |
| `/logistics` | LogisticsPage | 物流跟踪 | 需登录 |
| `/coupons` | CouponsPage | 优惠券 | 需登录 |
| `/membership` | MembershipPage | 会员中心 | 需登录 |

> 📋 **完整路由说明**：查看 [项目概览文档](./PROJECT_OVERVIEW.md#页面路由)

## 🎨 UI 组件

### 核心组件
- **布局组件**：`AppHeader`、`AppFooter`、侧边栏组件
- **商品组件**：`ProductCard`、`CategoryGrid`、商品详情
- **用户组件**：`LoginForm`、`RegisterForm`、用户中心
- **交互组件**：`SearchBar`、`Pagination`、购物车

> 🎨 **组件详情**：查看 [项目概览文档](./PROJECT_OVERVIEW.md#ui-组件)

## 🔧 开发指南

### 代码规范
- ✅ ESLint + Prettier 代码格式化
- ✅ Vue 3 Composition API
- ✅ TypeScript 类型检查
- ✅ 组件化开发模式

### 开发流程
```bash
# 1. 创建功能分支
git checkout -b feature/new-feature

# 2. 开发并提交
git commit -m "feat: add new feature"

# 3. 推送并创建 PR
git push origin feature/new-feature
```

> 🔧 **详细开发指南**：查看 [项目概览文档](./PROJECT_OVERVIEW.md#开发指南)

## 🚀 部署指南

### 快速部署
```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

### Docker 部署
```bash
# 构建镜像
docker build -t pindou-ui .

# 运行容器
docker run -p 80:80 pindou-ui
```

> 🐳 **完整部署方案**：查看 [项目概览文档](./PROJECT_OVERVIEW.md#部署方案)

## 📋 待实现功能

### 🔄 核心业务功能
- [ ] **支付系统**：支付宝、微信支付、银行卡支付
- [ ] **物流系统**：物流跟踪、配送状态、快递查询
- [ ] **库存管理**：实时库存、库存预警、库存同步
- [ ] **促销系统**：限时抢购、满减活动、拼团功能
- [ ] **评价系统**：商品评价、图片评价、评价回复
- [ ] **客服系统**：在线客服、工单系统、FAQ

### 🔐 安全与性能
- [ ] **权限管理**：角色权限、菜单权限、数据权限
- [ ] **安全防护**：防刷机制、验证码、风控系统
- [ ] **性能优化**：图片懒加载、代码分割、CDN 加速
- [ ] **数据分析**：用户行为、商品分析、订单统计

### 📱 移动端与国际化
- [ ] **PWA 支持**：离线访问、推送通知、桌面安装
- [ ] **多语言支持**：中文、英文、其他语言
- [ ] **第三方集成**：社交登录、地图服务、短信邮件

> 📋 **完整功能规划**：查看 [项目概览文档](./PROJECT_OVERVIEW.md#待实现功能)

## 🤝 贡献指南

### 参与贡献
```bash
# 1. Fork 并克隆仓库
git clone https://github.com/xiaoins/pindoumall-ui.git

# 2. 创建功能分支
git checkout -b feature/amazing-feature

# 3. 提交更改
git commit -m "feat: add amazing feature"

# 4. 推送并创建 PR
git push origin feature/amazing-feature
```

### 代码规范
- ✅ 遵循 ESLint + Prettier 配置
- ✅ 使用语义化提交信息
- ✅ 编写清晰的代码注释
- ✅ 添加必要的测试用例

> 🔧 **详细贡献指南**：查看 [项目概览文档](./PROJECT_OVERVIEW.md#贡献指南)

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 📞 联系方式

- 📧 **邮箱**：xiaoins1124@gmail.com
- 🐛 **问题反馈**：[GitHub Issues](https://github.com/xiaoins/pindou-mall/issues)
- 💬 **讨论交流**：[GitHub Discussions](https://github.com/xiaoins/pindou-mall/discussions)
- 🇨🇳 **Gitee 镜像**：[Gitee Repository](https://gitee.com/xiaoins/pindou-mall)

---

⭐ **如果这个项目对你有帮助，请给个 Star 支持一下！**

🚀 **快速开始**：查看 [项目概览文档](./PROJECT_OVERVIEW.md) 了解完整功能

🔧 **后端开发**：查看 [后端开发指南](./BACKEND_GUIDE.md) 快速对接

---

**注意**：本项目为前端展示项目，部分功能需要配合后端 API 实现完整业务逻辑。
