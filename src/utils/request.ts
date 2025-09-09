import axios, { 
  type AxiosInstance, 
  type AxiosRequestConfig, 
  type AxiosResponse, 
  type InternalAxiosRequestConfig 
} from 'axios';
import { message } from 'antd';
import { store } from '@/store';
import { clearAuth, refreshTokenAsync } from '@/store/slices/authSlice';
import { config } from '@/config';
import type { ApiResponse } from '@/types';

// 创建axios实例
const request: AxiosInstance = axios.create({
  baseURL: config.api.baseURL,
  timeout: config.api.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
request.interceptors.request.use(
  (requestConfig: InternalAxiosRequestConfig) => {
    // 从Redux store中获取token
    const state = store.getState();
    const token = state.auth.token;

    // 如果存在token，添加到请求头
    if (token) {
      requestConfig.headers.Authorization = `Bearer ${token}`;
    }

    // 开发环境下打印请求信息
    if (config.api.enableLog) {
      console.log(`🚀 [API] ${requestConfig.method?.toUpperCase()} ${requestConfig.url}`, {
        params: requestConfig.params,
        data: requestConfig.data,
      });
    }

    return requestConfig;
  },
  (error) => {
    console.error('❌ Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    const { data } = response;

    // 开发环境下打印响应信息
    if (config.api.enableLog) {
      console.log(`✅ [API] Response:`, data);
    }

    // 检查业务状态码
    if (data.success) {
      return response;
    } else {
      // 业务逻辑错误
      const errorMessage = data.message || '请求失败';
      message.error(errorMessage);
      return Promise.reject(new Error(errorMessage));
    }
  },
  async (error) => {
    const { response, config: requestConfig } = error;

    // 开发环境下打印错误信息
    if (config.api.enableLog) {
      console.error(`❌ [API] Error:`, error);
    }

    // 处理HTTP状态码错误
    if (response) {
      const { status, data } = response;
      
      switch (status) {
        case 401:
          // 未授权，尝试刷新token
          if (!requestConfig._retry) {
            requestConfig._retry = true;
            
            try {
              const state = store.getState();
              const refreshToken = state.auth.refreshToken;
              
              if (refreshToken) {
                // 尝试刷新token
                const result = await store.dispatch(refreshTokenAsync());
                
                if (refreshTokenAsync.fulfilled.match(result)) {
                  // 刷新成功，重新发起请求
                  const newToken = result.payload.token;
                  requestConfig.headers.Authorization = `Bearer ${newToken}`;
                  return request(requestConfig);
                }
              }
              
              // 刷新失败或没有refreshToken，清除认证状态
              store.dispatch(clearAuth());
              message.error('登录已过期，请重新登录');
              
              // 跳转到登录页
              window.location.href = config.auth.loginPath;
            } catch {
              store.dispatch(clearAuth());
              message.error('登录已过期，请重新登录');
              window.location.href = config.auth.loginPath;
            }
          }
          break;

        case 403:
          message.error('没有权限访问该资源');
          break;

        case 404:
          message.error('请求的资源不存在');
          break;

        case 422:
          // 表单验证错误
          if (data.errors) {
            const errorMessages = Object.values(data.errors).flat() as string[];
            errorMessages.forEach((msg: string) => message.error(msg));
          } else {
            message.error(data.message || '请求参数错误');
          }
          break;

        case 500:
          message.error('服务器内部错误');
          break;

        default:
          message.error(data?.message || `请求失败 (${status})`);
      }
    } else if (error.code === 'ECONNABORTED') {
      message.error('请求超时，请重试');
    } else if (error.message === 'Network Error') {
      message.error('网络连接失败，请检查网络');
    } else {
      message.error('请求失败，请重试');
    }

    return Promise.reject(error);
  }
);

// 封装常用的请求方法
export class ApiClient {
  // GET请求
  static async get<T = any>(
    url: string, 
    params?: any, 
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await request.get<ApiResponse<T>>(url, { params, ...config });
    return response.data.data;
  }

  // POST请求
  static async post<T = any>(
    url: string, 
    data?: any, 
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await request.post<ApiResponse<T>>(url, data, config);
    return response.data.data;
  }

  // PUT请求
  static async put<T = any>(
    url: string, 
    data?: any, 
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await request.put<ApiResponse<T>>(url, data, config);
    return response.data.data;
  }

  // DELETE请求
  static async delete<T = any>(
    url: string, 
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await request.delete<ApiResponse<T>>(url, config);
    return response.data.data;
  }

  // PATCH请求
  static async patch<T = any>(
    url: string, 
    data?: any, 
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await request.patch<ApiResponse<T>>(url, data, config);
    return response.data.data;
  }
}

// 导出axios实例供特殊场景使用
export { request };

// 默认导出ApiClient
export default ApiClient;
