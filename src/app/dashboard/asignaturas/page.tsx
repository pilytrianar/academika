import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import { Add } from '@mui/icons-material';
import { Box, Container, Typography } from '@mui/material';

export default function AsignaturasPage() {
  return (
    <Container maxWidth='xl'>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography sx={{ fontWeight: 'bold' }} variant='h4'>
            Asignaturas
          </Typography>
          <Typography variant='subtitle1'>
            Explora y accede al material de cada una de tus clases
          </Typography>
        </Box>
        <Button
          fontWeight='600'
          startIcon={<Add />}
          text='Agregar Asignatura'
          variant='contained'
        />
      </Box>
      <Box sx={{ my: 5, p: 1, display: 'flex', gap: 2 }}>
        <Button text='Todos los cursos' />
        <Button text='Noveno A' color='inherit' />
        <Button text='Séptimo C' color='inherit' />
        <Button text='Once B' color='inherit' />
      </Box>
      <Box sx={{ my: 5, p: 1, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Card title='Matemáticas' description='Curso de matemáticas' />
        <Card title='Ciencias' description='Curso de ciencias' />
        <Card title='Lengua' description='Curso de lengua' />
        <Card title='Historia' description='Curso de historia' />
      </Box>
    </Container>
  );
}
