'use client';

import { Box, Button, Typography } from '@mui/material';

async function handleClick() {
  const res = await fetch('/api/auth');
  const data = await res.json();
  console.log(data);
}

export default function DashboardWrapper() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Typography variant='h4' textAlign={'center'}>
        Dashboard
      </Typography>
      <Button variant='contained' sx={{ my: 5, alignSelf: 'center' }} onClick={handleClick}>
        Obtener usuarios
      </Button>
    </Box>
  );
}
