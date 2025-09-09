import React, { useState, useEffect } from 'react';
import { Badge, Typography, Space, Button, Tooltip } from 'antd';
import { ApiOutlined, ReloadOutlined } from '@ant-design/icons';
import { ApiTester } from '@/utils/apiTester';

const { Text } = Typography;

interface ApiStatusProps {
  showDetails?: boolean;
  size?: 'small' | 'default';
}

const ApiStatus: React.FC<ApiStatusProps> = ({ 
  showDetails = false, 
  size = 'default' 
}) => {
  const [status, setStatus] = useState<{
    connected: boolean;
    loading: boolean;
    message: string;
    lastCheck: Date | null;
  }>({
    connected: false,
    loading: false,
    message: '未检查',
    lastCheck: null
  });

  const checkApiStatus = async () => {
    setStatus(prev => ({ ...prev, loading: true }));
    
    try {
      const result = await ApiTester.testConnection();
      setStatus({
        connected: result.success,
        loading: false,
        message: result.message,
        lastCheck: new Date()
      });
    } catch {
      setStatus({
        connected: false,
        loading: false,
        message: '连接检查失败',
        lastCheck: new Date()
      });
    }
  };

  // 组件挂载时检查一次
  useEffect(() => {
    checkApiStatus();
  }, []);

  // 根据size决定组件大小
  const isSmall = size === 'small';
  
  return (
    <Space size={isSmall ? 'small' : 'middle'} align="center">
      <Badge 
        status={status.connected ? 'success' : 'error'} 
        text={
          <Space size="small">
            <ApiOutlined style={{ fontSize: isSmall ? '12px' : '14px' }} />
            <Text 
              style={{ 
                fontSize: isSmall ? '12px' : '14px',
                color: status.connected ? '#52c41a' : '#ff4d4f'
              }}
            >
              {status.connected ? '后端已连接' : '后端连接失败'}
            </Text>
          </Space>
        }
      />
      
      <Tooltip title="刷新连接状态">
        <Button 
          type="text" 
          size={isSmall ? 'small' : 'middle'}
          icon={<ReloadOutlined />} 
          loading={status.loading}
          onClick={checkApiStatus}
        />
      </Tooltip>
      
      {showDetails && (
        <Text 
          type="secondary" 
          style={{ fontSize: isSmall ? '11px' : '12px' }}
        >
          {status.message}
          {status.lastCheck && (
            ` (${status.lastCheck.toLocaleTimeString()})`
          )}
        </Text>
      )}
    </Space>
  );
};

export default ApiStatus;
