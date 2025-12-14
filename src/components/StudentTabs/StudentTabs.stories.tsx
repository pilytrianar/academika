import type { Meta, StoryObj } from '@storybook/react';
import StudentTabs from './StudentTabs';
import { StudentDetail } from '@/types/student';

// Mock data
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

const mockStudent2: StudentDetail = {
  ...mockStudent,
  id: '2',
  email: 'andrea.triana@academika.com',
  profile: {
    ...mockStudent.profile,
    firstName: 'Andrea',
    lastName: 'Triana',
    studentId: '54321',
    course: {
      name: '9°',
      section: 'Grado A',
    },
  },
};

const meta: Meta<typeof StudentTabs> = {
  title: 'Components/Student/StudentTabs',
  component: StudentTabs,
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
type Story = StoryObj<typeof StudentTabs>;

// Historia principal
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

// Vista móvil
export const Mobile: Story = {
  args: {
    student: mockStudent,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  decorators: [
    Story => (
      <div style={{ maxWidth: '375px' }}>
        <Story />
      </div>
    ),
  ],
};

// Vista tablet
export const Tablet: Story = {
  args: {
    student: mockStudent,
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
  decorators: [
    Story => (
      <div style={{ maxWidth: '768px' }}>
        <Story />
      </div>
    ),
  ],
};

// Vista ancha
export const Wide: Story = {
  args: {
    student: mockStudent,
  },
  decorators: [
    Story => (
      <div style={{ maxWidth: '1200px' }}>
        <Story />
      </div>
    ),
  ],
};
