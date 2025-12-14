'use client';

import React, { useEffect, useState } from 'react';
import BarOptions from '@/components/BarOptions';
import StudentsTable from '@/components/StudentsTable';
import { getStudents, Student } from '@/utils/fetchStudentsData';
import { Container } from '@mui/material';
import ComponentLoader from '@/components/common/Loaders/ComponentLoader';

export default function StudentsListWrapper() {
  const [q, setQ] = useState('');
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStudents = async () => {
      try {
        const data = await getStudents();
        setStudents(data);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError('No se pudieron cargar los estudiantes');
      } finally {
        setLoading(false);
      }
    };

    loadStudents();
  }, []);

  if (loading) return <ComponentLoader />;
  if (error) return <p className='p-6 text-red-500'>{error}</p>;

  return (
    <Container maxWidth='xl'>
      <div className='min-h-screen bg-gray-50'>
        <div className='max-w-8xl mx-auto mt-5'>
          <BarOptions
            onSearch={v => setQ(v)}
            onAdd={() => alert('Abrir formulario (placeholder)')}
            onFilter={() => alert('Abrir filtros (placeholder)')}
            onExport={() => alert('Exportar (placeholder)')}
          />

          <div className='mt-6'>
            <StudentsTable search={q} students={students} />
          </div>
        </div>
      </div>
    </Container>
  );
}
