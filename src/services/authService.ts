import { type LoginRequest, type LoginResponse, type User } from '@/types';

// 模拟API延迟
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

class AuthService {
  async login(loginData: LoginRequest): Promise<LoginResponse> {
    await delay(1000);
    
    // 模拟登录验证
    if (loginData.username === 'admin' && loginData.password === 'password') {
      const response = {
        user: {
          id: '1',
          username: 'admin',
          email: 'admin@example.com',
          avatar: 'https://via.placeholder.com/40',
          role: 'admin' as const,
          permissions: ['read', 'write', 'delete'],
          profile: {
            firstName: 'Admin',
            lastName: 'User',
            phone: '+86 138 0013 8000',
            bio: '系统管理员',
            location: '北京市'
          }
        },
        token: 'mock-jwt-token-' + Date.now(),
        refreshToken: 'mock-refresh-token-' + Date.now(),
        expiresIn: 7200
      };
      
      // 存储token到localStorage
      localStorage.setItem('token', response.token);
      localStorage.setItem('refreshToken', response.refreshToken);
      
      return response;
    } else {
      throw new Error('用户名或密码错误');
    }
  }

  async getCurrentUser(token?: string): Promise<User> {
    await delay(500);
    
    const authToken = token || localStorage.getItem('token');
    if (!authToken) {
      throw new Error('未授权');
    }

    return {
      id: '1',
      username: 'admin',
      email: 'admin@example.com',
      avatar: 'https://via.placeholder.com/40',
      role: 'admin' as const,
      permissions: ['read', 'write', 'delete'],
      profile: {
        firstName: 'Admin',
        lastName: 'User',
        phone: '+86 138 0013 8000',
        bio: '系统管理员',
        location: '北京市'
      }
    };
  }

  async refreshToken(): Promise<{ token: string; refreshToken: string }> {
    await delay(300);
    
    return {
      token: 'new-mock-jwt-token-' + Date.now(),
      refreshToken: 'new-mock-refresh-token-' + Date.now()
    };
  }

  async logout(): Promise<void> {
    await delay(300);
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  }
}

export default new AuthService();
