'use client';

import { Card, Button } from '@mui/material';
import Image from 'next/image';
import { StudentDetail } from '@/types/student';

interface StudentSidebarProps {
  student: StudentDetail;
}

// Función para calcular la edad a partir de la fecha de nacimiento
function calculateAge(birthDate: string) {
  const birth = new Date(birthDate);
  const today = new Date();

  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  const dayDiff = today.getDate() - birth.getDate();

  // Ajustar si aún no ha sido el cumpleaños este año
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  return age;
}

export default function StudentSidebar({ student }: StudentSidebarProps) {
  const age = calculateAge(student.profile.birthDate);

  return (
    <Card className='p-6 text-center shadow-sm'>
      <div className='flex justify-center mb-6 mt-13'>
        <Image
          src='/img/userIcon.png'
          width={110}
          height={110}
          className='rounded-full'
          alt='Avatar'
        />
      </div>

      <h2 className='text-xl font-semibold mb-2 text-black'>
        {student.profile.firstName} {student.profile.lastName}
      </h2>
      <p className='text-gray-500 mt-1'>
        {student.profile.course.name} {student.profile.course.section}
      </p>
      <p className='text-gray-500 mb-8'>Edad: {age} años</p>

      <Button variant='contained' color='primary' fullWidth className='mt-5 rounded-md'>
        Contactar
      </Button>
    </Card>
  );
}
