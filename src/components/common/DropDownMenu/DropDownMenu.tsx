import { Menu, MenuProps } from '@mui/material';
import { ReactNode } from 'react';
import { useMenu } from '../../hooks/useMenu';

interface DropDownMenuProps extends Omit<MenuProps, 'open' | 'onClose' | 'anchorEl'> {
  children: ReactNode;
  trigger: (handleOpen: (event: React.MouseEvent<HTMLElement>) => void) => ReactNode;
}

const DropDownMenu = ({ children, trigger, ...props }: DropDownMenuProps) => {
  const { anchorEl, handleOpen, handleClose } = useMenu();

  return (
    <>
      {trigger(handleOpen)}
      <Menu open={Boolean(anchorEl)} onClose={handleClose} anchorEl={anchorEl} {...props}>
        {children}
      </Menu>
    </>
  );
};

export default DropDownMenu;
