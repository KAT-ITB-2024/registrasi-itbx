import { DrizzleAdapter } from "@auth/drizzle-adapter";
import {
  getServerSession,
  type DefaultUser,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { db } from "~/server/db";
import { TRPCError } from "@trpc/server";

// import {
//   accounts,
//   sessions,
//   users,
//   verificationTokens,
// } from "~/server/db/schema";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      nim: string;
      // ...other properties
    };
  }

  interface User extends DefaultUser {
    nim: string;
    // ...other properties
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  jwt: {
    // The maximum age of the NextAuth.js issued JWT in seconds.
    // Defaults to `session.maxAge`.
    maxAge: 60 * 60 * 24 * 30, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.id as string,
        nim: token.nim as string,
      },
    }),
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.nim = user.nim;
      }

      return token;
    },
  },
  adapter: DrizzleAdapter(db) as Adapter,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        nim: {
          label: "NIM",
          type: "text",
          placeholder: "18224135",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials) {
        try {
          if (!credentials) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "Credentials not provided",
            });
          }

          const { nim, password } = credentials;
          if (!nim || !password) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "NIM or password not provided",
            });
          }

          const user = await db.query.lembagas.findFirst({
            columns: {
              id: true,
              nim: true,
              password: true,
            },
            where: (users, { eq }) => eq(users.nim, nim),
          });

          if (!user) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "User not found",
            });
          }

          const isValid = await compare(password, user.password);

          if (!isValid) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "Invalid password",
            });
          }

          return {
            id: user.id,
            nim: user.nim,
          };
        } catch (error) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: error as string,
          });
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
