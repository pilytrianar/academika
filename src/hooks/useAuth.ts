'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { getAuthToken, clearAuthToken } from '@/server/auth/config/storage.service';

export function useAuth() {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  const token = getAuthToken();

  const logout = () => {
    clearAuthToken();
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return {
    isAuthenticated,
    user,
    token,
    logout,
  };
}
