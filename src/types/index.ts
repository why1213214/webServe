// 用户相关类型
export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'user';
  permissions: string[];
  profile?: UserProfile;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  phone?: string;
  bio?: string;
  location?: string;
}

// 认证相关类型
export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface LoginRequest {
  username: string;
  password: string;
  remember?: boolean;
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// API相关类型
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  errors?: Record<string, string[]>;
}

export interface ApiError {
  message: string;
  status: number;
  code?: string;
}

export interface PaginationParams {
  page: number;
  pageSize: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// 应用相关类型
export interface AppState {
  theme: 'light' | 'dark';
  language: 'zh-CN' | 'en-US';
  collapsed: boolean;
  loading: boolean;
}

// 路由相关类型
export interface RouteConfig {
  path: string;
  component: React.ComponentType;
  title?: string;
  icon?: React.ReactNode;
  requireAuth?: boolean;
  roles?: string[];
  children?: RouteConfig[];
}
