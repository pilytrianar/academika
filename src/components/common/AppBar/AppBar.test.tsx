import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom/vitest';
import AppBar from './AppBar';

import { mockMenuIcon } from '@/test/mocks';

// Mock de Material-UI
mockMenuIcon();

// Crear las funciones mock
const mockLogout = vi.fn();
const mockPush = vi.fn();

// Mock del hook useAuth
vi.mock('@/hooks/useAuth', () => ({
  useAuth: () => ({
    user: { firstName: 'Andrés', lastName: 'Bohórquez' },
    logout: mockLogout,
  }),
}));

// Mock del hook useNotifications
vi.mock('@/hooks/useNotifications', () => ({
  useNotifications: () => ({
    data: {
      notifications: [
        {
          id: 1,
          title: 'New Course Available',
          description: 'A new course has been added to your dashboard.',
          time: '2 hours ago',
          type: 'info',
          isRead: false,
          createdAt: '2023-06-01T12:00:00Z',
          userId: 1,
        },
        {
          id: 2,
          title: 'Assignment Graded',
          description: 'Your assignment has been graded and is available for review.',
          time: '1 day ago',
          type: 'info',
          isRead: false,
          createdAt: '2023-06-02T12:00:00Z',
          userId: 1,
        },
      ],
    },
    loading: false,
    error: null,
    refetch: vi.fn(),
  }),
}));

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock de componentes hijos
vi.mock('../Avatar', () => ({
  default: ({ data, user }: { data: AvatarMenuItem[]; user: string }) => (
    <div data-testid='avatar'>
      <span>{user}</span>
      {data.map(item => (
        <button key={item.id} onClick={item.onClick}>
          {item.text}
        </button>
      ))}
    </div>
  ),
}));

// Mock de notificaciones
vi.mock('../Notifications', () => ({
  default: ({ data }: { data: NotificationItem[] }) => (
    <div data-testid='notifications'>
      {data.map(notif => (
        <div key={notif.id}>{notif.title}</div>
      ))}
    </div>
  ),
}));

// Definición de tipos para el mock
interface AvatarMenuItem {
  id: number;
  text: string;
  onClick: () => void;
}

interface NotificationItem {
  id: number;
  title: string;
  description: string;
  time: string;
  type: 'info';
  isRead: boolean;
  createdAt: string;
  userId: number;
}

describe('AppBar', () => {
  beforeEach(() => {
    mockPush.mockClear();
    mockLogout.mockClear();
  });

  describe('Renderizado', () => {
    it('renderiza el componente AppBar', () => {
      const { container } = render(<AppBar width='240px' onClick={() => {}} />);

      const appBar = container.querySelector('.MuiAppBar-root');
      expect(appBar).toBeInTheDocument();
    });

    it('renderiza el botón de menú', () => {
      render(<AppBar width='240px' onClick={() => {}} />);

      const menuButton = screen.getByLabelText('open drawer');
      expect(menuButton).toBeInTheDocument();
    });

    it('renderiza el componente Avatar', () => {
      render(<AppBar width='240px' onClick={() => {}} />);

      expect(screen.getByTestId('avatar')).toBeInTheDocument();
    });

    it('renderiza el componente Notificaciones', () => {
      render(<AppBar width='240px' onClick={() => {}} />);

      expect(screen.getByTestId('notifications')).toBeInTheDocument();
    });

    it('muestra el nombre del usuario actual', () => {
      render(<AppBar width='240px' onClick={() => {}} />);

      expect(screen.getByText('Andrés Bohórquez')).toBeInTheDocument();
    });
  });

  describe('Interacción con el botón de menú', () => {
    it('llama a onClick cuando se hace clic en el botón de menú', () => {
      const mockClick = vi.fn();
      render(<AppBar width='240px' onClick={mockClick} />);

      const menuButton = screen.getByLabelText('open drawer');
      fireEvent.click(menuButton);

      expect(mockClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Acciones del menú de Avatar', () => {
    it('navega a la página de perfil', () => {
      render(<AppBar width='240px' onClick={() => {}} />);

      const perfilButton = screen.getByRole('button', { name: /perfil/i });
      fireEvent.click(perfilButton);

      expect(mockPush).toHaveBeenCalledWith('/not-found');
    });

    it('navega al inicio de sesión al cerrar sesión', () => {
      render(<AppBar width='240px' onClick={() => {}} />);

      const logoutButton = screen.getByRole('button', { name: /cerrar sesión/i });
      fireEvent.click(logoutButton);

      expect(mockLogout).toHaveBeenCalledTimes(1);
    });
  });

  describe('Notificaciones', () => {
    it('muestra los títulos de las notificaciones', () => {
      render(<AppBar width='240px' onClick={() => {}} />);

      expect(screen.getByText('New Course Available')).toBeInTheDocument();
      expect(screen.getByText('Assignment Graded')).toBeInTheDocument();
    });
  });

  describe('Comportamiento Responsivo', () => {
    it('acepta la propiedad de ancho personalizado', () => {
      const { container } = render(<AppBar width='300px' onClick={() => {}} />);

      const appBar = container.querySelector('.MuiAppBar-root');
      expect(appBar).toBeInTheDocument();
    });
  });

  describe('Estructura del Componente', () => {
    it('se renderiza sin fallar', () => {
      expect(() => render(<AppBar width='240px' onClick={() => {}} />)).not.toThrow();
    });

    it('contiene la barra de herramientas (Toolbar)', () => {
      const { container } = render(<AppBar width='240px' onClick={() => {}} />);

      const toolbar = container.querySelector('.MuiToolbar-root');
      expect(toolbar).toBeInTheDocument();
    });
  });
});
