import { prisma } from '@/server';

// ==================== TIPOS ====================

export interface CreateGradeInput {
  studentId: number; // profileId del estudiante
  subjectCourseId: number;
  value: number;
  period: number;
  description?: string;
}

export interface GradeFilters {
  studentId?: number;
  subjectCourseId?: number;
  period?: number;
}

// ==================== QUERIES ====================

// Obtener calificaciones con filtros
export async function getGrades(filters?: GradeFilters) {
  return prisma.grade.findMany({
    where: filters,
    include: {
      student: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          studentId: true,
        },
      },
      subjectCourse: {
        include: {
          subject: true,
          course: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
}

// Obtener calificaciones de un estudiante
export async function getGradesByStudent(studentProfileId: number) {
  return prisma.grade.findMany({
    where: { studentId: studentProfileId },
    include: {
      subjectCourse: {
        include: {
          subject: true,
        },
      },
    },
    orderBy: [{ period: 'asc' }, { createdAt: 'desc' }],
  });
}

// Obtener calificaciones de un estudiante por asignatura
export async function getGradesByStudentAndSubject(studentProfileId: number, subjectId: number) {
  return prisma.grade.findMany({
    where: {
      studentId: studentProfileId,
      subjectCourse: { subjectId },
    },
    include: {
      subjectCourse: {
        include: {
          subject: true,
        },
      },
    },
    orderBy: { period: 'asc' },
  });
}

// Obtener reporte de calificaciones por curso y asignatura
export async function getGradesByCourseAndSubject(
  courseId: number,
  subjectId: number,
  period?: number
) {
  const subjectCourse = await prisma.subjectCourse.findFirst({
    where: { courseId, subjectId },
  });

  if (!subjectCourse) return [];

  return prisma.grade.findMany({
    where: {
      subjectCourseId: subjectCourse.id,
      ...(period ? { period } : {}),
    },
    include: {
      student: {
        select: {
          firstName: true,
          lastName: true,
          studentId: true,
        },
      },
    },
    orderBy: { student: { lastName: 'asc' } },
  });
}

// Calcular promedio de un estudiante
export async function calculateStudentAverage(studentProfileId: number, period?: number) {
  const grades = await prisma.grade.findMany({
    where: {
      studentId: studentProfileId,
      ...(period ? { period } : {}),
    },
    select: { value: true },
  });

  if (grades.length === 0) return null;

  const sum = grades.reduce((acc, grade) => acc + Number(grade.value), 0);
  return Number((sum / grades.length).toFixed(2));
}

// Calcular promedio por asignatura
export async function calculateStudentSubjectAverage(
  studentProfileId: number,
  subjectCourseId: number
) {
  const grades = await prisma.grade.findMany({
    where: {
      studentId: studentProfileId,
      subjectCourseId,
    },
    select: { value: true },
  });

  if (grades.length === 0) return null;

  const sum = grades.reduce((acc, grade) => acc + Number(grade.value), 0);
  return Number((sum / grades.length).toFixed(2));
}

// ==================== MUTATIONS ====================

// Crear calificación
export async function createGrade(data: CreateGradeInput) {
  return prisma.grade.create({
    data,
    include: {
      student: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
      subjectCourse: {
        include: {
          subject: true,
        },
      },
    },
  });
}

// Actualizar calificación
export async function updateGrade(
  id: number,
  data: Partial<Omit<CreateGradeInput, 'studentId' | 'subjectCourseId'>>
) {
  return prisma.grade.update({
    where: { id },
    data,
  });
}

// Eliminar calificación
export async function deleteGrade(id: number) {
  return prisma.grade.delete({
    where: { id },
  });
}

// Crear múltiples calificaciones (para registro masivo)
export async function createManyGrades(grades: CreateGradeInput[]) {
  return prisma.grade.createMany({
    data: grades,
  });
}
