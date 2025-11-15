import { NextResponse } from 'next/server';
import { getAllUsers } from '@/server/auth/login/login.service';

export async function GET() {
  const users = await getAllUsers();
  return NextResponse.json(users);
}
