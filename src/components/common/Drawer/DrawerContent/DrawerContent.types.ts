import { MenuItem } from '../Drawer.types';

export interface DrawerContentProps {
  menuItems: MenuItem[];
  pathname: string;
  handleNavigation?: (path: string) => void;
}
