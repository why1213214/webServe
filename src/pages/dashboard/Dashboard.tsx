import React from 'react';
import { Card, Row, Col, Statistic, Typography, Space, Button, Divider } from 'antd';
import { 
  UserOutlined, 
  TeamOutlined, 
  ShoppingOutlined, 
  DollarOutlined,
  ExperimentOutlined,
  ApiOutlined
} from '@ant-design/icons';
import { useAppSelector } from '@/hooks/redux';
import ApiStatus from '@/components/common/ApiStatus';
import { ApiTester } from '@/utils/apiTester';

const { Title, Paragraph } = Typography;

const Dashboard: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);

  const handleRunApiTests = async () => {
    await ApiTester.runAllTests();
  };

  return (
    <div className="fade-in">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* 欢迎信息 */}
        <div>
          <Title level={2}>仪表盘</Title>
          <Paragraph type="secondary">
            欢迎回来, {user?.username}! 这里是您的管理中心。
          </Paragraph>
        </div>

        {/* API状态卡片 */}
        <Card title="🔌 系统状态" size="small">
          <Space direction="vertical" style={{ width: '100%' }}>
            <ApiStatus showDetails size="default" />
            <Divider style={{ margin: '12px 0' }} />
            <Space>
              <Button 
                type="primary" 
                icon={<ExperimentOutlined />}
                onClick={handleRunApiTests}
                size="small"
              >
                运行API测试
              </Button>
              <Button 
                type="link" 
                icon={<ApiOutlined />}
                href="http://localhost:8080/api/swagger-ui.html"
                target="_blank"
                size="small"
              >
                查看API文档
              </Button>
            </Space>
          </Space>
        </Card>

        {/* 数据统计 */}
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="总用户数"
                value={1128}
                prefix={<UserOutlined />}
                valueStyle={{ color: '#3f8600' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="活跃用户"
                value={893}
                prefix={<TeamOutlined />}
                valueStyle={{ color: '#1677ff' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="订单数量"
                value={234}
                prefix={<ShoppingOutlined />}
                valueStyle={{ color: '#722ed1' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="总收入"
                value={112893}
                prefix={<DollarOutlined />}
                precision={2}
                valueStyle={{ color: '#cf1322' }}
              />
            </Card>
          </Col>
        </Row>

        {/* 开发提示 */}
        {process.env.NODE_ENV === 'development' && (
          <Card title="👨‍💻 开发提示" size="small">
            <Paragraph type="secondary" style={{ margin: 0 }}>
              在控制台中输入 <code>apiTester.runAllTests()</code> 可以手动测试所有API接口。
            </Paragraph>
          </Card>
        )}
      </Space>
    </div>
  );
};

export default Dashboard;
