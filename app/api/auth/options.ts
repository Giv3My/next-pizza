import { type AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { compare, hashSync } from 'bcrypt';
import { prisma } from '@/prisma/prisma-client';
import { UserRole } from '@prisma/client';
import {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  NEXT_AUTH_SECRET,
} from '@/common/config';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const userExists = await prisma.user.findFirst({
          where: {
            email: credentials.email,
          },
        });

        if (!userExists || !userExists.verified) {
          return null;
        }

        const isPasswordValid = await compare(credentials.password, userExists.password);

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: String(userExists.id),
          email: userExists.email,
          fullName: userExists.fullName,
          role: userExists.role,
        };
      },
    }),
    GitHubProvider({
      clientId: GITHUB_CLIENT_ID ?? '',
      clientSecret: GITHUB_CLIENT_SECRET ?? '',
      profile(profile) {
        return {
          id: String(profile.id),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
          role: UserRole.USER,
        };
      },
    }),
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID ?? '',
      clientSecret: GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
  secret: NEXT_AUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 5,
  },
  callbacks: {
    async signIn({ user, account }) {
      try {
        if (account?.provider === 'credentials') {
          return true;
        }

        if (!user.email) {
          return false;
        }

        const userExists = await prisma.user.findFirst({
          where: {
            OR: [
              { provider: account?.provider, providerId: account?.providerAccountId },
              { email: user.email },
            ],
          },
        });

        if (userExists) {
          await prisma.user.update({
            where: {
              id: userExists.id,
            },
            data: {
              provider: account?.provider,
              providerId: account?.providerAccountId,
            },
          });

          return true;
        }

        await prisma.user.create({
          data: {
            email: user.email,
            fullName: user.name || `User #${user.id}`,
            password: hashSync(String(user.id), 6),
            verified: new Date(),
            provider: account?.provider,
            providerId: account?.providerAccountId,
          },
        });

        return true;
      } catch (e) {
        return false;
      }
    },
    async jwt({ token }) {
      if (!token.email) {
        return token;
      }

      const user = await prisma.user.findFirst({
        where: {
          email: token.email,
        },
      });

      if (user) {
        token.id = String(user.id);
        token.email = user.email;
        token.fullName = user.fullName;
        token.role = user.role;
      }

      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = String(token.id);
        session.user.role = token.role;
      }

      return session;
    },
  },
};
