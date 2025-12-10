import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Button from './Button';

describe('Componente Button', () => {
  it('Se renderiza correctamente con texto', () => {
    render(<Button text='Click me' />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('Se llama al handler de onClick cuando se hace clic', () => {
    const handleClick = vi.fn();
    render(<Button text='Click me' onClick={handleClick} />);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('Se renderiza con texto en mayúsculas cuando textUpperCase es true', () => {
    render(<Button text='Click me' textUpperCase />);
    const button = screen.getByText('Click me').closest('button');
    expect(button).toHaveStyle({ textTransform: 'uppercase' });
  });

  it('Se deshabilita cuando disabled es true', () => {
    render(<Button text='Click me' disabled />);
    const button = screen.getByText('Click me').closest('button');
    expect(button).toBeDisabled();
  });
});
