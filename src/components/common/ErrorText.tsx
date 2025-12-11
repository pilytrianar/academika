'use client';

import { ErrorTextProps } from '@/types/auth';
import { FormHelperText } from '@mui/material';

export default function ErrorText<T>({ name, touched, errors }: ErrorTextProps<T>) {
  const fieldTouched = touched[name];
  const fieldError = errors[name];

  if (!fieldTouched || !fieldError || typeof fieldError !== 'string') return null;

  return (
    <FormHelperText sx={{ mt: 1 }} error>
      {fieldError}
    </FormHelperText>
  );
}
