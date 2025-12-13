import { NextRequest, NextResponse } from 'next/server';
import {
  getNotifications,
  countUnreadNotifications,
  markAsRead,
  markAllAsRead,
  createNotification,
} from '@/server/notifications/notifications.service';

// GET /api/notifications
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const limit = parseInt(searchParams.get('limit') || '10');
    const countOnly = searchParams.get('countOnly') === 'true';

    const userIdNum = userId ? parseInt(userId) : undefined;

    if (countOnly) {
      const count = await countUnreadNotifications(userIdNum);
      return NextResponse.json({ count });
    }

    const notifications = await getNotifications(userIdNum, limit);

    return NextResponse.json({ notifications });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json({ error: 'Error al obtener notificaciones' }, { status: 500 });
  }
}

// POST /api/notifications
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.title || !body.type) {
      return NextResponse.json({ error: 'title y type son requeridos' }, { status: 400 });
    }

    const notification = await createNotification(body);

    return NextResponse.json(notification, { status: 201 });
  } catch (error) {
    console.error('Error creating notification:', error);
    return NextResponse.json({ error: 'Error al crear notificación' }, { status: 500 });
  }
}

// PATCH /api/notifications (marcar como leídas)
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();

    if (body.markAllRead) {
      await markAllAsRead(body.userId);
      return NextResponse.json({ success: true });
    }

    if (body.id) {
      await markAsRead(body.id);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Debe proporcionar id o markAllRead' }, { status: 400 });
  } catch (error) {
    console.error('Error updating notification:', error);
    return NextResponse.json({ error: 'Error al actualizar notificación' }, { status: 500 });
  }
}
