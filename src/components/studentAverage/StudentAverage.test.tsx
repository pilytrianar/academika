import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import StudentAverage from './StudentAverage';

describe('StudentAverage', () => {
  describe('Rendering', () => {
    it('renders the title', () => {
      render(<StudentAverage />);
      
      expect(screen.getByText('Promedio General')).toBeInTheDocument();
    });

    it('renders the average score', () => {
      render(<StudentAverage />);
      
      expect(screen.getByText('8.9/10')).toBeInTheDocument();
    });

    it('renders inside a Card component', () => {
      const { container } = render(<StudentAverage />);
      
      const card = container.querySelector('.MuiCard-root');
      expect(card).toBeInTheDocument();
    });
  });

  describe('Progress bar', () => {
    it('renders a progress bar', () => {
      const { container } = render(<StudentAverage />);
      
      // Find the background bar
      const progressBg = container.querySelector('.bg-gray-200');
      expect(progressBg).toBeInTheDocument();
    });

    it('renders progress bar with correct width', () => {
      const { container } = render(<StudentAverage />);
      
      // Find the filled portion of the progress bar
      const progressFill = container.querySelector('.bg-blue-600');
      expect(progressFill).toHaveStyle({ width: '89%' });
    });

    it('progress bar has correct height', () => {
      const { container } = render(<StudentAverage />);
      
      const progressBg = container.querySelector('.h-2.bg-gray-200');
      const progressFill = container.querySelector('.h-2.bg-blue-600');
      
      expect(progressBg).toBeInTheDocument();
      expect(progressFill).toBeInTheDocument();
    });

    it('progress bar has rounded corners', () => {
      const { container } = render(<StudentAverage />);
      
      const progressBg = container.querySelector('.rounded-full.bg-gray-200');
      const progressFill = container.querySelector('.rounded-full.bg-blue-600');
      
      expect(progressBg).toBeInTheDocument();
      expect(progressFill).toBeInTheDocument();
    });
  });

  describe('Styling', () => {
    it('applies correct text color to title', () => {
      const { container } = render(<StudentAverage />);
      
      const title = container.querySelector('.text-black');
      expect(title).toHaveTextContent('Promedio General');
    });

    it('applies correct styling to average score', () => {
      const { container } = render(<StudentAverage />);
      
      const score = container.querySelector('.text-3xl.font-bold.text-blue-600');
      expect(score).toHaveTextContent('8.9/10');
    });

    it('card has padding', () => {
      const { container } = render(<StudentAverage />);
      
      const card = container.querySelector('.p-6');
      expect(card).toBeInTheDocument();
    });
  });

  describe('Layout', () => {
    it('title has bottom margin', () => {
      const { container } = render(<StudentAverage />);
      
      const title = container.querySelector('.mb-2');
      expect(title).toHaveTextContent('Promedio General');
    });

    it('progress bar has top margin', () => {
      const { container } = render(<StudentAverage />);
      
      const progressContainer = container.querySelector('.mt-4');
      expect(progressContainer).toBeInTheDocument();
    });

    it('progress bar spans full width', () => {
      const { container } = render(<StudentAverage />);
      
      const progressBg = container.querySelector('.w-full.bg-gray-200');
      expect(progressBg).toBeInTheDocument();
    });
  });

  describe('Visual hierarchy', () => {
    it('renders all elements in correct order', () => {
      const { container } = render(<StudentAverage />);
      
      const elements = container.querySelectorAll('p, div');
      
      // Should have: title (p), score (p), progress background (div), progress fill (div)
      expect(elements.length).toBeGreaterThanOrEqual(4);
    });

    it('score is visually prominent with large text', () => {
      render(<StudentAverage />);
      
      const score = screen.getByText('8.9/10');
      expect(score).toHaveClass('text-3xl');
      expect(score).toHaveClass('font-bold');
    });
  });

  describe('Accessibility', () => {
    it('displays clear numerical score', () => {
      render(<StudentAverage />);
      
      const score = screen.getByText('8.9/10');
      expect(score).toBeVisible();
    });

    it('has descriptive title', () => {
      render(<StudentAverage />);
      
      const title = screen.getByText('Promedio General');
      expect(title).toBeVisible();
    });
  });

  describe('Component structure', () => {
    it('renders without crashing', () => {
      expect(() => render(<StudentAverage />)).not.toThrow();
    });

    it('is a self-contained component with no props', () => {
      const { container } = render(<StudentAverage />);
      
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});