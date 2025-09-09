import ApiClient from '@/utils/request';
import type { 
  LoginRequest, 
  RegisterRequest, 
  User, 
  PaginationParams,
  PaginatedResponse
} from '@/types';

// 认证相关API
export const authApi = {
  // 登录
  login: (data: { usernameOrEmail: string; password: string }) => 
    ApiClient.post('/auth/login', data),
  
  // 注册
  register: (data: RegisterRequest) => 
    ApiClient.post('/auth/register', data),
  
  // 获取当前用户信息
  getCurrentUser: () => 
    ApiClient.get('/auth/me'),
  
  // 刷新Token
  refreshToken: () => 
    ApiClient.post('/auth/refresh'),
  
  // 登出（如果后端有此接口）
  logout: () => 
    ApiClient.post('/auth/logout'),
};

// 用户管理API
export const userApi = {
  // 获取用户列表
  getUsers: (params?: PaginationParams) => 
    ApiClient.get<PaginatedResponse<User>>('/users', params),
  
  // 获取用户详情
  getUserById: (id: string) => 
    ApiClient.get<User>(`/users/${id}`),
  
  // 更新用户信息
  updateUser: (id: string, data: Partial<User>) => 
    ApiClient.put<User>(`/users/${id}`, data),
  
  // 删除用户
  deleteUser: (id: string) => 
    ApiClient.delete(`/users/${id}`),
  
  // 更新用户状态
  updateUserStatus: (id: string, enabled: boolean) => 
    ApiClient.patch(`/users/${id}/status`, { enabled }),
};

// 公共API
export const publicApi = {
  // 获取应用信息
  getAppInfo: () => 
    ApiClient.get('/public/info'),
  
  // 健康检查
  healthCheck: () => 
    ApiClient.get('/public/health'),
};

// 导出所有API
export default {
  auth: authApi,
  user: userApi,
  public: publicApi,
};
