import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Card from './Card';

describe('Componente Card', () => {
  it('Se renderiza correctamente con props por defecto', () => {
    render(<Card title='Title' description='Description' />);
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
  });

  it('Se renderiza correctamente con props proporcionados', () => {
    render(<Card title='Custom Title' description='Custom Desc' />);
    expect(screen.getByText('Custom Title')).toBeInTheDocument();
    expect(screen.getByText('Custom Desc')).toBeInTheDocument();
  });

  it('Se llama al handler de onClick cuando se hace clic en el botón', () => {
    const handleClick = vi.fn();
    render(<Card title='Test' description='Desc' onClick={handleClick} />);
    fireEvent.click(screen.getByText('Ver Detalles'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
