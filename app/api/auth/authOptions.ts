import prisma from "@/prisma/client"; // Importing Prisma client to interact with the database
import { PrismaAdapter } from "@next-auth/prisma-adapter"; // Adapter to integrate NextAuth with Prisma
import { NextAuthOptions } from "next-auth"; // Importing the type for NextAuth options
import GoogleProvider from "next-auth/providers/google"; // Importing Google OAuth provider

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma), // Setting up PrismaAdapter to store authentication data
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!, // Google OAuth client ID from environment variables
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!, // Google OAuth client secret from environment variables
    }),
  ],
  session: {
    strategy: "jwt", // Using JSON Web Token (JWT) strategy for sessions
  },
};

export default authOptions;
