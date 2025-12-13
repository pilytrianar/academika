import { prisma } from '@/server';
import bcrypt from 'bcrypt';

// ==================== TIPOS ====================

export interface CreateTeacherInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: string;
}

// ==================== QUERIES ====================

// Obtener todos los profesores
export async function getAllTeachers() {
  return prisma.user.findMany({
    where: {
      role: { name: 'teacher' },
    },
    select: {
      id: true,
      email: true,
      status: true,
      profile: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          phone: true,
          avatarUrl: true,
          subjects: {
            include: {
              subjectCourse: {
                include: {
                  subject: true,
                  course: true,
                },
              },
            },
          },
        },
      },
    },
    orderBy: { profile: { lastName: 'asc' } },
  });
}

// Obtener profesor por ID
export async function getTeacherById(id: number) {
  return prisma.user.findFirst({
    where: {
      id,
      role: { name: 'teacher' },
    },
    select: {
      id: true,
      email: true,
      status: true,
      createdAt: true,
      profile: {
        include: {
          subjects: {
            include: {
              subjectCourse: {
                include: {
                  subject: true,
                  course: {
                    include: {
                      _count: { select: { students: true } },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });
}

// Obtener profesores para un select/dropdown
export async function getTeachersForSelect() {
  const teachers = await prisma.userProfile.findMany({
    where: {
      user: { role: { name: 'teacher' } },
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
    },
    orderBy: { lastName: 'asc' },
  });

  return teachers.map(t => ({
    id: t.id,
    label: `${t.firstName} ${t.lastName}`,
  }));
}

// ==================== MUTATIONS ====================

// Crear profesor
export async function createTeacher(data: CreateTeacherInput) {
  const teacherRole = await prisma.role.findUnique({
    where: { name: 'teacher' },
  });

  if (!teacherRole) {
    throw new Error('Rol de profesor no encontrado');
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  return prisma.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
      roleId: teacherRole.id,
      profile: {
        create: {
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          address: data.address,
        },
      },
    },
    include: {
      profile: true,
    },
  });
}

// Actualizar profesor
export async function updateTeacher(
  id: number,
  data: Partial<Omit<CreateTeacherInput, 'email' | 'password'>>
) {
  const user = await prisma.user.findUnique({
    where: { id },
    select: { profile: { select: { id: true } } },
  });

  if (!user?.profile) {
    throw new Error('Profesor no encontrado');
  }

  return prisma.userProfile.update({
    where: { id: user.profile.id },
    data,
  });
}
