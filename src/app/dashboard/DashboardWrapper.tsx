'use client';

import ActivityItem from '@/components/common/ActivityItem';
import NavigationCard from '@/components/common/NavigationCard';
import { useAuth } from '@/hooks/useAuth';
import { Box, Container, Typography, List } from '@mui/material';
import { useNotifications } from '@/hooks/useNotifications';
import ComponentLoader from '@/components/common/Loaders/ComponentLoader';
import { useRouter } from 'next/navigation';

export default function DashboardWrapper() {
  const { user } = useAuth();
  const { data, loading } = useNotifications({ userId: user?.id, limit: 5 });
  const router = useRouter();
  const notifications = data?.notifications || [];

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
          onClick={() => router.push('/asignaturas')}
        />
        <NavigationCard
          image='estudiantes'
          title='Estudiantes'
          description='Gestiona tus estudiantes'
          btnText='Ver Detalles'
          onClick={() => router.push('/estudiantes')}
        />
      </Box>
      <Typography sx={{ fontWeight: 'bold' }} variant='h5'>
        Ultimas Novedades
      </Typography>
      <Box sx={{ my: 2, p: 1 }}>
        {loading && <ComponentLoader />}
        {notifications.length === 0 ? (
          <Typography variant='body2' color='textSecondary' sx={{ textAlign: 'center', p: 4 }}>
            No hay novedades recientes
          </Typography>
        ) : (
          <List>
            {notifications.map(notification => (
              <ActivityItem
                key={notification.id}
                description={notification.description}
                imageBadge={notification.type}
                title={notification.title}
              />
            ))}
          </List>
        )}
      </Box>
    </Container>
  );
}
