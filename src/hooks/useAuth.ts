import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { getAuthToken } from '@/server/auth/config/storage.service';

export function useAuth() {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const token = getAuthToken();

  return {
    isAuthenticated,
    user,
    token,
  };
}
