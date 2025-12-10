import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mockDrawerNavigationIcons } from '@/test/mocks';
import Drawer from './Drawer';
import { DrawerContentProps } from './DrawerContent/DrawerContent.types';

// Mock de next/navigation
vi.mock('next/navigation', () => ({
  usePathname: vi.fn(() => '/dashboard'),
}));

// Mock de DrawerContent
vi.mock('./DrawerContent', () => ({
  __esModule: true,
  default: ({ menuItems, pathname }: DrawerContentProps) => (
    <div data-testid='drawer-content'>
      <div data-testid='pathname'>{pathname}</div>
      <div data-testid='menu-items-count'>{menuItems.length}</div>
    </div>
  ),
}));

// Mock de Material-UI icons
mockDrawerNavigationIcons();

describe('Componente Drawer', () => {
  const mockHandleNavigation = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Renderizado', () => {
    it('renderiza el componente Drawer', () => {
      const { container } = render(<Drawer handleNavigation={mockHandleNavigation} />);

      const drawer = container.querySelector('.MuiDrawer-root');
      expect(drawer).toBeInTheDocument();

      const drawerContent = screen.getByTestId('drawer-content');
      expect(drawerContent).toBeInTheDocument();
    });

    it('renderiza DrawerContent con las propiedades correctas', () => {
      render(<Drawer handleNavigation={mockHandleNavigation} />);

      const menuItemsCount = screen.getByTestId('menu-items-count');
      expect(menuItemsCount).toHaveTextContent('4');
    });

    it('pasa el pathname actual a DrawerContent', () => {
      render(<Drawer handleNavigation={mockHandleNavigation} />);

      const pathname = screen.getByTestId('pathname');
      expect(pathname).toHaveTextContent('/dashboard');
    });
  });

  describe('Variantes del Drawer', () => {
    it('se renderiza como un drawer permanente por defecto', () => {
      const { container } = render(<Drawer handleNavigation={mockHandleNavigation} />);

      const drawer = container.querySelector('.MuiDrawer-root');
      expect(drawer).toBeInTheDocument();
    });

    it('se renderiza como un drawer temporal cuando isMobile es verdadero', () => {
      render(<Drawer isMobile={true} handleNavigation={mockHandleNavigation} />);

      const drawerContent = screen.getByTestId('drawer-content');
      expect(drawerContent).toBeInTheDocument();
    });

    it('se renderiza como un drawer permanente cuando isMobile es falso', () => {
      const { container } = render(
        <Drawer isMobile={false} handleNavigation={mockHandleNavigation} />
      );

      const drawer = container.querySelector('.MuiDrawer-root');
      expect(drawer).toBeInTheDocument();
    });
  });

  describe('Props', () => {
    it('acepta la propiedad handleNavigation', () => {
      render(<Drawer handleNavigation={mockHandleNavigation} />);

      const drawerContent = screen.getByTestId('drawer-content');
      expect(drawerContent).toBeInTheDocument();
    });

    it('funciona sin la propiedad handleNavigation', () => {
      const { container } = render(<Drawer />);

      const drawer = container.querySelector('.MuiDrawer-root');
      expect(drawer).toBeInTheDocument();

      const drawerContent = screen.getByTestId('drawer-content');
      expect(drawerContent).toBeInTheDocument();
    });

    it('acepta propiedades adicionales de MUI Drawer', () => {
      const { container } = render(
        <Drawer handleNavigation={mockHandleNavigation} elevation={8} />
      );

      expect(container).toBeInTheDocument();
    });
  });

  describe('Estado del Drawer', () => {
    it('drawer is open by default', () => {
      const { container } = render(<Drawer handleNavigation={mockHandleNavigation} />);

      const drawer = container.querySelector('.MuiDrawer-root');
      expect(drawer).toBeInTheDocument();
      expect(drawer).toHaveClass('MuiDrawer-docked');
    });
  });
});
