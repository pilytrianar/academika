'use client';

import React, { useState } from 'react';
import { Card, IconButton, Typography, Box, Chip } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

interface CalendarEvent {
  id: string;
  date: Date;
  title: string;
  type?: 'exam' | 'assignment' | 'holiday' | 'event';
}

interface CalendarProps {
  events?: CalendarEvent[];
  onDateClick?: (date: Date) => void;
  onEventClick?: (event: CalendarEvent) => void;
}

const DAYS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const MONTHS = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

const EVENT_COLORS = {
  exam: { bg: '#ffebee', color: '#c62828' },
  assignment: { bg: '#e3f2fd', color: '#1565c0' },
  holiday: { bg: '#f3e5f5', color: '#6a1b9a' },
  event: { bg: '#e8f5e9', color: '#2e7d32' },
};

export default function Calendar({ events = [], onDateClick, onEventClick }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const goToPrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const isToday = (day: number) => {
    const today = new Date();
    return day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
  };

  const getEventsForDate = (day: number) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getDate() === day &&
        eventDate.getMonth() === month &&
        eventDate.getFullYear() === year
      );
    });
  };

  const handleDateClick = (day: number) => {
    const selectedDate = new Date(year, month, day);
    onDateClick?.(selectedDate);
  };

  // Generate calendar days
  const calendarDays = [];

  // Previous month days
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    calendarDays.push({
      day: daysInPrevMonth - i,
      isCurrentMonth: false,
      isPrevMonth: true,
    });
  }

  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push({
      day,
      isCurrentMonth: true,
      isPrevMonth: false,
    });
  }

  // Next month days to complete the grid
  const remainingDays = 42 - calendarDays.length;
  for (let day = 1; day <= remainingDays; day++) {
    calendarDays.push({
      day,
      isCurrentMonth: false,
      isPrevMonth: false,
    });
  }

  return (
    <Card className='p-4 shadow-sm'>
      {/* Header */}
      <Box className='flex items-center justify-between mb-4'>
        <IconButton onClick={goToPrevMonth} size='small'>
          <ChevronLeftIcon />
        </IconButton>

        <Typography variant='h6' fontWeight={600}>
          {MONTHS[month]} {year}
        </Typography>

        <IconButton onClick={goToNextMonth} size='small'>
          <ChevronRightIcon />
        </IconButton>
      </Box>

      {/* Days of week */}
      <div className='grid grid-cols-7 gap-1 mb-2'>
        {DAYS.map(day => (
          <div key={day} className='text-center py-2'>
            <Typography variant='caption' fontWeight={600} color='text.secondary'>
              {day}
            </Typography>
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className='grid grid-cols-7 gap-1'>
        {calendarDays.map((dayInfo, index) => {
          const dayEvents = dayInfo.isCurrentMonth ? getEventsForDate(dayInfo.day) : [];
          const isTodayDate = dayInfo.isCurrentMonth && isToday(dayInfo.day);

          return (
            <div
              key={index}
              onClick={() => dayInfo.isCurrentMonth && handleDateClick(dayInfo.day)}
              className={`
                relative min-h-17.5 p-2 rounded-lg border transition-colors
                ${dayInfo.isCurrentMonth ? 'cursor-pointer hover:bg-gray-50' : 'bg-gray-50'}
                ${isTodayDate ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}
              `}
            >
              <Typography
                variant='body2'
                className={`
                  text-center font-medium
                  ${!dayInfo.isCurrentMonth && 'text-gray-400'}
                  ${isTodayDate && 'text-blue-600 font-bold'}
                `}
              >
                {dayInfo.day}
              </Typography>

              {/* Event indicators */}
              {dayEvents.length > 0 && (
                <div className='mt-1 space-y-1'>
                  {dayEvents.slice(0, 2).map(event => {
                    const colors = EVENT_COLORS[event.type || 'event'];
                    return (
                      <div
                        key={event.id}
                        onClick={e => {
                          e.stopPropagation();
                          onEventClick?.(event);
                        }}
                        className='text-xs px-1 py-0.5 rounded truncate cursor-pointer hover:opacity-80'
                        style={{
                          backgroundColor: colors.bg,
                          color: colors.color,
                        }}
                      >
                        {event.title}
                      </div>
                    );
                  })}
                  {dayEvents.length > 2 && (
                    <Typography
                      variant='caption'
                      color='text.secondary'
                      className='text-center block'
                    >
                      +{dayEvents.length - 2} más
                    </Typography>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      {events.length > 0 && (
        <Box className='mt-4 flex flex-wrap gap-2'>
          <Chip
            label='Examen'
            size='small'
            sx={{ backgroundColor: EVENT_COLORS.exam.bg, color: EVENT_COLORS.exam.color }}
          />
          <Chip
            label='Tarea'
            size='small'
            sx={{
              backgroundColor: EVENT_COLORS.assignment.bg,
              color: EVENT_COLORS.assignment.color,
            }}
          />
          <Chip
            label='Festivo'
            size='small'
            sx={{ backgroundColor: EVENT_COLORS.holiday.bg, color: EVENT_COLORS.holiday.color }}
          />
          <Chip
            label='Evento'
            size='small'
            sx={{ backgroundColor: EVENT_COLORS.event.bg, color: EVENT_COLORS.event.color }}
          />
        </Box>
      )}
    </Card>
  );
}
