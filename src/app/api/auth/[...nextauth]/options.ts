import prisma from "@/lib/db";
import { bcrypt } from "@/lib/utils";
import type { NextAuthOptions } from "next-auth";
import  CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {label: "Email", type: "email", placeholder: "Enter your email"},
        password: {label: "Password", type: "Password"}
      },
      async authorize(credentials) {
        const email = credentials?.email
        const password = credentials?.password
        

        if (!email || !password) return null

        const user = await prisma.user.findUnique({
          where: {
            email: email
          }
        })

        if (!user) {
          throw new Error("User not found")
        }

        const isPasswordValid = await bcrypt.compare(password, user?.password)

        if(!isPasswordValid) {
          throw new Error("Invalid password.")
        }

        return {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        }
      }
    })    
  ],
  pages: {
    signIn: "/auth/login"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
}