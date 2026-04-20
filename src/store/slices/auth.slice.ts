import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AuthSession } from '@/auth/types/auth.types';

interface AuthState {
  session: AuthSession | null;
  status: 'idle' | 'restoring' | 'authenticated' | 'guest';
}

const initialState: AuthState = {
  session: null,
  status: 'restoring',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    restoreSession(state, action: PayloadAction<AuthSession | null>) {
      state.session = action.payload;
      state.status = action.payload ? 'authenticated' : 'guest';
    },
    setSession(state, action: PayloadAction<AuthSession>) {
      state.session = action.payload;
      state.status = 'authenticated';
    },
    clearSession(state) {
      state.session = null;
      state.status = 'guest';
    },
  },
});

export const { restoreSession, setSession, clearSession } = authSlice.actions;
export const authReducer = authSlice.reducer;
