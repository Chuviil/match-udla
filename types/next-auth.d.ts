import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

// Extend Session and User types to include id and provider

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      provider?: string;
    } & DefaultSession["user"];
  }
  interface User extends DefaultUser {
    provider?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    provider?: string;
  }
}
