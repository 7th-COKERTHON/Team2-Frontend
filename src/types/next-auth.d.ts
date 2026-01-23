import { DefaultSession } from "next-auth";

// NextAuth 제거

declare module "next-auth" {
  interface Session {
    user: {
      accessToken?: string;
      refreshToken?: string;
      userId?: number;
      accessTokenExpires?: number;
      error?: string;
    } & DefaultSession["user"];
  }

  interface User {
    accessToken?: string;
    refreshToken?: string;
    userId?: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    userId?: number;
    accessTokenExpires?: number;
    error?: string;
  }
}
