import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mockMenuIcon } from '@/test/mocks';
import AppBar from './AppBar';

import { AvatarProps } from '../Avatar/Avatar.types';
import { NotificationsProps } from '../Notifications/Notifications.types';

// Mock de Material-UI
mockMenuIcon();

// Mock de los componentes hijos
vi.mock('../Avatar', () => ({
  default: ({ user }: AvatarProps) => <div data-testid='avatar-component'>Avatar: {user}</div>,
}));

vi.mock('../Notifications', () => ({
  default: ({ data }: NotificationsProps) => (
    <div data-testid='notifications-component'>Notifications: {data.length}</div>
  ),
}));

describe('Componente AppBar', () => {
  const mockOnClick = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Renderizado', () => {
    it('renders the AppBar component', () => {
      const { container } = render(<AppBar width='240px' onClick={mockOnClick} />);

      const appBar = container.querySelector('.MuiAppBar-root');
      expect(appBar).toBeInTheDocument();
    });

    it('renders the menu button', () => {
      render(<AppBar width='240px' onClick={mockOnClick} />);

      const menuButton = screen.getByRole('button', { name: /open drawer/i });
      expect(menuButton).toBeInTheDocument();
    });

    it('renders MenuIcon inside the button', () => {
      render(<AppBar width='240px' onClick={mockOnClick} />);

      const menuIcon = screen.getByTestId('MenuIcon');
      expect(menuIcon).toBeInTheDocument();
    });

    it('renders Avatar component', () => {
      render(<AppBar width='240px' onClick={mockOnClick} />);

      const avatar = screen.getByTestId('avatar-component');
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveTextContent('Andrés Bohórquez');
    });

    it('renders Notifications component', () => {
      render(<AppBar width='240px' onClick={mockOnClick} />);

      const notifications = screen.getByTestId('notifications-component');
      expect(notifications).toBeInTheDocument();
    });
  });

  describe('Interacción', () => {
    it('calls onClick when menu button is clicked', () => {
      render(<AppBar width='240px' onClick={mockOnClick} />);

      const menuButton = screen.getByRole('button', { name: /open drawer/i });
      fireEvent.click(menuButton);

      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('does not throw error when onClick is not provided', () => {
      render(<AppBar width='240px' />);

      const menuButton = screen.getByRole('button', { name: /open drawer/i });
      expect(() => fireEvent.click(menuButton)).not.toThrow();
    });
  });

  describe('Accesibilidad', () => {
    it('has correct aria-label on menu button', () => {
      render(<AppBar width='240px' onClick={mockOnClick} />);

      const menuButton = screen.getByRole('button', { name: /open drawer/i });
      expect(menuButton).toHaveAttribute('aria-label', 'open drawer');
    });

    it('menu button is rendered correctly', () => {
      render(<AppBar width='240px' onClick={mockOnClick} />);

      const menuButton = screen.getByRole('button', { name: /open drawer/i });
      expect(menuButton).toBeInTheDocument();
    });
  });

  describe('Props', () => {
    it('accepts custom width prop', () => {
      const { container } = render(<AppBar width='300px' onClick={mockOnClick} />);
      expect(container).toBeInTheDocument();
    });

    it('accepts additional MUI AppBar props', () => {
      const { container } = render(<AppBar width='240px' onClick={mockOnClick} elevation={4} />);
      expect(container).toBeInTheDocument();
    });
  });
});
