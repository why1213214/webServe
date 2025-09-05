import React, { Suspense } from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import routes from './routes';
import { Spin } from 'antd';

const RouterView: React.FC = () => {
  const element = useRoutes([
    ...routes,
    { path: '*', element: <Navigate to="/" replace /> }
  ]);
  return <Suspense fallback={<div style={{padding:40,textAlign:'center'}}><Spin /></div>}>{element}</Suspense>;
};

export default RouterView;
