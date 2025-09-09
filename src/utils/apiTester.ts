import ApiClient from '@/utils/request';
import { authApi, publicApi } from '@/services/api';

// API连接测试工具
export class ApiTester {
  // 测试后端连接
  static async testConnection(): Promise<{ success: boolean; message: string }> {
    try {
      // 尝试调用公共健康检查接口
      await publicApi.healthCheck();
      return {
        success: true,
        message: '后端连接正常'
      };
    } catch (error) {
      console.error('后端连接测试失败:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : '后端连接失败'
      };
    }
  }

  // 测试登录接口
  static async testLogin(username: string, password: string): Promise<{ success: boolean; message: string; data?: any }> {
    try {
      const result = await authApi.login({
        usernameOrEmail: username,
        password: password
      });
      
      return {
        success: true,
        message: '登录测试成功',
        data: result
      };
    } catch (error) {
      console.error('登录测试失败:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : '登录测试失败'
      };
    }
  }

  // 测试注册接口
  static async testRegister(username: string, email: string, password: string): Promise<{ success: boolean; message: string }> {
    try {
      await authApi.register({
        username,
        email,
        password,
        confirmPassword: password
      });
      
      return {
        success: true,
        message: '注册测试成功'
      };
    } catch (error) {
      console.error('注册测试失败:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : '注册测试失败'
      };
    }
  }

  // 测试获取用户信息接口（需要先登录）
  static async testGetCurrentUser(): Promise<{ success: boolean; message: string; data?: any }> {
    try {
      const result = await authApi.getCurrentUser();
      
      return {
        success: true,
        message: '获取用户信息测试成功',
        data: result
      };
    } catch (error) {
      console.error('获取用户信息测试失败:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : '获取用户信息测试失败'
      };
    }
  }

  // 运行所有测试
  static async runAllTests(): Promise<void> {
    console.group('🧪 API测试开始');
    
    // 测试后端连接
    console.log('1. 测试后端连接...');
    const connectionTest = await this.testConnection();
    console.log(connectionTest.success ? '✅' : '❌', connectionTest.message);
    
    if (!connectionTest.success) {
      console.log('❌ 后端连接失败，跳过其他测试');
      console.groupEnd();
      return;
    }
    
    // 测试注册接口
    console.log('\n2. 测试注册接口...');
    const registerTest = await this.testRegister(
      'testuser' + Date.now(),
      `test${Date.now()}@example.com`,
      'password123'
    );
    console.log(registerTest.success ? '✅' : '❌', registerTest.message);
    
    // 测试登录接口
    console.log('\n3. 测试登录接口...');
    const loginTest = await this.testLogin('admin', 'password');
    console.log(loginTest.success ? '✅' : '❌', loginTest.message);
    
    if (loginTest.success) {
      // 测试获取用户信息
      console.log('\n4. 测试获取用户信息...');
      const userTest = await this.testGetCurrentUser();
      console.log(userTest.success ? '✅' : '❌', userTest.message);
    }
    
    console.groupEnd();
    console.log('🎉 API测试完成');
  }
}

// 在开发环境下自动暴露到全局，方便测试
if (process.env.NODE_ENV === 'development') {
  (window as any).apiTester = ApiTester;
  console.log('💡 开发提示: 可以在控制台使用 apiTester.runAllTests() 测试API连接');
}

export default ApiTester;
