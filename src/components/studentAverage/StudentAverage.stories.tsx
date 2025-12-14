import type { Meta, StoryObj } from '@storybook/react';
import StudentAverage from './StudentAverage';

const meta: Meta<typeof StudentAverage> = {
  title: 'Components/Student/StudentAverage',
  component: StudentAverage,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof StudentAverage>;

// Historia principal - muestra promedio aleatorio
export const Default: Story = {};

// Vista en contenedor más estrecho
export const InSidebar: Story = {
  decorators: [
    Story => (
      <div style={{ maxWidth: '300px' }}>
        <Story />
      </div>
    ),
  ],
};

// Vista en contenedor más ancho
export const InDashboard: Story = {
  decorators: [
    Story => (
      <div style={{ maxWidth: '500px' }}>
        <Story />
      </div>
    ),
  ],
};

// Múltiples tarjetas juntas (simulando dashboard)
export const MultiplCards: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '16px',
      }}
    >
      <StudentAverage />
      <StudentAverage />
      <StudentAverage />
    </div>
  ),
};
