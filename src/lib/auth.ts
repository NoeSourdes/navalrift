import { PrismaAdapter } from "@auth/prisma-adapter";
import { compare } from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "./prisma";

export const { auth, handlers } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    GithubProvider,
    GoogleProvider,
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "john@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const existingUser = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });
        if (!existingUser) {
          return null;
        }
        if (existingUser.password) {
          const passwordValid = await compare(
            credentials.password as string,
            existingUser.password
          );
          if (!passwordValid) {
            return null;
          }
        }
        return {
          id: existingUser.id,
          name: existingUser.name,
          email: existingUser.email,
          image: existingUser.image,
        };
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
});
