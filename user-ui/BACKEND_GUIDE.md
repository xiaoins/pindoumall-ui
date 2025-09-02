# 后端开发指南

> 拼豆商城后端 API 开发规范与实现指南

## 📋 概述

本文档为拼豆商城前端项目的后端开发指南，详细说明了前端所需的所有 API 接口、数据格式、业务逻辑等。后端开发者可以根据此文档快速了解项目需求并实现相应功能。

## 🏗️ 系统架构建议

### 推荐技术栈
- **Java**: Spring Boot + Spring Security + MyBatis Plus
- **Node.js**: Express/Koa + Sequelize/Prisma
- **Python**: Django/FastAPI + SQLAlchemy
- **Go**: Gin + GORM
- **C#**: ASP.NET Core + Entity Framework

### 数据库设计
- **关系型数据库**: MySQL 8.0+ / PostgreSQL 13+
- **缓存**: Redis 6.0+
- **搜索引擎**: Elasticsearch (可选)
- **文件存储**: 阿里云OSS / 腾讯云COS / AWS S3

## 📊 数据库表结构设计

### 用户相关表

#### users (用户表)
```sql
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL COMMENT '用户名',
    email VARCHAR(100) UNIQUE COMMENT '邮箱',
    phone VARCHAR(20) UNIQUE COMMENT '手机号',
    password_hash VARCHAR(255) NOT NULL COMMENT '密码哈希',
    nickname VARCHAR(50) COMMENT '昵称',
    avatar VARCHAR(500) COMMENT '头像URL',
    gender TINYINT DEFAULT 0 COMMENT '性别 0:未知 1:男 2:女',
    birthday DATE COMMENT '生日',
    member_level VARCHAR(20) DEFAULT 'NORMAL' COMMENT '会员等级',
    points INT DEFAULT 0 COMMENT '积分',
    status TINYINT DEFAULT 1 COMMENT '状态 0:禁用 1:正常',
    last_login_time DATETIME COMMENT '最后登录时间',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_username (username),
    INDEX idx_email (email),
    INDEX idx_phone (phone)
);
```

