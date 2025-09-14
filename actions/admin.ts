'use server';

import { currentUser } from '@/lib/auth';
import { UserRole } from '@prisma/client';

export const adminActions = async () => {
  const user = await currentUser();

  if (user?.role === UserRole.ADMIN) {
    return { success: 'You have access to admin actions.' };
  }

  return { error: 'You do not have access to admin actions.' };
};
