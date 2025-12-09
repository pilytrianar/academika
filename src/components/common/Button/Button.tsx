import { Button as MuiButton, ButtonProps as MuiButtonProps, SxProps, Theme } from '@mui/material';
import { ReactNode } from 'react';

export interface ButtonProps extends Omit<MuiButtonProps, 'children'> {
  text: string;
  textUpperCase?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  rounded?: string;
  fontWeight?: string;
}

const Button = ({
  text,
  textUpperCase = false,
  disabled = false,
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  type = 'button',
  fullWidth = false,
  fontWeight,
  rounded,
  startIcon,
  endIcon,
  sx,
  onClick,
  ...props
}: ButtonProps) => {
  // Combine custom sx with textTransform
  const combinedSx: SxProps<Theme> = {
    textTransform: textUpperCase ? 'uppercase' : 'none',
    borderRadius: rounded,
    fontWeight,
    ...(sx || {}),
  };

  return (
    <MuiButton
      color={color}
      size={size}
      sx={combinedSx}
      disabled={disabled}
      variant={variant}
      type={type}
      fullWidth={fullWidth}
      startIcon={startIcon}
      endIcon={endIcon}
      onClick={onClick}
      {...props}
    >
      {text}
    </MuiButton>
  );
};

export default Button;