#### user_addresses (用户地址表)
```sql
CREATE TABLE user_addresses (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    name VARCHAR(50) NOT NULL COMMENT '收货人姓名',
    phone VARCHAR(20) NOT NULL COMMENT '收货人电话',
    province VARCHAR(50) NOT NULL COMMENT '省份',
    city VARCHAR(50) NOT NULL COMMENT '城市',
    district VARCHAR(50) NOT NULL COMMENT '区县',
    address VARCHAR(200) NOT NULL COMMENT '详细地址',
    postal_code VARCHAR(10) COMMENT '邮政编码',
    is_default TINYINT DEFAULT 0 COMMENT '是否默认地址',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### 商品相关表

#### categories (商品分类表)
```sql
CREATE TABLE categories (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL COMMENT '分类名称',
    slug VARCHAR(100) UNIQUE NOT NULL COMMENT '分类标识',
    parent_id BIGINT DEFAULT 0 COMMENT '父分类ID',
    level TINYINT DEFAULT 1 COMMENT '分类层级',
    sort_order INT DEFAULT 0 COMMENT '排序',
    icon VARCHAR(500) COMMENT '分类图标',
    image VARCHAR(500) COMMENT '分类图片',
    description TEXT COMMENT '分类描述',
    status TINYINT DEFAULT 1 COMMENT '状态 0:禁用 1:启用',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_parent_id (parent_id),
    INDEX idx_slug (slug)
);
```

#### brands (品牌表)
```sql
CREATE TABLE brands (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL COMMENT '品牌名称',
    slug VARCHAR(100) UNIQUE NOT NULL COMMENT '品牌标识',
    logo VARCHAR(500) COMMENT '品牌Logo',
    description TEXT COMMENT '品牌描述',
    website VARCHAR(200) COMMENT '官方网站',
    status TINYINT DEFAULT 1 COMMENT '状态',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### products (商品表)
```sql
CREATE TABLE products (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL COMMENT '商品名称',
    slug VARCHAR(200) UNIQUE NOT NULL COMMENT '商品标识',
    category_id BIGINT NOT NULL COMMENT '分类ID',
    brand_id BIGINT COMMENT '品牌ID',
    sku VARCHAR(100) UNIQUE NOT NULL COMMENT '商品SKU',
    price DECIMAL(10,2) NOT NULL COMMENT '现价',
    original_price DECIMAL(10,2) COMMENT '原价',
    cost_price DECIMAL(10,2) COMMENT '成本价',
    stock INT DEFAULT 0 COMMENT '库存数量',
    min_stock INT DEFAULT 0 COMMENT '最低库存',
    sales INT DEFAULT 0 COMMENT '销量',
    views INT DEFAULT 0 COMMENT '浏览量',
    weight DECIMAL(8,2) COMMENT '重量(kg)',
    volume DECIMAL(8,2) COMMENT '体积(m³)',
    description TEXT COMMENT '商品描述',
    short_description VARCHAR(500) COMMENT '简短描述',
    specifications JSON COMMENT '商品规格',
    images JSON COMMENT '商品图片数组',
    video VARCHAR(500) COMMENT '商品视频',
    tags JSON COMMENT '商品标签',
    status TINYINT DEFAULT 1 COMMENT '状态 0:下架 1:上架 2:预售',
    is_featured TINYINT DEFAULT 0 COMMENT '是否精选',
    is_new TINYINT DEFAULT 0 COMMENT '是否新品',
    sort_order INT DEFAULT 0 COMMENT '排序',
    seo_title VARCHAR(200) COMMENT 'SEO标题',
    seo_description VARCHAR(500) COMMENT 'SEO描述',
    seo_keywords VARCHAR(200) COMMENT 'SEO关键词',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (brand_id) REFERENCES brands(id),
    INDEX idx_category_id (category_id),
    INDEX idx_brand_id (brand_id),
    INDEX idx_sku (sku),
    INDEX idx_status (status),
    INDEX idx_price (price),
    INDEX idx_sales (sales),
    INDEX idx_created_at (created_at)
);
```

#### product_reviews (商品评价表)
```sql
CREATE TABLE product_reviews (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    product_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    order_id BIGINT NOT NULL,
    rating TINYINT NOT NULL COMMENT '评分 1-5',
    title VARCHAR(200) COMMENT '评价标题',
    content TEXT COMMENT '评价内容',
    images JSON COMMENT '评价图片',
    is_anonymous TINYINT DEFAULT 0 COMMENT '是否匿名',
    status TINYINT DEFAULT 1 COMMENT '状态 0:待审核 1:已发布 2:已隐藏',
    helpful_count INT DEFAULT 0 COMMENT '有用数',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_product_id (product_id),
    INDEX idx_user_id (user_id),
    INDEX idx_rating (rating)
);
```

### 订单相关表

#### orders (订单表)
```sql
CREATE TABLE orders (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    order_number VARCHAR(50) UNIQUE NOT NULL COMMENT '订单号',
    user_id BIGINT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending_payment' COMMENT '订单状态',
    payment_status VARCHAR(20) DEFAULT 'pending' COMMENT '支付状态',
    shipping_status VARCHAR(20) DEFAULT 'pending' COMMENT '物流状态',
    total_amount DECIMAL(10,2) NOT NULL COMMENT '订单总金额',
    product_amount DECIMAL(10,2) NOT NULL COMMENT '商品金额',
    shipping_amount DECIMAL(10,2) DEFAULT 0 COMMENT '运费',
    discount_amount DECIMAL(10,2) DEFAULT 0 COMMENT '优惠金额',
    coupon_amount DECIMAL(10,2) DEFAULT 0 COMMENT '优惠券金额',
    points_amount DECIMAL(10,2) DEFAULT 0 COMMENT '积分抵扣金额',
    payment_method VARCHAR(20) COMMENT '支付方式',
    payment_time DATETIME COMMENT '支付时间',
    shipped_time DATETIME COMMENT '发货时间',
    delivered_time DATETIME COMMENT '收货时间',
    cancelled_time DATETIME COMMENT '取消时间',
    cancel_reason VARCHAR(500) COMMENT '取消原因',
    remark VARCHAR(500) COMMENT '订单备注',
    shipping_address JSON NOT NULL COMMENT '收货地址',
    invoice_info JSON COMMENT '发票信息',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    INDEX idx_order_number (order_number),
    INDEX idx_user_id (user_id),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
);
```

#### order_items (订单商品表)
```sql
CREATE TABLE order_items (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    order_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    product_name VARCHAR(200) NOT NULL COMMENT '商品名称快照',
    product_image VARCHAR(500) COMMENT '商品图片快照',
    product_sku VARCHAR(100) NOT NULL COMMENT '商品SKU快照',
    price DECIMAL(10,2) NOT NULL COMMENT '商品单价',
    quantity INT NOT NULL COMMENT '购买数量',
    total_amount DECIMAL(10,2) NOT NULL COMMENT '小计金额',
    specifications JSON COMMENT '商品规格快照',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id),
    INDEX idx_order_id (order_id),
    INDEX idx_product_id (product_id)
);
```

### 购物车表

#### cart_items (购物车表)
```sql
CREATE TABLE cart_items (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    selected TINYINT DEFAULT 1 COMMENT '是否选中',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    UNIQUE KEY uk_user_product (user_id, product_id),
    INDEX idx_user_id (user_id)
);
```

### 优惠券相关表

#### coupons (优惠券表)
```sql
CREATE TABLE coupons (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL COMMENT '优惠券名称',
    code VARCHAR(50) UNIQUE NOT NULL COMMENT '优惠券代码',
    type VARCHAR(20) NOT NULL COMMENT '类型 fixed:固定金额 percent:百分比',
    value DECIMAL(10,2) NOT NULL COMMENT '优惠值',
    min_amount DECIMAL(10,2) DEFAULT 0 COMMENT '最低使用金额',
    max_discount DECIMAL(10,2) COMMENT '最大优惠金额',
    total_quantity INT NOT NULL COMMENT '发行总量',
    used_quantity INT DEFAULT 0 COMMENT '已使用数量',
    per_user_limit INT DEFAULT 1 COMMENT '每用户限领数量',
    start_time DATETIME NOT NULL COMMENT '开始时间',
    end_time DATETIME NOT NULL COMMENT '结束时间',
    status TINYINT DEFAULT 1 COMMENT '状态',
    description TEXT COMMENT '使用说明',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_code (code),
    INDEX idx_status (status),
    INDEX idx_time (start_time, end_time)
);
```

#### user_coupons (用户优惠券表)
```sql
CREATE TABLE user_coupons (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    coupon_id BIGINT NOT NULL,
    status VARCHAR(20) DEFAULT 'unused' COMMENT '状态 unused:未使用 used:已使用 expired:已过期',
    used_time DATETIME COMMENT '使用时间',
    order_id BIGINT COMMENT '使用订单ID',
    received_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '领取时间',
    expire_at DATETIME NOT NULL COMMENT '过期时间',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (coupon_id) REFERENCES coupons(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_status (status)
);
```

## 🔐 认证与授权

### JWT Token 实现

#### Token 结构
```json
{
  "header": {
    "alg": "HS256",
    "typ": "JWT"
  },
  "payload": {
    "sub": "user_id",
    "username": "user123",
    "email": "user@example.com",
    "roles": ["USER"],
    "iat": 1640995200,
    "exp": 1641002400
  }
}
```

#### 实现要点
1. **Access Token**: 有效期 2 小时
2. **Refresh Token**: 有效期 7 天
3. **Token 存储**: Redis 缓存
4. **自动刷新**: 前端自动处理
5. **安全措施**: 
   - 使用强密钥
   - 定期轮换密钥
   - 记录登录日志
   - 异常登录检测

### 权限控制

#### 角色定义
- `USER`: 普通用户
- `VIP`: VIP用户
- `ADMIN`: 管理员
- `SUPER_ADMIN`: 超级管理员

#### 接口权限
```java
// 示例：Spring Security 配置
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(authz -> authz
            .requestMatchers("/auth/login", "/auth/register").permitAll()
            .requestMatchers("/products/**").permitAll()
            .requestMatchers("/cart/**").hasRole("USER")
            .requestMatchers("/orders/**").hasRole("USER")
            .requestMatchers("/admin/**").hasRole("ADMIN")
            .anyRequest().authenticated()
        );
        return http.build();
    }
}
```

## 📡 API 接口详细实现

### 认证接口实现

#### 用户注册
```java
@PostMapping("/auth/register")
public ResponseEntity<ApiResponse> register(@RequestBody @Valid RegisterRequest request) {
    // 1. 验证参数
    if (!request.getPassword().equals(request.getConfirmPassword())) {
        return ResponseEntity.badRequest()
            .body(ApiResponse.error("密码确认不匹配"));
    }
    
    // 2. 验证验证码
    if (!verificationService.verify(request.getEmail(), request.getVerificationCode())) {
        return ResponseEntity.badRequest()
            .body(ApiResponse.error("验证码错误或已过期"));
    }
    
    // 3. 检查用户是否已存在
    if (userService.existsByUsername(request.getUsername()) || 
        userService.existsByEmail(request.getEmail())) {
        return ResponseEntity.badRequest()
            .body(ApiResponse.error("用户名或邮箱已存在"));
    }
    
    // 4. 创建用户
    User user = userService.createUser(request);
    
    // 5. 生成 Token
    TokenPair tokens = jwtService.generateTokens(user);
    
    // 6. 返回结果
    LoginResponse response = LoginResponse.builder()
        .user(UserDto.from(user))
        .accessToken(tokens.getAccessToken())
        .refreshToken(tokens.getRefreshToken())
        .expiresIn(jwtService.getAccessTokenExpiration())
        .build();
        
    return ResponseEntity.ok(ApiResponse.success(response));
}
```

#### 用户登录
```java
@PostMapping("/auth/login")
public ResponseEntity<ApiResponse> login(@RequestBody @Valid LoginRequest request) {
    try {
        // 1. 根据登录类型查找用户
        User user = userService.findByLoginType(request.getLoginType(), request.getUsername());
        
        // 2. 验证密码
        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("用户名或密码错误"));
        }
        
        // 3. 检查用户状态
        if (user.getStatus() == 0) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("账户已被禁用"));
        }
        
        // 4. 更新最后登录时间
        userService.updateLastLoginTime(user.getId());
        
        // 5. 生成 Token
        TokenPair tokens = jwtService.generateTokens(user);
        
        // 6. 记录登录日志
        loginLogService.recordLogin(user.getId(), request.getClientInfo());
        
        // 7. 返回结果
        LoginResponse response = LoginResponse.builder()
            .user(UserDto.from(user))
            .accessToken(tokens.getAccessToken())
            .refreshToken(tokens.getRefreshToken())
            .expiresIn(jwtService.getAccessTokenExpiration())
            .build();
            
        return ResponseEntity.ok(ApiResponse.success(response));
        
    } catch (UserNotFoundException e) {
        return ResponseEntity.badRequest()
            .body(ApiResponse.error("用户名或密码错误"));
    }
}
```

### 商品接口实现

#### 商品列表查询
```java
@GetMapping("/products")
public ResponseEntity<ApiResponse> getProducts(
    @RequestParam(defaultValue = "1") int page,
    @RequestParam(defaultValue = "20") int limit,
    @RequestParam(required = false) String category,
    @RequestParam(required = false) String keyword,
    @RequestParam(defaultValue = "created_at") String sortBy,
    @RequestParam(defaultValue = "desc") String sortOrder,
    @RequestParam(required = false) BigDecimal minPrice,
    @RequestParam(required = false) BigDecimal maxPrice,
    @RequestParam(required = false) String brand,
    @RequestParam(defaultValue = "true") boolean inStock
) {
    
    // 1. 构建查询条件
    ProductQueryParams params = ProductQueryParams.builder()
        .page(page)
        .limit(limit)
        .category(category)
        .keyword(keyword)
        .sortBy(sortBy)
        .sortOrder(sortOrder)
        .minPrice(minPrice)
        .maxPrice(maxPrice)
        .brand(brand)
        .inStock(inStock)
        .build();
    
    // 2. 查询商品
    PageResult<Product> result = productService.getProducts(params);
    
    // 3. 转换为 DTO
    List<ProductDto> products = result.getData().stream()
        .map(ProductDto::from)
        .collect(Collectors.toList());
    
    // 4. 构建分页响应
    PageResponse<ProductDto> response = PageResponse.<ProductDto>builder()
        .list(products)
        .total(result.getTotal())
        .page(page)
        .limit(limit)
        .build();
    
    return ResponseEntity.ok(ApiResponse.success(response));
}
```

#### 商品详情查询
```java
@GetMapping("/products/{id}")
public ResponseEntity<ApiResponse> getProductById(@PathVariable Long id) {
    try {
        // 1. 查询商品详情
        Product product = productService.getProductById(id);
        
        // 2. 增加浏览量
        productService.incrementViews(id);
        
        // 3. 查询商品评价
        List<ProductReview> reviews = reviewService.getProductReviews(id, 1, 10);
        
        // 4. 查询相关商品
        List<Product> relatedProducts = productService.getRelatedProducts(id, 8);
        
        // 5. 构建响应
        ProductDetailDto response = ProductDetailDto.builder()
            .product(ProductDto.from(product))
            .reviews(reviews.stream().map(ReviewDto::from).collect(Collectors.toList()))
            .relatedProducts(relatedProducts.stream().map(ProductDto::from).collect(Collectors.toList()))
            .build();
        
        return ResponseEntity.ok(ApiResponse.success(response));
        
    } catch (ProductNotFoundException e) {
        return ResponseEntity.notFound().build();
    }
}
```

### 订单接口实现

#### 创建订单
```java
@PostMapping("/orders")
@Transactional
public ResponseEntity<ApiResponse> createOrder(
    @RequestBody @Valid CreateOrderRequest request,
    @AuthenticationPrincipal UserPrincipal currentUser
) {
    try {
        // 1. 验证商品库存
        for (OrderItemRequest item : request.getItems()) {
            Product product = productService.getProductById(item.getProductId());
            if (product.getStock() < item.getQuantity()) {
                return ResponseEntity.badRequest()
                    .body(ApiResponse.error("商品 " + product.getName() + " 库存不足"));
            }
        }
        
        // 2. 计算订单金额
        OrderCalculation calculation = orderService.calculateOrder(request);
        
        // 3. 验证优惠券
        if (request.getCouponCode() != null) {
            CouponValidation validation = couponService.validateCoupon(
                request.getCouponCode(), currentUser.getId(), calculation.getProductAmount());
            if (!validation.isValid()) {
                return ResponseEntity.badRequest()
                    .body(ApiResponse.error(validation.getErrorMessage()));
            }
        }
        
        // 4. 创建订单
        Order order = orderService.createOrder(currentUser.getId(), request, calculation);
        
        // 5. 扣减库存
        for (OrderItemRequest item : request.getItems()) {
            productService.decreaseStock(item.getProductId(), item.getQuantity());
        }
        
        // 6. 使用优惠券
        if (request.getCouponCode() != null) {
            couponService.useCoupon(request.getCouponCode(), currentUser.getId(), order.getId());
        }
        
        // 7. 清空购物车
        cartService.clearCart(currentUser.getId());
        
        // 8. 生成支付链接（如果需要）
        String paymentUrl = null;
        if (order.getTotalAmount().compareTo(BigDecimal.ZERO) > 0) {
            paymentUrl = paymentService.createPayment(order);
        }
        
        // 9. 返回结果
        CreateOrderResponse response = CreateOrderResponse.builder()
            .orderId(order.getOrderNumber())
            .totalAmount(order.getTotalAmount())
            .paymentUrl(paymentUrl)
            .build();
        
        return ResponseEntity.ok(ApiResponse.success(response));
        
    } catch (Exception e) {
        log.error("创建订单失败", e);
        return ResponseEntity.badRequest()
            .body(ApiResponse.error("创建订单失败：" + e.getMessage()));
    }
}
```

## 🔄 业务流程实现

### 订单状态流转

```java
@Service
public class OrderStatusService {
    
    public void updateOrderStatus(Long orderId, OrderStatus newStatus, String reason) {
        Order order = orderRepository.findById(orderId)
            .orElseThrow(() -> new OrderNotFoundException("订单不存在"));
        
        // 验证状态流转是否合法
        if (!isValidStatusTransition(order.getStatus(), newStatus)) {
            throw new IllegalStateException("非法的状态流转");
        }
        
        OrderStatus oldStatus = order.getStatus();
        order.setStatus(newStatus);
        
        // 根据状态执行相应操作
        switch (newStatus) {
            case PAID:
                order.setPaymentTime(LocalDateTime.now());
                // 发送支付成功通知
                notificationService.sendPaymentSuccessNotification(order);
                break;
                
            case SHIPPED:
                order.setShippedTime(LocalDateTime.now());
                // 创建物流信息
                logisticsService.createShipping(order);
                // 发送发货通知
                notificationService.sendShippedNotification(order);
                break;
                
            case DELIVERED:
                order.setDeliveredTime(LocalDateTime.now());
                // 自动确认收货后7天
                scheduleService.scheduleAutoConfirm(orderId, 7);
                break;
                
            case CANCELLED:
                order.setCancelledTime(LocalDateTime.now());
                order.setCancelReason(reason);
                // 恢复库存
                restoreStock(order);
                // 退还优惠券
                restoreCoupon(order);
                break;
        }
        
        orderRepository.save(order);
        
        // 记录状态变更日志
        orderLogService.recordStatusChange(orderId, oldStatus, newStatus, reason);
    }
    
    private boolean isValidStatusTransition(OrderStatus from, OrderStatus to) {
        // 定义合法的状态流转规则
        Map<OrderStatus, Set<OrderStatus>> validTransitions = Map.of(
            OrderStatus.PENDING_PAYMENT, Set.of(OrderStatus.PAID, OrderStatus.CANCELLED),
            OrderStatus.PAID, Set.of(OrderStatus.PROCESSING, OrderStatus.CANCELLED),
            OrderStatus.PROCESSING, Set.of(OrderStatus.SHIPPED, OrderStatus.CANCELLED),
            OrderStatus.SHIPPED, Set.of(OrderStatus.DELIVERED, OrderStatus.RETURNED),
            OrderStatus.DELIVERED, Set.of(OrderStatus.COMPLETED, OrderStatus.RETURNED)
        );
        
        return validTransitions.getOrDefault(from, Set.of()).contains(to);
    }
}
```

### 库存管理

```java
@Service
public class InventoryService {
    
    @Transactional
    public boolean decreaseStock(Long productId, int quantity) {
        // 使用乐观锁防止超卖
        int updated = productRepository.decreaseStock(productId, quantity);
        
        if (updated == 0) {
            throw new InsufficientStockException("库存不足");
        }
        
        // 检查是否需要库存预警
        Product product = productRepository.findById(productId).orElseThrow();
        if (product.getStock() <= product.getMinStock()) {
            alertService.sendLowStockAlert(product);
        }
        
        return true;
    }
    
    @Transactional
    public void restoreStock(Long productId, int quantity) {
        productRepository.increaseStock(productId, quantity);
    }
    
    // 定时任务：处理超时未支付订单
    @Scheduled(fixedRate = 300000) // 每5分钟执行一次
    public void handleExpiredOrders() {
        List<Order> expiredOrders = orderRepository.findExpiredUnpaidOrders(
            LocalDateTime.now().minusMinutes(30));
        
        for (Order order : expiredOrders) {
            // 取消订单并恢复库存
            orderStatusService.updateOrderStatus(
                order.getId(), OrderStatus.CANCELLED, "支付超时自动取消");
        }
    }
}
```

## 📊 性能优化建议

### 数据库优化

1. **索引优化**
```sql
-- 商品查询优化
CREATE INDEX idx_products_category_status_price ON products(category_id, status, price);
CREATE INDEX idx_products_search ON products(name, description) USING FULLTEXT;

-- 订单查询优化
CREATE INDEX idx_orders_user_status_time ON orders(user_id, status, created_at);

-- 购物车查询优化
CREATE INDEX idx_cart_user_updated ON cart_items(user_id, updated_at);
```

2. **分页优化**
```java
// 使用游标分页替代 OFFSET
public Page<Product> getProductsWithCursor(String cursor, int limit) {
    LocalDateTime cursorTime = cursor != null ? 
        LocalDateTime.parse(cursor) : LocalDateTime.now();
    
    List<Product> products = productRepository
        .findByCreatedAtLessThanOrderByCreatedAtDesc(cursorTime, PageRequest.of(0, limit + 1));
    
    boolean hasNext = products.size() > limit;
    if (hasNext) {
        products.remove(products.size() - 1);
    }
    
    String nextCursor = hasNext ? 
        products.get(products.size() - 1).getCreatedAt().toString() : null;
    
    return new CursorPage<>(products, nextCursor, hasNext);
}
```

### 缓存策略

```java
@Service
public class ProductCacheService {
    
    @Cacheable(value = "products", key = "#id")
    public ProductDto getProduct(Long id) {
        Product product = productRepository.findById(id).orElseThrow();
        return ProductDto.from(product);
    }
    
    @Cacheable(value = "product-list", key = "#params.hashCode()")
    public PageResult<ProductDto> getProducts(ProductQueryParams params) {
        // 查询逻辑
    }
    
    @CacheEvict(value = {"products", "product-list"}, allEntries = true)
    public void clearProductCache() {
        // 清除商品缓存
    }
    
    // 热门商品缓存
    @Scheduled(fixedRate = 3600000) // 每小时更新
    public void updateHotProducts() {
        List<Product> hotProducts = productRepository.findHotProducts(100);
        redisTemplate.opsForValue().set("hot-products", hotProducts, Duration.ofHours(1));
    }
}
```

### 搜索优化

```java
@Service
public class ProductSearchService {
    
    @Autowired
    private ElasticsearchRestTemplate elasticsearchTemplate;
    
    public PageResult<ProductDto> searchProducts(String keyword, int page, int size) {
        // 构建搜索查询
        BoolQueryBuilder queryBuilder = QueryBuilders.boolQuery();
        
        if (StringUtils.hasText(keyword)) {
            queryBuilder.should(QueryBuilders.matchQuery("name", keyword).boost(2.0f))
                       .should(QueryBuilders.matchQuery("description", keyword))
                       .should(QueryBuilders.matchQuery("tags", keyword));
        }
        
        // 添加过滤条件
        queryBuilder.filter(QueryBuilders.termQuery("status", 1));
        
        // 构建搜索请求
        SearchQuery searchQuery = new NativeSearchQueryBuilder()
            .withQuery(queryBuilder)
            .withPageable(PageRequest.of(page - 1, size))
            .withSort(SortBuilders.scoreSort().order(SortOrder.DESC))
            .withSort(SortBuilders.fieldSort("sales").order(SortOrder.DESC))
            .build();
        
        // 执行搜索
        SearchHits<ProductDocument> searchHits = elasticsearchTemplate.search(searchQuery, ProductDocument.class);
        
        // 转换结果
        List<ProductDto> products = searchHits.getSearchHits().stream()
            .map(hit -> ProductDto.from(hit.getContent()))
            .collect(Collectors.toList());
        
        return new PageResult<>(products, searchHits.getTotalHits(), page, size);
    }
}
```

## 🔒 安全实现

### 接口安全

```java
@Component
public class SecurityInterceptor implements HandlerInterceptor {
    
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        // 1. 限流检查
        if (!rateLimitService.isAllowed(getClientId(request))) {
            response.setStatus(429);
            return false;
        }
        
        // 2. 签名验证（对于敏感接口）
        if (requiresSignature(request)) {
            if (!signatureService.verifySignature(request)) {
                response.setStatus(401);
                return false;
            }
        }
        
        // 3. 防重放攻击
        if (!nonceService.validateNonce(request.getHeader("X-Nonce"))) {
            response.setStatus(401);
            return false;
        }
        
        return true;
    }
}
```

### 数据脱敏

```java
@JsonSerialize(using = SensitiveDataSerializer.class)
public class UserDto {
    private String phone; // 脱敏：138****8888
    private String email; // 脱敏：u***@example.com
    private String idCard; // 脱敏：110***********1234
}

public class SensitiveDataSerializer extends JsonSerializer<String> {
    @Override
    public void serialize(String value, JsonGenerator gen, SerializerProvider serializers) throws IOException {
        if (value == null) {
            gen.writeNull();
            return;
        }
        
        String fieldName = gen.getOutputContext().getCurrentName();
        String maskedValue = switch (fieldName) {
            case "phone" -> maskPhone(value);
            case "email" -> maskEmail(value);
            case "idCard" -> maskIdCard(value);
            default -> value;
        };
        
        gen.writeString(maskedValue);
    }
}
```

## 📈 监控与日志

### 业务监控

```java
@Component
public class BusinessMetrics {
    
    private final MeterRegistry meterRegistry;
    private final Counter orderCreatedCounter;
    private final Timer orderProcessingTimer;
    
    public BusinessMetrics(MeterRegistry meterRegistry) {
        this.meterRegistry = meterRegistry;
        this.orderCreatedCounter = Counter.builder("orders.created")
            .description("订单创建数量")
            .register(meterRegistry);
        this.orderProcessingTimer = Timer.builder("orders.processing.time")
            .description("订单处理时间")
            .register(meterRegistry);
    }
    
    public void recordOrderCreated() {
        orderCreatedCounter.increment();
    }
    
    public void recordOrderProcessingTime(Duration duration) {
        orderProcessingTimer.record(duration);
    }
}
```

### 操作日志

```java
@Aspect
@Component
public class OperationLogAspect {
    
    @Around("@annotation(operationLog)")
    public Object logOperation(ProceedingJoinPoint joinPoint, OperationLog operationLog) throws Throwable {
        String operation = operationLog.value();
        String userId = getCurrentUserId();
        String ip = getClientIp();
        
        long startTime = System.currentTimeMillis();
        Object result = null;
        Exception exception = null;
        
        try {
            result = joinPoint.proceed();
            return result;
        } catch (Exception e) {
            exception = e;
            throw e;
        } finally {
            long duration = System.currentTimeMillis() - startTime;
            
            OperationLogEntity log = OperationLogEntity.builder()
                .operation(operation)
                .userId(userId)
                .ip(ip)
                .duration(duration)
                .success(exception == null)
                .errorMessage(exception != null ? exception.getMessage() : null)
                .createTime(LocalDateTime.now())
                .build();
            
            operationLogService.saveLog(log);
        }
    }
}
```

## 🚀 部署配置

### Docker 配置

```dockerfile
# Dockerfile
FROM openjdk:17-jre-slim

VOLUME /tmp
COPY target/mall-backend.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app.jar"]
```

```yaml
# docker-compose.yml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "8080:8080"
    environment:
      - SPRING_PROFILES_ACTIVE=prod
      - DB_HOST=mysql
      - REDIS_HOST=redis
    depends_on:
      - mysql
      - redis
  
  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: root123
      MYSQL_DATABASE: mall
    volumes:
      - mysql_data:/var/lib/mysql
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql
    ports:
      - "3306:3306"
  
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

volumes:
  mysql_data:
  redis_data:
```

### 配置文件

```yaml
# application-prod.yml
spring:
  datasource:
    url: jdbc:mysql://${DB_HOST:localhost}:3306/mall?useUnicode=true&characterEncoding=utf8&useSSL=false&serverTimezone=Asia/Shanghai
    username: ${DB_USERNAME:root}
    password: ${DB_PASSWORD:root123}
    hikari:
      maximum-pool-size: 20
      minimum-idle: 5
      connection-timeout: 30000
      idle-timeout: 600000
      max-lifetime: 1800000
  
  redis:
    host: ${REDIS_HOST:localhost}
    port: 6379
    password: ${REDIS_PASSWORD:}
    database: 0
    lettuce:
      pool:
        max-active: 20
        max-idle: 10
        min-idle: 5
  
  jpa:
    hibernate:
      ddl-auto: validate
    show-sql: false
    properties:
      hibernate:
        dialect: org.hibernate.dialect.MySQL8Dialect
        format_sql: true

jwt:
  secret: ${JWT_SECRET:your-secret-key}
  expiration: 7200 # 2 hours
  refresh-expiration: 604800 # 7 days

file:
  upload:
    path: ${UPLOAD_PATH:/app/uploads}
    max-size: 10MB
    allowed-types: jpg,jpeg,png,gif

logging:
  level:
    com.mall: INFO
    org.springframework.security: DEBUG
  file:
    name: /app/logs/mall.log
  pattern:
    file: "%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{36} - %msg%n"
```

## 📋 开发检查清单

### 必须实现的功能

#### 用户模块
- [ ] 用户注册（用户名/邮箱/手机号）
- [ ] 用户登录（支持多种登录方式）
- [ ] JWT Token 认证
- [ ] Token 自动刷新
- [ ] 用户信息管理
- [ ] 头像上传
- [ ] 密码修改
- [ ] 收货地址管理

#### 商品模块
- [ ] 商品分类管理
- [ ] 商品列表查询（分页、筛选、排序）
- [ ] 商品详情查询
- [ ] 商品搜索
- [ ] 商品评价系统
- [ ] 库存管理
- [ ] 商品图片上传

#### 购物车模块
- [ ] 添加商品到购物车
- [ ] 购物车列表查询
- [ ] 修改商品数量
- [ ] 删除购物车商品
- [ ] 清空购物车
- [ ] 购物车商品选择

#### 订单模块
- [ ] 创建订单
- [ ] 订单列表查询
- [ ] 订单详情查询
- [ ] 订单状态管理
- [ ] 订单取消
- [ ] 订单支付
- [ ] 物流跟踪

#### 优惠券模块
- [ ] 优惠券发放
- [ ] 用户优惠券列表
- [ ] 优惠券使用
- [ ] 优惠券验证

### 推荐实现的功能

#### 高级功能
- [ ] 商品推荐算法
- [ ] 用户行为分析
- [ ] 实时库存同步
- [ ] 分布式锁（防止超卖）
- [ ] 消息队列（异步处理）
- [ ] 缓存策略
- [ ] 搜索引擎集成

#### 运营功能
- [ ] 促销活动管理
- [ ] 会员等级系统
- [ ] 积分系统
- [ ] 数据统计分析
- [ ] 营销工具

### 性能要求

- [ ] 接口响应时间 < 200ms
- [ ] 支持并发用户数 > 1000
- [ ] 数据库查询优化
- [ ] 缓存命中率 > 80%
- [ ] 系统可用性 > 99.9%

### 安全要求

- [ ] SQL 注入防护
- [ ] XSS 攻击防护
- [ ] CSRF 攻击防护
- [ ] 接口限流
- [ ] 数据脱敏
- [ ] 操作日志记录
- [ ] 异常监控告警

## 🤝 技术支持

如果在实现过程中遇到问题，可以通过以下方式获取帮助：

1. **查看前端 Mock 数据**：`src/mock/` 目录下有完整的数据格式示例
2. **参考 API 接口定义**：`src/api/` 目录下有详细的接口调用方式
3. **检查前端状态管理**：`src/stores/` 目录下有数据流转逻辑
4. **测试接口兼容性**：可以先实现部分接口，前端会自动降级到 Mock 数据

---

**注意**：本文档会根据项目发展持续更新，请关注最新版本。