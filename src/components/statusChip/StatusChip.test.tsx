import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import StatusChip from './StatusChip';

describe('StatusChip', () => {
  describe('Rendering', () => {
    // Verifica que se renderice con el estado Activo
    it('renders with Activo status', () => {
      render(<StatusChip status='Activo' />);

      expect(screen.getByText('Activo')).toBeInTheDocument();
    });

    // Verifica que se renderice con el estado Inactivo
    it('renders with Inactivo status', () => {
      render(<StatusChip status='Inactivo' />);

      expect(screen.getByText('Inactivo')).toBeInTheDocument();
    });

    // Verifica que se renderice con el estado Suspendido
    it('renders with Suspendido status', () => {
      render(<StatusChip status='Suspendido' />);

      expect(screen.getByText('Suspendido')).toBeInTheDocument();
    });
  });

  describe('Styling', () => {
    // Verifica que aplique los estilos correctos para el estado Activo (verde)
    it('applies correct styles for Activo status', () => {
      const { container } = render(<StatusChip status='Activo' />);

      const chip = container.querySelector('.MuiChip-root');
      expect(chip).toHaveStyle({ backgroundColor: '#308a4e' });
      expect(chip).toHaveStyle({ color: '#FFFFFF' });
    });

    // Verifica que aplique los estilos correctos para el estado Inactivo (rojo)
    it('applies correct styles for Inactivo status', () => {
      const { container } = render(<StatusChip status='Inactivo' />);

      const chip = container.querySelector('.MuiChip-root');
      expect(chip).toHaveStyle({ backgroundColor: '#B91C1C' });
      expect(chip).toHaveStyle({ color: '#FFFFFF' });
    });

    // Verifica que aplique los estilos correctos para el estado Suspendido (naranja)
    it('applies correct styles for Suspendido status', () => {
      const { container } = render(<StatusChip status='Suspendido' />);

      const chip = container.querySelector('.MuiChip-root');
      expect(chip).toHaveStyle({ backgroundColor: '#ba6625' });
      expect(chip).toHaveStyle({ color: '#FFFFFF' });
    });

    // Verifica que aplique estilos comunes a todos los chips
    it('applies common styles to all chips', () => {
      const { container } = render(<StatusChip status='Activo' />);

      const chip = container.querySelector('.MuiChip-root');
      expect(chip).toHaveStyle({ fontWeight: '700' });
      expect(chip).toHaveStyle({ height: '28px' });
      expect(chip).toHaveStyle({ borderRadius: '999px' });
      expect(chip).toHaveStyle({ fontSize: '0.75rem' });
    });
  });

  describe('Edge cases', () => {
    // Verifica que se renderice como un componente Chip de MUI
    it('renders as a Chip component', () => {
      const { container } = render(<StatusChip status='Activo' />);

      const chip = container.querySelector('.MuiChip-root');
      expect(chip).toBeInTheDocument();
    });

    // Verifica que tenga el atributo de tamaño pequeño
    it('has small size attribute', () => {
      const { container } = render(<StatusChip status='Activo' />);

      const chip = container.querySelector('.MuiChip-sizeSmall');
      expect(chip).toBeInTheDocument();
    });
  });

  describe('Visual consistency', () => {
    // Verifica que mantenga una altura consistente para todos los estados
    it('maintains consistent height across all statuses', () => {
      const { container: container1 } = render(<StatusChip status='Activo' />);
      const { container: container2 } = render(<StatusChip status='Inactivo' />);
      const { container: container3 } = render(<StatusChip status='Suspendido' />);

      const chip1 = container1.querySelector('.MuiChip-root');
      const chip2 = container2.querySelector('.MuiChip-root');
      const chip3 = container3.querySelector('.MuiChip-root');

      expect(chip1).toHaveStyle({ height: '28px' });
      expect(chip2).toHaveStyle({ height: '28px' });
      expect(chip3).toHaveStyle({ height: '28px' });
    });

    // Verifica que use color de texto blanco para todos los estados
    it('uses white text color for all statuses', () => {
      const { container: container1 } = render(<StatusChip status='Activo' />);
      const { container: container2 } = render(<StatusChip status='Inactivo' />);
      const { container: container3 } = render(<StatusChip status='Suspendido' />);

      const chip1 = container1.querySelector('.MuiChip-root');
      const chip2 = container2.querySelector('.MuiChip-root');
      const chip3 = container3.querySelector('.MuiChip-root');

      expect(chip1).toHaveStyle({ color: '#FFFFFF' });
      expect(chip2).toHaveStyle({ color: '#FFFFFF' });
      expect(chip3).toHaveStyle({ color: '#FFFFFF' });
    });
  });

  describe('Color differentiation', () => {
    // Verifica que use fondo verde para Activo
    it('uses green background for Activo', () => {
      const { container } = render(<StatusChip status='Activo' />);
      const chip = container.querySelector('.MuiChip-root');
      expect(chip).toHaveStyle({ backgroundColor: '#308a4e' });
    });

    // Verifica que use fondo rojo para Inactivo
    it('uses red background for Inactivo', () => {
      const { container } = render(<StatusChip status='Inactivo' />);
      const chip = container.querySelector('.MuiChip-root');
      expect(chip).toHaveStyle({ backgroundColor: '#B91C1C' });
    });

    // Verifica que use fondo naranja para Suspendido
    it('uses orange background for Suspendido', () => {
      const { container } = render(<StatusChip status='Suspendido' />);
      const chip = container.querySelector('.MuiChip-root');
      expect(chip).toHaveStyle({ backgroundColor: '#ba6625' });
    });
  });

  describe('Accessibility', () => {
    // Verifica que muestre texto legible del estado
    it('displays readable status text', () => {
      render(<StatusChip status='Activo' />);

      const statusText = screen.getByText('Activo');
      expect(statusText).toBeVisible();
    });

    // Verifica que renderice el texto del estado para todos los tipos
    it('renders status text for all status types', () => {
      const { rerender } = render(<StatusChip status='Activo' />);
      expect(screen.getByText('Activo')).toBeInTheDocument();

      rerender(<StatusChip status='Inactivo' />);
      expect(screen.getByText('Inactivo')).toBeInTheDocument();

      rerender(<StatusChip status='Suspendido' />);
      expect(screen.getByText('Suspendido')).toBeInTheDocument();
    });
  });
});
