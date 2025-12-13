import { prisma } from '@/server';
import { UserStatus } from '@/generated/prisma';
import bcrypt from 'bcrypt';

// ==================== TIPOS ====================

export interface CreateStudentInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  studentId: string;
  courseId: number;
  birthDate?: Date;
  phone?: string;
  address?: string;
  guardian?: {
    fullName: string;
    phone: string;
    email?: string;
    relationship?: string;
  };
}

export interface UpdateStudentInput {
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  birthDate?: Date;
  courseId?: number;
  status?: UserStatus;
}

export interface StudentFilters {
  courseId?: number;
  status?: UserStatus;
  search?: string;
}

// ==================== QUERIES ====================

// Obtener todos los estudiantes
export async function getAllStudents(page = 1, limit = 10, filters?: StudentFilters) {
  const skip = (page - 1) * limit;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = {
    role: { name: 'student' },
  };

  if (filters?.status) {
    where.status = filters.status;
  }

  if (filters?.courseId) {
    where.profile = { courseId: filters.courseId };
  }

  if (filters?.search) {
    where.OR = [
      { email: { contains: filters.search } },
      { profile: { firstName: { contains: filters.search } } },
      { profile: { lastName: { contains: filters.search } } },
      { profile: { studentId: { contains: filters.search } } },
    ];
  }

  const [students, total] = await Promise.all([
    prisma.user.findMany({
      where,
      skip,
      take: limit,
      select: {
        id: true,
        email: true,
        status: true,
        profile: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            studentId: true,
            phone: true,
            avatarUrl: true,
            course: {
              select: {
                id: true,
                name: true,
                section: true,
              },
            },
          },
        },
      },
      orderBy: { profile: { lastName: 'asc' } },
    }),
    prisma.user.count({ where }),
  ]);

  return {
    students,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

// Obtener estudiante por ID con todo el detalle
export async function getStudentById(id: number) {
  return prisma.user.findFirst({
    where: {
      id,
      role: { name: 'student' },
    },
    select: {
      id: true,
      email: true,
      status: true,
      createdAt: true,
      profile: {
        include: {
          course: true,
          guardian: true,
          grades: {
            include: {
              subjectCourse: {
                include: {
                  subject: true,
                },
              },
            },
            orderBy: { createdAt: 'desc' },
          },
          disciplinaryNotes: {
            orderBy: { date: 'desc' },
          },
        },
      },
    },
  });
}

// Obtener estudiante por studentId (el ID visible como "12345")
export async function getStudentByStudentId(studentId: string) {
  return prisma.userProfile.findUnique({
    where: { studentId },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          status: true,
        },
      },
      course: true,
      guardian: true,
    },
  });
}

// Obtener promedio general del estudiante
export async function getStudentAverage(profileId: number) {
  const grades = await prisma.grade.findMany({
    where: { studentId: profileId },
    select: { value: true },
  });

  if (grades.length === 0) return null;

  const sum = grades.reduce((acc, grade) => acc + Number(grade.value), 0);
  return (sum / grades.length).toFixed(2);
}

// Obtener estudiantes por curso
export async function getStudentsByCourse(courseId: number) {
  return prisma.userProfile.findMany({
    where: {
      courseId,
      user: { role: { name: 'student' } },
    },
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
  });
}

// ==================== MUTATIONS ====================

// Crear estudiante
export async function createStudent(data: CreateStudentInput) {
  const { guardian, password, ...studentData } = data;

  // Obtener el rol de estudiante
  const studentRole = await prisma.role.findUnique({
    where: { name: 'student' },
  });

  if (!studentRole) {
    throw new Error('Rol de estudiante no encontrado');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
      roleId: studentRole.id,
      profile: {
        create: {
          firstName: studentData.firstName,
          lastName: studentData.lastName,
          studentId: studentData.studentId,
          courseId: studentData.courseId,
          birthDate: studentData.birthDate,
          phone: studentData.phone,
          address: studentData.address,
          guardian: guardian
            ? {
                create: guardian,
              }
            : undefined,
        },
      },
    },
    include: {
      profile: {
        include: {
          course: true,
          guardian: true,
        },
      },
    },
  });
}

// Actualizar estudiante
export async function updateStudent(id: number, data: UpdateStudentInput) {
  const { status, ...profileData } = data;

  // Actualizar usuario y perfil en una transacción
  return prisma.$transaction(async tx => {
    // Actualizar status del usuario si se proporciona
    if (status) {
      await tx.user.update({
        where: { id },
        data: { status },
      });
    }

    // Obtener el perfil del usuario
    const user = await tx.user.findUnique({
      where: { id },
      select: { profile: { select: { id: true } } },
    });

    if (!user?.profile) {
      throw new Error('Perfil de estudiante no encontrado');
    }

    // Actualizar perfil
    if (Object.keys(profileData).length > 0) {
      await tx.userProfile.update({
        where: { id: user.profile.id },
        data: profileData,
      });
    }

    // Retornar estudiante actualizado
    return tx.user.findUnique({
      where: { id },
      include: {
        profile: {
          include: {
            course: true,
            guardian: true,
          },
        },
      },
    });
  });
}

// Actualizar guardian
export async function updateGuardian(
  studentProfileId: number,
  data: { fullName?: string; phone?: string; email?: string; relationship?: string }
) {
  return prisma.guardian.upsert({
    where: { userProfileId: studentProfileId },
    update: data,
    create: {
      userProfileId: studentProfileId,
      fullName: data.fullName || '',
      phone: data.phone || '',
      email: data.email,
      relationship: data.relationship,
    },
  });
}

// Eliminar estudiante
export async function deleteStudent(id: number) {
  return prisma.user.delete({
    where: { id },
  });
}
