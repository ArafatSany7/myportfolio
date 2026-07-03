import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import bcrypt from "bcrypt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    }
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        const admin = await prisma.admin.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!admin) {
          
          
          throw new Error("Invalid credentials");
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, admin.password);

        if (!isPasswordValid) {
          throw new Error("Invalid credentials");
        }

        return {
          id: admin.id,
          email: admin.email,
        };
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.email = token.email as string | null | undefined;
        
        session.user.id = token.id as string;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback_secret_for_development",
};
