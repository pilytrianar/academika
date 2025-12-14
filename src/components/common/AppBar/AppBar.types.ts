import { AppBarProps as MuiAppBarProps } from '@mui/material';

export interface AppBarProps extends MuiAppBarProps {
  width: string;
  onClick?: () => void;
}
