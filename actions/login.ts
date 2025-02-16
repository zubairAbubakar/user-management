'use server';

import { LoginSchema } from '@/schemas';
import * as z from 'zod';

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  //   console.log(validatedFields);
  if (!validatedFields.success) {
    return { error: 'Invalid credentials' };
  }

  const { email, password } = validatedFields.data;

  return { success: 'Login successful' };
};
