import axios from 'axios';
import { store } from '../store';

const http = axios.create({
  baseURL: '/api',
  timeout: 15000
});

http.interceptors.request.use(cfg => {
  const token = store.getState().user.token;
  if (token && cfg.headers) {
    cfg.headers.Authorization = `Bearer ${token}`;
  }
  return cfg;
});

http.interceptors.response.use(
  res => res.data,
  error => {
    // 可在此处做统一错误提示
    return Promise.reject(error);
  }
);

export default http;
