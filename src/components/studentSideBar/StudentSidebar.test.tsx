import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import StudentSidebar from './StudentSidebar';
import { StudentDetail } from '@/types/student';

// Se reemplaza next/image por una etiqueta <img> normal
// para evitar errores en el entorno de pruebas
vi.mock('next/image', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

// Se usan datos mock para validar la renderización sin depender de la API
const mockStudent: StudentDetail = {
  id: '1',
  email: 'joan.romero@academika.com',
  profile: {
    firstName: 'Joan',
    lastName: 'Romero',
    studentId: '12345',
    birthDate: '2008-05-15',
    address: 'Av. Calle 127',
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

describe('StudentSidebar', () => {
  // Verifica que el nombre completo del estudiante se muestra correctamente
  it('displays student name', () => {
    render(<StudentSidebar student={mockStudent} />);

    expect(screen.getByText('Joan Romero')).toBeInTheDocument();
  });

  // Comprueba que el curso y la sección del estudiante se renderizan
  it('displays student course', () => {
    render(<StudentSidebar student={mockStudent} />);

    expect(screen.getByText(/7° Grado D/)).toBeInTheDocument();
  });

  // Verifica que la edad del estudiante se muestra en el formato correcto
  // (la edad se calcula dinámicamente a partir de la fecha de nacimiento)
  it('displays student age', () => {
    render(<StudentSidebar student={mockStudent} />);

    expect(screen.getByText(/Edad: \d+ años/)).toBeInTheDocument();
  });

  // Comprueba que la imagen del avatar se renderiza correctamente
  it('renders avatar image', () => {
    render(<StudentSidebar student={mockStudent} />);

    const avatar = screen.getByAltText('Avatar');
    expect(avatar).toBeInTheDocument();
  });

  // Verifica que el botón de contacto está presente y accesible
  it('renders contact button', () => {
    render(<StudentSidebar student={mockStudent} />);

    const button = screen.getByRole('button', { name: /contactar/i });
    expect(button).toBeInTheDocument();
  });
});
