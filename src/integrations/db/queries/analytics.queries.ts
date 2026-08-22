import { lt } from 'drizzle-orm';

import { db } from '@/integrations/db';
import { clickEvents } from '@/integrations/db/schemas/links.schema';

const DEFAULT_RETENTION_DAYS = 365;

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
