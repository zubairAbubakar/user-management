'use server';

import * as z from 'zod';
import bcryptjs from 'bcryptjs';
import prismaDb from '@/lib/db';

import { RegisterSchema } from '@/schemas';
import { getUserByEmail } from '@/commons/user';
import { generateVerificationToken } from '@/lib/token';
import { sendVerificationEmail } from '@/lib/mail';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid credentials' };
  }

  const { name, email, password } = validatedFields.data;
  const hashedPassword = await bcryptjs.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: 'Email already exists' };
  }

  await prismaDb.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: 'Registration successful & confirmation email sent' };
};
