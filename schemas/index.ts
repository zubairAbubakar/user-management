import * as z from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const signupSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  confirmPassword: z.string(),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});
