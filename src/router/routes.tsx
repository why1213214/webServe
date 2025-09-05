import { RouteObject } from 'react-router-dom';
import React, { lazy } from 'react';

const BasicLayout = lazy(() => import('../layouts/BasicLayout'));
const Home = lazy(() => import('../pages/Home'));
const Login = lazy(() => import('../pages/Login'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const PrivateRoute = lazy(() => import('./components/PrivateRoute'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <BasicLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        element: <PrivateRoute />,
        children: [
          { path: 'dashboard', element: <Dashboard /> }
        ]
      }
    ]
  },
  { path: '/login', element: <Login /> }
];

export default routes;
