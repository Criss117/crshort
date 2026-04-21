import { createServerFn } from '@tanstack/react-start';

import { authMiddleware } from '@/application/actions/middlewares';

export const getSessionAction = createServerFn()
  .middleware([authMiddleware])
  .handler(async ({ context }) => context.session);
