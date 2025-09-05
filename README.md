# webServe

基于 React + TypeScript + Vite + Ant Design + Redux Toolkit + React Router 的前端项目初始化脚手架。

## 技术栈
- React 18
- TypeScript 5
- Vite 5
- Ant Design 5
- Redux Toolkit / React-Redux
- React Router DOM 6
- Axios
- ESLint + Prettier 代码规范

## 功能规划
- [x] 项目基础结构
- [x] 路由懒加载示例
- [x] 状态管理及用户示例 Slice
- [x] 登录示例（模拟）
- [ ] 实际登录接口对接
- [ ] 权限路由（Route Guard）
- [ ] Layout 框架结构（侧边栏/面包屑）
- [ ] 主题定制（暗黑模式）

## 目录结构
```
├── public/              # 静态资源
├── src/
│   ├── components/      # 公共组件
│   ├── pages/           # 页面组件
│   ├── router/          # 路由配置
│   ├── services/        # 接口请求封装
│   ├── store/           # Redux store & slices
│   ├── styles/          # 全局样式
│   ├── types/           # TypeScript 声明
│   └── main.tsx         # 入口文件
├── tsconfig.json
├── vite.config.ts
├── package.json
└── README.md
```

## 开发启动
```bash
pnpm install # 或 npm install / yarn install
pnpm dev     # 启动开发服务器
```

## 构建
```bash
pnpm build
pnpm preview
```

## 下一步建议
1. 增加请求层封装（Axios 拦截器，自动携带 token）。
2. 引入路由守卫，未登录跳转登录页。 
3. 增加 Layout（Header / Sider / Content）。
4. 接入真实认证接口并持久化 token（localStorage）。
5. 拆分环境配置（.env.development / .env.production）。

欢迎继续提出需求，我会协助完善。
