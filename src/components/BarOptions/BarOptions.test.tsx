import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import BarOptions from './BarOptions';

describe('BarOptions', () => {
  describe('Rendering', () => {
    // Verifica que se rendericen el título y la descripción
    it('renders the title and description', () => {
      render(<BarOptions />);

      expect(screen.getByText('Busqueda de Estudiantes')).toBeInTheDocument();
      expect(
        screen.getByText('Encuentra y gestiona la información de los estudiantes')
      ).toBeInTheDocument();
    });

    // Verifica que se rendericen todos los botones
    it('renders all buttons', () => {
      render(<BarOptions />);

      expect(screen.getByRole('button', { name: /añadir estudiante/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /filtros/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /exportar/i })).toBeInTheDocument();
    });

    // Verifica que se renderice el campo de búsqueda
    it('renders search input field', () => {
      render(<BarOptions />);

      const searchInput = screen.getByPlaceholderText('Buscar por Nombre, ID o Curso');
      expect(searchInput).toBeInTheDocument();
    });

    // Verifica que los botones tengan sus íconos
    it('renders icons in buttons', () => {
      render(<BarOptions />);

      const addButton = screen.getByRole('button', { name: /añadir estudiante/i });
      const filterButton = screen.getByRole('button', { name: /filtros/i });
      const exportButton = screen.getByRole('button', { name: /exportar/i });

      expect(addButton.querySelector('svg')).toBeInTheDocument();
      expect(filterButton.querySelector('svg')).toBeInTheDocument();
      expect(exportButton.querySelector('svg')).toBeInTheDocument();
    });

    // Verifica que el input de búsqueda tenga su ícono
    it('renders search icon in input', () => {
      render(<BarOptions />);

      const searchInput = screen.getByPlaceholderText('Buscar por Nombre, ID o Curso');
      const inputContainer = searchInput.closest('.MuiTextField-root');

      expect(inputContainer?.querySelector('svg')).toBeInTheDocument();
    });
  });

  describe('Search functionality', () => {
    // Verifica que onSearch se llame al escribir en el campo de búsqueda
    it('calls onSearch when typing in search field', () => {
      const mockOnSearch = vi.fn();
      render(<BarOptions onSearch={mockOnSearch} />);

      const searchInput = screen.getByPlaceholderText('Buscar por Nombre, ID o Curso');
      fireEvent.change(searchInput, { target: { value: 'Andrea' } });

      expect(mockOnSearch).toHaveBeenCalledWith('Andrea');
    });

    // Verifica que onSearch se llame múltiples veces mientras el usuario escribe
    it('calls onSearch multiple times as user types', () => {
      const mockOnSearch = vi.fn();
      render(<BarOptions onSearch={mockOnSearch} />);

      const searchInput = screen.getByPlaceholderText('Buscar por Nombre, ID o Curso');

      fireEvent.change(searchInput, { target: { value: 'A' } });
      fireEvent.change(searchInput, { target: { value: 'An' } });
      fireEvent.change(searchInput, { target: { value: 'And' } });

      expect(mockOnSearch).toHaveBeenCalledTimes(3);
      expect(mockOnSearch).toHaveBeenLastCalledWith('And');
    });

    // Verifica que no crashee cuando onSearch no está definido
    it('does not crash when onSearch is not provided', () => {
      render(<BarOptions />);

      const searchInput = screen.getByPlaceholderText('Buscar por Nombre, ID o Curso');

      expect(() => {
        fireEvent.change(searchInput, { target: { value: 'test' } });
      }).not.toThrow();
    });

    // Verifica que onSearch se llame con string vacío al limpiar el input
    it('calls onSearch with empty string when clearing input', () => {
      const mockOnSearch = vi.fn();
      render(<BarOptions onSearch={mockOnSearch} />);

      const searchInput = screen.getByPlaceholderText('Buscar por Nombre, ID o Curso');

      fireEvent.change(searchInput, { target: { value: 'Andrea' } });
      fireEvent.change(searchInput, { target: { value: '' } });

      expect(mockOnSearch).toHaveBeenLastCalledWith('');
    });
  });

  describe('Button interactions', () => {
    // Verifica que onAdd se llame al hacer clic en el botón de añadir estudiante
    it('calls onAdd when clicking add student button', () => {
      const mockOnAdd = vi.fn();
      render(<BarOptions onAdd={mockOnAdd} />);

      const addButton = screen.getByRole('button', { name: /añadir estudiante/i });
      fireEvent.click(addButton);

      expect(mockOnAdd).toHaveBeenCalledTimes(1);
    });

    // Verifica que onFilter se llame al hacer clic en el botón de filtros
    it('calls onFilter when clicking filter button', () => {
      const mockOnFilter = vi.fn();
      render(<BarOptions onFilter={mockOnFilter} />);

      const filterButton = screen.getByRole('button', { name: /filtros/i });
      fireEvent.click(filterButton);

      expect(mockOnFilter).toHaveBeenCalledTimes(1);
    });

    // Verifica que onExport se llame al hacer clic en el botón de exportar
    it('calls onExport when clicking export button', () => {
      const mockOnExport = vi.fn();
      render(<BarOptions onExport={mockOnExport} />);

      const exportButton = screen.getByRole('button', { name: /exportar/i });
      fireEvent.click(exportButton);

      expect(mockOnExport).toHaveBeenCalledTimes(1);
    });

    // Verifica que no crashee cuando los callbacks de los botones no están definidos
    it('does not crash when button callbacks are not provided', () => {
      render(<BarOptions />);

      const addButton = screen.getByRole('button', { name: /añadir estudiante/i });
      const filterButton = screen.getByRole('button', { name: /filtros/i });
      const exportButton = screen.getByRole('button', { name: /exportar/i });

      expect(() => {
        fireEvent.click(addButton);
        fireEvent.click(filterButton);
        fireEvent.click(exportButton);
      }).not.toThrow();
    });

    // Verifica que los botones puedan ser clickeados múltiples veces
    it('can click buttons multiple times', () => {
      const mockOnAdd = vi.fn();
      const mockOnFilter = vi.fn();
      const mockOnExport = vi.fn();

      render(<BarOptions onAdd={mockOnAdd} onFilter={mockOnFilter} onExport={mockOnExport} />);

      const addButton = screen.getByRole('button', { name: /añadir estudiante/i });
      const filterButton = screen.getByRole('button', { name: /filtros/i });
      const exportButton = screen.getByRole('button', { name: /exportar/i });

      fireEvent.click(addButton);
      fireEvent.click(addButton);
      fireEvent.click(filterButton);
      fireEvent.click(exportButton);

      expect(mockOnAdd).toHaveBeenCalledTimes(2);
      expect(mockOnFilter).toHaveBeenCalledTimes(1);
      expect(mockOnExport).toHaveBeenCalledTimes(1);
    });
  });

  describe('Integration scenarios', () => {
    // Verifica que todos los callbacks funcionen juntos correctamente
    it('handles all callbacks working together', () => {
      const mockOnSearch = vi.fn();
      const mockOnAdd = vi.fn();
      const mockOnFilter = vi.fn();
      const mockOnExport = vi.fn();

      render(
        <BarOptions
          onSearch={mockOnSearch}
          onAdd={mockOnAdd}
          onFilter={mockOnFilter}
          onExport={mockOnExport}
        />
      );

      // Escribir en el campo de búsqueda
      const searchInput = screen.getByPlaceholderText('Buscar por Nombre, ID o Curso');
      fireEvent.change(searchInput, { target: { value: 'Andrea' } });

      // Hacer clic en filtros
      const filterButton = screen.getByRole('button', { name: /filtros/i });
      fireEvent.click(filterButton);

      // Hacer clic en añadir
      const addButton = screen.getByRole('button', { name: /añadir estudiante/i });
      fireEvent.click(addButton);

      // Hacer clic en exportar
      const exportButton = screen.getByRole('button', { name: /exportar/i });
      fireEvent.click(exportButton);

      expect(mockOnSearch).toHaveBeenCalledWith('Andrea');
      expect(mockOnAdd).toHaveBeenCalledTimes(1);
      expect(mockOnFilter).toHaveBeenCalledTimes(1);
      expect(mockOnExport).toHaveBeenCalledTimes(1);
    });
  });

  describe('Accessibility', () => {
    // Verifica que los botones tengan etiquetas accesibles
    it('has accessible button labels', () => {
      render(<BarOptions />);

      expect(screen.getByRole('button', { name: /añadir estudiante/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /filtros/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /exportar/i })).toBeInTheDocument();
    });

    // Verifica que el input de búsqueda tenga texto placeholder
    it('search input has placeholder text', () => {
      render(<BarOptions />);

      const searchInput = screen.getByPlaceholderText('Buscar por Nombre, ID o Curso');
      expect(searchInput).toBeInTheDocument();
    });
  });
});
