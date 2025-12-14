import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import StudentTabs from './StudentTabs';

// Se mockean los tabs internos para aislar las pruebas del componente StudentTabs
// y centrarse únicamente en el comportamiento del menú de pestañas
vi.mock('../studentInformationTab/StudentInformationTab', () => ({
  default: () => <div data-testid='student-information-tab'>Student Information Content</div>,
}));

vi.mock('../academicReportTab/AcademicReportTab', () => ({
  default: () => <div data-testid='academic-report-tab'>Academic Report Content</div>,
}));

vi.mock('../disciplineNotesTab/DisciplineNotesTab', () => ({
  default: () => <div data-testid='discipline-notes-tab'>Discipline Notes Content</div>,
}));

describe('StudentTabs', () => {
  // Renderizado de pestañas

  describe('Tab rendering', () => {
    // Verifica que las tres pestañas principales se renderizan correctamente
    it('renders all three tabs', () => {
      render(<StudentTabs />);

      expect(screen.getByRole('tab', { name: /información/i })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: /reporte académico/i })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: /notas disciplinarias/i })).toBeInTheDocument();
    });
  });

  // Estado inicial
  describe('Default state', () => {
    // Comprueba que el contenido de la primera pestaña
    // se muestra por defecto al renderizar el componente
    it('shows first tab content by default', () => {
      render(<StudentTabs />);

      expect(screen.getByTestId('student-information-tab')).toBeInTheDocument();
      expect(screen.queryByTestId('academic-report-tab')).not.toBeInTheDocument();
      expect(screen.queryByTestId('discipline-notes-tab')).not.toBeInTheDocument();
    });

    // ✅ Prueba 3:
    // Verifica que la primera pestaña está seleccionada por defecto
    // usando el atributo de accesibilidad aria-selected
    it('first tab is selected by default', () => {
      render(<StudentTabs />);

      const infoTab = screen.getByRole('tab', { name: /información/i });
      expect(infoTab).toHaveAttribute('aria-selected', 'true');
    });
  });

  //Cambio de pestañas
  describe('Tab switching', () => {
    // Verifica que al hacer clic en la pestaña "Reporte Académico"
    // se renderiza su contenido correspondiente
    it('switches to academic report tab when clicked', () => {
      render(<StudentTabs />);

      const academicTab = screen.getByRole('tab', {
        name: /reporte académico/i,
      });
      fireEvent.click(academicTab);

      expect(screen.getByTestId('academic-report-tab')).toBeInTheDocument();
      expect(screen.queryByTestId('student-information-tab')).not.toBeInTheDocument();
    });

    // Verifica que al hacer clic en la pestaña "Notas Disciplinarias"
    // se renderiza su contenido
    it('switches to discipline notes tab when clicked', () => {
      render(<StudentTabs />);

      const disciplineTab = screen.getByRole('tab', {
        name: /notas disciplinarias/i,
      });
      fireEvent.click(disciplineTab);

      expect(screen.getByTestId('discipline-notes-tab')).toBeInTheDocument();
      expect(screen.queryByTestId('student-information-tab')).not.toBeInTheDocument();
    });

    // Comprueba que es posible volver a la pestaña de Información
    // después de haber cambiado a otra pestaña
    it('can switch back to information tab', () => {
      render(<StudentTabs />);

      fireEvent.click(screen.getByRole('tab', { name: /reporte académico/i }));
      expect(screen.getByTestId('academic-report-tab')).toBeInTheDocument();

      fireEvent.click(screen.getByRole('tab', { name: /información/i }));
      expect(screen.getByTestId('student-information-tab')).toBeInTheDocument();
      expect(screen.queryByTestId('academic-report-tab')).not.toBeInTheDocument();
    });
  });

  // Estado de selección

  describe('Tab selection state', () => {
    // Verifica que el atributo aria-selected
    // se actualiza correctamente al cambiar de pestaña
    it('updates aria-selected when switching tabs', () => {
      render(<StudentTabs />);

      const academicTab = screen.getByRole('tab', {
        name: /reporte académico/i,
      });
      fireEvent.click(academicTab);

      expect(academicTab).toHaveAttribute('aria-selected', 'true');
    });
  });

  // Estructura del componente

  describe('Component structure', () => {
    // ✅ Prueba 8:
    // Comprueba que el componente se renderiza dentro de un Card de MUI
    it('renders inside a Card', () => {
      const { container } = render(<StudentTabs />);

      const card = container.querySelector('.MuiCard-root');
      expect(card).toBeInTheDocument();
    });

    // Verifica que se renderiza un Divider entre las pestañas y el contenido
    it('renders a divider', () => {
      const { container } = render(<StudentTabs />);

      const divider = container.querySelector('.MuiDivider-root');
      expect(divider).toBeInTheDocument();
    });

    // Asegura que el componente se renderiza sin errores
    it('renders without crashing', () => {
      expect(() => render(<StudentTabs />)).not.toThrow();
    });
  });
});
