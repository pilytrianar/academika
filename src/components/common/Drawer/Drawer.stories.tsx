import type { Meta, StoryObj } from '@storybook/react';
import Drawer from './Drawer';

const meta: Meta<typeof Drawer> = {
  title: 'Components/Common/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    isMobile: {
      control: 'boolean',
      description: 'Modo móvil (drawer temporal)',
    },
  },
  args: {
    isMobile: false,
  },
  decorators: [
    Story => (
      <div style={{ width: '100%', height: '100vh' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Drawer>;

// Historia principal - Drawer permanente (desktop)
export const Desktop: Story = {
  args: {
    isMobile: false,
  },
};

// Drawer temporal (mobile)
export const Mobile: Story = {
  args: {
    isMobile: true,
  },
};
