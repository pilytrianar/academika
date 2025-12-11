'use client';

import { useState } from 'react';
import { Badge, Typography, Box, List, useTheme, alpha } from '@mui/material';
import Button from '../Button';
import IconButton from '../Button/IconButton';
import NotificationsIcon from '@mui/icons-material/NotificationsOutlined';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweepOutlined';
import NotificationItem from './NotificationsItems';
import DropDownMenu from '../DropDownMenu';
import { Notification, NotificationsProps } from './Notifications.types';

const Notifications = ({ data }: NotificationsProps) => {
  const [notifications, setNotifications] = useState<Notification[]>(data);
  const theme = useTheme();

  const handleClearAll = () => {
    setNotifications([]);
  };

  return (
    <>
      <DropDownMenu
        id='notifications-menu'
        trigger={handleOpen => (
          <IconButton
            onClick={handleOpen}
            sx={{
              color: 'text.secondary',
              transition: 'all 0.2s',
              '&:hover': {
                color: 'primary.main',
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                transform: 'scale(1.05)',
              },
            }}
          >
            <Badge badgeContent={notifications.length} color='error'>
              <NotificationsIcon />
            </Badge>
          </IconButton>
        )}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              mt: 1.5,
              width: 360,
              maxHeight: 480,
              overflow: 'auto',
              borderRadius: 3,
              boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
              border: `1px solid ${theme.palette.divider}`,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box
          sx={{
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            bgcolor: alpha(theme.palette.primary.main, 0.03),
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography variant='h6' sx={{ fontWeight: 700, fontSize: '1rem' }}>
            Notificaciones
          </Typography>
          {notifications.length > 0 && (
            <Button
              text='Limpiar'
              variant='text'
              size='small'
              startIcon={<DeleteSweepIcon fontSize='small' />}
              onClick={handleClearAll}
              sx={{
                textTransform: 'none',
                fontSize: '0.8rem',
                color: 'text.secondary',
                '&:hover': {
                  color: 'error.main',
                  bgcolor: alpha(theme.palette.error.main, 0.05),
                },
              }}
            />
          )}
        </Box>

        {notifications.length === 0 ? (
          <Box sx={{ p: 6, textAlign: 'center', color: 'text.secondary' }}>
            <DoneAllIcon sx={{ fontSize: 48, mb: 2, opacity: 0.2 }} />
            <Typography variant='body1' fontWeight={500}>
              Todo al día
            </Typography>
            <Typography variant='body2' sx={{ opacity: 0.7 }}>
              No tienes notificaciones.
            </Typography>
          </Box>
        ) : (
          <List sx={{ p: 0 }}>
            {notifications.map((notification, index) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                isLast={index === notifications.length - 1}
                theme={theme}
              />
            ))}
          </List>
        )}
      </DropDownMenu>
    </>
  );
};

export default Notifications;
