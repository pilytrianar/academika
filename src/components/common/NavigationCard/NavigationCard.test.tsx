import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { mockArrowForwardIcon } from '@/test/mocks';
import NavigationCard from './NavigationCard';

// Mock de Material-UI
mockArrowForwardIcon();

describe('Componente NavigationCard', () => {
  it('Se renderiza correctamente', () => {
    const props = {
      image: 'asignaturas' as const,
      title: 'Nav Title',
      description: 'Nav Desc',
      btnText: 'Go',
      onClick: () => {},
    };
    render(<NavigationCard {...props} />);
    expect(screen.getByText('Nav Title')).toBeInTheDocument();
    expect(screen.getByText('Nav Desc')).toBeInTheDocument();
    expect(screen.getByText('Go')).toBeInTheDocument();
  });

  it('Se llama al handler de onClick cuando se hace clic en el botón', () => {
    const handleClick = vi.fn();
    const props = {
      image: 'estudiantes' as const,
      title: 'Nav Title',
      description: 'Nav Desc',
      btnText: 'Go',
      onClick: handleClick,
    };
    render(<NavigationCard {...props} />);
    fireEvent.click(screen.getByText('Go'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
