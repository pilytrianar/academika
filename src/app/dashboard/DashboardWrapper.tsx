'use client';

import { Box, Button, Typography } from '@mui/material';

const styles = {
  mainContainer: { display: 'flex', flexDirection: 'column', justifyContent: 'center' },
  usersBtn: { my: 5, alignSelf: 'center' },
};

async function fetchUsers() {
  const res = await fetch('/api/users');
  const data = await res.json();
  console.log(data);
}

export default function DashboardWrapper() {
  return (
    <Box sx={styles.mainContainer}>
      <Typography variant='h4' textAlign={'center'}>
        Dashboard
      </Typography>
      <Button variant='contained' sx={styles.usersBtn} onClick={fetchUsers}>
        Obtener usuarios
      </Button>
    </Box>
  );
}
