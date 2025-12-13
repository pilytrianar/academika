import { prisma } from '@/server';
import { UserStatus } from '@/generated/prisma';

// ==================== TIPOS ====================

export interface CreateUserInput {
  email: string;
  password: string;
  roleId: number;
  status?: UserStatus;
  profile?: {
    firstName: string;
    lastName: string;
    phone?: string;
    address?: string;
    birthDate?: Date;
    studentId?: string;
    courseId?: number;
  };
}

export interface UpdateUserInput {
  email?: string;
  password?: string;
  status?: UserStatus;
  roleId?: number;
}

export interface UserFilters {
  status?: UserStatus;
  roleId?: number;
  search?: string; // búsqueda por email o nombre
}

// ==================== QUERIES ====================

// Obtener todos los usuarios (con paginación opcional)
export async function getAllUsers(page = 1, limit = 10, filters?: UserFilters) {
  const skip = (page - 1) * limit;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = {};

  if (filters?.status) {
    where.status = filters.status;
  }

  if (filters?.roleId) {
    where.roleId = filters.roleId;
  }

  if (filters?.search) {
    where.OR = [
      { email: { contains: filters.search } },
      { profile: { firstName: { contains: filters.search } } },
      { profile: { lastName: { contains: filters.search } } },
    ];
  }

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      skip,
      take: limit,
      select: {
        id: true,
        email: true,
        status: true,
        createdAt: true,
        role: {
          select: { id: true, name: true },
        },
        profile: {
          select: {
            firstName: true,
            lastName: true,
            phone: true,
            avatarUrl: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.user.count({ where }),
  ]);

  return {
    users,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

// Obtener usuario por ID con todas sus relaciones
export async function getUserById(id: number) {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      role: true,
      profile: {
        include: {
          course: true,
          guardian: true,
        },
      },
    },
  });
}

// Obtener usuario por email (para auth)
export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
    include: {
      role: true,
      profile: true,
    },
  });
}

// ==================== MUTATIONS ====================

// Crear usuario
export async function createUser(data: CreateUserInput) {
  const { profile, ...userData } = data;

  return prisma.user.create({
    data: {
      ...userData,
      profile: profile
        ? {
            create: profile,
          }
        : undefined,
    },
    include: {
      role: true,
      profile: true,
    },
  });
}

// Actualizar usuario
export async function updateUser(id: number, data: UpdateUserInput) {
  return prisma.user.update({
    where: { id },
    data,
    include: {
      role: true,
      profile: true,
    },
  });
}

// Eliminar usuario
export async function deleteUser(id: number) {
  return prisma.user.delete({
    where: { id },
  });
}

// Cambiar estado del usuario
export async function updateUserStatus(id: number, status: UserStatus) {
  return prisma.user.update({
    where: { id },
    data: { status },
  });
}
