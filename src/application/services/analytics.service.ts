import { and, eq } from 'drizzle-orm';

import {
  countClicks,
  findClicksByDay,
  findTopCountries,
  findTopDevices,
  findTopReferrers,
} from '@/integrations/db/queries/analytics.queries';
import type { AnalyticsDateRange } from '@/integrations/db/queries/analytics.queries';
import { db } from '@/integrations/db';
import { link } from '@/integrations/db/schemas/links.schema';
import type { LinkAnalyticsInput } from '@/lib/validators/analytics.validator';

function toDateRange(input: LinkAnalyticsInput): AnalyticsDateRange {
  return {
    from: new Date(`${input.from}T00:00:00.000Z`),
    to: new Date(
      `${input.to}T00:00:00.000Z`,
    ),
  };
}

function exclusiveEnd(date: Date) {
  return new Date(date.getTime() + 24 * 60 * 60 * 1000);
}

async function assertLinkOwnership(linkId: string, userId: string) {
  const ownedLink = await db.query.link.findFirst({
    columns: { id: true },
    where: and(eq(link.id, linkId), eq(link.userId, userId)),
  });

  if (!ownedLink) throw new Error('Link not found');
}

export async function getLinkAnalytics(
  userId: string,
  input: LinkAnalyticsInput,
) {
  await assertLinkOwnership(input.linkId, userId);
  const range = toDateRange(input);
  range.to = exclusiveEnd(range.to);

  const [timeSeries, countries, referrers, devices] = await Promise.all([
    findClicksByDay(input.linkId, range),
    findTopCountries(input.linkId, range),
    findTopReferrers(input.linkId, range),
    findTopDevices(input.linkId, range),
  ]);

  return { timeSeries, countries, referrers, devices };
}

export async function getLinkAnalyticsSummary(
  userId: string,
  input: LinkAnalyticsInput,
) {
  await assertLinkOwnership(input.linkId, userId);
  const range = toDateRange(input);
  range.to = exclusiveEnd(range.to);

  return {
    clicks: await countClicks(input.linkId, range),
  };
}
