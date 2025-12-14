import type { Meta, StoryObj } from '@storybook/react';
import Calendar from './Calendar';

// Mock events
const today = new Date();
const thisMonth = today.getMonth();
const thisYear = today.getFullYear();

const mockEvents = [
  {
    id: '1',
    date: new Date(thisYear, thisMonth, 5),
    title: 'Examen de Matemáticas',
    type: 'exam' as const,
  },
  {
    id: '2',
    date: new Date(thisYear, thisMonth, 10),
    title: 'Tarea de Historia',
    type: 'assignment' as const,
  },
  {
    id: '3',
    date: new Date(thisYear, thisMonth, 15),
    title: 'Día Festivo',
    type: 'holiday' as const,
  },
  {
    id: '4',
    date: new Date(thisYear, thisMonth, 20),
    title: 'Reunión de Padres',
    type: 'event' as const,
  },
  {
    id: '5',
    date: new Date(thisYear, thisMonth, 25),
    title: 'Examen Final',
    type: 'exam' as const,
  },
];

const manyEventsOnSameDay = [
  {
    id: '1',
    date: new Date(thisYear, thisMonth, 15),
    title: 'Examen de Matemáticas',
    type: 'exam' as const,
  },
  {
    id: '2',
    date: new Date(thisYear, thisMonth, 15),
    title: 'Tarea de Ciencias',
    type: 'assignment' as const,
  },
  {
    id: '3',
    date: new Date(thisYear, thisMonth, 15),
    title: 'Reunión',
    type: 'event' as const,
  },
  {
    id: '4',
    date: new Date(thisYear, thisMonth, 15),
    title: 'Presentación',
    type: 'event' as const,
  },
];

const examEvents = [
  {
    id: '1',
    date: new Date(thisYear, thisMonth, 5),
    title: 'Examen de Matemáticas',
    type: 'exam' as const,
  },
  {
    id: '2',
    date: new Date(thisYear, thisMonth, 12),
    title: 'Examen de Física',
    type: 'exam' as const,
  },
  {
    id: '3',
    date: new Date(thisYear, thisMonth, 19),
    title: 'Examen de Química',
    type: 'exam' as const,
  },
  {
    id: '4',
    date: new Date(thisYear, thisMonth, 26),
    title: 'Examen Final',
    type: 'exam' as const,
  },
];

const meta: Meta<typeof Calendar> = {
  title: 'Components/Common/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    events: {
      description: 'Array de eventos a mostrar en el calendario',
    },
    onDateClick: {
      description: 'Callback cuando se hace clic en una fecha',
      action: 'date clicked',
    },
    onEventClick: {
      description: 'Callback cuando se hace clic en un evento',
      action: 'event clicked',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Calendar>;

// Calendario vacío
export const Empty: Story = {
  args: {
    events: [],
  },
};

// Con eventos variados
export const WithEvents: Story = {
  args: {
    events: mockEvents,
  },
};

// Múltiples eventos en el mismo día
export const MultipleEventsPerDay: Story = {
  args: {
    events: manyEventsOnSameDay,
  },
};

// Solo exámenes
export const ExamsOnly: Story = {
  args: {
    events: examEvents,
  },
};

// Con callbacks
export const WithCallbacks: Story = {
  args: {
    events: mockEvents,
    onDateClick: (date: Date) => console.log('Date clicked:', date),
    onEventClick: event => console.log('Event clicked:', event),
  },
};

// Vista móvil
export const Mobile: Story = {
  args: {
    events: mockEvents,
  },
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

// Vista tablet
export const Tablet: Story = {
  args: {
    events: mockEvents,
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
  decorators: [
    Story => (
      <div style={{ maxWidth: '768px' }}>
        <Story />
      </div>
    ),
  ],
};

// Calendario en sidebar
export const InSidebar: Story = {
  args: {
    events: mockEvents,
  },
  decorators: [
    Story => (
      <div style={{ maxWidth: '350px' }}>
        <Story />
      </div>
    ),
  ],
};

// Calendario amplio
export const Wide: Story = {
  args: {
    events: mockEvents,
  },
  decorators: [
    Story => (
      <div style={{ maxWidth: '900px' }}>
        <Story />
      </div>
    ),
  ],
};
