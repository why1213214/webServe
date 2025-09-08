import React, { useState } from 'react';
import { Form, Input, Button, Typography, message, Divider } from 'antd';
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch } from '@/hooks/redux';
import { loginAsync } from '@/store/slices/authSlice';
import { type LoginRequest } from '@/types';
import styles from './Login.module.scss';

const { Title, Text } = Typography;

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/dashboard';

  const handleSubmit = async (values: LoginRequest) => {
    setLoading(true);
    console.log('Login attempt with:', values);
    try {
      const result = await dispatch(loginAsync(values)).unwrap();
      console.log('Login successful:', result);
      message.success('登录成功');
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Login failed:', error);
      message.error(typeof error === 'string' ? error : '登录失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginHeader}>
        <Title level={2} className={styles.title || ''}>
          欢迎回来
        </Title>
        <Text type="secondary" className={styles.subtitle || ''}>
          登录您的账户以继续使用
        </Text>
      </div>

      <Form
        name="login"
        onFinish={handleSubmit}
        layout="vertical"
        size="large"
        className={styles.loginForm}
      >
        <Form.Item
          name="username"
          label="用户名"
          rules={[
            { required: true, message: '请输入用户名' },
            { min: 3, message: '用户名至少3个字符' }
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="请输入用户名"
          />
        </Form.Item>

        <Form.Item
          name="password"
          label="密码"
          rules={[
            { required: true, message: '请输入密码' },
            { min: 6, message: '密码至少6个字符' }
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="请输入密码"
            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </Form.Item>

        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={loading}
            className={styles.loginBtn || ''}
            block
          >
            登录
          </Button>
        </Form.Item>
      </Form>

      <Divider plain>
        <Text type="secondary">还没有账户？</Text>
      </Divider>

      <div className={styles.loginFooter}>
        <Link to="/auth/register" className={styles.registerLink}>
          立即注册
        </Link>
      </div>

      <div className={styles.demoInfo}>
        <Text type="secondary" style={{ fontSize: 12 }}>
          演示账户: admin / password
        </Text>
      </div>
    </div>
  );
};

export default Login;
