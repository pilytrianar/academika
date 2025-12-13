import { prisma } from '@/server';

// ==================== TIPOS ====================

export interface CreateCourseInput {
  name: string;
  section: string;
  year: number;
}

// ==================== QUERIES ====================

// Obtener todos los cursos
export async function getAllCourses(year?: number) {
  return prisma.course.findMany({
    where: year ? { year } : undefined,
    include: {
      _count: {
        select: { students: true },
      },
    },
    orderBy: [{ name: 'asc' }, { section: 'asc' }],
  });
}

// Obtener curso por ID con estudiantes y asignaturas
export async function getCourseById(id: number) {
  return prisma.course.findUnique({
    where: { id },
    include: {
      students: {
        include: {
          user: {
            select: {
              id: true,
              email: true,
              status: true,
            },
          },
        },
        orderBy: { lastName: 'asc' },
      },
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
  });
}

// Obtener cursos para un select/dropdown
export async function getCoursesForSelect() {
  const courses = await prisma.course.findMany({
    select: {
      id: true,
      name: true,
      section: true,
      year: true,
    },
    orderBy: [{ name: 'asc' }, { section: 'asc' }],
  });

  return courses.map(course => ({
    id: course.id,
    label: `${course.name} ${course.section}`,
    year: course.year,
  }));
}

// ==================== MUTATIONS ====================

// Crear curso
export async function createCourse(data: CreateCourseInput) {
  return prisma.course.create({
    data,
  });
}

// Actualizar curso
export async function updateCourse(id: number, data: Partial<CreateCourseInput>) {
  return prisma.course.update({
    where: { id },
    data,
  });
}

// Eliminar curso
export async function deleteCourse(id: number) {
  return prisma.course.delete({
    where: { id },
  });
}
