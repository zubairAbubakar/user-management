import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';

import prismaDb from '@/lib/db';
import authConfig from '@/auth.config';
import { getUserById } from './commons/user';
import { UserRole } from '@prisma/client';

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  events: {
    async linkAccount({ user }) {
      await prismaDb.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth signin - let NextAuth handle account linking errors gracefully
      if (account?.provider !== 'credentials') return true;

      const existingUser = await getUserById(user.id!);

      // Prevent signin if email is not verified
      if (existingUser && !existingUser.emailVerified) return false;

      // TODO: Add 2FA check here

      return true;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.role = existingUser.role;

      return token;
    },
  },
  adapter: PrismaAdapter(prismaDb),
  session: { strategy: 'jwt' },
  ...authConfig,
});
