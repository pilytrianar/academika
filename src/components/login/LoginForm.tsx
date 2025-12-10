'use client';

import { useRouter } from 'next/navigation';
import { Field, Form, Formik } from 'formik';
import { CSSProperties, useState } from 'react';
import { Alert, Button, Checkbox, FormControlLabel, Grid } from '@mui/material';

import ErrorText from '@/components/common/ErrorText';
import EmailField from '@/components/common/EmailField';
import PasswordField from '@/components/common/PasswordField';

import { loginSchema } from '@/lib/schemas';
import { API_MESSAGES, basePostReq } from '@/utils/constants';
import { HandleSubmitProps, LoginValues } from '@/types/auth';

const styles = {
  submitBtn: { borderRadius: 3, fontWeight: 600, textTransform: 'none' },
  form: { display: 'flex', flexDirection: 'column', gap: 20 } as CSSProperties,
};

const handleSubmit = async (props: HandleSubmitProps) => {
  const { values, router, setError, setLoading } = props;

  setLoading(true);
  const query = { ...basePostReq, body: JSON.stringify(values) };
  const res = await fetch('/api/auth/login', query);
  const parsedRes = await res.json();
  setLoading(false);

  if (!parsedRes.success) return setError(parsedRes.error || API_MESSAGES[500]);
  router.replace('/');
};

export default function LoginForm() {
  const initialValues = { email: '', password: '' };
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginSchema}
      onSubmit={async values => await handleSubmit({ values, setLoading, setError, router })}
    >
      {({ errors, touched }) => (
        <Form style={styles.form}>
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
          <Button type='submit' loading={loading} sx={styles.submitBtn} variant='contained'>
            Acceder
          </Button>
        </Form>
      )}
    </Formik>
  );
}
