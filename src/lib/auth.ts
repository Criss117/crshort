import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from "astro:env/server";
import { db } from "./db";
import * as authSchemas from "@/lib/schemas/auth.schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite", // or "pg" or "mysql"
    schema: {
      ...authSchemas,
    },
  }),
  socialProviders: {
    github: {
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
    },
  },
  schemas: {
    ...authSchemas,
  },
});
