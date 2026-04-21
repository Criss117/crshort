import { createMiddleware } from '@tanstack/react-start';
import { getRequestHeaders } from '@tanstack/react-start/server';

import { auth } from '@/integrations/better-auth/auth';

import { MINUTE } from '@/lib/constants';
import { MemoryRateLimiter } from '@/lib/rate-limiter';

const limiter = new MemoryRateLimiter(100, MINUTE);

export const authMiddleware = createMiddleware().server(async ({ next }) => {
  const headers = getRequestHeaders();
  const session = await auth.api.getSession({
    headers,
  });

  return next({
    context: {
      session: session
        ? {
            ...session.session,
            user: session.user,
          }
        : null,
    },
  });
});

export const requiredAuthMiddleware = createMiddleware()
  .middleware([authMiddleware])
  .server(({ next, context }) => {
    const session = context.session;

    if (!session) throw new Error('No session found');

    const result = limiter.isAllowed(session.user.id);

    if (!result.allowed) throw new Error('Rate limit exceeded');

    console.log(limiter.store);

    return next({
      context: {
        session,
      },
    });
  });
