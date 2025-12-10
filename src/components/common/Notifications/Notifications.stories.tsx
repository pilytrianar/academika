import type { Meta, StoryObj } from '@storybook/react';
import Notifications from './Notifications';
import { Box } from '@mui/material';

const meta: Meta<typeof Notifications> = {
  title: 'Components/Common/Notifications',
  component: Notifications,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    data: {
      control: 'object',
      description: 'Array de notificaciones',
    },
  },
  decorators: [
    Story => (
      <Box sx={{ p: 4, bgcolor: 'background.default', minHeight: 400 }}>
        <Story />
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Notifications>;

// Datos de ejemplo
const sampleNotifications = [
  {
    id: '1',
    title: 'Nueva tarea asignada',
    description: 'Se te ha asignado una nueva tarea en Matemáticas',
    time: 'Hace 5 minutos',
    type: 'info' as const,
    read: false,
  },
  {
    id: '2',
    title: 'Calificación publicada',
    description: 'Tu calificación de Historia ha sido publicada',
    time: 'Hace 1 hora',
    type: 'success' as const,
    read: false,
  },
  {
    id: '3',
    title: 'Fecha límite próxima',
    description: 'La tarea de Física vence mañana',
    time: 'Hace 2 horas',
    type: 'warning' as const,
    read: false,
  },
  {
    id: '4',
    title: 'Tarea no entregada',
    description: 'No entregaste la tarea de Química',
    time: 'Hace 1 día',
    type: 'error' as const,
    read: false,
  },
];

// Historia con notificaciones
export const WithNotifications: Story = {
  args: {
    data: sampleNotifications,
  },
};

// Historia sin notificaciones
export const Empty: Story = {
  args: {
    data: [],
  },
};

// Historia con una sola notificación
export const SingleNotification: Story = {
  args: {
    data: [sampleNotifications[0]],
  },
};

// Historia con notificaciones de tipo info
export const InfoNotifications: Story = {
  args: {
    data: [
      {
        id: '1',
        title: 'Nuevo mensaje',
        description: 'Tienes un nuevo mensaje del profesor',
        time: 'Hace 10 minutos',
        type: 'info',
        read: false,
      },
      {
        id: '2',
        title: 'Actualización del sistema',
        description: 'El sistema se actualizará esta noche',
        time: 'Hace 30 minutos',
        type: 'info',
        read: false,
      },
    ],
  },
};

// Historia con notificaciones de éxito
export const SuccessNotifications: Story = {
  args: {
    data: [
      {
        id: '1',
        title: 'Tarea entregada',
        description: 'Tu tarea de Matemáticas fue entregada exitosamente',
        time: 'Hace 15 minutos',
        type: 'success',
        read: false,
      },
      {
        id: '2',
        title: 'Excelente calificación',
        description: 'Obtuviste 10/10 en el examen de Historia',
        time: 'Hace 1 hora',
        type: 'success',
        read: false,
      },
    ],
  },
};

// Historia con notificaciones de advertencia
export const WarningNotifications: Story = {
  args: {
    data: [
      {
        id: '1',
        title: 'Fecha límite cercana',
        description: 'La tarea de Física vence en 2 horas',
        time: 'Hace 5 minutos',
        type: 'warning',
        read: false,
      },
      {
        id: '2',
        title: 'Asistencia pendiente',
        description: 'Recuerda marcar tu asistencia de hoy',
        time: 'Hace 30 minutos',
        type: 'warning',
        read: false,
      },
    ],
  },
};

// Historia con notificaciones de error
export const ErrorNotifications: Story = {
  args: {
    data: [
      {
        id: '1',
        title: 'Tarea no entregada',
        description: 'No entregaste la tarea de Química a tiempo',
        time: 'Hace 1 día',
        type: 'error',
        read: false,
      },
      {
        id: '2',
        title: 'Falta injustificada',
        description: 'Tienes una falta sin justificar',
        time: 'Hace 2 días',
        type: 'error',
        read: false,
      },
    ],
  },
};
