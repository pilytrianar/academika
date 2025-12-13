import bcrypt from 'bcrypt';
import { User } from '@/generated/prisma/client';
import { prisma } from '@/server';
import { API_MESSAGES } from '@/utils/constants';
import { signToken } from '../config/jwt.service';

export async function login(email: User['email'], password: User['password']) {
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      password: true,
      email: true,
      profile: { select: { firstName: true, lastName: true } },
    },
  });

  if (!user) throw new Error(API_MESSAGES[401]);

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error(API_MESSAGES[401]);

  const token = signToken({
    userId: user.id,
    email: user.email,
    firstName: user.profile?.firstName ?? '',
    lastName: user.profile?.lastName ?? '',
  });
  const { password: _, profile, ...rest } = user;

  const safeUser = { ...rest, ...profile };

  return { ...safeUser, token };
}
