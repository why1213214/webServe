import React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import styles from './AuthLayout.module.scss';

const AuthLayout: React.FC = () => {
  return (
    <Layout className={styles.authLayout}>
      <div className={styles.authContainer}>
        <div className={styles.authContent}>
          <Outlet />
        </div>
      </div>
    </Layout>
  );
};

export default AuthLayout;
