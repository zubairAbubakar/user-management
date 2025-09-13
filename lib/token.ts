import { getVerificationTokenByEmail } from '@/commons/verification-token';
import { v4 as uuidv4 } from 'uuid';
import prismaDb from './db';
import { getPasswordResetTokenByEmail } from '@/commons/password';

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000); // Token valid for 1 hour

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    // delete existing token
    return await prismaDb.verificationToken.delete({
      where: { id: existingToken.id },
    });
  }

  const verificationToken = await prismaDb.verificationToken.create({
    data: {
      token,
      email,
      expires,
    },
  });

  return verificationToken;
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000); // Token valid for 1 hour

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    // delete existing token
    await prismaDb.passwordResetToken.delete({
      where: { id: existingToken.id },
    });
  }

  const passwordResetToken = await prismaDb.passwordResetToken.create({
    data: {
      token,
      email,
      expires,
    },
  });

  return passwordResetToken;
};
