import { and, asc, desc, eq, gte, lt, sql } from 'drizzle-orm';

import { db } from '@/integrations/db';
import { clickEvents } from '@/integrations/db/schemas/links.schema';

const DEFAULT_RETENTION_DAYS = 365;

export type AnalyticsDateRange = {
  from: Date;
  to: Date;
};

const rangeWhere = (linkId: string, range: AnalyticsDateRange) =>
  and(
    eq(clickEvents.linkId, linkId),
    gte(clickEvents.clickedAt, range.from),
    lt(clickEvents.clickedAt, range.to),
  );

const day = sql<string>`strftime('%Y-%m-%d', ${clickEvents.clickedAt} / 1000, 'unixepoch')`;

export async function findClicksByDay(
  linkId: string,
  range: AnalyticsDateRange,
) {
  return db
    .select({
      date: day,
      clicks: sql<number>`count(*)`,
    })
    .from(clickEvents)
    .where(rangeWhere(linkId, range))
    .groupBy(day)
    .orderBy(asc(day));
}

export async function findTopCountries(
  linkId: string,
  range: AnalyticsDateRange,
  limit = 10,
) {
  const country = sql<string>`coalesce(${clickEvents.countryCode}, 'unknown')`;

  return db
    .select({
      country,
      clicks: sql<number>`count(*)`,
    })
    .from(clickEvents)
    .where(rangeWhere(linkId, range))
    .groupBy(country)
    .orderBy(desc(sql`count(*)`))
    .limit(limit);
}

export async function findTopReferrers(
  linkId: string,
  range: AnalyticsDateRange,
  limit = 10,
) {
  const referrer = sql<string>`coalesce(${clickEvents.referrerHost}, 'direct')`;

  return db
    .select({
      referrer,
      clicks: sql<number>`count(*)`,
    })
    .from(clickEvents)
    .where(rangeWhere(linkId, range))
    .groupBy(referrer)
    .orderBy(desc(sql`count(*)`))
    .limit(limit);
}

export async function findTopDevices(
  linkId: string,
  range: AnalyticsDateRange,
  limit = 10,
) {
  return db
    .select({
      device: clickEvents.deviceType,
      clicks: sql<number>`count(*)`,
    })
    .from(clickEvents)
    .where(rangeWhere(linkId, range))
    .groupBy(clickEvents.deviceType)
    .orderBy(desc(sql`count(*)`))
    .limit(limit);
}

export async function countClicks(linkId: string, range: AnalyticsDateRange) {
  const [result] = await db
    .select({ clicks: sql<number>`count(*)` })
    .from(clickEvents)
    .where(rangeWhere(linkId, range));

  return result.clicks;
}

/** Delete click events older than the requested retention window. */
export async function purgeClickEventsOlderThan(
  days = DEFAULT_RETENTION_DAYS,
): Promise<number> {
  const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  const result = await db
    .delete(clickEvents)
    .where(lt(clickEvents.createdAt, cutoff));

  return result.rowsAffected;
}
