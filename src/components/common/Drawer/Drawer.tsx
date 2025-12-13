'use client';

import { Drawer as MuiDrawer } from '@mui/material';
import DrawerContent from './DrawerContent';
import HomeIcon from '@mui/icons-material/Home';
import BookIcon from '@mui/icons-material/Book';
import PeopleIcon from '@mui/icons-material/People';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { usePathname } from 'next/navigation.js';
import { DrawerProps, MenuItem } from './Drawer.types';

const menuItems: MenuItem[] = [
  { text: 'Inicio', icon: <HomeIcon />, path: '/' },
  { text: 'Asignaturas', icon: <BookIcon />, path: '/asignaturas' },
  { text: 'Estudiantes', icon: <PeopleIcon />, path: '/estudiantes' },
  { text: 'Calendario', icon: <CalendarMonthIcon />, path: '/calendario' },
];

const Drawer = ({ isMobile = false, handleNavigation, ...props }: DrawerProps) => {
  const pathname = usePathname();

  return (
    <MuiDrawer
      open
      ModalProps={isMobile ? { keepMounted: true } : undefined}
      variant={isMobile ? 'temporary' : 'permanent'}
      {...props}
    >
      <DrawerContent
        menuItems={menuItems}
        pathname={pathname}
        handleNavigation={handleNavigation}
      />
    </MuiDrawer>
  );
};

export default Drawer;
