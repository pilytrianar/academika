import { Meta, StoryObj } from '@storybook/react';
import ActivityItem from './ActivityItem';

const meta: Meta<typeof ActivityItem> = {
  title: 'Components/Common/ActivityItem',
  component: ActivityItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Titulo de la Actividad',
    },
    description: {
      control: 'text',
      description: 'Descripción de la Actividad',
    },
    imageBadge: {
      control: 'radio',
      options: ['accion', 'recordatorio'],
      description: 'Tipo de Badge',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Titulo',
    description: 'Descripción',
    imageBadge: 'accion',
  },
};

export const optionOne: Story = {
  args: {
    title: 'Nuevo estudiante agregado en "Estadística"',
    description: 'Ayer',
    imageBadge: 'accion',
  },
};

export const optionTwo: Story = {
  args: {
    title: 'Recordatorio: Calificar proyecto el 25 Dic',
    description: 'Hace 2 días',
    imageBadge: 'recordatorio',
  },
};
