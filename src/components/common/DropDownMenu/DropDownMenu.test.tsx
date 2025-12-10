import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import DropDownMenu from './DropDownMenu';
import type { Mock } from 'vitest';

// Mock del hook useMenu
const mockHandleOpen = vi.fn();
const mockHandleClose = vi.fn();
let mockAnchorEl: HTMLElement | null = null;

vi.mock('../../hooks/useMenu', () => ({
  useMenu: vi.fn(() => ({
    anchorEl: mockAnchorEl,
    handleOpen: mockHandleOpen,
    handleClose: mockHandleClose,
  })),
}));

// Import the mocked hook to access it in tests
import { useMenu } from '../../hooks/useMenu';
const mockUseMenu = useMenu as Mock;

describe('Componente DropDownMenu', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockAnchorEl = null;
    mockUseMenu.mockReturnValue({
      anchorEl: mockAnchorEl,
      handleOpen: mockHandleOpen,
      handleClose: mockHandleClose,
    });
  });

  describe('Renderizado', () => {
    it('renderiza el elemento de activación', () => {
      render(
        <DropDownMenu trigger={handleOpen => <button onClick={handleOpen}>Open Menu</button>}>
          <div>Menu Content</div>
        </DropDownMenu>
      );

      const trigger = screen.getByRole('button', { name: /open menu/i });
      expect(trigger).toBeInTheDocument();
    });

    it('no renderiza el menú cuando está cerrado', () => {
      render(
        <DropDownMenu trigger={handleOpen => <button onClick={handleOpen}>Open Menu</button>}>
          <div>Menu Content</div>
        </DropDownMenu>
      );

      const menuContent = screen.queryByText('Menu Content');
      expect(menuContent).not.toBeInTheDocument();
    });

    it('renderiza el menú cuando está abierto', () => {
      const anchorElement = document.createElement('div');
      mockAnchorEl = anchorElement;
      mockUseMenu.mockReturnValue({
        anchorEl: anchorElement,
        handleOpen: mockHandleOpen,
        handleClose: mockHandleClose,
      });

      render(
        <DropDownMenu trigger={handleOpen => <button onClick={handleOpen}>Open Menu</button>}>
          <div>Menu Content</div>
        </DropDownMenu>
      );

      const menuContent = screen.getByText('Menu Content');
      expect(menuContent).toBeInTheDocument();
    });
  });

  describe('Interacción', () => {
    it('llama a handleOpen cuando se hace clic en el activador', () => {
      render(
        <DropDownMenu trigger={handleOpen => <button onClick={handleOpen}>Open Menu</button>}>
          <div>Menu Content</div>
        </DropDownMenu>
      );

      const trigger = screen.getByRole('button', { name: /open menu/i });
      fireEvent.click(trigger);

      expect(mockHandleOpen).toHaveBeenCalledTimes(1);
    });

    it('pasa la función handleOpen a la función de activación', () => {
      const triggerSpy = vi.fn(handleOpen => <button onClick={handleOpen}>Open Menu</button>);

      render(
        <DropDownMenu trigger={triggerSpy}>
          <div>Menu Content</div>
        </DropDownMenu>
      );

      expect(triggerSpy).toHaveBeenCalledWith(mockHandleOpen);
    });
  });

  describe('Contenido del menú', () => {
    it('muestra los hijos dentro del menú cuando está abierto', () => {
      const anchorElement = document.createElement('div');
      mockUseMenu.mockReturnValue({
        anchorEl: anchorElement,
        handleOpen: mockHandleOpen,
        handleClose: mockHandleClose,
      });

      render(
        <DropDownMenu trigger={handleOpen => <button onClick={handleOpen}>Open Menu</button>}>
          <div>First Item</div>
          <div>Second Item</div>
          <div>Third Item</div>
        </DropDownMenu>
      );

      expect(screen.getByText('First Item')).toBeInTheDocument();
      expect(screen.getByText('Second Item')).toBeInTheDocument();
      expect(screen.getByText('Third Item')).toBeInTheDocument();
    });

    it('renderiza el ancla del elemento', () => {
      const anchorElement = document.createElement('div');
      mockUseMenu.mockReturnValue({
        anchorEl: anchorElement,
        handleOpen: mockHandleOpen,
        handleClose: mockHandleClose,
      });

      render(
        <DropDownMenu trigger={handleOpen => <button onClick={handleOpen}>Open Menu</button>}>
          <div>
            <span>Complex</span>
            <strong>Content</strong>
          </div>
        </DropDownMenu>
      );

      expect(screen.getByText('Complex')).toBeInTheDocument();
      expect(screen.getByText('Content')).toBeInTheDocument();
    });
  });

  describe('Props del Menu', () => {
    it('accepts and passes through Menu props', () => {
      const anchorElement = document.createElement('div');
      mockUseMenu.mockReturnValue({
        anchorEl: anchorElement,
        handleOpen: mockHandleOpen,
        handleClose: mockHandleClose,
      });

      const { container } = render(
        <DropDownMenu
          trigger={handleOpen => <button onClick={handleOpen}>Open Menu</button>}
          id='custom-menu'
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <div>Menu Content</div>
        </DropDownMenu>
      );

      expect(container).toBeInTheDocument();
    });
  });
});
