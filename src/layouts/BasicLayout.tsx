import React, { Suspense } from 'react';
import { Layout, Spin } from 'antd';
import { Outlet } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

const BasicLayout: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ color: '#fff', fontSize: 18 }}>WebServe</Header>
      <Content style={{ padding: 24 }}>
        <Suspense fallback={<Spin />}> 
          <Outlet />
        </Suspense>
      </Content>
      <Footer style={{ textAlign: 'center' }}>© {new Date().getFullYear()} WebServe</Footer>
    </Layout>
  );
};

export default BasicLayout;
