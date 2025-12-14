import { useState, useEffect, useCallback } from 'react';
import { fetchData } from '@/utils/fetchData';

export interface Notification {
  id: number;
  title: string;
  description: string;
  type: string;
  isRead: boolean;
  userId: number | null;
  createdAt: string;
}

interface NotificationsResponse {
  notifications: Notification[];
}

interface UseNotificationsParams {
  userId?: number;
  limit?: number;
}

interface UseNotificationsReturn {
  data: NotificationsResponse | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useNotifications = (params?: UseNotificationsParams): UseNotificationsReturn => {
  const [data, setData] = useState<NotificationsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Construir query params
      const queryParams = new URLSearchParams();
      if (params?.userId) {
        queryParams.append('userId', params.userId.toString());
      }
      if (params?.limit) {
        queryParams.append('limit', params.limit.toString());
      }

      const url = `/api/notifications${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      const response = await fetchData<NotificationsResponse>(url);
      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  }, [params?.userId, params?.limit]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  return {
    data,
    loading,
    error,
    refetch: fetchNotifications,
  };
};
