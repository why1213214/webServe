import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider, App as AntdApp } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { store } from './store';
import RouterView from './router';
import './styles/global.css';

dayjs.locale('zh-cn');

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN} theme={{ token: { colorPrimary: '#1677ff' } }}>
      <Provider store={store}>
        <BrowserRouter>
          <AntdApp>
            <RouterView />
          </AntdApp>
        </BrowserRouter>
      </Provider>
    </ConfigProvider>
  </React.StrictMode>
);
