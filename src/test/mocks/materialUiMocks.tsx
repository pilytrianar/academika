import { vi } from 'vitest';
import {
  IconButtonProps,
  MenuProps,
  TypographyProps,
  MenuItemProps,
  SvgIconProps,
} from '@mui/material';

/**
 * Mock centralizado para componentes de Material-UI
 * Importa y usa estos mocks en tus tests para evitar duplicación
 */

// Mock de componentes de Material-UI
export const mockMaterialComponents = () => {
  vi.mock('@mui/material', async () => {
    const actual = await vi.importActual('@mui/material');
    return {
      ...actual,
      IconButton: ({ children, onClick, ...props }: IconButtonProps) => (
        <button onClick={onClick} {...props}>
          {children}
        </button>
      ),
      Menu: ({
        children,
        open,
        anchorEl,
        onClose,
        anchorOrigin,
        keepMounted,
        slotProps,
        ...props
      }: MenuProps) =>
        open ? (
          <div role='menu' {...props}>
            {children}
          </div>
        ) : null,
      MenuItem: ({ children, dense, divider, onClick, ...props }: MenuItemProps) => (
        <li role='menuitem' onClick={onClick} {...props}>
          {children}
        </li>
      ),
      Typography: ({ children, textAlign, ...props }: TypographyProps) => (
        <span {...props}>{children}</span>
      ),
    };
  });
};

/**
 * Mock de iconos individuales de Material-UI
 * Usa estos cuando necesites mockear iconos específicos
 */
export const mockMenuIcon = () => {
  vi.mock('@mui/icons-material/Menu', () => ({
    default: (props: SvgIconProps) => <svg data-testid='MenuIcon' {...props} />,
  }));
};

export const mockNotificationsIcon = () => {
  vi.mock('@mui/icons-material/NotificationsOutlined', () => ({
    default: (props: SvgIconProps) => <svg data-testid='NotificationsIcon' {...props} />,
  }));
};

export const mockDoneAllIcon = () => {
  vi.mock('@mui/icons-material/DoneAll', () => ({
    default: (props: SvgIconProps) => <svg data-testid='DoneAllIcon' {...props} />,
  }));
};

export const mockDeleteSweepIcon = () => {
  vi.mock('@mui/icons-material/DeleteSweepOutlined', () => ({
    default: (props: SvgIconProps) => <svg data-testid='DeleteSweepIcon' {...props} />,
  }));
};

export const mockHomeIcon = () => {
  vi.mock('@mui/icons-material/Home', () => ({
    default: () => <svg data-testid='HomeIcon' />,
  }));
};

export const mockBookIcon = () => {
  vi.mock('@mui/icons-material/Book', () => ({
    default: () => <svg data-testid='BookIcon' />,
  }));
};

export const mockPeopleIcon = () => {
  vi.mock('@mui/icons-material/People', () => ({
    default: () => <svg data-testid='PeopleIcon' />,
  }));
};

export const mockCalendarMonthIcon = () => {
  vi.mock('@mui/icons-material/CalendarMonth', () => ({
    default: () => <svg data-testid='CalendarMonthIcon' />,
  }));
};

export const mockAccountCircleIcon = () => {
  vi.mock('@mui/icons-material', () => ({
    AccountCircle: (props: SvgIconProps) => <svg data-testid='AccountCircleIcon' {...props} />,
  }));
};

export const mockVisibilityIcons = () => {
  vi.mock('@mui/icons-material', () => ({
    Visibility: () => <div data-testid='visibility-icon'>Visibility</div>,
    VisibilityOff: () => <div data-testid='visibility-off-icon'>VisibilityOff</div>,
  }));
};

export const mockArrowForwardIcon = () => {
  vi.mock('@mui/icons-material', () => ({
    ArrowForward: () => <div data-testid='arrow-forward-icon'>→</div>,
  }));
};

/**
 * Mock completo de todos los iconos de Material-UI
 * Útil cuando necesitas mockear múltiples iconos a la vez
 */
export const mockAllMaterialIcons = () => {
  vi.mock('@mui/icons-material', () => ({
    Menu: (props: SvgIconProps) => <svg data-testid='MenuIcon' {...props} />,
    NotificationsOutlined: (props: SvgIconProps) => (
      <svg data-testid='NotificationsIcon' {...props} />
    ),
    DoneAll: (props: SvgIconProps) => <svg data-testid='DoneAllIcon' {...props} />,
    DeleteSweepOutlined: (props: SvgIconProps) => <svg data-testid='DeleteSweepIcon' {...props} />,
    Home: () => <svg data-testid='HomeIcon' />,
    Book: () => <svg data-testid='BookIcon' />,
    People: () => <svg data-testid='PeopleIcon' />,
    CalendarMonth: () => <svg data-testid='CalendarMonthIcon' />,
    AccountCircle: (props: SvgIconProps) => <svg data-testid='AccountCircleIcon' {...props} />,
    Visibility: () => <div data-testid='visibility-icon'>Visibility</div>,
    VisibilityOff: () => <div data-testid='visibility-off-icon'>VisibilityOff</div>,
    ArrowForward: () => <div data-testid='arrow-forward-icon'>→</div>,
  }));
};

/**
 * Mock de iconos de navegación del Drawer
 */
export const mockDrawerNavigationIcons = () => {
  mockHomeIcon();
  mockBookIcon();
  mockPeopleIcon();
  mockCalendarMonthIcon();
};

/**
 * Mock de iconos de notificaciones
 */
export const mockNotificationIcons = () => {
  mockNotificationsIcon();
  mockDoneAllIcon();
  mockDeleteSweepIcon();
};
