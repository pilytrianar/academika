import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Avatar from './Avatar';

// Mock de Material-UI para evitar problemas con archivos
vi.mock('@mui/material', async () => {
  const actual = await vi.importActual('@mui/material');
  return {
    ...actual,
    IconButton: ({ children, onClick, ...props }: any) => (
      <button onClick={onClick} {...props}>
        {children}
      </button>
    ),
    Menu: ({ children, open, anchorEl, onClose, anchorOrigin, keepMounted, ...props }: any) =>
      open ? (
        <div role='menu' {...props}>
          {children}
        </div>
      ) : null,
    MenuItem: ({ children, onClick, ...props }: any) => (
      <div role='menuitem' onClick={onClick} {...props}>
        {children}
      </div>
    ),
    Typography: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  };
});

vi.mock('@mui/icons-material', () => ({
  AccountCircle: (props: any) => <svg data-testid='AccountCircleIcon' {...props} />,
}));

const mockData = [
  { id: 1, text: 'Profile', onClick: vi.fn() },
  { id: 2, text: 'Settings', onClick: vi.fn() },
  { id: 3, text: 'Logout', onClick: vi.fn() },
];

//TODO: Corregir e implementar los tests

describe('Componente Avatar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Renderizado', () => {
    it.skip('renders the avatar button', () => {
      render(<Avatar data={mockData} />);
      const button = screen.getByRole('button', { name: /account of current user/i });
      console.log(button);
      expect(button).toBeInTheDocument();
    });

    it('renders AccountCircle icon when no user is provided', () => {
      render(<Avatar data={mockData} />);
      const icon = screen.getByTestId('AccountCircleIcon');
      expect(icon).toBeInTheDocument();
    });

    it('renders user initials when user prop is provided', () => {
      render(<Avatar data={mockData} user='John Doe' />);
      const initials = screen.getByText('JD');
      expect(initials).toBeInTheDocument();
    });

    it('renders correct initials for single word user', () => {
      render(<Avatar data={mockData} user='John' />);
      const initials = screen.getByText('JJ');
      expect(initials).toBeInTheDocument();
    });

    it('renders correct initials for multi-word user', () => {
      render(<Avatar data={mockData} user='John Michael Doe' />);
      const initials = screen.getByText('JD');
      expect(initials).toBeInTheDocument();
    });

    it('does not render AccountCircle icon when user is provided', () => {
      render(<Avatar data={mockData} user='John Doe' />);
      const icon = screen.queryByTestId('AccountCircleIcon');
      expect(icon).not.toBeInTheDocument();
    });
  });

  describe('Interacción del menú', () => {
    it('menu is closed by default', () => {
      render(<Avatar data={mockData} />);
      const menuItems = screen.queryByRole('menu');
      expect(menuItems).not.toBeInTheDocument();
    });

    it.skip('opens menu when avatar button is clicked', () => {
      render(<Avatar data={mockData} />);
      const button = screen.getByRole('button', { name: /account of current user/i });

      fireEvent.click(button);

      const menu = screen.getByRole('menu');
      expect(menu).toBeInTheDocument();
    });

    it.skip('renders all menu items when menu is open', () => {
      render(<Avatar data={mockData} />);
      const button = screen.getByRole('button', { name: /account of current user/i });

      fireEvent.click(button);

      expect(screen.getByText('Profile')).toBeInTheDocument();
      expect(screen.getByText('Settings')).toBeInTheDocument();
      expect(screen.getByText('Logout')).toBeInTheDocument();
    });

    it.skip('calls onClick handler when menu item is clicked', () => {
      const onClickMock = vi.fn();
      const dataWithClick = [{ id: 1, text: 'Profile', onClick: onClickMock }];

      render(<Avatar data={dataWithClick} />);
      const button = screen.getByRole('button', { name: /account of current user/i });

      fireEvent.click(button);

      const menuItem = screen.getByText('Profile');
      fireEvent.click(menuItem);

      expect(onClickMock).toHaveBeenCalledTimes(1);
    });

    it.skip('handles menu items without onClick handlers', () => {
      const dataWithoutClick = [{ id: 1, text: 'Profile' }];

      render(<Avatar data={dataWithoutClick} />);
      const button = screen.getByRole('button', { name: /account of current user/i });

      fireEvent.click(button);

      const menuItem = screen.getByText('Profile');
      expect(() => fireEvent.click(menuItem)).not.toThrow();
    });
  });

  describe('Accesibilidad', () => {
    it.skip('has correct aria attributes on button', () => {
      render(<Avatar data={mockData} />);
      const button = screen.getByRole('button', { name: /account of current user/i });

      expect(button).toHaveAttribute('aria-label', 'account of current user');
      expect(button).toHaveAttribute('aria-controls', 'menu-appbar');
      expect(button).toHaveAttribute('aria-haspopup', 'true');
    });

    it.skip('menu has correct id when open', () => {
      render(<Avatar data={mockData} />);
      const button = screen.getByRole('button', { name: /account of current user/i });

      fireEvent.click(button);

      const menu = screen.getByRole('menu');
      expect(menu).toHaveAttribute('id', 'menu-appbar');
    });
  });

  describe('Casos de borde', () => {
    it.skip('renders with empty data array', () => {
      render(<Avatar data={[]} />);
      const button = screen.getByRole('button', { name: /account of current user/i });
      expect(button).toBeInTheDocument();
    });

    it('handles user with extra spaces', () => {
      render(<Avatar data={mockData} user='  John   Doe  ' />);
      const initials = screen.getByText('JD');
      expect(initials).toBeInTheDocument();
    });

    it.skip('renders multiple menu items with same text but different ids', () => {
      const duplicateData = [
        { id: 1, text: 'Item', onClick: vi.fn() },
        { id: 2, text: 'Item', onClick: vi.fn() },
      ];

      render(<Avatar data={duplicateData} />);
      const button = screen.getByRole('button', { name: /account of current user/i });

      fireEvent.click(button);

      const items = screen.getAllByText('Item');
      expect(items).toHaveLength(2);
    });

    it('handles lowercase user names', () => {
      render(<Avatar data={mockData} user='john doe' />);
      const initials = screen.getByText('JD');
      expect(initials).toBeInTheDocument();
    });

    it('handles mixed case user names', () => {
      render(<Avatar data={mockData} user='jOhN dOe' />);
      const initials = screen.getByText('JD');
      expect(initials).toBeInTheDocument();
    });
  });
});
