import ApiClient from '@/utils/request';
import { type LoginRequest, type LoginResponse, type User, type RegisterRequest } from '@/types';

// 后端API响应接口
interface BackendAuthResponse {
  token: string;
  username: string;
  email: string;
  role: string;
}

// 后端用户信息接口
interface BackendUser {
  id: number;
  username: string;
  email: string;
  role: string;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
}

class AuthService {
  async login(loginData: LoginRequest): Promise<LoginResponse> {
    try {
      // 调用后端登录API
      const response = await ApiClient.post<BackendAuthResponse>('/auth/login', {
        usernameOrEmail: loginData.username,
        password: loginData.password
      });
      
      // 转换后端响应为前端需要的格式
      const loginResponse: LoginResponse = {
        user: {
          id: response.username, // 使用username作为临时id
          username: response.username,
          email: response.email,
          avatar: `https://ui-avatars.com/api/?name=${response.username}&background=1890ff&color=fff`,
          role: response.role.toLowerCase() as 'admin' | 'user',
          permissions: this.getRolePermissions(response.role),
          profile: {
            firstName: response.username,
            lastName: '',
            bio: `${response.role} 用户`,
            location: '未设置'
          }
        },
        token: response.token,
        refreshToken: 'refresh-' + response.token, // 后端暂未实现refreshToken
        expiresIn: 7200 // 2小时
      };
      
      // 存储token到localStorage
      localStorage.setItem('token', loginResponse.token);
      localStorage.setItem('refreshToken', loginResponse.refreshToken);
      
      return loginResponse;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : '登录失败');
    }
  }

  async register(registerData: RegisterRequest): Promise<{ success: boolean; message: string }> {
    try {
      await ApiClient.post('/auth/register', {
        username: registerData.username,
        email: registerData.email,
        password: registerData.password
      });
      
      return {
        success: true,
        message: '注册成功，请登录'
      };
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : '注册失败');
    }
  }

  async getCurrentUser(_token?: string): Promise<User> {
    try {
      // 调用后端获取用户信息API
      const response = await ApiClient.get<BackendUser>('/auth/me');
      
      // 转换后端响应为前端需要的格式
      return {
        id: response.id.toString(),
        username: response.username,
        email: response.email,
        avatar: `https://ui-avatars.com/api/?name=${response.username}&background=1890ff&color=fff`,
        role: response.role.toLowerCase() as 'admin' | 'user',
        permissions: this.getRolePermissions(response.role),
        profile: {
          firstName: response.username,
          lastName: '',
          bio: `${response.role} 用户`,
          location: '未设置'
        }
      };
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : '获取用户信息失败');
    }
  }

  async refreshToken(): Promise<{ token: string; refreshToken: string }> {
    try {
      // 调用后端刷新token API
      const response = await ApiClient.post<{ token: string }>('/auth/refresh');
      
      const newTokens = {
        token: response.token,
        refreshToken: 'refresh-' + response.token
      };
      
      // 更新localStorage
      localStorage.setItem('token', newTokens.token);
      localStorage.setItem('refreshToken', newTokens.refreshToken);
      
      return newTokens;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : '刷新token失败');
    }
  }

  async logout(): Promise<void> {
    try {
      // 清除本地存储
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      
      // 注意：后端目前可能没有logout接口，所以只清除本地状态
      // 如果后端有logout接口，可以在这里调用
      // await ApiClient.post('/auth/logout');
    } catch {
      // 即使后端请求失败，也要清除本地状态
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
    }
  }

  // 根据角色获取权限
  private getRolePermissions(role: string): string[] {
    switch (role.toUpperCase()) {
      case 'ADMIN':
        return ['read', 'write', 'delete', 'manage'];
      case 'USER':
      default:
        return ['read'];
    }
  }
}

export default new AuthService();
