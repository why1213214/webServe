import React from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { Link } from 'react-router-dom';

const { Title } = Typography;

const Register: React.FC = () => {
  return (
    <div style={{ padding: 32 }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: 32 }}>
        创建账户
      </Title>
      <Form layout="vertical" size="large">
        <Form.Item name="username" label="用户名" rules={[{ required: true }]}>
          <Input placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item name="email" label="邮箱" rules={[{ required: true, type: 'email' }]}>
          <Input placeholder="请输入邮箱" />
        </Form.Item>
        <Form.Item name="password" label="密码" rules={[{ required: true }]}>
          <Input.Password placeholder="请输入密码" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" block>
            注册
          </Button>
        </Form.Item>
      </Form>
      <div style={{ textAlign: 'center', marginTop: 16 }}>
        <Link to="/auth/login">已有账户？立即登录</Link>
      </div>
    </div>
  );
};

export default Register;
