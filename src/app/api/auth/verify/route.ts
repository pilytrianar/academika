import { verifyToken } from '@/server/auth/config/jwt.service';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Token no proporcionado' },
        { status: 401 }
      );
    }

    const payload = verifyToken(token);

    if (!payload) {
      return NextResponse.json(
        { success: false, error: 'Token inválido o expirado' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: payload.userId,
        email: payload.email,
      },
    });
  } catch (error) {
    console.error('Error verificando token:', error);
    return NextResponse.json(
      { success: false, error: 'Error al verificar token' },
      { status: 500 }
    );
  }
}
