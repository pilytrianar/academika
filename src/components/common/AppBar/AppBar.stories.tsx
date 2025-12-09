import { Meta, StoryObj } from '@storybook/react';
import AppBar from './AppBar';

const meta: Meta<typeof AppBar> = {
  title: 'Components/Common/AppBar',
  component: AppBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    width: {
      control: 'text',
      description: 'Ancho del sidebar. Afecta el ancho del AppBar en desktop.',
    },
    onClick: {
      table: { disable: true },
      description: 'Función que se ejecuta al hacer clic en el botón de menú (mobile).',
    },
    color: {
      control: 'select',
      options: ['default', 'inherit', 'primary', 'secondary', 'transparent'],
      description: 'Color del AppBar.',
    },
  },
  decorators: [
    Story => (
      <div style={{ minHeight: '30dvh', backgroundColor: '#f5f5f5' }}>
        <Story />
        <div style={{ padding: '80px 20px 20px' }}>
          <h2>Contenido de ejemplo</h2>
          <p>Este es el contenido de la página debajo del AppBar.</p>
          <p>El AppBar tiene posición fixed y se mantiene en la parte superior.</p>
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: '',
    onClick: () => console.log('Menu clicked'),
    color: 'inherit',
  },
};
