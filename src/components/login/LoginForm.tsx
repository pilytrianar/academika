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
import { HandleSubmitProps, LoginValues } from '@/types/auth';

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
        <Form className='flex flex-col gap-20'>
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
