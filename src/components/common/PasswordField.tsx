'use client';

import { useState } from 'react';
import { IconButton, TextField, TextFieldProps } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { RevealIconProps } from '@/types/auth';

const RevealIcon = ({ reveal, setReveal, disabled }: RevealIconProps) => (
  <IconButton disabled={disabled} onClick={setReveal}>
    {reveal ? <VisibilityOff /> : <Visibility />}
  </IconButton>
);

export default function PasswordField(props: TextFieldProps) {
  const [revealPassword, setRevealPassword] = useState(false);

  const handlePasswordReveal = () => {
    setRevealPassword(!revealPassword);
  };

  return (
    <TextField
      {...props}
      required
      fullWidth
      id='password'
      name='password'
      type={revealPassword ? 'text' : 'password'}
      label='Contraseña'
      slotProps={{
        input: {
          endAdornment: (
            <RevealIcon
              reveal={revealPassword}
              setReveal={handlePasswordReveal}
              disabled={props.disabled}
            />
          ),
        },
      }}
    />
  );
}
