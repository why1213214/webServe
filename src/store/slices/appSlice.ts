import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type AppState } from '@/types';

const initialState: AppState = {
  theme: 'light',
  language: 'zh-CN',
  collapsed: false,
  loading: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    setLanguage: (state, action: PayloadAction<'zh-CN' | 'en-US'>) => {
      state.language = action.payload;
    },
    toggleSidebar: (state) => {
      state.collapsed = !state.collapsed;
    },
    setSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.collapsed = action.payload;
    },
    setGlobalLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setTheme,
  setLanguage,
  toggleSidebar,
  setSidebarCollapsed,
  setGlobalLoading,
} = appSlice.actions;

export default appSlice.reducer;
