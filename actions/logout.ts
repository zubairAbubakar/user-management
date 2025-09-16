'use server';

import { signOut } from '@/auth';

export const logout = async () => {
  // put pre-signout logic here if any

  await signOut();
};
