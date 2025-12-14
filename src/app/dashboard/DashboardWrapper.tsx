'use client';

import ActivityItem from '@/components/common/ActivityItem';
import NavigationCard from '@/components/common/NavigationCard';
import { useAuth } from '@/hooks/useAuth';
import { Box, Container, Typography } from '@mui/material';

export default function DashboardWrapper() {
  const { user } = useAuth();
  return (
    <Container maxWidth='xl'>
      <Typography sx={{ fontWeight: 'bold' }} variant='h4'>
        ¡Hola {user?.firstName}!
      </Typography>
      <Typography variant='subtitle1'>¡Bienvenido al panel de control!</Typography>
      <Box sx={{ my: 5, display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
        <NavigationCard
          image='asignaturas'
          title='Asignaturas'
          description='Gestiona tus asignaturas'
          btnText='Ver Detalles'
          onClick={() => console.log('Ver Detalles')}
        />
        <NavigationCard
          image='estudiantes'
          title='Estudiantes'
          description='Gestiona tus estudiantes'
          btnText='Ver Detalles'
          onClick={() => console.log('Ver Detalles')}
        />
      </Box>
      <Typography sx={{ fontWeight: 'bold' }} variant='h5'>
        Ultimas Novedades
      </Typography>
      <Box sx={{ my: 2, p: 1 }}>
        <ActivityItem
          description='Hace 3 horas'
          imageBadge='accion'
          title='Nuevo estudiante agregado en "Estadística"'
        />
        <ActivityItem
          description='Ayer'
          imageBadge='recordatorio'
          title='Recordatorio: Calificar proyecto el 25 Dic'
        />
        <ActivityItem
          description='Hace 2 días'
          imageBadge='recordatorio'
          title='Recordatorio: Agregar nuevos criterios de calificación'
        />
      </Box>
    </Container>
  );
}
