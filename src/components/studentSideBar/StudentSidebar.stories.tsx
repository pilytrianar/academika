import type { Meta, StoryObj } from '@storybook/react';
import StudentSidebar from './StudentSidebar';
import { StudentDetail } from '@/types/student';

// Mock data para las historias
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

const youngStudent: StudentDetail = {
  ...mockStudent,
  profile: {
    ...mockStudent.profile,
    firstName: 'María',
    lastName: 'González',
    birthDate: '2012-03-20',
    course: {
      name: '5°',
      section: 'Grado A',
    },
  },
};

const olderStudent: StudentDetail = {
  ...mockStudent,
  profile: {
    ...mockStudent.profile,
    firstName: 'Carlos',
    lastName: 'Rodríguez',
    birthDate: '2006-11-08',
    course: {
      name: '11°',
      section: 'Grado B',
    },
  },
};

const longNameStudent: StudentDetail = {
  ...mockStudent,
  profile: {
    ...mockStudent.profile,
    firstName: 'María Fernanda',
    lastName: 'Rodríguez González',
    course: {
      name: '9°',
      section: 'Grado C',
    },
  },
};

const meta: Meta<typeof StudentSidebar> = {
  title: 'Components/Student/StudentSidebar',
  component: StudentSidebar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    student: {
      description: 'Datos completos del estudiante',
    },
  },
};

export default meta;
type Story = StoryObj<typeof StudentSidebar>;

// Historia principal
export const Default: Story = {
  args: {
    student: mockStudent,
  },
};

// Estudiante más joven
export const YoungStudent: Story = {
  args: {
    student: youngStudent,
  },
};

// Estudiante mayor
export const OlderStudent: Story = {
  args: {
    student: olderStudent,
  },
};

// Nombre largo
export const LongName: Story = {
  args: {
    student: longNameStudent,
  },
};

// En contenedor más ancho
export const Wide: Story = {
  args: {
    student: mockStudent,
  },
  decorators: [
    Story => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

// En contenedor más estrecho (mobile)
export const Narrow: Story = {
  args: {
    student: mockStudent,
  },
  decorators: [
    Story => (
      <div style={{ width: '280px' }}>
        <Story />
      </div>
    ),
  ],
};

// Múltiples sidebars juntos
export const Multiple: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <div style={{ width: '300px' }}>
        <StudentSidebar student={mockStudent} />
      </div>
      <div style={{ width: '300px' }}>
        <StudentSidebar student={youngStudent} />
      </div>
      <div style={{ width: '300px' }}>
        <StudentSidebar student={olderStudent} />
      </div>
    </div>
  ),
};
