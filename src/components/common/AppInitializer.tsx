import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { getCurrentUserAsync } from '@/store/slices/authSlice';

interface AppInitializerProps {
  children: React.ReactNode;
}

const AppInitializer: React.FC<AppInitializerProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // 如果存在token，尝试获取用户信息
    if (token) {
      dispatch(getCurrentUserAsync());
    }
  }, [dispatch, token]);

  return <>{children}</>;
};

export default AppInitializer;
