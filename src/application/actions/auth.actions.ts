import { createServerFn } from '@tanstack/react-start';

import { authMiddleware } from './middlewares';

export const getSessionAction = createServerFn()
  .middleware([authMiddleware])
  .handler(async ({ context }) => context.session);
