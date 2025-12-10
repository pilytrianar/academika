import { MenuProps } from '@mui/material';
import { ReactNode } from 'react';

export interface DropDownMenuProps extends Omit<MenuProps, 'open' | 'onClose' | 'anchorEl'> {
  children: ReactNode;
  trigger: (handleOpen: (event: React.MouseEvent<HTMLElement>) => void) => ReactNode;
}
