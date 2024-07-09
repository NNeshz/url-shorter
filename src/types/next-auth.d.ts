import NextAuth from "next-auth";
import { userAgent } from "next/server";

declare module "next-auth" {
  interface User {
    username: string;
  }
  interface Session {
    user: User & {
      username: string;
    };
    token: {
      username: string;
    };
  }
}
