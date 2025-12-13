import { prisma } from '@/server';

// ==================== TIPOS ====================

export interface CreateSubjectInput {
  name: string;
  description?: string;
}

export interface AssignSubjectToCourseInput {
  subjectId: number;
  courseId: number;
  teacherId?: number; // profileId del profesor
}

// ==================== QUERIES ====================

// Obtener todas las asignaturas
export async function getAllSubjects() {
  return prisma.subject.findMany({
    orderBy: { name: 'asc' },
  });
}

// Obtener asignatura por ID con cursos y profesores
export async function getSubjectById(id: number) {
  return prisma.subject.findUnique({
    where: { id },
    include: {
      courses: {
        include: {
          course: true,
          teachers: {
            include: {
              teacher: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                },
              },
            },
          },
        },
      },
    },
  });
}

// Obtener asignaturas por curso (para la vista de "Asignaturas")
export async function getSubjectsByCourse(courseId: number) {
  return prisma.subjectCourse.findMany({
    where: { courseId },
    include: {
      subject: true,
      teachers: {
        include: {
          teacher: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              user: {
                select: { email: true },
              },
            },
          },
        },
      },
    },
  });
}

// Obtener todas las asignaturas agrupadas por curso
export async function getSubjectsGroupedByCourse() {
  const courses = await prisma.course.findMany({
    include: {
      subjects: {
        include: {
          subject: true,
          teachers: {
            include: {
              teacher: {
                select: {
                  firstName: true,
                  lastName: true,
                },
              },
            },
          },
        },
      },
    },
    orderBy: [{ name: 'asc' }, { section: 'asc' }],
  });

  return courses;
}

// Obtener asignaturas que imparte un profesor
export async function getSubjectsByTeacher(teacherProfileId: number) {
  return prisma.subjectTeacher.findMany({
    where: { teacherId: teacherProfileId },
    include: {
      subjectCourse: {
        include: {
          subject: true,
          course: true,
        },
      },
    },
  });
}

// ==================== MUTATIONS ====================

// Crear asignatura
export async function createSubject(data: CreateSubjectInput) {
  return prisma.subject.create({
    data,
  });
}

// Actualizar asignatura
export async function updateSubject(id: number, data: Partial<CreateSubjectInput>) {
  return prisma.subject.update({
    where: { id },
    data,
  });
}

// Eliminar asignatura
export async function deleteSubject(id: number) {
  return prisma.subject.delete({
    where: { id },
  });
}

// Asignar asignatura a un curso
export async function assignSubjectToCourse(data: AssignSubjectToCourseInput) {
  const subjectCourse = await prisma.subjectCourse.create({
    data: {
      subjectId: data.subjectId,
      courseId: data.courseId,
    },
  });

  // Si se proporciona un profesor, asignarlo
  if (data.teacherId) {
    await prisma.subjectTeacher.create({
      data: {
        teacherId: data.teacherId,
        subjectCourseId: subjectCourse.id,
      },
    });
  }

  return subjectCourse;
}

// Asignar profesor a una asignatura-curso
export async function assignTeacherToSubjectCourse(
  subjectCourseId: number,
  teacherProfileId: number
) {
  return prisma.subjectTeacher.create({
    data: {
      subjectCourseId,
      teacherId: teacherProfileId,
    },
  });
}

// Remover profesor de una asignatura-curso
export async function removeTeacherFromSubjectCourse(
  subjectCourseId: number,
  teacherProfileId: number
) {
  return prisma.subjectTeacher.deleteMany({
    where: {
      subjectCourseId,
      teacherId: teacherProfileId,
    },
  });
}
