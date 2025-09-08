import React from 'react';
import { Layout, Menu, Avatar, Dropdown, Button, theme, Space } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  UserOutlined, 
  DashboardOutlined, 
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  MoonOutlined,
  SunOutlined
} from '@ant-design/icons';
import { useAuth, useApp, useAppDispatch } from '@/hooks/redux';
import { logoutAsync } from '@/store/slices/authSlice';
import { toggleSidebar, setTheme } from '@/store/slices/appSlice';
import styles from './MainLayout.module.scss';
import clsx from 'clsx';

const { Header, Sider, Content } = Layout;

const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  
  const { user } = useAuth();
  const { collapsed, theme: appTheme } = useApp();
  const { token } = theme.useToken();

  const handleLogout = async () => {
    await dispatch(logoutAsync());
    navigate('/auth/login');
  };

  const toggleTheme = () => {
    dispatch(setTheme(appTheme === 'light' ? 'dark' : 'light'));
  };

  const userMenuItems = [
    {
      key: 'profile',
      label: '个人资料',
      icon: <UserOutlined />,
      onClick: () => navigate('/profile'),
    },
    {
      key: 'settings',
      label: '设置',
      icon: <SettingOutlined />,
      onClick: () => navigate('/settings'),
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      label: '退出登录',
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
  ];

  const menuItems = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: '仪表盘',
    },
    {
      key: '/profile',
      icon: <UserOutlined />,
      label: '个人资料',
    },
  ];

  return (
    <Layout className={styles.layout}>
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        className={styles.sider}
        theme={appTheme}
      >
        <div className={styles.logo}>
          {collapsed ? 'WS' : 'WebServe'}
        </div>
        <Menu
          theme={appTheme}
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
          className={styles.menu}
        />
      </Sider>
      
      <Layout>
        <Header 
          className={styles.header}
          style={{ background: token.colorBgContainer }}
        >
          <div className={styles.headerLeft}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => dispatch(toggleSidebar())}
              className={styles.collapseBtn || ''}
            />
          </div>
          
          <div className={styles.headerRight}>
            <Space size="middle">
              <Button
                type="text"
                icon={appTheme === 'light' ? <MoonOutlined /> : <SunOutlined />}
                onClick={toggleTheme}
              />
              
              <Dropdown
                menu={{ items: userMenuItems }}
                placement="bottomRight"
                arrow
              >
                <div className={styles.userInfo}>
                  <Avatar 
                    src={user?.avatar} 
                    icon={<UserOutlined />} 
                    size="small" 
                  />
                  <span className={styles.username}>{user?.username}</span>
                </div>
              </Dropdown>
            </Space>
          </div>
        </Header>
        
        <Content className={styles.content}>
          <div className={clsx(styles.contentInner, 'fade-in')}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
