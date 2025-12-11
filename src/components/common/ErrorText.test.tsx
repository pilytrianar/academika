import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ErrorText from './ErrorText';

describe('Componente ErrorText', () => {
  it('renderiza el mensaje de error cuando el campo ha sido tocado y hay un error', () => {
    const props = {
      name: 'email',
      touched: { email: true },
      errors: { email: 'Invalid email' },
    } as const;
    render(<ErrorText {...props} />);
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
  });

  it('no renderiza nada cuando el campo no ha sido tocado', () => {
    const props = {
      name: 'email',
      touched: { email: false },
      errors: { email: 'Invalid email' },
    } as const;
    const { container } = render(<ErrorText {...props} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('no renderiza nada cuando no hay un error', () => {
    const props = {
      name: 'email',
      touched: { email: true },
      errors: {},
    } as const;
    const { container } = render(<ErrorText {...props} />);
    expect(container).toBeEmptyDOMElement();
  });
});
