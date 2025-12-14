import { Meta, StoryObj } from '@storybook/react';
import AppBar from './AppBar';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';

// Mock del estado de autenticación
const mockAuthState = {
  isAuthenticated: true,
  user: {
    id: 1,
    firstName: 'Estudiante',
    lastName: 'Ejemplo',
    email: 'estudiante@ejemplo.com',
    role: 'STUDENT',
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState: mockAuthState,
  reducers: {},
});

const mockStore = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

const meta: Meta<typeof AppBar> = {
  title: 'Components/Common/AppBar',
  component: AppBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
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
  },
  decorators: [
    Story => (
      <Provider store={mockStore}>
        <div style={{ minHeight: '30dvh', backgroundColor: '#f5f5f5' }}>
          <Story />
          <div style={{ padding: '80px 20px 20px' }}>
            <h2>Contenido de ejemplo</h2>
            <p>Este es el contenido de la página debajo del AppBar.</p>
            <p>El AppBar tiene posición fixed y se mantiene en la parte superior.</p>
          </div>
        </div>
      </Provider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: '240px',
    onClick: () => console.log('Menu clicked'),
  },
};
