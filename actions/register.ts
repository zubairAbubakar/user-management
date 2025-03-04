'use server';

import * as z from 'zod';
import bcrypt from 'bcrypt';
import prismaDb from '@/lib/db';

import { RegisterSchema } from '@/schemas';
import { getUserByEmail } from '@/commons/user';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid credentials' };
  }

  const { name, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

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

  // TODO: Send email confirmation

  return { success: 'Registration successful' };
};
