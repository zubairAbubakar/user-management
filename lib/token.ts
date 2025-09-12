import { getVerificationTokenByEmail } from '@/commons/verification-token';
import { v4 as uuidv4 } from 'uuid';
import prismaDb from './db';

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
