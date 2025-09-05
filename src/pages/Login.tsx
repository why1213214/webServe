import React, { useState } from 'react';
import { Button, Form, Input, Typography, message } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks';
import { setToken, setName } from '../store/slices/userSlice';

const { Title } = Typography;

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from || '/';

  const onFinish = (values: { username: string; password: string }) => {
    setLoading(true);
    // Mock request
    setTimeout(() => {
      dispatch(setToken('mock-token'));
      dispatch(setName(values.username));
      message.success('登录成功');
  navigate(from, { replace: true });
      setLoading(false);
    }, 800);
  };

  return (
    <div style={{ maxWidth: 360, margin: '80px auto' }}>
      <Title level={3}>登录</Title>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item name="username" label="用户名" rules={[{ required: true, message: '请输入用户名' }] }>
          <Input placeholder="用户名" />
        </Form.Item>
        <Form.Item name="password" label="密码" rules={[{ required: true, message: '请输入密码' }] }>
          <Input.Password placeholder="密码" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
