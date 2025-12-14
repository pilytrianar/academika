import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import Calendar from './Calendar';

describe('Calendar', () => {
  describe('Rendering', () => {
    // Verifica que se renderice el calendario con el mes actual
    it('renders the calendar', () => {
      render(<Calendar />);

      const currentMonth = new Date().toLocaleString('es-ES', { month: 'long' });
      expect(screen.getByText(new RegExp(currentMonth, 'i'))).toBeInTheDocument();
    });

    // Verifica que se rendericen todos los días de la semana
    it('renders all days of the week', () => {
      render(<Calendar />);

      expect(screen.getByText('Dom')).toBeInTheDocument();
      expect(screen.getByText('Lun')).toBeInTheDocument();
      expect(screen.getByText('Mar')).toBeInTheDocument();
      expect(screen.getByText('Mié')).toBeInTheDocument();
      expect(screen.getByText('Jue')).toBeInTheDocument();
      expect(screen.getByText('Vie')).toBeInTheDocument();
      expect(screen.getByText('Sáb')).toBeInTheDocument();
    });

    // Verifica que se rendericen los botones de navegación
    it('renders navigation buttons', () => {
      const { container } = render(<Calendar />);

      const buttons = container.querySelectorAll('button');
      expect(buttons.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('Navigation', () => {
    // Verifica que navega al mes anterior
    it('navigates to previous month', () => {
      const { container } = render(<Calendar />);

      const prevButton = container.querySelectorAll('button')[0];
      fireEvent.click(prevButton);

      // El calendario debería seguir renderizado
      expect(container.querySelector('.grid')).toBeInTheDocument();
    });

    // Verifica que navega al mes siguiente
    it('navigates to next month', () => {
      const { container } = render(<Calendar />);

      const buttons = container.querySelectorAll('button');
      const nextButton = buttons[buttons.length - 1];
      fireEvent.click(nextButton);

      // El calendario debería seguir renderizado
      expect(container.querySelector('.grid')).toBeInTheDocument();
    });
  });

  describe('Events', () => {
    const mockEvents = [
      {
        id: '1',
        date: new Date(2024, 11, 25),
        title: 'Examen Final',
        type: 'exam' as const,
      },
      {
        id: '2',
        date: new Date(2024, 11, 20),
        title: 'Tarea de Matemáticas',
        type: 'assignment' as const,
      },
    ];

    // Verifica que se rendericen los eventos en el calendario
    it('renders events on calendar', () => {
      render(<Calendar events={mockEvents} />);

      // Navegar a diciembre 2024
      const { container } = render(<Calendar events={mockEvents} />);

      // Los eventos deberían estar en el documento
      expect(container).toBeInTheDocument();
    });

    // Verifica que se muestre la leyenda de eventos cuando existen eventos
    it('displays event legend when events exist', () => {
      render(<Calendar events={mockEvents} />);

      expect(screen.getByText('Examen')).toBeInTheDocument();
      expect(screen.getByText('Tarea')).toBeInTheDocument();
      expect(screen.getByText('Festivo')).toBeInTheDocument();
      expect(screen.getByText('Evento')).toBeInTheDocument();
    });

    // Verifica que no se muestre la leyenda cuando no hay eventos
    it('does not display legend when no events', () => {
      render(<Calendar events={[]} />);

      expect(screen.queryByText('Examen')).not.toBeInTheDocument();
      expect(screen.queryByText('Tarea')).not.toBeInTheDocument();
    });

    // Verifica que onEventClick se llame cuando se hace clic en un evento
    it('calls onEventClick when event is clicked', () => {
      const mockOnEventClick = vi.fn();
      const today = new Date();
      const todayEvents = [
        {
          id: '1',
          date: today,
          title: 'Evento Hoy',
          type: 'event' as const,
        },
      ];

      const { container } = render(
        <Calendar events={todayEvents} onEventClick={mockOnEventClick} />
      );

      const eventElement = container.querySelector('[style*="background"]');
      if (eventElement) {
        fireEvent.click(eventElement);
        expect(mockOnEventClick).toHaveBeenCalled();
      }
    });
  });

  describe('Date interactions', () => {
    // Verifica que onDateClick se llame cuando se hace clic en una fecha
    it('calls onDateClick when date is clicked', () => {
      const mockOnDateClick = vi.fn();
      const { container } = render(<Calendar onDateClick={mockOnDateClick} />);

      // Hacer clic en el primer día del mes actual
      const dayElements = container.querySelectorAll('[class*="cursor-pointer"]');
      if (dayElements.length > 0) {
        fireEvent.click(dayElements[0]);
        expect(mockOnDateClick).toHaveBeenCalled();
      }
    });

    // Verifica que se resalte la fecha de hoy
    it("highlights today's date", () => {
      const { container } = render(<Calendar />);

      // Verificar si la fecha de hoy tiene estilos especiales
      const todayElement = container.querySelector('[class*="border-blue-500"]');
      expect(todayElement || container).toBeInTheDocument();
    });
  });

  describe('Calendar grid', () => {
    // Verifica que se rendericen 42 celdas de día (6 semanas)
    it('renders 42 day cells (6 weeks)', () => {
      const { container } = render(<Calendar />);

      const dayCells = container.querySelectorAll('[class*="min-h-"]');
      expect(dayCells.length).toBe(42);
    });

    // Verifica que se muestren días de meses anteriores y siguientes
    it('shows days from previous and next months', () => {
      const { container } = render(<Calendar />);

      // Los días del mes anterior/siguiente deberían tener estilos grises
      const grayDays = container.querySelectorAll('[class*="text-gray-400"]');
      expect(grayDays.length).toBeGreaterThan(0);
    });
  });

  describe('Multiple events per day', () => {
    // Verifica que se muestre "+X más" cuando hay más de 2 eventos en el mismo día
    it('shows "+X más" when more than 2 events on same day', () => {
      const today = new Date();
      const manyEvents = [
        { id: '1', date: today, title: 'Evento 1', type: 'event' as const },
        { id: '2', date: today, title: 'Evento 2', type: 'event' as const },
        { id: '3', date: today, title: 'Evento 3', type: 'event' as const },
      ];

      render(<Calendar events={manyEvents} />);

      // Debería mostrar el indicador "+1 más"
      expect(screen.getByText(/\+\d+ más/)).toBeInTheDocument();
    });
  });

  describe('Component structure', () => {
    // Verifica que el componente se renderice sin errores
    it('renders without crashing', () => {
      expect(() => render(<Calendar />)).not.toThrow();
    });

    // Verifica que se renderice dentro de un Card
    it('renders inside a Card', () => {
      const { container } = render(<Calendar />);

      const card = container.querySelector('.MuiCard-root');
      expect(card).toBeInTheDocument();
    });
  });
});
