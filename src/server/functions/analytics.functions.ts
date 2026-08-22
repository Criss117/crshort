import { createServerFn } from '@tanstack/react-start';

import { requiredAuthMiddleware } from '@/application/actions/middlewares';
import {
  getLinkAnalytics,
  getLinkAnalyticsSummary,
} from '@/application/services/analytics.service';
import { linkAnalyticsValidator } from '@/lib/validators/analytics.validator';

export const findLinkAnalyticsAction = createServerFn()
  .middleware([requiredAuthMiddleware])
  .validator(linkAnalyticsValidator)
  .handler(({ context, data }) =>
    getLinkAnalytics(context.session.user.id, data),
  );

export const findLinkAnalyticsSummaryAction = createServerFn()
  .middleware([requiredAuthMiddleware])
  .validator(linkAnalyticsValidator)
  .handler(({ context, data }) =>
    getLinkAnalyticsSummary(context.session.user.id, data),
  );
