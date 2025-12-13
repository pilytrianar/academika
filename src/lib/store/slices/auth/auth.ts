import { User } from '@/generated/prisma/client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthUser = Pick<User, 'id' | 'email'> & { firstName: string; lastName: string };
type AuthState = { isAuthenticated: boolean; user: AuthUser | null };
export type SetAuthenticatedPayload =
  | {
      isAuthenticated: true;
      user: AuthUser;
    }
  | {
      isAuthenticated: false;
    };

export const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticated(state, action: PayloadAction<SetAuthenticatedPayload>) {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.isAuthenticated ? action.payload.user : null;
    },
  },
});

export default authSlice.reducer;
export const { setAuthenticated } = authSlice.actions;
