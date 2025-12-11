import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import StudentTabs from './StudentTabs';

// Mock child components
vi.mock('../studentInformationTab/StudentInformationTab', () => ({
  default: () => <div data-testid="student-information-tab">Student Information Content</div>,
}));

vi.mock('../academicReportTab/AcademicReportTab', () => ({
  default: () => <div data-testid="academic-report-tab">Academic Report Content</div>,
}));

vi.mock('../disciplineNotesTab/DisciplineNotesTab', () => ({
  default: () => <div data-testid="discipline-notes-tab">Discipline Notes Content</div>,
}));

describe('StudentTabs', () => {
  describe('Tab rendering', () => {
    it('renders all three tabs', () => {
      render(<StudentTabs />);
      
      expect(screen.getByRole('tab', { name: /información/i })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: /reporte académico/i })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: /notas disciplinarias/i })).toBeInTheDocument();
    });
  });

  describe('Default state', () => {
    it('shows first tab content by default', () => {
      render(<StudentTabs />);
      
      expect(screen.getByTestId('student-information-tab')).toBeInTheDocument();
      expect(screen.queryByTestId('academic-report-tab')).not.toBeInTheDocument();
      expect(screen.queryByTestId('discipline-notes-tab')).not.toBeInTheDocument();
    });

    it('first tab is selected by default', () => {
      render(<StudentTabs />);
      
      const infoTab = screen.getByRole('tab', { name: /información/i });
      expect(infoTab).toHaveAttribute('aria-selected', 'true');
    });
  });

  describe('Tab switching', () => {
    it('switches to academic report tab when clicked', () => {
      render(<StudentTabs />);
      
      const academicTab = screen.getByRole('tab', { name: /reporte académico/i });
      fireEvent.click(academicTab);
      
      expect(screen.getByTestId('academic-report-tab')).toBeInTheDocument();
      expect(screen.queryByTestId('student-information-tab')).not.toBeInTheDocument();
    });

    it('switches to discipline notes tab when clicked', () => {
      render(<StudentTabs />);
      
      const disciplineTab = screen.getByRole('tab', { name: /notas disciplinarias/i });
      fireEvent.click(disciplineTab);
      
      expect(screen.getByTestId('discipline-notes-tab')).toBeInTheDocument();
      expect(screen.queryByTestId('student-information-tab')).not.toBeInTheDocument();
    });

    it('can switch back to information tab', () => {
      render(<StudentTabs />);
      
      // Switch to academic tab
      fireEvent.click(screen.getByRole('tab', { name: /reporte académico/i }));
      expect(screen.getByTestId('academic-report-tab')).toBeInTheDocument();
      
      // Switch back to information tab
      fireEvent.click(screen.getByRole('tab', { name: /información/i }));
      expect(screen.getByTestId('student-information-tab')).toBeInTheDocument();
      expect(screen.queryByTestId('academic-report-tab')).not.toBeInTheDocument();
    });
  });

  describe('Tab selection state', () => {
    it('updates aria-selected when switching tabs', () => {
      render(<StudentTabs />);
      
      const academicTab = screen.getByRole('tab', { name: /reporte académico/i });
      fireEvent.click(academicTab);
      
      expect(academicTab).toHaveAttribute('aria-selected', 'true');
    });
  });

  describe('Component structure', () => {
    it('renders inside a Card', () => {
      const { container } = render(<StudentTabs />);
      
      const card = container.querySelector('.MuiCard-root');
      expect(card).toBeInTheDocument();
    });

    it('renders a divider', () => {
      const { container } = render(<StudentTabs />);
      
      const divider = container.querySelector('.MuiDivider-root');
      expect(divider).toBeInTheDocument();
    });

    it('renders without crashing', () => {
      expect(() => render(<StudentTabs />)).not.toThrow();
    });
  });
});