import { serverEnv } from '@/lib/config';
import { drizzle } from 'drizzle-orm/libsql';

import * as authSchema from './schemas/auth.schema';

export const db = drizzle({
  connection: {
    url: serverEnv.TURSO_CONNECTION_URL,
    authToken: serverEnv.TURSO_AUTH_TOKEN,
  },
  schema: authSchema,
});
