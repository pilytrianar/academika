'use client';

import { AppBar as MuiAppBar, Toolbar, IconButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '../Avatar';
import Notifications from '../Notifications';
import { AppBarProps } from './AppBar.types';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useNotifications } from '@/hooks/useNotifications';

import { useState, useMemo } from 'react';

const AppBar = ({ width, onClick }: AppBarProps) => {
  const { user, logout } = useAuth();
  const fullName = `${user?.firstName} ${user?.lastName}`.trim();
  const { data, loading } = useNotifications({ userId: user?.id, limit: 10 });
  const [clearedAt, setClearedAt] = useState<number | null>(null);

  const handleClear = () => {
    setClearedAt(Date.now());
  };

  const filteredNotifications = useMemo(() => {
    const notifications = data?.notifications || [];
    if (!clearedAt) return notifications;
    return notifications.filter(n => new Date(n.createdAt).getTime() > clearedAt);
  }, [data?.notifications, clearedAt]);

  const router = useRouter();

  const AVATAR_MENU_DATA = [
    {
      id: 1,
      text: 'Perfil',
      onClick: () => router.push('/not-found'),
    },
    {
      id: 2,
      text: 'Ajustes',
      onClick: () => console.log('Ajustes'),
    },
    {
      id: 3,
      text: 'Cerrar Sesión',
      onClick: logout,
    },
  ];

  return (
    <MuiAppBar
      position='fixed'
      sx={{
        backgroundColor: '#fff',
        color: '#000',
        boxShadow: 1,
        width: { xs: '100%', sm: `calc(100% - ${width})` },
        ml: { sm: width },
        bgcolor: 'white',
      }}
    >
      <Toolbar>
        <IconButton
          aria-label='open drawer'
          edge='start'
          onClick={onClick}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>

        <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
          <Notifications data={filteredNotifications} loading={loading} onClear={handleClear} />
          <Avatar data={AVATAR_MENU_DATA} user={fullName} />
        </Box>
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
