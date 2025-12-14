import type { Meta, StoryObj } from '@storybook/react';
import BarOptions from './BarOptions';

const meta: Meta<typeof BarOptions> = {
  title: 'Components/Students/BarOptions',
  component: BarOptions,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    onSearch: {
      description: 'Callback cuando el usuario escribe en el campo de búsqueda',
      action: 'searched',
    },
    onAdd: {
      description: 'Callback cuando se hace clic en "Añadir Estudiante"',
      action: 'add clicked',
    },
    onFilter: {
      description: 'Callback cuando se hace clic en "Filtros"',
      action: 'filter clicked',
    },
    onExport: {
      description: 'Callback cuando se hace clic en "Exportar"',
      action: 'export clicked',
    },
  },
};

export default meta;
type Story = StoryObj<typeof BarOptions>;

// Historia principal con todas las funciones
export const Default: Story = {
  args: {},
};

// Con callbacks personalizados
export const WithCallbacks: Story = {
  args: {
    onSearch: (value: string) => console.log('Searching:', value),
    onAdd: () => console.log('Add student clicked'),
    onFilter: () => console.log('Filter clicked'),
    onExport: () => console.log('Export clicked'),
  },
};

// Sin callbacks (componente no interactivo)
export const WithoutCallbacks: Story = {
  args: {
    onSearch: undefined,
    onAdd: undefined,
    onFilter: undefined,
    onExport: undefined,
  },
};

// Vista móvil simulada
export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  decorators: [
    Story => (
      <div style={{ maxWidth: '375px', margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
};

// Vista tablet simulada
export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
  decorators: [
    Story => (
      <div style={{ maxWidth: '768px', margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
};
