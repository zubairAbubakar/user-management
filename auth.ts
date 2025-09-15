import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';

import prismaDb from '@/lib/db';
import authConfig from '@/auth.config';
import { getUserById } from './commons/user';
import { UserRole } from '@prisma/client';
import { getTwoFactorConfirmationByUserId } from './commons/two-factor-confirmation';
import { getAccountByUserId } from './commons/account';

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

      // Ensure user.id exists before proceeding
      if (!user.id) return false;

      const existingUser = await getUserById(user.id);

      // Prevent signin if email is not verified
      if (existingUser && !existingUser.emailVerified) return false;

      if (existingUser?.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id
        );
        if (!twoFactorConfirmation) return false;

        await prismaDb.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id },
        });
      }

      return true;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }
      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
        session.user.isOAuth = token.isOAuth as boolean;
      }
      if (session.user && token.name) {
        session.user.name = token.name;
      }
      if (session.user && token.email) {
        session.user.email = token.email;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser.id);

      token.isOAuth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;

      token.role = existingUser.role;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

      return token;
    },
  },
  adapter: PrismaAdapter(prismaDb),
  session: { strategy: 'jwt' },
  ...authConfig,
});
