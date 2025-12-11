import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import StudentSidebar from './StudentSidebar';

// Mock Next.js Image component
vi.mock('next/image', () => ({
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

describe('StudentSidebar', () => {
  describe('Student information', () => {
    it('displays student name', () => {
      render(<StudentSidebar />);
      
      expect(screen.getByText('Joan Romero')).toBeInTheDocument();
    });

    it('displays student course', () => {
      render(<StudentSidebar />);
      
      expect(screen.getByText('Curso: 7° Grado')).toBeInTheDocument();
    });

    it('displays student age', () => {
      render(<StudentSidebar />);
      
      expect(screen.getByText('Edad: 16 años')).toBeInTheDocument();
    });
  });

  describe('Avatar image', () => {
    it('renders student avatar', () => {
      render(<StudentSidebar />);
      
      const avatar = screen.getByAltText('Avatar');
      expect(avatar).toBeInTheDocument();
    });

    it('avatar has correct source', () => {
      render(<StudentSidebar />);
      
      const avatar = screen.getByAltText('Avatar');
      expect(avatar).toHaveAttribute('src', '/img/userIcon.png');
    });

    it('avatar has rounded style', () => {
      render(<StudentSidebar />);
      
      const avatar = screen.getByAltText('Avatar');
      expect(avatar).toHaveClass('rounded-full');
    });
  });

  describe('Contact button', () => {
    it('renders contact button', () => {
      render(<StudentSidebar />);
      
      const button = screen.getByRole('button', { name: /contactar/i });
      expect(button).toBeInTheDocument();
    });

    it('contact button is full width', () => {
      render(<StudentSidebar />);
      
      const button = screen.getByRole('button', { name: /contactar/i });
      expect(button).toHaveClass('MuiButton-fullWidth');
    });
  });

  describe('Component structure', () => {
    it('renders inside a Card', () => {
      const { container } = render(<StudentSidebar />);
      
      const card = container.querySelector('.MuiCard-root');
      expect(card).toBeInTheDocument();
    });

    it('renders without crashing', () => {
      expect(() => render(<StudentSidebar />)).not.toThrow();
    });
  });
});