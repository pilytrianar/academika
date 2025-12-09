import { NextResponse } from 'next/server';
//import { getAllUsers } from '@/server/users/users.service';
import { API_MESSAGES } from '@/utils/constants';
import { isError } from '@/utils/helpers.common';

export async function GET() {
  try {
    //const users = await getAllUsers();
    const users = '';
    return NextResponse.json({ users }, { status: 200 });
  } catch (err) {
    const error = isError(err) ? err.message : API_MESSAGES[500];
    return NextResponse.json({ error }, { status: 500 });
  }
}
