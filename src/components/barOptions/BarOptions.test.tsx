import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import BarOptions from './barOptions';

describe('BarOptions', () => {
  describe('Rendering', () => {
    it('renders the title and description', () => {
      render(<BarOptions />);
      
      expect(screen.getByText('Busqueda de Estudiantes')).toBeInTheDocument();
      expect(screen.getByText('Encuentra y gestiona la información de los estudiantes')).toBeInTheDocument();
    });

    it('renders all buttons', () => {
      render(<BarOptions />);
      
      expect(screen.getByRole('button', { name: /añadir estudiante/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /filtros/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /exportar/i })).toBeInTheDocument();
    });

    it('renders search input field', () => {
      render(<BarOptions />);
      
      const searchInput = screen.getByPlaceholderText('Buscar por Nombre, ID o Curso');
      expect(searchInput).toBeInTheDocument();
    });

    it('renders icons in buttons', () => {
      render(<BarOptions />);
      
      const addButton = screen.getByRole('button', { name: /añadir estudiante/i });
      const filterButton = screen.getByRole('button', { name: /filtros/i });
      const exportButton = screen.getByRole('button', { name: /exportar/i });
      
      expect(addButton.querySelector('svg')).toBeInTheDocument();
      expect(filterButton.querySelector('svg')).toBeInTheDocument();
      expect(exportButton.querySelector('svg')).toBeInTheDocument();
    });

    it('renders search icon in input', () => {
      render(<BarOptions />);
      
      const searchInput = screen.getByPlaceholderText('Buscar por Nombre, ID o Curso');
      const inputContainer = searchInput.closest('.MuiTextField-root');
      
      expect(inputContainer?.querySelector('svg')).toBeInTheDocument();
    });
  });

  describe('Search functionality', () => {
    it('calls onSearch when typing in search field', () => {
      const mockOnSearch = vi.fn();
      render(<BarOptions onSearch={mockOnSearch} />);
      
      const searchInput = screen.getByPlaceholderText('Buscar por Nombre, ID o Curso');
      fireEvent.change(searchInput, { target: { value: 'Andrea' } });
      
      expect(mockOnSearch).toHaveBeenCalledWith('Andrea');
    });

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

    it('does not crash when onSearch is not provided', () => {
      render(<BarOptions />);
      
      const searchInput = screen.getByPlaceholderText('Buscar por Nombre, ID o Curso');
      
      expect(() => {
        fireEvent.change(searchInput, { target: { value: 'test' } });
      }).not.toThrow();
    });

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
    it('calls onAdd when clicking add student button', () => {
      const mockOnAdd = vi.fn();
      render(<BarOptions onAdd={mockOnAdd} />);
      
      const addButton = screen.getByRole('button', { name: /añadir estudiante/i });
      fireEvent.click(addButton);
      
      expect(mockOnAdd).toHaveBeenCalledTimes(1);
    });

    it('calls onFilter when clicking filter button', () => {
      const mockOnFilter = vi.fn();
      render(<BarOptions onFilter={mockOnFilter} />);
      
      const filterButton = screen.getByRole('button', { name: /filtros/i });
      fireEvent.click(filterButton);
      
      expect(mockOnFilter).toHaveBeenCalledTimes(1);
    });

    it('calls onExport when clicking export button', () => {
      const mockOnExport = vi.fn();
      render(<BarOptions onExport={mockOnExport} />);
      
      const exportButton = screen.getByRole('button', { name: /exportar/i });
      fireEvent.click(exportButton);
      
      expect(mockOnExport).toHaveBeenCalledTimes(1);
    });

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
      
      // Type in search
      const searchInput = screen.getByPlaceholderText('Buscar por Nombre, ID o Curso');
      fireEvent.change(searchInput, { target: { value: 'Andrea' } });
      
      // Click filter
      const filterButton = screen.getByRole('button', { name: /filtros/i });
      fireEvent.click(filterButton);
      
      // Click add
      const addButton = screen.getByRole('button', { name: /añadir estudiante/i });
      fireEvent.click(addButton);
      
      // Click export
      const exportButton = screen.getByRole('button', { name: /exportar/i });
      fireEvent.click(exportButton);
      
      expect(mockOnSearch).toHaveBeenCalledWith('Andrea');
      expect(mockOnAdd).toHaveBeenCalledTimes(1);
      expect(mockOnFilter).toHaveBeenCalledTimes(1);
      expect(mockOnExport).toHaveBeenCalledTimes(1);
    });
  });

  describe('Accessibility', () => {
    it('has accessible button labels', () => {
      render(<BarOptions />);
      
      expect(screen.getByRole('button', { name: /añadir estudiante/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /filtros/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /exportar/i })).toBeInTheDocument();
    });

    it('search input has placeholder text', () => {
      render(<BarOptions />);
      
      const searchInput = screen.getByPlaceholderText('Buscar por Nombre, ID o Curso');
      expect(searchInput).toBeInTheDocument();
    });
  });
});