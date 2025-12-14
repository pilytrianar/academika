export interface Notification {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  type: string;
  isRead: boolean;
  userId: number | null;
}

export interface NotificationsProps {
  data: Notification[];
  loading?: boolean;
  onClear?: () => void;
}
