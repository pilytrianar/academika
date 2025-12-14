import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import StudentsTable from './StudentsTable';

// Se simula useRouter para poder verificar la navegación sin cambiar de página
const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Se reemplaza por una etiqueta <a> para evitar errores en los tests
vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  },
}));

// Se simula para comprobar que se renderiza el estado del estudiante
vi.mock('../statusChip', () => ({
  default: ({ status }: { status: string }) => {
    return <span data-testid='status-chip'>{status}</span>;
  },
}));

// Se usan para probar renderización, filtrado y navegación
const mockStudents = [
  { id: '12345', name: 'Andrea Triana', course: 'Noveno A', status: 'Activo' as const },
  { id: '54321', name: 'José de la Ossa', course: 'Decimo B', status: 'Activo' as const },
  { id: '09876', name: 'Joan Romero', course: 'Septimo D', status: 'Inactivo' as const },
];

describe('StudentsTable', () => {
  // Verifica que la tabla renderiza correctamente los encabezados de las columnas
  it('renders table with columns', () => {
    render(<StudentsTable students={mockStudents} />);

    expect(screen.getByText('Nombre')).toBeInTheDocument();
    expect(screen.getByText('ID Estudiante')).toBeInTheDocument();
    expect(screen.getByText('Curso')).toBeInTheDocument();
    expect(screen.getByText('Estado')).toBeInTheDocument();
  });

  // Comprueba que los datos de los estudiantes se muestran en la tabla
  it('displays student data', () => {
    render(<StudentsTable students={mockStudents} />);

    expect(screen.getByText('Andrea Triana')).toBeInTheDocument();
    expect(screen.getByText('12345')).toBeInTheDocument();
    expect(screen.getByText('Noveno A')).toBeInTheDocument();
  });

  // Verifica que el filtrado por búsqueda funciona correctamente
  it('filters students by search', () => {
    render(<StudentsTable search='Andrea' students={mockStudents} />);

    expect(screen.getByText('Andrea Triana')).toBeInTheDocument();
    expect(screen.queryByText('José de la Ossa')).not.toBeInTheDocument();
  });

  // Comprueba que se muestra un mensaje cuando no hay resultados de búsqueda
  it('shows no results message when no matches', () => {
    render(<StudentsTable search='NoExiste' students={mockStudents} />);

    expect(screen.getByText('No se encontraron resultados')).toBeInTheDocument();
  });

  // Verifica que al hacer clic en "Ver" se navega a la página de información del estudiante
  it('navigates when Ver is clicked', () => {
    render(<StudentsTable students={mockStudents} />);

    const moreButtons = screen.getAllByRole('button', { name: '' });
    fireEvent.click(moreButtons[0]);

    fireEvent.click(screen.getByText('Ver'));

    expect(mockPush).toHaveBeenCalledWith('/studentinfo?id=12345');
  });

  // Comprueba que el componente StatusChip se renderiza para cada estudiante
  it('renders StatusChip for each student', () => {
    render(<StudentsTable students={mockStudents} />);

    const statusChips = screen.getAllByTestId('status-chip');
    expect(statusChips.length).toBeGreaterThan(0);
  });
});
