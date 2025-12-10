import { DrawerProps as MuiDrawerProps } from '@mui/material';

export interface DrawerProps extends MuiDrawerProps {
  isMobile?: boolean;
  handleNavigation?: (path: string) => void;
}

export interface MenuItem {
  text: string;
  icon: React.ReactNode;
  path: string;
}
