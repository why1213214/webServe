# Axios 封装和前后端登录功能集成

## 🎉 完成功能

### ✅ Axios 封装 (`src/utils/request.ts`)
- **统一配置**: 基础URL、超时时间、请求头
- **请求拦截器**: 自动添加JWT Token到Authorization头
- **响应拦截器**: 统一错误处理、自动刷新Token、业务状态码处理
- **错误处理**: 网络错误、HTTP状态码错误、业务逻辑错误的统一处理
- **日志记录**: 开发环境下自动打印请求/响应日志

### ✅ 认证服务集成 (`src/services/authService.ts`)
- **登录功能**: 对接后端 `/api/auth/login` 接口
- **注册功能**: 对接后端 `/api/auth/register` 接口
- **用户信息**: 对接后端 `/api/auth/me` 接口
- **Token刷新**: 对接后端 `/api/auth/refresh` 接口
- **数据转换**: 后端数据格式到前端格式的自动转换

### ✅ API 客户端封装 (`src/utils/request.ts`)
- **ApiClient类**: 封装GET、POST、PUT、DELETE、PATCH方法
- **泛型支持**: 完整的TypeScript类型支持
- **统一响应**: 自动提取业务数据

### ✅ API 接口管理 (`src/services/api.ts`)
- **认证API**: 登录、注册、获取用户信息、刷新Token
- **用户API**: 用户管理相关接口
- **公共API**: 健康检查、应用信息

### ✅ Redux 状态管理更新
- **注册功能**: 添加了 `registerAsync` thunk
- **错误处理**: 完善的异步操作错误处理
- **状态同步**: 与后端API的状态同步

### ✅ UI 组件更新
- **注册页面**: 完整的表单验证和后端集成
- **登录页面**: 后端API集成（之前已完成）
- **仪表盘**: 添加API状态监控和测试功能
- **API状态组件**: 实时显示后端连接状态

### ✅ 开发工具
- **API测试器**: 完整的API连接测试工具
- **配置管理**: 环境配置文件支持
- **类型安全**: 完整的TypeScript类型定义

## 🚀 使用方法

### 1. 启动项目
```bash
# 启动后端 (Spring Boot)
cd serve-java
mvn spring-boot:run

# 启动前端 (React + Vite)
cd webServe
npm run dev
```

### 2. 访问地址
- **前端**: http://localhost:5173
- **后端API**: http://localhost:8080/api
- **API文档**: http://localhost:8080/api/swagger-ui.html
- **H2数据库**: http://localhost:8080/api/h2-console

### 3. 测试功能

#### 在浏览器控制台测试API:
```javascript
// 运行所有API测试
apiTester.runAllTests()

// 单独测试后端连接
apiTester.testConnection()

// 测试登录
apiTester.testLogin('admin', 'password')
```

#### 注册新用户:
1. 访问 http://localhost:5173/auth/register
2. 填写用户名、邮箱、密码
3. 提交注册（会调用后端API）

#### 登录测试:
1. 访问 http://localhost:5173/auth/login
2. 使用注册的账户或默认账户登录
3. 成功后会跳转到仪表盘

## 🔧 技术特性

### 自动Token管理
- 登录成功后自动存储Token
- 请求时自动添加Authorization头
- Token过期自动刷新
- 刷新失败自动跳转登录页

### 完善的错误处理
- 网络错误友好提示
- HTTP状态码统一处理
- 业务逻辑错误显示
- 表单验证错误展示

### 开发体验优化
- 请求/响应日志记录
- API连接状态实时监控
- 开发工具自动加载
- 完整的TypeScript支持

### 安全性
- JWT Token认证
- CORS跨域配置
- 密码加密存储
- 角色权限控制

## 📁 新增文件结构

```
webServe/src/
├── config/
│   └── index.ts              # 环境配置
├── services/
│   ├── api.ts                # API接口管理
│   └── authService.ts        # 认证服务（已更新）
├── utils/
│   ├── request.ts            # Axios封装
│   └── apiTester.ts          # API测试工具
├── components/common/
│   └── ApiStatus.tsx         # API状态组件
└── pages/
    ├── auth/Register.tsx     # 注册页面（已更新）
    └── dashboard/Dashboard.tsx # 仪表盘（已更新）
```

## 🔍 后端API接口

### 认证接口
- `POST /api/auth/login` - 用户登录
- `POST /api/auth/register` - 用户注册
- `GET /api/auth/me` - 获取当前用户信息
- `POST /api/auth/refresh` - 刷新Token

### 响应格式
```typescript
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: Record<string, string[]>;
}
```

## 🎯 下一步建议

1. **添加更多API接口**: 用户管理、角色管理等
2. **完善错误边界**: React错误边界组件
3. **添加数据缓存**: React Query 或 SWR
4. **国际化支持**: i18n多语言
5. **测试覆盖**: 单元测试和集成测试
6. **部署配置**: 生产环境配置

## 💡 开发提示

- 在开发环境下，控制台会自动加载API测试工具
- 仪表盘页面显示后端连接状态
- 所有API请求都会在控制台显示详细日志
- 支持热重载，修改代码会自动刷新

现在您的前后端已经完全集成，可以进行完整的用户注册、登录、获取用户信息等操作！🎉
