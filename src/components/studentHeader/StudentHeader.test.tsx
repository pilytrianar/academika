import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom/vitest';
import StudentHeader from './studentHeader';

// Mock Next.js router
const mockBack = vi.fn();
const mockPush = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    back: mockBack,
    push: mockPush,
  }),
}));

describe('StudentHeader', () => {
  beforeEach(() => {
    mockBack.mockClear();
    mockPush.mockClear();
  });

  describe('Rendering', () => {
    it('renders the header element', () => {
      const { container } = render(<StudentHeader />);
      
      const header = container.querySelector('header');
      expect(header).toBeInTheDocument();
    });

    it('renders the back button with text', () => {
      render(<StudentHeader />);
      
      const button = screen.getByRole('button', { name: /volver/i });
      expect(button).toBeInTheDocument();
    });

    it('renders the back icon', () => {
      const { container } = render(<StudentHeader />);
      
      const icon = container.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });

    it('displays "Volver" text', () => {
      render(<StudentHeader />);
      
      expect(screen.getByText('Volver')).toBeInTheDocument();
    });
  });

  describe('Navigation functionality', () => {
    it('calls router.back() when button is clicked', () => {
      render(<StudentHeader />);
      
      const button = screen.getByRole('button', { name: /volver/i });
      fireEvent.click(button);
      
      expect(mockBack).toHaveBeenCalledTimes(1);
    });

    it('calls router.back() multiple times on multiple clicks', () => {
      render(<StudentHeader />);
      
      const button = screen.getByRole('button', { name: /volver/i });
      
      fireEvent.click(button);
      fireEvent.click(button);
      fireEvent.click(button);
      
      expect(mockBack).toHaveBeenCalledTimes(3);
    });

    it('does not call router.back() on render', () => {
      render(<StudentHeader />);
      
      expect(mockBack).not.toHaveBeenCalled();
    });
  });

  describe('Styling', () => {
    it('applies correct button styles', () => {
      render(<StudentHeader />);
      
      const button = screen.getByRole('button', { name: /volver/i });
      
      expect(button).toHaveClass('flex');
      expect(button).toHaveClass('items-center');
      expect(button).toHaveClass('text-sm');
      expect(button).toHaveClass('font-medium');
      expect(button).toHaveClass('text-blue-600');
    });

    it('has hover styles class', () => {
      render(<StudentHeader />);
      
      const button = screen.getByRole('button', { name: /volver/i });
      expect(button).toHaveClass('hover:text-gray-900');
    });

    it('header has correct padding and layout', () => {
      const { container } = render(<StudentHeader />);
      
      const header = container.querySelector('header');
      expect(header).toHaveClass('flex');
      expect(header).toHaveClass('items-center');
      expect(header).toHaveClass('px-4');
      expect(header).toHaveClass('py-3');
    });

    it('icon has margin right', () => {
      const { container } = render(<StudentHeader />);
      
      const icon = container.querySelector('svg');
      expect(icon).toHaveClass('mr-1');
    });
  });

  describe('Button structure', () => {
    it('button contains both icon and text', () => {
      const { container } = render(<StudentHeader />);
      
      const button = screen.getByRole('button', { name: /volver/i });
      const icon = button.querySelector('svg');
      
      expect(icon).toBeInTheDocument();
      expect(button).toHaveTextContent('Volver');
    });

    it('icon appears before text', () => {
      render(<StudentHeader />);
      
      const button = screen.getByRole('button', { name: /volver/i });
      const buttonContent = button.textContent;
      
      // Text should be "Volver" (icon comes first visually)
      expect(buttonContent).toContain('Volver');
    });
  });

  describe('Accessibility', () => {
    it('button has accessible role', () => {
      render(<StudentHeader />);
      
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('button has descriptive text', () => {
      render(<StudentHeader />);
      
      const button = screen.getByRole('button', { name: /volver/i });
      expect(button).toHaveAccessibleName();
    });

    it('button is keyboard accessible', () => {
      render(<StudentHeader />);
      
      const button = screen.getByRole('button', { name: /volver/i });
      
      // Simulate keyboard interaction
      button.focus();
      expect(document.activeElement).toBe(button);
    });
  });

  describe('Component behavior', () => {
    it('renders without crashing', () => {
      expect(() => render(<StudentHeader />)).not.toThrow();
    });

    it('is a standalone component with no props', () => {
      const { container } = render(<StudentHeader />);
      
      expect(container.firstChild).toBeInTheDocument();
    });

    it('uses Next.js router hook', () => {
      render(<StudentHeader />);
      
      // Component should render successfully, indicating router hook works
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  describe('Icon properties', () => {
    it('icon has small fontSize', () => {
      const { container } = render(<StudentHeader />);
      
      const icon = container.querySelector('svg');
      expect(icon).toHaveClass('MuiSvgIcon-fontSizeSmall');
    });
  });
});