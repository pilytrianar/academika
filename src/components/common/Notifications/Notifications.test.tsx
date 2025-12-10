import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mockNotificationIcons } from '@/test/mocks';
import Notifications from './Notifications';
import { ButtonProps } from '../Button/Button.types';
import { IconButtonProps } from '../Button/IconButton/IconButton.types';
import { NotificationItemProps } from './NotificationsItems/NotificationItems.types';
import { DropDownMenuProps } from '../DropDownMenu/DropDownMenu.types';

// Mock de los iconos de Material-UI
mockNotificationIcons();

// Mock de los componentes y hooks
vi.mock('../DropDownMenu', () => ({
  default: ({ children, trigger }: DropDownMenuProps) => (
    <div>
      {trigger(vi.fn())}
      <div data-testid='dropdown-content'>{children}</div>
    </div>
  ),
}));

vi.mock('../Button', () => ({
  default: ({ text, onClick, startIcon, ...props }: ButtonProps) => (
    <button onClick={onClick} {...props}>
      {startIcon}
      {text}
    </button>
  ),
}));

vi.mock('../Button/IconButton', () => ({
  default: ({ children, onClick, ...props }: IconButtonProps) => (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  ),
}));

vi.mock('./NotificationsItems', () => ({
  default: ({ notification }: NotificationItemProps) => (
    <div data-testid={`notification-${notification.id}`}>
      <div>{notification.title}</div>
      <div>{notification.description}</div>
    </div>
  ),
}));

const mockNotifications = [
  {
    id: '1',
    title: 'New Course Available',
    description: 'Advanced React Patterns has been added to your library.',
    time: '2 mins ago',
    type: 'info' as const,
    read: false,
  },
  {
    id: '2',
    title: 'Assignment Graded',
    description: 'Your submission has been graded. Score: 98/100',
    time: '1 hour ago',
    type: 'success' as const,
    read: false,
  },
];

describe('Componente Notifications', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Renderizado', () => {
    it('muestra el botón de notificaciones', () => {
      render(<Notifications data={mockNotifications} />);

      const icon = screen.getByTestId('NotificationsIcon');
      expect(icon).toBeInTheDocument();
    });

    it('renderiza el badge con el número correcto de notificaciones', () => {
      render(<Notifications data={mockNotifications} />);

      const badge = screen.getByText('2');
      expect(badge).toBeInTheDocument();
    });

    it('renderiza el encabezado de notificaciones', () => {
      render(<Notifications data={mockNotifications} />);

      const header = screen.getByText('Notificaciones');
      expect(header).toBeInTheDocument();
    });

    it('renderiza todas las notificaciones', () => {
      render(<Notifications data={mockNotifications} />);

      const notification1 = screen.getByTestId('notification-1');
      const notification2 = screen.getByTestId('notification-2');

      expect(notification1).toBeInTheDocument();
      expect(notification2).toBeInTheDocument();
    });

    it('renderiza el botón de limpiar cuando hay notificaciones', () => {
      render(<Notifications data={mockNotifications} />);

      const clearButton = screen.getByRole('button', { name: /limpiar/i });
      expect(clearButton).toBeInTheDocument();
    });
  });

  describe('Estado vacío', () => {
    it('renderiza el estado vacío cuando no hay notificaciones', () => {
      render(<Notifications data={[]} />);

      const emptyMessage = screen.getByText('Todo al día');
      expect(emptyMessage).toBeInTheDocument();
    });

    it('renderiza el ícono de estado vacío', () => {
      render(<Notifications data={[]} />);

      const doneIcon = screen.getByTestId('DoneAllIcon');
      expect(doneIcon).toBeInTheDocument();
    });

    it('renderiza la descripción del estado vacío', () => {
      render(<Notifications data={[]} />);

      const description = screen.getByText('No tienes notificaciones.');
      expect(description).toBeInTheDocument();
    });

    it('no renderiza el botón de limpiar cuando no hay notificaciones', () => {
      render(<Notifications data={[]} />);

      const clearButton = screen.queryByRole('button', { name: /limpiar/i });
      expect(clearButton).not.toBeInTheDocument();
    });
  });

  describe('Interacción', () => {
    it('limpia todas las notificaciones cuando se hace clic en el botón de limpiar', () => {
      render(<Notifications data={mockNotifications} />);

      const clearButton = screen.getByRole('button', { name: /limpiar/i });
      fireEvent.click(clearButton);

      const emptyMessage = screen.getByText('Todo al día');
      expect(emptyMessage).toBeInTheDocument();
    });

    it('oculta el botón de limpiar después de limpiar todas las notificaciones', () => {
      render(<Notifications data={mockNotifications} />);

      const clearButton = screen.getByRole('button', { name: /limpiar/i });
      fireEvent.click(clearButton);

      const clearButtonAfter = screen.queryByRole('button', { name: /limpiar/i });
      expect(clearButtonAfter).not.toBeInTheDocument();
    });

    it('muestra el estado vacío después de limpiar las notificaciones', () => {
      render(<Notifications data={mockNotifications} />);

      const clearButton = screen.getByRole('button', { name: /limpiar/i });
      fireEvent.click(clearButton);

      const notification1 = screen.queryByTestId('notification-1');
      const notification2 = screen.queryByTestId('notification-2');

      expect(notification1).not.toBeInTheDocument();
      expect(notification2).not.toBeInTheDocument();
    });
  });

  describe('Contenido de notificaciones', () => {
    it('renderiza los títulos de las notificaciones', () => {
      render(<Notifications data={mockNotifications} />);

      expect(screen.getByText('New Course Available')).toBeInTheDocument();
      expect(screen.getByText('Assignment Graded')).toBeInTheDocument();
    });

    it('renderiza las descripciones de las notificaciones', () => {
      render(<Notifications data={mockNotifications} />);

      expect(screen.getByText(/Advanced React Patterns/i)).toBeInTheDocument();
      expect(screen.getByText(/Score: 98\/100/i)).toBeInTheDocument();
    });
  });

  describe('Insignia', () => {
    it('muestra el conteo correcto para una sola notificación', () => {
      const singleNotification = [mockNotifications[0]];
      render(<Notifications data={singleNotification} />);

      const badge = screen.getByText('1');
      expect(badge).toBeInTheDocument();
    });

    it('muestra el conteo correcto para múltiples notificaciones', () => {
      render(<Notifications data={mockNotifications} />);

      const badge = screen.getByText('2');
      expect(badge).toBeInTheDocument();
    });
  });
});
