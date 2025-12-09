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

interface MenuItem {
  text: string;
  icon: React.ReactNode;
  path: string;
}

interface DrawerContentProps {
  menuItems: MenuItem[];
  pathname: string;
  handleNavigation?: (path: string) => void;
}

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
        {menuItems.map(item => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={pathname === item.path}
              onClick={() => handleNavigation?.(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} color='red' />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default DrawerContent;
