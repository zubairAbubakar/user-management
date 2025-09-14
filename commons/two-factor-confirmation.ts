import prismaDb from '@/lib/db';

export const getTwoFactorConfirmationByUserId = async (userId: string) => {
  try {
    const twoFactorConfirmation =
      await prismaDb.twoFactorConfirmation.findUnique({
        where: { userId },
      });
    return twoFactorConfirmation;
  } catch {
    return null;
  }
};
