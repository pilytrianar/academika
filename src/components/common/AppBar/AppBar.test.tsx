import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom/vitest';
import AppBar from './AppBar';

import { mockMenuIcon } from '@/test/mocks';

// Mock de Material-UI
mockMenuIcon();

// Mock del hook useAuth
vi.mock('@/hooks/useAuth', () => ({
  useAuth: vi.fn().mockReturnValue({
    user: { firstName: 'Andrés', lastName: 'Bohórquez' },
  }),
}));

// Mock de los componentes hijos
// Mock Next.js router
const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Type definitions for mocks
interface AvatarMenuItem {
  id: number;
  text: string;
  onClick: () => void;
}

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  type: string;
  read: boolean;
}

// Mock child components
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

vi.mock('../Notifications', () => ({
  default: ({ data }: { data: NotificationItem[] }) => (
    <div data-testid='notifications'>
      {data.map(notif => (
        <div key={notif.id}>{notif.title}</div>
      ))}
    </div>
  ),
}));

describe('AppBar', () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  describe('Rendering', () => {
    it('renders the AppBar component', () => {
      const { container } = render(<AppBar width='240px' onClick={() => {}} />);

      const appBar = container.querySelector('.MuiAppBar-root');
      expect(appBar).toBeInTheDocument();
    });

    it('renders menu button', () => {
      render(<AppBar width='240px' onClick={() => {}} />);

      const menuButton = screen.getByLabelText('open drawer');
      expect(menuButton).toBeInTheDocument();
    });

    it('renders Avatar component', () => {
      render(<AppBar width='240px' onClick={() => {}} />);

      expect(screen.getByTestId('avatar')).toBeInTheDocument();
    });

    it('renders Notifications component', () => {
      render(<AppBar width='240px' onClick={() => {}} />);

      expect(screen.getByTestId('notifications')).toBeInTheDocument();
    });

    it('displays current user name', () => {
      render(<AppBar width='240px' onClick={() => {}} />);

      expect(screen.getByText('Andrés Bohórquez')).toBeInTheDocument();
    });
  });

  describe('Menu button interaction', () => {
    it('calls onClick when menu button is clicked', () => {
      const mockClick = vi.fn();
      render(<AppBar width='240px' onClick={mockClick} />);

      const menuButton = screen.getByLabelText('open drawer');
      fireEvent.click(menuButton);

      expect(mockClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Avatar menu actions', () => {
    it('navigates to profile page', () => {
      render(<AppBar width='240px' onClick={() => {}} />);

      const perfilButton = screen.getByRole('button', { name: /perfil/i });
      fireEvent.click(perfilButton);

      expect(mockPush).toHaveBeenCalledWith('/studentinfo');
    });

    it('navigates to login on logout', () => {
      render(<AppBar width='240px' onClick={() => {}} />);

      const logoutButton = screen.getByRole('button', { name: /cerrar sesión/i });
      fireEvent.click(logoutButton);

      expect(mockPush).toHaveBeenCalledWith('/login');
    });
  });

  describe('Notifications', () => {
    it('displays notification titles', () => {
      render(<AppBar width='240px' onClick={() => {}} />);

      expect(screen.getByText('New Course Available')).toBeInTheDocument();
      expect(screen.getByText('Assignment Graded')).toBeInTheDocument();
    });
  });

  describe('Responsive behavior', () => {
    it('accepts custom width prop', () => {
      const { container } = render(<AppBar width='300px' onClick={() => {}} />);

      const appBar = container.querySelector('.MuiAppBar-root');
      expect(appBar).toBeInTheDocument();
    });
  });

  describe('Component structure', () => {
    it('renders without crashing', () => {
      expect(() => render(<AppBar width='240px' onClick={() => {}} />)).not.toThrow();
    });

    it('contains Toolbar', () => {
      const { container } = render(<AppBar width='240px' onClick={() => {}} />);

      const toolbar = container.querySelector('.MuiToolbar-root');
      expect(toolbar).toBeInTheDocument();
    });
  });
});
