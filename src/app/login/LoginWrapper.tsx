'use client';

import { Box, Card, CardContent, Typography } from '@mui/material';
import LoginForm from '@/components/login/LoginForm';
import { flexCol } from '@/lib/theme/theme';
import Image from 'next/image';

const styles = {
  cardContent: { ...flexCol, gap: 3 },
  card: { maxWidth: 450, width: '100%', borderRadius: 3, p: 2 },
  mainContainer: {
    ...flexCol,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    gap: 4,
  },
};

export default function LoginWrapper() {
  return (
    <Box sx={styles.mainContainer}>
      <Image src='/img/logo.svg' alt='Academika Logo' width={130} height={130} />
      <Card sx={styles.card}>
        <CardContent sx={styles.cardContent}>
          <Box>
            <Typography variant='h5' color='black'>
              Iniciar Sesión
            </Typography>
            <Typography variant='subtitle1'>Inicia sesión para acceder a tu cuenta</Typography>
          </Box>
          <LoginForm />
        </CardContent>
      </Card>
      <Typography variant='caption'>© Academika 2025</Typography>
    </Box>
  );
}
