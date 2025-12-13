import { prisma } from '@/server';

// ==================== TIPOS ====================

export interface CreateNotificationInput {
  title: string;
  description?: string;
  type: 'NEW_STUDENT' | 'REMINDER' | 'GRADE' | 'DISCIPLINARY' | 'ANNOUNCEMENT';
  userId?: number; // null = notificación global
}

// ==================== QUERIES ====================

// Obtener notificaciones (globales + del usuario)
export async function getNotifications(userId?: number, limit = 10) {
  return prisma.notification.findMany({
    where: {
      OR: [
        { userId: null }, // globales
        { userId }, // del usuario específico
      ],
    },
    orderBy: { createdAt: 'desc' },
    take: limit,
  });
}

// Obtener notificaciones no leídas
export async function getUnreadNotifications(userId?: number) {
  return prisma.notification.findMany({
    where: {
      isRead: false,
      OR: [{ userId: null }, { userId }],
    },
    orderBy: { createdAt: 'desc' },
  });
}

// Contar notificaciones no leídas
export async function countUnreadNotifications(userId?: number) {
  return prisma.notification.count({
    where: {
      isRead: false,
      OR: [{ userId: null }, { userId }],
    },
  });
}

// ==================== MUTATIONS ====================

// Crear notificación
export async function createNotification(data: CreateNotificationInput) {
  return prisma.notification.create({
    data,
  });
}

// Marcar notificación como leída
export async function markAsRead(id: number) {
  return prisma.notification.update({
    where: { id },
    data: { isRead: true },
  });
}

// Marcar todas como leídas
export async function markAllAsRead(userId?: number) {
  return prisma.notification.updateMany({
    where: {
      isRead: false,
      OR: [{ userId: null }, { userId }],
    },
    data: { isRead: true },
  });
}

// Eliminar notificación
export async function deleteNotification(id: number) {
  return prisma.notification.delete({
    where: { id },
  });
}
