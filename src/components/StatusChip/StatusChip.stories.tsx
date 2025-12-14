import type { Meta, StoryObj } from '@storybook/react';
import StatusChip from './StatusChip';

const meta: Meta<typeof StatusChip> = {
  title: 'Components/Common/StatusChip',
  component: StatusChip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    status: {
      control: 'select',
      options: ['Activo', 'Inactivo', 'Suspendido'],
      description: 'Estado del estudiante',
    },
  },
  args: {
    status: 'Activo',
  },
};

export default meta;
type Story = StoryObj<typeof StatusChip>;

// Estado Activo (verde)
export const Activo: Story = {
  args: {
    status: 'Activo',
  },
};

// Estado Inactivo (rojo)
export const Inactivo: Story = {
  args: {
    status: 'Inactivo',
  },
};

// Estado Suspendido (naranja)
export const Suspendido: Story = {
  args: {
    status: 'Suspendido',
  },
};

// Todos los estados juntos
export const AllStatuses: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <StatusChip status='Activo' />
      <StatusChip status='Inactivo' />
      <StatusChip status='Suspendido' />
    </div>
  ),
};
