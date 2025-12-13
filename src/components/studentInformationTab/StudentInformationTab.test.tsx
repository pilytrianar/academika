import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import StudentInformationTab from './StudentInformationTab';

describe('StudentInformationTab', () => {
  describe('Section headers', () => {
    it('renders all section titles', () => {
      render(<StudentInformationTab />);

      expect(screen.getByText('Datos Personales')).toBeInTheDocument();
      expect(screen.getByText('Información de Contacto')).toBeInTheDocument();
      expect(screen.getByText('Datos de los Padres/Tutores')).toBeInTheDocument();
    });
  });

  describe('Personal data section', () => {
    it('displays birth date', () => {
      render(<StudentInformationTab />);

      expect(screen.getByText('Fecha de Nacimiento:')).toBeInTheDocument();
      expect(screen.getByText('15 de Mayo, 2008')).toBeInTheDocument();
    });

    it('displays student ID', () => {
      render(<StudentInformationTab />);

      expect(screen.getByText('ID de Estudiante:')).toBeInTheDocument();
      expect(screen.getByText('12345')).toBeInTheDocument();
    });

    it('displays address', () => {
      render(<StudentInformationTab />);

      expect(screen.getByText('Dirección:')).toBeInTheDocument();
      expect(screen.getByText('Av. Calle 127 # 12 - 19, Bogotá')).toBeInTheDocument();
    });
  });

  describe('Contact information section', () => {
    it('displays student email', () => {
      render(<StudentInformationTab />);

      expect(screen.getByText('Email del Estudiante:')).toBeInTheDocument();
      expect(screen.getByText('joan.romero@academika.com')).toBeInTheDocument();
    });

    it('displays phone number', () => {
      render(<StudentInformationTab />);

      expect(screen.getByText('Teléfono:')).toBeInTheDocument();
      expect(screen.getByText('3122334455')).toBeInTheDocument();
    });
  });

  describe('Parent/Guardian section', () => {
    it('displays guardian name', () => {
      render(<StudentInformationTab />);

      expect(screen.getByText('Nombre del Tutor:')).toBeInTheDocument();
      expect(screen.getByText('Elon Musk')).toBeInTheDocument();
    });

    it('displays guardian phone', () => {
      render(<StudentInformationTab />);

      expect(screen.getByText('Teléfono del Contacto:')).toBeInTheDocument();
      expect(screen.getByText('3145677880')).toBeInTheDocument();
    });

    it('displays guardian email', () => {
      render(<StudentInformationTab />);

      expect(screen.getByText(/^Email:$/)).toBeInTheDocument();
      expect(screen.getByText('elon.musk@academika.com')).toBeInTheDocument();
    });
  });

  describe('Dividers', () => {
    it('renders dividers between sections', () => {
      const { container } = render(<StudentInformationTab />);

      const dividers = container.querySelectorAll('.MuiDivider-root');
      expect(dividers).toHaveLength(2);
    });
  });

  describe('Component structure', () => {
    it('renders without crashing', () => {
      expect(() => render(<StudentInformationTab />)).not.toThrow();
    });

    it('contains three sections', () => {
      const { container } = render(<StudentInformationTab />);

      const sections = container.querySelectorAll('section');
      expect(sections).toHaveLength(3);
    });
  });
});
