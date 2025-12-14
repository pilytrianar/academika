import type { Meta, StoryObj } from '@storybook/react';
import StudentsTable from './StudentsTable';

// Mock data
const mockStudents = [
  { id: '12345', name: 'Andrea Triana', course: 'Noveno A', status: 'Activo' as const },
  { id: '54321', name: 'José de la Ossa', course: 'Decimo B', status: 'Activo' as const },
  { id: '09876', name: 'Joan Romero', course: 'Septimo D', status: 'Inactivo' as const },
  { id: '67890', name: 'Kathe Diaz', course: 'Octavo C', status: 'Suspendido' as const },
  { id: '441821', name: 'Andres Bohorquez', course: 'Once A', status: 'Activo' as const },
  { id: '11111', name: 'Estudiante Extra 1', course: 'Once B', status: 'Activo' as const },
  { id: '22222', name: 'Estudiante Extra 2', course: 'Once C', status: 'Inactivo' as const },
  { id: '33333', name: 'María González', course: 'Sexto A', status: 'Activo' as const },
  { id: '44444', name: 'Carlos Ruiz', course: 'Septimo A', status: 'Activo' as const },
  { id: '55555', name: 'Laura Pérez', course: 'Octavo B', status: 'Suspendido' as const },
];

const fewStudents = mockStudents.slice(0, 3);
const manyStudents = [...mockStudents, ...mockStudents, ...mockStudents]; // 30 students

const meta: Meta<typeof StudentsTable> = {
  title: 'Components/Students/StudentsTable',
  component: StudentsTable,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    search: {
      control: 'text',
      description: 'Texto de búsqueda para filtrar estudiantes',
    },
    students: {
      description: 'Array de estudiantes a mostrar',
    },
  },
};

export default meta;
type Story = StoryObj<typeof StudentsTable>;

// Historia principal con datos
export const Default: Story = {
  args: {
    students: mockStudents,
    search: '',
  },
};

// Tabla vacía
export const Empty: Story = {
  args: {
    students: [],
    search: '',
  },
};

// Con búsqueda activa
export const WithSearch: Story = {
  args: {
    students: mockStudents,
    search: 'Andrea',
  },
};

// Búsqueda sin resultados
export const NoResults: Story = {
  args: {
    students: mockStudents,
    search: 'NoExiste',
  },
};

// Pocos estudiantes
export const FewStudents: Story = {
  args: {
    students: fewStudents,
    search: '',
  },
};

// Muchos estudiantes (para probar paginación)
export const ManyStudents: Story = {
  args: {
    students: manyStudents,
    search: '',
  },
};

// Solo estudiantes activos
export const ActiveOnly: Story = {
  args: {
    students: mockStudents.filter(s => s.status === 'Activo'),
    search: '',
  },
};

// Solo estudiantes inactivos
export const InactiveOnly: Story = {
  args: {
    students: mockStudents.filter(s => s.status === 'Inactivo'),
    search: '',
  },
};

// Vista móvil
export const Mobile: Story = {
  args: {
    students: mockStudents,
    search: '',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

// Vista tablet
export const Tablet: Story = {
  args: {
    students: mockStudents,
    search: '',
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};
