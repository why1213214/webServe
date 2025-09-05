import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadAuth, clearAuth, saveAuth } from '../../utils/auth';

export interface UserState {
  token: string | null;
  name: string;
}

const persisted = loadAuth();
const initialState: UserState = {
  token: persisted.token,
  name: persisted.name
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
      if (action.payload) {
        saveAuth(action.payload, state.name);
      } else {
        clearAuth();
      }
    },
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
      if (state.token) saveAuth(state.token, action.payload);
    },
    logout(state) {
      state.token = null;
      state.name = '';
      clearAuth();
    }
  }
});

export const { setToken, setName, logout } = userSlice.actions;
export default userSlice.reducer;
