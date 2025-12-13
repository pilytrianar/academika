'use client';

import Button from '@/components/common/Button';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';

export default function NotFound() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        gap: 3,
      }}
    >
      <Image src={'/img/not-found.svg'} alt='not-found-image' width={300} height={300} />
      <Typography variant='subtitle1'>
        Lo sentimos, parece que la página que estás buscando no está disponible.
      </Typography>
      <Button text='Volver al inicio' href='/' />
    </Box>
  );
}
