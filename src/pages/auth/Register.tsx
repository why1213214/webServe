import React from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { registerAsync } from '@/store/slices/authSlice';
import type { RegisterRequest } from '@/types';

const { Title } = Typography;

const Register: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } = useAppSelector((state) => state.auth);

  const handleSubmit = async (values: RegisterRequest) => {
    try {
      const result = await dispatch(registerAsync(values));
      
      if (registerAsync.fulfilled.match(result)) {
        message.success(result.payload.message);
        navigate('/auth/login');
      }
    } catch {
      // 错误已在 registerAsync 中处理
    }
  };

  return (
    <div style={{ padding: 32 }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: 32 }}>
        创建账户
      </Title>
      <Form 
        form={form}
        layout="vertical" 
        size="large"
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Form.Item 
          name="username" 
          label="用户名" 
          rules={[
            { required: true, message: '请输入用户名' },
            { min: 3, message: '用户名至少3个字符' },
            { max: 20, message: '用户名最多20个字符' }
          ]}
        >
          <Input placeholder="请输入用户名" />
        </Form.Item>
        
        <Form.Item 
          name="email" 
          label="邮箱" 
          rules={[
            { required: true, message: '请输入邮箱' },
            { type: 'email', message: '请输入有效的邮箱地址' }
          ]}
        >
          <Input placeholder="请输入邮箱" />
        </Form.Item>
        
        <Form.Item 
          name="password" 
          label="密码" 
          rules={[
            { required: true, message: '请输入密码' },
            { min: 6, message: '密码至少6个字符' }
          ]}
        >
          <Input.Password placeholder="请输入密码" />
        </Form.Item>
        
        <Form.Item 
          name="confirmPassword" 
          label="确认密码" 
          dependencies={['password']}
          rules={[
            { required: true, message: '请确认密码' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('两次输入的密码不一致'));
              },
            }),
          ]}
        >
          <Input.Password placeholder="请再次输入密码" />
        </Form.Item>
        
        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            block 
            loading={loading}
          >
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
