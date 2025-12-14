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
    id: 1,
    title: 'Nueva tarea asignada',
    description: 'Se te ha asignado una nueva tarea en Matemáticas',
    createdAt: 'Hace 5 minutos',
    type: 'REMINDER',
    isRead: false,
    userId: 1,
  },
  {
    id: 2,
    title: 'Calificación publicada',
    description: 'Tu calificación de Historia ha sido publicada',
    createdAt: 'Hace 1 hora',
    type: 'GRADE',
    isRead: false,
    userId: 1,
  },
  {
    id: 3,
    title: 'Fecha límite próxima',
    description: 'La tarea de Física vence mañana',
    createdAt: 'Hace 2 horas',
    type: 'REMINDER',
    isRead: false,
    userId: 1,
  },
  {
    id: 4,
    title: 'Tarea no entregada',
    description: 'No entregaste la tarea de Química',
    createdAt: 'Hace 1 día',
    type: 'DISCIPLINARY',
    isRead: false,
    userId: 1,
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
        id: 1,
        title: 'Nuevo mensaje',
        description: 'Tienes un nuevo mensaje del profesor',
        createdAt: 'Hace 10 minutos',
        type: 'REMINDER',
        isRead: false,
        userId: 1,
      },
      {
        id: 2,
        title: 'Actualización del sistema',
        description: 'El sistema se actualizará esta noche',
        createdAt: 'Hace 30 minutos',
        type: 'REMINDER',
        isRead: false,
        userId: 1,
      },
    ],
  },
};

// Historia con notificaciones de éxito
export const SuccessNotifications: Story = {
  args: {
    data: [
      {
        id: 1,
        title: 'Tarea entregada',
        description: 'Tu tarea de Matemáticas fue entregada exitosamente',
        createdAt: 'Hace 15 minutos',
        type: 'GRADE',
        isRead: false,
        userId: 1,
      },
      {
        id: 2,
        title: 'Excelente calificación',
        description: 'Obtuviste 10/10 en el examen de Historia',
        createdAt: 'Hace 1 hora',
        type: 'GRADE',
        isRead: false,
        userId: 1,
      },
    ],
  },
};

// Historia con notificaciones de advertencia
export const WarningNotifications: Story = {
  args: {
    data: [
      {
        id: 1,
        title: 'Fecha límite cercana',
        description: 'La tarea de Física vence en 2 horas',
        createdAt: 'Hace 5 minutos',
        type: 'ANNOUNCEMENT',
        isRead: false,
        userId: 1,
      },
      {
        id: 2,
        title: 'Asistencia pendiente',
        description: 'Recuerda marcar tu asistencia de hoy',
        createdAt: 'Hace 30 minutos',
        type: 'ANNOUNCEMENT',
        isRead: false,
        userId: 1,
      },
    ],
  },
};

// Historia con notificaciones de error
export const ErrorNotifications: Story = {
  args: {
    data: [
      {
        id: 1,
        title: 'Tarea no entregada',
        description: 'No entregaste la tarea de Química a tiempo',
        createdAt: 'Hace 1 día',
        type: 'DISCIPLINARY',
        isRead: false,
        userId: 1,
      },
      {
        id: 2,
        title: 'Falta injustificada',
        description: 'Tienes una falta sin justificar',
        createdAt: 'Hace 2 días',
        type: 'DISCIPLINARY',
        isRead: false,
        userId: 1,
      },
    ],
  },
};
