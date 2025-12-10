import { Menu } from '@mui/material';
import { useMenu } from '../../hooks/useMenu';
import { DropDownMenuProps } from './DropDownMenu.types';

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
