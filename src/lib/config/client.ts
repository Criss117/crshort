import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const clientEnv = createEnv({
  runtimeEnv: import.meta.env,
  client: {
    VITE_BASE_URL: z.url(),
  },
  clientPrefix: 'VITE_',
});
