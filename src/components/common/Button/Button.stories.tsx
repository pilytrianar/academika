import type { Meta, StoryObj } from '@storybook/react';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';

import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Common/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    // Props obligatorias y principales
    text: {
      control: 'text',
      description: 'Texto del botón',
    },
    // Props de estilo
    variant: {
      control: 'select',
      options: ['contained', 'outlined', 'text'],
      description: 'Variante visual del botón',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'error', 'warning', 'info', 'success'],
      description: 'Color del botón',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Tamaño del botón',
    },
    rounded: {
      control: { type: 'range', min: 0, max: 5, step: 1 },
      description: 'Radio de las esquinas del botón',
    },

    // Props de comportamiento
    disabled: {
      control: 'boolean',
      description: 'Deshabilita el botón',
    },
    textUpperCase: {
      control: 'boolean',
      description: 'Texto en mayúsculas',
    },

    // Ocultar props técnicas que no necesitan controles
    type: { table: { disable: true } },
    fullWidth: { table: { disable: true } },
    startIcon: { table: { disable: true } },
    endIcon: { table: { disable: true } },
  },

  args: {
    text: '',
    variant: 'contained',
    color: 'primary',
    size: 'medium',
    type: 'button',
    disabled: false,
    textUpperCase: false,
    fullWidth: false,
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// Historia principal
export const Default: Story = {
  args: {
    text: 'Botón Principal',
  },
};

// Botón ancho completo
export const FullWidth: Story = {
  args: {
    text: 'Botón Ancho Completo',
    fullWidth: true,
  },
  parameters: {
    layout: 'padded',
  },
};

// Con iconos
export const WithStartIcon: Story = {
  args: {
    text: 'Enviar',
    startIcon: <SendIcon />,
  },
};

export const WithEndIcon: Story = {
  args: {
    text: 'Eliminar',
    color: 'error',
    endIcon: <DeleteIcon />,
  },
};
