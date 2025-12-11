import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import StatusChip from './StatusChip';

describe('StatusChip', () => {
  describe('Rendering', () => {
    it('renders with Activo status', () => {
      render(<StatusChip status="Activo" />);
      
      expect(screen.getByText('Activo')).toBeInTheDocument();
    });

    it('renders with Inactivo status', () => {
      render(<StatusChip status="Inactivo" />);
      
      expect(screen.getByText('Inactivo')).toBeInTheDocument();
    });

    it('renders with Suspendido status', () => {
      render(<StatusChip status="Suspendido" />);
      
      expect(screen.getByText('Suspendido')).toBeInTheDocument();
    });
  });

  describe('Styling', () => {
    it('applies correct styles for Activo status', () => {
      const { container } = render(<StatusChip status="Activo" />);
      
      const chip = container.querySelector('.MuiChip-root');
      expect(chip).toHaveStyle({ backgroundColor: '#308a4e' });
      expect(chip).toHaveStyle({ color: '#FFFFFF' });
    });

    it('applies correct styles for Inactivo status', () => {
      const { container } = render(<StatusChip status="Inactivo" />);
      
      const chip = container.querySelector('.MuiChip-root');
      expect(chip).toHaveStyle({ backgroundColor: '#B91C1C' });
      expect(chip).toHaveStyle({ color: '#FFFFFF' });
    });

    it('applies correct styles for Suspendido status', () => {
      const { container } = render(<StatusChip status="Suspendido" />);
      
      const chip = container.querySelector('.MuiChip-root');
      expect(chip).toHaveStyle({ backgroundColor: '#ba6625' });
      expect(chip).toHaveStyle({ color: '#FFFFFF' });
    });

    it('applies common styles to all chips', () => {
      const { container } = render(<StatusChip status="Activo" />);
      
      const chip = container.querySelector('.MuiChip-root');
      expect(chip).toHaveStyle({ fontWeight: '700' });
      expect(chip).toHaveStyle({ height: '28px' });
      expect(chip).toHaveStyle({ borderRadius: '999px' });
      expect(chip).toHaveStyle({ fontSize: '0.75rem' });
    });
  });

  describe('Edge cases', () => {
    it('renders as a Chip component', () => {
      const { container } = render(<StatusChip status="Activo" />);
      
      const chip = container.querySelector('.MuiChip-root');
      expect(chip).toBeInTheDocument();
    });

    it('has small size attribute', () => {
      const { container } = render(<StatusChip status="Activo" />);
      
      const chip = container.querySelector('.MuiChip-sizeSmall');
      expect(chip).toBeInTheDocument();
    });
  });

  describe('Visual consistency', () => {
    it('maintains consistent height across all statuses', () => {
      const { container: container1 } = render(<StatusChip status="Activo" />);
      const { container: container2 } = render(<StatusChip status="Inactivo" />);
      const { container: container3 } = render(<StatusChip status="Suspendido" />);
      
      const chip1 = container1.querySelector('.MuiChip-root');
      const chip2 = container2.querySelector('.MuiChip-root');
      const chip3 = container3.querySelector('.MuiChip-root');
      
      expect(chip1).toHaveStyle({ height: '28px' });
      expect(chip2).toHaveStyle({ height: '28px' });
      expect(chip3).toHaveStyle({ height: '28px' });
    });

    it('uses white text color for all statuses', () => {
      const { container: container1 } = render(<StatusChip status="Activo" />);
      const { container: container2 } = render(<StatusChip status="Inactivo" />);
      const { container: container3 } = render(<StatusChip status="Suspendido" />);
      
      const chip1 = container1.querySelector('.MuiChip-root');
      const chip2 = container2.querySelector('.MuiChip-root');
      const chip3 = container3.querySelector('.MuiChip-root');
      
      expect(chip1).toHaveStyle({ color: '#FFFFFF' });
      expect(chip2).toHaveStyle({ color: '#FFFFFF' });
      expect(chip3).toHaveStyle({ color: '#FFFFFF' });
    });
  });

  describe('Color differentiation', () => {
    it('uses green background for Activo', () => {
      const { container } = render(<StatusChip status="Activo" />);
      const chip = container.querySelector('.MuiChip-root');
      expect(chip).toHaveStyle({ backgroundColor: '#308a4e' });
    });

    it('uses red background for Inactivo', () => {
      const { container } = render(<StatusChip status="Inactivo" />);
      const chip = container.querySelector('.MuiChip-root');
      expect(chip).toHaveStyle({ backgroundColor: '#B91C1C' });
    });

    it('uses orange background for Suspendido', () => {
      const { container } = render(<StatusChip status="Suspendido" />);
      const chip = container.querySelector('.MuiChip-root');
      expect(chip).toHaveStyle({ backgroundColor: '#ba6625' });
    });
  });

  describe('Accessibility', () => {
    it('displays readable status text', () => {
      render(<StatusChip status="Activo" />);
      
      const statusText = screen.getByText('Activo');
      expect(statusText).toBeVisible();
    });

    it('renders status text for all status types', () => {
      const { rerender } = render(<StatusChip status="Activo" />);
      expect(screen.getByText('Activo')).toBeInTheDocument();
      
      rerender(<StatusChip status="Inactivo" />);
      expect(screen.getByText('Inactivo')).toBeInTheDocument();
      
      rerender(<StatusChip status="Suspendido" />);
      expect(screen.getByText('Suspendido')).toBeInTheDocument();
    });
  });
});