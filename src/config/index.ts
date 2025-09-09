// 环境配置
export const config = {
  // API配置
  api: {
    // 后端API基础URL
    baseURL: process.env.NODE_ENV === 'production' 
      ? 'https://your-api-domain.com/api' 
      : 'http://localhost:8080/api',
    
    // 请求超时时间(毫秒)
    timeout: 10000,
    
    // 是否启用请求/响应日志
    enableLog: process.env.NODE_ENV === 'development',
  },
  
  // 应用配置
  app: {
    // 应用名称
    name: 'WebServe',
    
    // 应用版本
    version: '1.0.0',
    
    // 默认语言
    defaultLanguage: 'zh-CN',
    
    // 主题配置
    theme: {
      primaryColor: '#1890ff',
      borderRadius: 6,
    },
  },
  
  // 认证配置
  auth: {
    // Token在localStorage中的key
    tokenKey: 'token',
    
    // RefreshToken在localStorage中的key
    refreshTokenKey: 'refreshToken',
    
    // Token自动刷新的提前时间(秒)
    refreshBeforeExpiry: 300, // 5分钟
    
    // 登录页面路径
    loginPath: '/auth/login',
    
    // 登录成功后的默认跳转路径
    defaultRedirectPath: '/dashboard',
  },
  
  // 存储配置
  storage: {
    // Redux persist配置
    persist: {
      key: 'webserve',
      whitelist: ['auth', 'app'], // 需要持久化的reducer
    },
  },
};

// 导出默认配置
export default config;
