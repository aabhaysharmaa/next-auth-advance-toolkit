import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"

import authConfig from "./auth.config";
import { db } from "./lib/db";
import { getUserById } from "./data/user";
import { UserRole } from "./generated/prisma/enums";
import { getTwoFactorVerificationById } from "./lib/2FA-token";

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  pages: {
    signIn: "/sign-in",
    error: "/auth/error"
  },

  callbacks: {
    async signIn({ user, account }) {
      // just because we don't handle OAuth email verification so we must have to allow to signIn without nay restriction
      if (account?.provider !== "credentials") return true
      const existingUser = await getUserById(user.id as string)
      // Prevent SignIn without emailVerification
      if (!existingUser?.emailVerified) {
        return false
      }
      // prevent user to signin without 2FA
      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorVerificationById(existingUser.id);
        if (!twoFactorConfirmation) return false

        //  Delete teo factor confirmation for next signIn
        await db.twoFactorConfirmation.delete({ where: { id: twoFactorConfirmation?.id } })
      }
      return true
    },
    async session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub
      }
      if (token.role && session.user) {
        session.user.role = token.role as UserRole
      }
      return session
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;
      if (existingUser.role) {
        token.role = existingUser?.role
      }
      return token
    }
  },
  jwt: {},
  session: { strategy: "jwt" },
  ...authConfig,
})
