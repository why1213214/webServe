import React from 'react';
import { Button, Typography } from 'antd';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { logout } from '../store/slices/userSlice';
import { Link } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const Home: React.FC = () => {
  const user = useAppSelector((s) => s.user);
  const dispatch = useAppDispatch();
  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>首页</Title>
      {user.token ? (
        <Paragraph>当前用户：{user.name}</Paragraph>
      ) : (
        <Paragraph>尚未登录</Paragraph>
      )}
      <div style={{ display: 'flex', gap: 12 }}>
        {!user.token && <Link to="/login">去登录</Link>}
        {user.token && <Link to="/dashboard">仪表盘</Link>}
        {user.token && (
          <Button type="primary" danger onClick={() => dispatch(logout())}>
            退出登录
          </Button>
        )}
      </div>
    </div>
  );
};

export default Home;
