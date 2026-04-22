import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const serverEnv = createEnv({
  runtimeEnv: process.env,
  server: {
    BETTER_AUTH_URL: z.url(),
    BETTER_AUTH_SECRET: z.string(),

    TURSO_CONNECTION_URL: z.string(),
    TURSO_AUTH_TOKEN: z.string(),

    GITHUB_CLIENT_ID: z.string(),
    GITHUB_CLIENT_SECRET: z.string(),
  },
});
