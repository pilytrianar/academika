import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mockMaterialComponents, mockAccountCircleIcon } from '@/test/mocks';
import Avatar from './Avatar';

// Mock de Material-UI
mockMaterialComponents();
mockAccountCircleIcon();

const mockData = [
  { id: 1, text: 'Profile', onClick: vi.fn() },
  { id: 2, text: 'Settings', onClick: vi.fn() },
  { id: 3, text: 'Logout', onClick: vi.fn() },
];

describe('Componente Avatar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Renderizado', () => {
    it('renderiza el botón del avatar', () => {
      render(<Avatar data={mockData} />);
      const button = screen.getByRole('button', { name: /show content/i });
      expect(button).toBeInTheDocument();
    });

    it('renderiza el ícono AccountCircle cuando no se proporciona un usuario', () => {
      render(<Avatar data={mockData} />);
      const icon = screen.getByTestId('AccountCircleIcon');
      expect(icon).toBeInTheDocument();
    });

    it('renderiza las iniciales del usuario cuando se proporciona la propiedad user', () => {
      render(<Avatar data={mockData} user='John Doe' />);
      const initials = screen.getByText('JD');
      expect(initials).toBeInTheDocument();
    });

    it('renderiza las iniciales correctas para un usuario con una sola palabra', () => {
      render(<Avatar data={mockData} user='John' />);
      const initials = screen.getByText('JJ');
      expect(initials).toBeInTheDocument();
    });

    it('renderiza las iniciales correctas para un usuario con múltiples palabras', () => {
      render(<Avatar data={mockData} user='John Michael Doe' />);
      const initials = screen.getByText('JD');
      expect(initials).toBeInTheDocument();
    });

    it('no renderiza el ícono AccountCircle cuando se proporciona un usuario', () => {
      render(<Avatar data={mockData} user='John Doe' />);
      const icon = screen.queryByTestId('AccountCircleIcon');
      expect(icon).not.toBeInTheDocument();
    });
  });

  describe('Interacción del menú', () => {
    it('el menú está cerrado por defecto', () => {
      render(<Avatar data={mockData} />);
      const menuItems = screen.queryByRole('menu');
      expect(menuItems).not.toBeInTheDocument();
    });

    it('abre el menú cuando se hace clic en el botón del avatar', () => {
      render(<Avatar data={mockData} />);
      const button = screen.getByRole('button', { name: /show content/i });

      fireEvent.click(button);

      const menu = screen.getByRole('menu');
      expect(menu).toBeInTheDocument();
    });

    it('renderiza todos los elementos del menú cuando está abierto', () => {
      render(<Avatar data={mockData} />);
      const button = screen.getByRole('button', { name: /show content/i });

      fireEvent.click(button);

      expect(screen.getByText('Profile')).toBeInTheDocument();
      expect(screen.getByText('Settings')).toBeInTheDocument();
      expect(screen.getByText('Logout')).toBeInTheDocument();
    });

    it('llama al manejador onClick cuando se hace clic en un elemento del menú', () => {
      const onClickMock = vi.fn();
      const dataWithClick = [{ id: 1, text: 'Profile', onClick: onClickMock }];

      render(<Avatar data={dataWithClick} />);
      const button = screen.getByRole('button', { name: /show content/i });

      fireEvent.click(button);

      const menuItem = screen.getByText('Profile');
      fireEvent.click(menuItem);

      expect(onClickMock).toHaveBeenCalledTimes(1);
    });

    it('handles menu items without onClick handlers', () => {
      const dataWithoutClick = [{ id: 1, text: 'Profile' }];

      render(<Avatar data={dataWithoutClick} />);
      const button = screen.getByRole('button', { name: /show content/i });

      fireEvent.click(button);

      const menuItem = screen.getByText('Profile');
      expect(() => fireEvent.click(menuItem)).not.toThrow();
    });
  });

  describe('Accesibilidad', () => {
    it('has correct aria-label on button', () => {
      render(<Avatar data={mockData} />);
      const button = screen.getByRole('button', { name: /show content/i });

      expect(button).toHaveAttribute('aria-label', 'show content');
    });

    it('menu is rendered when open', () => {
      render(<Avatar data={mockData} />);
      const button = screen.getByRole('button', { name: /show content/i });

      fireEvent.click(button);

      const menu = screen.getByRole('menu');
      expect(menu).toBeInTheDocument();
    });
  });

  describe('Casos de borde', () => {
    it('se renderiza con un arreglo de datos vacío', () => {
      render(<Avatar data={[]} />);
      const button = screen.getByRole('button', { name: /show content/i });
      expect(button).toBeInTheDocument();
    });

    it('handles user with extra spaces', () => {
      render(<Avatar data={mockData} user='  John   Doe  ' />);
      const initials = screen.getByText('JD');
      expect(initials).toBeInTheDocument();
    });

    it('renders multiple menu items with same text but different ids', () => {
      const duplicateData = [
        { id: 1, text: 'Item', onClick: vi.fn() },
        { id: 2, text: 'Item', onClick: vi.fn() },
      ];

      render(<Avatar data={duplicateData} />);
      const button = screen.getByRole('button', { name: /show content/i });

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
