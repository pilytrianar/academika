import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import StudentInformationTab from './StudentInformationTab';
import { StudentDetail } from '@/types/student';

// Se usa un objeto mock para probar el componente sin depender de la API
const mockStudent: StudentDetail = {
  id: '1',
  email: 'joan.romero@academika.com',
  profile: {
    firstName: 'Joan',
    lastName: 'Romero',
    studentId: '12345',
    birthDate: '2008-05-15',
    address: 'Av. Calle 127 # 12 - 19, Bogotá',
    phone: '3122334455',
    course: {
      name: '7°',
      section: 'Grado D',
    },
    guardian: {
      fullName: 'Elon Musk',
      phone: '3145677880',
      email: 'elon.musk@academika.com',
    },
  },
  firstName: 'Joan',
  lastName: 'Romero',
  course: 'Septimo D',
  status: 'Activo',
};

describe('StudentInformationTab', () => {
  // Verifica que los títulos principales de cada sección se renderizan
  it('renders all section titles', () => {
    render(<StudentInformationTab student={mockStudent} />);

    expect(screen.getByText('Datos Personales')).toBeInTheDocument();
    expect(screen.getByText('Información de Contacto')).toBeInTheDocument();
    expect(screen.getByText('Padre / Tutor')).toBeInTheDocument();
  });

  // Comprueba que se muestran correctamente el ID del estudiante y la dirección
  it('displays student ID and address', () => {
    render(<StudentInformationTab student={mockStudent} />);

    expect(screen.getByText('12345')).toBeInTheDocument();
    expect(screen.getByText('Av. Calle 127 # 12 - 19, Bogotá')).toBeInTheDocument();
  });

  // Verifica que la información de contacto del estudiante se renderiza
  it('displays contact information', () => {
    render(<StudentInformationTab student={mockStudent} />);

    expect(screen.getByText('joan.romero@academika.com')).toBeInTheDocument();
    expect(screen.getByText('3122334455')).toBeInTheDocument();
  });

  // Comprueba que la información del padre o tutor se muestra correctamente
  it('displays guardian information', () => {
    render(<StudentInformationTab student={mockStudent} />);

    expect(screen.getByText('Elon Musk')).toBeInTheDocument();
    expect(screen.getByText('3145677880')).toBeInTheDocument();
    expect(screen.getByText('elon.musk@academika.com')).toBeInTheDocument();
  });
});
