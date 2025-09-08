import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/redux';
import { Spin } from 'antd';

interface ProtectedRouteProps {
  children: React.ReactNode;
  roles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  roles = [] 
}) => {
  const { isAuthenticated, loading, user, token } = useAuth();
  const location = useLocation();

  // 调试信息
  console.log('ProtectedRoute Debug:', {
    isAuthenticated,
    loading,
    hasUser: !!user,
    hasToken: !!token,
    currentPath: location.pathname
  });

  // 正在加载时显示loading
  if (loading) {
    return (
      <div 
        style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh' 
        }}
      >
        <Spin size='large' />
      </div>
    );
  }

  // 未认证时重定向到登录页
  if (!isAuthenticated) {
    return <Navigate to='/auth/login' state={{ from: location }} replace />;
  }

  // 检查权限
  if (roles.length > 0 && user && !roles.includes(user.role)) {
    return <Navigate to='/403' replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
