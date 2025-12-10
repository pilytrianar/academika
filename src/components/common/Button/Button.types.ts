import { ButtonProps as MuiButtonProps } from '@mui/material';
import { ReactNode } from 'react';

export interface ButtonProps extends Omit<MuiButtonProps, 'children'> {
  text: string;
  textUpperCase?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  rounded?: string;
  fontWeight?: string;
}
