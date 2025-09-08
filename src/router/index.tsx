import React, { lazy, Suspense } from 'react';
import { 
  createBrowserRouter, 
  RouterProvider, 
  Navigate
} from 'react-router-dom';
import { Spin } from 'antd';

import ProtectedRoute from '@/components/auth/ProtectedRoute';
import MainLayout from '@/components/layout/MainLayout';
import AuthLayout from '@/components/layout/AuthLayout';

// 懒加载页面组件
const Login = lazy(() => import('@/pages/auth/Login'));
const Register = lazy(() => import('@/pages/auth/Register'));
const Dashboard = lazy(() => import('@/pages/dashboard/Dashboard'));
const Profile = lazy(() => import('@/pages/profile/Profile'));
const NotFound = lazy(() => import('@/pages/common/NotFound'));
const Forbidden = lazy(() => import('@/pages/common/Forbidden'));

// Loading组件
const LoadingComponent = () => (
  <div 
    style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '50vh' 
    }}
  >
    <Spin size='large' />
  </div>
);

// 路由配置
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to='/dashboard' replace />,
      },
      {
        path: 'dashboard',
        element: (
          <Suspense fallback={<LoadingComponent />}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: 'profile',
        element: (
          <Suspense fallback={<LoadingComponent />}>
            <Profile />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Navigate to='/auth/login' replace />,
      },
      {
        path: 'login',
        element: (
          <Suspense fallback={<LoadingComponent />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: 'register',
        element: (
          <Suspense fallback={<LoadingComponent />}>
            <Register />
          </Suspense>
        ),
      },
    ],
  },
  // 兼容原路径
  {
    path: '/login',
    element: <Navigate to='/auth/login' replace />,
  },
  {
    path: '/403',
    element: (
      <Suspense fallback={<LoadingComponent />}>
        <Forbidden />
      </Suspense>
    ),
  },
  {
    path: '*',
    element: (
      <Suspense fallback={<LoadingComponent />}>
        <NotFound />
      </Suspense>
    ),
  },
]);

const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
