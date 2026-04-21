import { createFileRoute } from '@tanstack/react-router';
import { and, eq, sql } from 'drizzle-orm';

import { db } from '@/integrations/db';
import { link } from '@/integrations/db/schemas/links.schema';
import { serverEnv } from '@/lib/config';

async function updateLinkStats(id: string) {
  await db
    .update(link)
    .set({
      lastClick: new Date(),
      clicks: sql`coalesce(${link.clicks}, 0) + 1`,
    })
    .where(eq(link.id, id));
}

export const Route = createFileRoute('/r/$slug')({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const slug = params.slug;
        const path = serverEnv.BETTER_AUTH_URL;

        const completeLinks = await db
          .select({
            id: link.id,
            url: link.url,
          })
          .from(link)
          .where(and(eq(link.slug, slug), eq(link.isActive, true)))
          .limit(1);

        const completeLink = completeLinks.at(0);

        if (!completeLink) {
          return new Response(null, {
            status: 302,
            headers: {
              Location: `${path}/404`,
            },
          });
        }

        void updateLinkStats(completeLink.id);

        return new Response(null, {
          status: 302,
          headers: {
            Location: completeLink.url,
          },
        });
      },
    },
  },
});
