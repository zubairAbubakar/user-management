'use server';

import { getUserByEmail } from '@/commons/user';
import { getVerificationTokenByToken } from '@/commons/verification-token';
import prismaDb from '@/lib/db';

export const verifyEmail = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);
  if (!existingToken) {
    return { error: 'Invalid or expired token' };
  }

  if (new Date(existingToken.expires) < new Date()) {
    return { error: 'Token has expired' };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: 'User not found' };
  }

  await prismaDb.user.update({
    where: { id: existingUser.id },
    data: { emailVerified: new Date(), email: existingToken.email },
  });

  await prismaDb.verificationToken.delete({
    where: { id: existingToken.id },
  });

  return { success: 'Email verified successfully' };
};
