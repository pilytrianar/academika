import { IconButtonProps as MuiIconButtonProps } from '@mui/material';

export interface IconButtonProps extends MuiIconButtonProps {
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  hasText?: boolean;
  text?: string;
}
