import { drizzle } from 'drizzle-orm/libsql';

import { serverEnv } from '@/lib/config/server';

import * as authSchema from './schemas/auth.schema';
import * as linksSchema from './schemas/links.schema';

export const db = drizzle({
  connection: {
    url: serverEnv.TURSO_CONNECTION_URL,
    authToken: serverEnv.TURSO_AUTH_TOKEN,
  },
  schema: { ...authSchema, ...linksSchema },
});
