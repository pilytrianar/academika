import { Theme } from '@mui/material/styles';
import { Notification } from '../Notifications.types';

export type NotificationItem = Notification;

export interface NotificationItemProps {
  notification: NotificationItem;
  isLast: boolean;
  theme: Theme;
}
