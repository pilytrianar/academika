import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ErrorText from './ErrorText';

describe('ErrorText Component', () => {
  it('renders error message when touched and error exists', () => {
    const props = {
      name: 'email',
      touched: { email: true },
      errors: { email: 'Invalid email' },
    } as const;
    render(<ErrorText {...props} />);
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
  });

  it('does not render when not touched', () => {
    const props = {
      name: 'email',
      touched: { email: false },
      errors: { email: 'Invalid email' },
    } as const;
    const { container } = render(<ErrorText {...props} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('does not render when there is no error', () => {
    const props = {
      name: 'email',
      touched: { email: true },
      errors: {},
    } as const;
    const { container } = render(<ErrorText {...props} />);
    expect(container).toBeEmptyDOMElement();
  });
});
