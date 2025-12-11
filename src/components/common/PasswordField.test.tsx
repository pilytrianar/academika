import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { mockVisibilityIcons } from '@/test/mocks';
import PasswordField from './PasswordField';

// Mock de Material-UI
mockVisibilityIcons();

describe('Componente PasswordField', () => {
  it('Se renderiza correctamente', () => {
    render(<PasswordField />);
    expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
  });

  it('Se alternan los iconos de visibilidad', () => {
    render(<PasswordField />);
    const input = screen.getByLabelText(/Contraseña/i);
    expect(input).toHaveAttribute('type', 'password');

    const toggleButton = screen.getByRole('button');
    fireEvent.click(toggleButton);

    expect(input).toHaveAttribute('type', 'text');

    fireEvent.click(toggleButton);
    expect(input).toHaveAttribute('type', 'password');
  });
});
