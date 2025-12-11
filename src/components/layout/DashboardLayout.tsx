'use client';

import { useState } from 'react';
import { Box, Toolbar } from '@mui/material';
import { useRouter } from 'next/navigation';
import Drawer from '../common/Drawer';

import AppBar from '../common/AppBar';
import { DrawerWidth } from '@/global.constants';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path: string) => {
    router.push(path);
    setMobileOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
      {/* AppBar */}
      <AppBar width={DrawerWidth.DESKTOP} onClick={handleDrawerToggle} />
      {/* Drawer para móvil */}
      <Drawer
        isMobile
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: DrawerWidth.MOBILE,
          },
        }}
        handleNavigation={handleNavigation}
      />
      {/* Drawer permanente para desktop */}
      <Drawer
        sx={{
          display: { xs: 'none', sm: 'block' },
          width: DrawerWidth.DESKTOP,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: DrawerWidth.DESKTOP,
            position: 'fixed',
            height: '100%',
          },
        }}
        handleNavigation={handleNavigation}
      />
      {/* Contenido principal */}
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          p: 3,
          width: { xs: '100%', sm: `calc(100% - ${DrawerWidth.DESKTOP})` },
          minHeight: '100dvh',
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
