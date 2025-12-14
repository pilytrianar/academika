import type { Meta, StoryObj } from '@storybook/react';
import StudentInformationTab from './StudentInformationTab';
import { StudentDetail } from '@/types/student';

// Mock data para las historias
const mockStudent: StudentDetail = {
  id: '1',
  email: 'joan.romero@academika.com',
  profile: {
    studentId: '12345',
    address: 'Av. Calle 127 # 12 - 19, Bogotá',
    phone: '3122334455',
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

const mockStudent2: StudentDetail = {
  id: '2',
  email: 'andrea.triana@academika.com',
  profile: {
    studentId: '54321',
    address: 'Cra. 15 # 93 - 45, Bogotá',
    phone: '3009876543',
    guardian: {
      fullName: 'María Triana',
      phone: '3201234567',
      email: 'maria.triana@gmail.com',
    },
  },
  firstName: 'Andrea',
  lastName: 'Triana',
  course: 'Noveno A',
  status: 'Activo',
};

const meta: Meta<typeof StudentInformationTab> = {
  title: 'Components/Student/StudentInformationTab',
  component: StudentInformationTab,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    student: {
      description: 'Datos completos del estudiante',
    },
  },
};

export default meta;
type Story = StoryObj<typeof StudentInformationTab>;

// Historia principal con datos de ejemplo
export const Default: Story = {
  args: {
    student: mockStudent,
  },
};

// Otro estudiante
export const AlternativeStudent: Story = {
  args: {
    student: mockStudent2,
  },
};

// Con dirección larga
export const LongAddress: Story = {
  args: {
    student: {
      ...mockStudent,
      profile: {
        ...mockStudent.profile,
        address:
          'Avenida Carrera 45 # 123 - 456, Apartamento 789, Conjunto Residencial Los Pinos, Bogotá D.C., Colombia',
      },
    },
  },
};

// En contenedor estrecho (mobile)
export const Mobile: Story = {
  args: {
    student: mockStudent,
  },
  decorators: [
    Story => (
      <div style={{ maxWidth: '375px' }}>
        <Story />
      </div>
    ),
  ],
};

// En contenedor ancho
export const Wide: Story = {
  args: {
    student: mockStudent,
  },
  decorators: [
    Story => (
      <div style={{ maxWidth: '900px' }}>
        <Story />
      </div>
    ),
  ],
};
