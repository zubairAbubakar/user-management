'use server';

import * as z from 'zod';

import { getUserByEmail } from '@/commons/user';
import { PasswordResetSchema } from '@/schemas';
import { generatePasswordResetToken } from '@/lib/token';
import { sendPasswordResetEmail } from '@/lib/mail';

export const resetPassword = async (
  values: z.infer<typeof PasswordResetSchema>
) => {
  const validatedFields = PasswordResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid email' };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);
  if (!existingUser) {
    return { error: 'Email not found' };
  }

  const passwordResetToken = await generatePasswordResetToken(email);

  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );
  return { success: 'Password reset email sent' };
};
