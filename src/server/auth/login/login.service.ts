/*import bcrypt from 'bcrypt';
import { User } from '@/generated/prisma/client';
import { prisma } from '@/server';
import { API_MESSAGES } from '@/utils/constants';

export async function login(email: User['email'], password: User['password']) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error(API_MESSAGES[401]);

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error(API_MESSAGES[401]);

  const { password: _, ...safeUser } = user;

  return safeUser;
}*/
