import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ActivityItem from './ActivityItem';

describe('Componente ActivityItem', () => {
  it('Se renderiza correctamente', () => {
    const props = {
      imageBadge: 'accion' as const,
      title: 'Test Activity',
      description: 'Test Description',
    };
    render(<ActivityItem {...props} />);
    expect(screen.getByText('Test Activity')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('Se renderiza correctamente el fondo para el badge de acción', () => {
    const props = {
      imageBadge: 'NEW_STUDENT' as const,
      title: 'Test Activity',
      description: 'Test Description',
    };
    const { container } = render(<ActivityItem {...props} />);
    // Check for the class that sets the background
    expect(container.querySelector('.bg-\\[\\#DCFCE7\\]')).toBeInTheDocument();
  });

  it('Se renderiza correctamente el fondo para el badge de recordatorio', () => {
    const props = {
      imageBadge: 'REMINDER' as const,
      title: 'Test Activity',
      description: 'Test Description',
    };
    const { container } = render(<ActivityItem {...props} />);
    expect(container.querySelector('.bg-\\[\\#FFEDD5\\]')).toBeInTheDocument();
  });
});
