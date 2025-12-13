import { clearAuthToken } from '../config/storage.service';

export async function logout() {
  return clearAuthToken();
}
