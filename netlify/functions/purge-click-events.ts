import { purgeClickEventsOlderThan } from '@/integrations/db/queries/analytics.queries';

const RETENTION_DAYS = 365;

export default async function purgeClickEvents(): Promise<void> {
  const deletedCount = await purgeClickEventsOlderThan(RETENTION_DAYS);

  console.info(
    `Click event retention sweep completed: deleted ${deletedCount} events older than ${RETENTION_DAYS} days`,
  );
}

export const config = {
  schedule: '0 2 * * *',
};
