'use client';

import { Field } from 'formik';
import { TextField, TextFieldProps } from '@mui/material';

export default function EmailField(props: TextFieldProps) {
  return (
    <Field
      {...props}
      required
      fullWidth
      id='email'
      name='email'
      label='Correo Electrónico'
      autoComplete='email'
      as={TextField}
    />
  );
}
