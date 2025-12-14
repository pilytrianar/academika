import type { Meta, StoryObj } from '@storybook/react';
import StudentHeader from './StudentHeader';

const meta: Meta<typeof StudentHeader> = {
  title: 'Components/Student/StudentHeader',
  component: StudentHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
      navigation: {
        back: () => console.log('Navigating back...'),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof StudentHeader>;

// Historia principal
export const Default: Story = {};

// En una página completa
export const InPage: Story = {
  decorators: [
    Story => (
      <div>
        <Story />
        <div style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '400px' }}>
          <h1 style={{ fontSize: '24px', marginBottom: '16px' }}>Información del Estudiante</h1>
          <p>Contenido de la página...</p>
        </div>
      </div>
    ),
  ],
};

// Vista móvil
export const Mobile: Story = {
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
