'use client';

import { Divider } from '@mui/material';

export default function StudentInformationTab() {
  return (
    <div className='space-y-6'>
      {/* Datos personales */}
      <section>
        <h3 className='text-lg font-semibold text-gray-800 mt-4'>Datos Personales</h3>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 ml-3'>
          <p>
            <strong>Fecha de Nacimiento:</strong> <br /> 15 de Mayo, 2008
          </p>
          <p>
            <strong>ID de Estudiante:</strong> <br /> 12345
          </p>
          <p className='md:col-span-2'>
            <strong>Dirección:</strong> <br /> Av. Calle 127 # 12 - 19, Bogotá
          </p>
        </div>
      </section>

      <Divider />

      {/* Información de contacto */}
      <section>
        <h3 className='text-lg font-semibold text-gray-800 mt-4'>Información de Contacto</h3>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 ml-3'>
          <p>
            <strong>Email del Estudiante:</strong> <br /> joan.romero@academika.com
          </p>
          <p>
            <strong>Teléfono:</strong> <br /> 3122334455
          </p>
        </div>
      </section>

      <Divider />

      {/* Padres/Tutores */}
      <section>
        <h3 className='text-lg font-semibold text-gray-800 mt-4'>Datos de los Padres/Tutores</h3>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 ml-3'>
          <p>
            <strong>Nombre del Tutor:</strong> <br /> Elon Musk
          </p>
          <p>
            <strong>Teléfono del Contacto:</strong> <br /> 3145677880
          </p>
          <p className='md:col-span-2'>
            <strong>Email:</strong> <br /> elon.musk@academika.com
          </p>
        </div>
      </section>
    </div>
  );
}
