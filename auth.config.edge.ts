import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { LoginSchema } from './schemas';

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          // Call an API route to verify credentials
          // This moves bcrypt operations to Node.js runtime
          const response = await fetch(
            `${process.env.NEXTAUTH_URL}/api/auth/verify-credentials`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email, password }),
            }
          );

          if (response.ok) {
            const user = await response.json();
            return user;
          }
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
