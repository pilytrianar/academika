'use client';
import { StudentDetail } from '@/types/student';

export type Student = {
  id: string;
  name: string;
  course: string;
  status: 'Activo' | 'Inactivo' | 'Suspendido';
};

const STATUS_MAP: Record<string, Student['status']> = {
  ACTIVE: 'Activo',
  INACTIVE: 'Inactivo',
  SUSPENDED: 'Suspendido',
};

// Obtener estudiantes
export async function getStudents(): Promise<Student[]> {
  const res = await fetch('/api/students', {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Error al obtener estudiantes');
  }

  const data = await res.json();

  if (!Array.isArray(data?.students)) {
    return [];
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.students.map((s: any) => ({
    id: String(s.id),
    name: `${s.profile.firstName} ${s.profile.lastName}`,
    course: `${s.profile.course.name} ${s.profile.course.section}`,
    status: STATUS_MAP[s.status] ?? 'Inactivo',
  }));
}

/**
 * Obtener estudiante por ID
 */
export async function getStudentById(id: number): Promise<StudentDetail> {
  const res = await fetch(`/api/students/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Error al obtener estudiante');
  }

  return res.json();
}
