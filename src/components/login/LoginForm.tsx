'use client';

import { useRouter } from 'next/navigation';
import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { Alert, Checkbox, FormControlLabel, Grid } from '@mui/material';

import Button from '@/components/common/Button';

import ErrorText from '@/components/common/ErrorText';
import EmailField from '@/components/common/EmailField';
import PasswordField from '@/components/common/PasswordField';

import { loginSchema } from '@/lib/schemas';
import { API_MESSAGES, basePostReq } from '@/utils/constants';
import { LoginValues } from '@/types/auth';
import useActions from '@/hooks/useActions';
import { setAuthenticated } from '@/lib/store/slices/auth/auth';
import { setAuthToken } from '@/server/auth/config/storage.service';
import { decodeJWT } from '../auth/jwt.helpers';

export default function LoginForm() {
  const router = useRouter();
  const actions = useActions({ setAuthenticated });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const initialValues = { email: '', password: '' };

  const handleSubmit = async (values: LoginValues) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/login', {
        ...basePostReq,
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.error || API_MESSAGES[500]);
        return;
      }

      // Solo guarda el token
      setAuthToken(data.token);

      // Decodifica el token para obtener el user
      const payload = decodeJWT(data.token);

      if (!payload) {
        setError('Token inválido');
        return;
      }

      // Actualiza Redux con el user del token
      actions.setAuthenticated({
        isAuthenticated: true,
        user: {
          id: payload.userId,
          email: payload.email,
          firstName: payload.firstName,
          lastName: payload.lastName,
        },
      });

      router.push('/');
    } catch (err) {
      console.error('Error en login:', err);
      setError('Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={loginSchema} onSubmit={handleSubmit}>
      {({ errors, touched }) => (
        <Form className='flex flex-col gap-3'>
          <Grid container spacing={2}>
            <Grid size={12}>
              <Field name='email' disabled={loading} as={EmailField} />
              <ErrorText<LoginValues> errors={errors} touched={touched} name='email' />
            </Grid>
            <Grid size={12}>
              <Field name='password' disabled={loading} as={PasswordField} />
              <ErrorText<LoginValues> errors={errors} touched={touched} name='password' />
            </Grid>
            <Grid size={12}>
              <FormControlLabel disabled={loading} control={<Checkbox />} label='Recordarme' />
            </Grid>
          </Grid>
          {error && <Alert severity='error'>{error}</Alert>}
          <Button text='Acceder' disabled={loading} type='submit' rounded='0.5rem' />
        </Form>
      )}
    </Formik>
  );
}
