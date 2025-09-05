import React from 'react';
import { Typography, Card } from 'antd';
const { Title, Paragraph } = Typography;

const Dashboard: React.FC = () => {
  return (
    <div style={{ padding: 12 }}>
      <Title level={3}>仪表盘</Title>
      <Paragraph>只有登录后才能看到的受保护页面示例。</Paragraph>
      <Card>欢迎回来！这里可以展示统计数据。</Card>
    </div>
  );
};

export default Dashboard;
