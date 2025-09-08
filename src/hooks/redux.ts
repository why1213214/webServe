import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import { type RootState, type AppDispatch } from '@/store';

// 使用在整个应用中，而不是普通的 `useDispatch` 和 `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// 便捷hooks
export const useAuth = () => useAppSelector((state) => state.auth);
export const useApp = () => useAppSelector((state) => state.app);
