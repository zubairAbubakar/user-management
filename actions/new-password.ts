'use server';

import * as z from 'zod';

import { NewPasswordSchema } from '@/schemas';
import { getPasswordResetTokenByToken } from '@/commons/password';
import { getUserByEmail } from '@/commons/user';
import bcryptjs from 'bcryptjs';
import prismaDb from '@/lib/db';

export const updatePassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token: string | null
) => {
  if (!token) {
    return { error: 'Missing token' };
  }
  const validatedFields = NewPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid password' };
  }

  const { password } = validatedFields.data;

  const existingToken = await getPasswordResetTokenByToken(token);
  if (!existingToken) {
    return { error: 'Invalid or expired token' };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return { error: 'Token has expired' };
  }

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) {
    return { error: 'User not found' };
  }

  const hashedPassword = await bcryptjs.hash(password, 10);

  await prismaDb.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });

  await prismaDb.passwordResetToken.delete({
    where: { id: existingToken.id },
  });

  return { success: 'Password updated successfully' };
};
