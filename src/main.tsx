import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ConfigProvider, App as AntdApp, Spin } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

import { store, persistor } from '@/store';
import AppRouter from '@/router';
import AppInitializer from '@/components/common/AppInitializer';
import '@/styles/global.scss';

// 开发环境下导入API测试工具
if (process.env.NODE_ENV === 'development') {
  import('@/utils/apiTester');
}

// 配置dayjs
dayjs.locale('zh-cn');

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate 
        loading={
          <div className="flex-center full-height">
            <Spin size="large" />
          </div>
        } 
        persistor={persistor}
      >
        <ConfigProvider 
          locale={zhCN}
          theme={{
            token: {
              colorPrimary: '#1677ff',
              borderRadius: 6,
            },
          }}
        >
          <AntdApp>
            <AppInitializer>
              <AppRouter />
            </AppInitializer>
          </AntdApp>
        </ConfigProvider>
      </PersistGate>
    </Provider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
