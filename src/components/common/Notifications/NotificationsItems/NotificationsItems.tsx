import {
  Avatar as MuiAvatar,
  Box,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  alpha,
} from '@mui/material';

import CheckCircleIcon from '@mui/icons-material/CheckCircleOutline';
import WarningIcon from '@mui/icons-material/WarningAmber';
import InfoIcon from '@mui/icons-material/InfoOutlined';
import SchoolIcon from '@mui/icons-material/School';
import AnnouncementIcon from '@mui/icons-material/Announcement';

import { NotificationItemProps } from './NotificationItems.types';
import { formatDate } from '@/utils/helpers.common';

const getNotificationIcon = (type: string) => {
  const iconProps = { fontSize: 'small' as const };

  switch (type) {
    case 'NEW_STUDENT':
      return <SchoolIcon color='success' {...iconProps} />;
    case 'GRADE':
      return <CheckCircleIcon color='success' {...iconProps} />;
    case 'DISCIPLINARY':
      return <WarningIcon color='warning' {...iconProps} />;
    case 'ANNOUNCEMENT':
      return <AnnouncementIcon color='info' {...iconProps} />;
    case 'REMINDER':
      return <InfoIcon color='info' {...iconProps} />;
  }
};

const NotificationItem = ({ notification, isLast, theme }: NotificationItemProps) => {
  return (
    <Box>
      <ListItem
        alignItems='flex-start'
        sx={{
          px: 3,
          py: 2,
          cursor: 'pointer',
          transition: 'all 0.2s',
          minHeight: 80,
          bgcolor: notification.isRead ? 'transparent' : alpha(theme.palette.primary.main, 0.02),
          '&:hover': {
            bgcolor: alpha(theme.palette.primary.main, 0.05),
          },
          borderLeft: !notification.isRead
            ? '3px solid transparent'
            : `3px solid ${theme.palette.primary.main}`,
        }}
      >
        <ListItemAvatar sx={{ mt: 0.5 }}>
          <MuiAvatar
            sx={{
              bgcolor: alpha(theme.palette.background.paper, 1),
              border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
              width: 40,
              height: 40,
            }}
          >
            {getNotificationIcon(notification.type)}
          </MuiAvatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            <Box display='flex' justifyContent='space-between' mb={0.5} alignItems='center'>
              <Typography
                variant='subtitle2'
                sx={{
                  fontWeight: notification.isRead ? 500 : 700,
                  fontSize: '0.9rem',
                }}
              >
                {notification.title}
              </Typography>
              <Typography
                variant='caption'
                color='text.secondary'
                sx={{ fontSize: '0.7rem', ml: 1, whiteSpace: 'nowrap' }}
              >
                {formatDate(notification.createdAt)}
              </Typography>
            </Box>
          }
          secondary={
            <Typography
              variant='body2'
              color='text.secondary'
              sx={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                lineHeight: 1.5,
                fontSize: '0.8125rem',
              }}
            >
              {notification.description}
            </Typography>
          }
        />
      </ListItem>
      {!isLast && <Divider component='li' variant='inset' />}
    </Box>
  );
};

export default NotificationItem;
