import * as z from 'zod';

export const LoginSchema = z.object({
  email: z.string().email({ message: 'Email is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

export const SignupSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  confirmPassword: z.string(),
});

export const ForgotPasswordSchema = z.object({
  email: z.string().email(),
});
