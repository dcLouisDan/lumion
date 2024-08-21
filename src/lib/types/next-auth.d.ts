import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    role: string; // Add the role property to the User type
  }

  interface Session extends DefaultSession {
    user: {
      id: string;
      role: string; // Add the role property to the Session type
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string; // Add the role property to the JWT type
  }
}
