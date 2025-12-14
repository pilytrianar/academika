import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom/vitest';
import StudentHeader from './StudentHeader';

// Se simula el hook useRouter para controlar y verificar la navegación "back"
const mockBack = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    back: mockBack,
  }),
}));

describe('StudentHeader', () => {
  // Se limpia el mock para evitar interferencias entre tests
  beforeEach(() => {
    mockBack.mockClear();
  });

  // Verifica que el botón de "Volver" se renderiza correctamente
  it('renders the back button', () => {
    render(<StudentHeader />);

    const button = screen.getByRole('button', { name: /volver/i });
    expect(button).toBeInTheDocument();
  });

  // Comprueba que el texto "Volver" aparece en pantalla
  it('displays "Volver" text', () => {
    render(<StudentHeader />);

    expect(screen.getByText('Volver')).toBeInTheDocument();
  });

  // Verifica que al hacer clic en el botón se ejecuta router.back()
  it('calls router.back() when button is clicked', () => {
    render(<StudentHeader />);

    const button = screen.getByRole('button', { name: /volver/i });
    fireEvent.click(button);

    expect(mockBack).toHaveBeenCalledTimes(1);
  });

  // Comprueba que el ícono de "volver" (SVG) se renderiza en el componente
  it('renders the back icon', () => {
    const { container } = render(<StudentHeader />);

    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });
});
