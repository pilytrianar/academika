import { Box, CircularProgress } from '@mui/material';

const styles = {
  mainBox: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100dvh' },
};

export default function ComponentLoader() {
  return (
    <Box sx={styles.mainBox}>
      <CircularProgress />
    </Box>
  );
}
