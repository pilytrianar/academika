import { Meta, StoryObj } from '@storybook/react';
import Avatar from './Avatar';

const basicMenuData = [
  { id: 1, text: 'Settings', onClick: () => console.log('Settings') },
  { id: 2, text: 'Log out', onClick: () => console.log('Log Out') },
];

const extendedMenuData = [
  { id: 1, text: 'Profile', onClick: () => console.log('Profile') },
  { id: 2, text: 'Settings', onClick: () => console.log('Settings') },
  { id: 3, text: 'Help', onClick: () => console.log('Help') },
  { id: 4, text: 'Log out', onClick: () => console.log('Log Out') },
];

const minimalMenuData = [{ id: 1, text: 'Log out', onClick: () => console.log('Log Out') }];

const menuDataOptions = {
  'Básico (2 items)': basicMenuData,
  'Extendido (4 items)': extendedMenuData,
  'Mínimo (1 item)': minimalMenuData,
};

const meta: Meta<typeof Avatar> = {
  title: 'Components/Common/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],

  argTypes: {
    data: {
      control: 'radio',
      options: Object.keys(menuDataOptions),
      mapping: menuDataOptions,
      description: 'Selecciona el tipo de menú desplegable.',
    },
    user: {
      control: 'select',
      options: ['', 'John Doe', 'Jane Smith'],
      description:
        'Nombre de usuario para mostrar. Si está vacío, se muestra el icono por defecto.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultIcon: Story = {
  args: {
    data: menuDataOptions['Básico (2 items)'],
    user: '',
  },
};

export const WithUserName: Story = {
  args: {
    data: menuDataOptions['Mínimo (1 item)'],
    user: 'John Doe',
  },
};

export const ExtendedMenu: Story = {
  args: {
    data: menuDataOptions['Extendido (4 items)'],
    user: 'Jane Smith',
  },
};
