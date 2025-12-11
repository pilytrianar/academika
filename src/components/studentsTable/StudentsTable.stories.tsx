import type { Meta, StoryObj } from '@storybook/react';
import StudentsTable from './studentsTable';

const meta: Meta<typeof StudentsTable> = {
  title: 'Tables/StudentsTable',
  component: StudentsTable,
  argTypes: {
    search: {
      control: { type: 'text' },
      description: 'Texto de búsqueda para filtrar estudiantes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof StudentsTable>;

// Historia básica
export const Default: Story = {
  args: {
    search: '',
  },
};

// Historia con búsqueda activa
export const SearchExample: Story = {
  args: {
    search: 'Joan',
  },
};
