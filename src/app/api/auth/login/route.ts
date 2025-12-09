import { NextResponse } from 'next/server';
import { isError } from '@/utils/helpers.common';
import { API_MESSAGES } from '@/utils/constants';
import { validateInput } from '@/lib/validation';
import { loginSchema } from '@/lib/schemas';
//import { login } from '@/server/auth/login/login.service';

export async function POST(req: Request) {
  const body = await req.json();
  const validation = await validateInput(loginSchema, body);

  if (!validation.success) {
    return NextResponse.json(
      { error: 'El correo y la contraseña son obligatorios' },
      { status: 400 }
    );
  }

  try {
    const user = await login(body.email, body.password);
    return NextResponse.json({ success: true, user }, { status: 200 });
  } catch (err) {
    const error = isError(err) ? err.message : API_MESSAGES[500];
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
