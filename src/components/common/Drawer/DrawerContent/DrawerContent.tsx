'use client';

import {
  Box,
  Toolbar,
  List,
  Typography,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import Image from 'next/image';
import { DrawerContentProps } from './DrawerContent.types';

const DrawerContent = ({ menuItems, pathname, handleNavigation }: DrawerContentProps) => {
  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Toolbar>
        <Image
          src='/icon.svg'
          alt='AcademikaLogo'
          width={50}
          height={50}
          style={{ aspectRatio: '1/1', width: '50px', height: '50px' }}
          loading='eager'
        />
        <Typography variant='h6' noWrap component='p' sx={{ fontWeight: 'bold', ml: 1 }}>
          Academika
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map(item => {
          const isActive = pathname === item.path;
          const color = isActive ? 'primary.main' : 'inherit';

          return (
            <ListItem key={item.text} disablePadding>
              <ListItemButton selected={isActive} onClick={() => handleNavigation?.(item.path)}>
                <ListItemIcon sx={{ color }}>{item.icon}</ListItemIcon>
                <ListItemText>
                  <Typography sx={{ color, fontWeight: isActive ? 600 : 0 }}>
                    {item.text}
                  </Typography>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default DrawerContent;
