'use client';

import { Divider } from '@mui/material';
import { StudentDetail } from '@/types/student';

export default function StudentInformationTab({ student }: { student: StudentDetail }) {
  const { profile } = student;

  return (
    <div className='space-y-6'>
      {/* Datos personales */}
      <section>
        <h3 className='text-lg font-semibold'>Datos Personales</h3>

        <div className='grid grid-cols-2 gap-4 mt-4 ml-3'>
          <p>
            <strong>ID Estudiante:</strong>
            <br />
            {profile.studentId}
          </p>

          <p className='col-span-2'>
            <strong>Dirección:</strong>
            <br />
            {profile.address}
          </p>
        </div>
      </section>

      <Divider />

      {/* Información de contacto */}
      <section>
        <h3 className='text-lg font-semibold'>Información de Contacto</h3>

        <div className='grid grid-cols-2 gap-4 mt-4 ml-3'>
          <p>
            <strong>Email:</strong>
            <br />
            {student.email}
          </p>

          <p>
            <strong>Teléfono:</strong>
            <br />
            {profile.phone}
          </p>
        </div>
      </section>

      <Divider />

      {/* Tutor */}
      <section>
        <h3 className='text-lg font-semibold'>Padre / Tutor</h3>

        <div className='grid grid-cols-2 gap-4 mt-4 ml-3'>
          <p>
            <strong>Nombre:</strong>
            <br />
            {profile.guardian.fullName}
          </p>

          <p>
            <strong>Teléfono:</strong>
            <br />
            {profile.guardian.phone}
          </p>

          <p className='col-span-2'>
            <strong>Email:</strong>
            <br />
            {profile.guardian.email}
          </p>
        </div>
      </section>
    </div>
  );
}
