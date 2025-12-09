import { Meta, StoryObj } from '@storybook/react';
import NavigationCard from './NavigationCard';

const meta: Meta<typeof NavigationCard> = {
  title: 'Components/Common/NavigationCard',
  component: NavigationCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    image: {
      control: 'radio',
      options: ['asignaturas', 'estudiantes'],
      description: 'URL de la imagen',
    },
    title: {
      control: 'text',
      description: 'Título del card',
    },
    description: {
      control: 'text',
      description: 'Descripción del card',
    },
    btnText: {
      control: 'text',
      description: 'Texto del botón',
    },
    onClick: {
      table: { disable: true },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    image: 'asignaturas',
    title: 'Titulo',
    description: 'Descripción',
    btnText: 'Texto del botón',
  },
};

export const optionOne: Story = {
  args: {
    image: 'asignaturas',
    title: 'Asignaturas',
    description: 'Gestiona tus cursos y materiales',
    btnText: 'Ir a Asignaturas',
    onClick: () => console.log('Redireccionado a Asignaturas'),
  },
};

export const optionTwo: Story = {
  args: {
    image: 'estudiantes',
    title: 'Estudiantes',
    description: 'Consulta y administra los perfiles',
    btnText: 'Ir a Estudiantes',
    onClick: () => console.log('Redireccionado a Estudiantes'),
  },
};
