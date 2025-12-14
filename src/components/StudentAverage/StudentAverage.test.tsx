import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import StudentAverage from './StudentAverage';

describe('StudentAverage', () => {
  // Verifica que se renderice el título "Promedio General"
  it('renders the title', () => {
    render(<StudentAverage />);

    expect(screen.getByText('Promedio General')).toBeInTheDocument();
  });

  // Verifica que se muestre un promedio en formato X/10 (número aleatorio entre 6-10)
  it('displays an average score', () => {
    render(<StudentAverage />);

    expect(screen.getByText(/\d+(\.\d+)?\/10/)).toBeInTheDocument();
  });

  // Verifica que se renderice una barra de progreso con fondo gris y relleno azul
  it('renders a progress bar', () => {
    const { container } = render(<StudentAverage />);

    const progressBg = container.querySelector('.bg-gray-200');
    const progressFill = container.querySelector('.bg-blue-600');

    expect(progressBg).toBeInTheDocument();
    expect(progressFill).toBeInTheDocument();
  });

  // Verifica que se renderice dentro de un componente Card de MUI
  it('renders inside a Card', () => {
    const { container } = render(<StudentAverage />);

    const card = container.querySelector('.MuiCard-root');
    expect(card).toBeInTheDocument();
  });
});
