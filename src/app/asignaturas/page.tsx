'use client';

import { useState } from 'react';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import { Add } from '@mui/icons-material';
import { Box, Container, Typography } from '@mui/material';
import { useSubjects } from '@/hooks/useSubjects';
import ComponentLoader from '@/components/common/Loaders/ComponentLoader';

export default function AsignaturasPage() {
  const { data, loading, error } = useSubjects({ grouped: true });
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);

  const filteredSubjects =
    selectedCourseId === null
      ? data?.courses.flatMap(course => course.subjects) || []
      : data?.courses.find(course => course.id === selectedCourseId)?.subjects || [];

  return (
    <Container maxWidth='xl'>
      {loading && <ComponentLoader />}

      {error && (
        <Typography color='error' sx={{ textAlign: 'center', p: 2 }}>
          {error}
        </Typography>
      )}

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
          onClick={() => alert('Agregar Asignatura')}
          fontWeight='600'
          startIcon={<Add />}
          text='Agregar Asignatura'
          variant='contained'
        />
      </Box>
      <Box sx={{ my: 5, p: 1, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Button
          text='Todos los cursos'
          variant={selectedCourseId === null ? 'contained' : 'text'}
          onClick={() => setSelectedCourseId(null)}
        />
        {data?.courses.map(course => (
          <Button
            key={course.id}
            text={`${course.name} ${course.section}`}
            color='inherit'
            variant={selectedCourseId === course.id ? 'contained' : 'text'}
            onClick={() => setSelectedCourseId(course.id)}
          />
        ))}
      </Box>

      <Box
        sx={{ my: 5, p: 1, display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}
      >
        {filteredSubjects.length === 0 && (
          <Typography variant='subtitle1' sx={{ textAlign: 'center', p: 2 }}>
            No hay asignaturas disponibles
          </Typography>
        )}

        {filteredSubjects.map(({ id, subject, teachers }) => {
          const teachersNames = teachers
            .map(({ teacher: { firstName, lastName } }) => `${firstName} ${lastName}`)
            .join(', ');

          return (
            <Card
              key={`${id}-${subject.id}`}
              title={subject.name}
              description={teachersNames || 'Sin profesor asignado'}
            />
          );
        })}
      </Box>
    </Container>
  );
}
