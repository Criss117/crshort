import { and, eq, sql } from "drizzle-orm";
import { drizzle, LibSQLDatabase } from "drizzle-orm/libsql";
import type { Context } from "@netlify/functions";
import { link } from "@/lib/schemas/links.schema";
import type { Client } from "@libsql/client";

async function updateLinkStats(
  db: LibSQLDatabase<Record<string, never>> & {
    $client: Client;
  },
  id: string,
) {
  await db
    .update(link)
    .set({
      lastClick: new Date(),
      clicks: sql`coalesce(${link.clicks}, 0) + 1`,
    })
    .where(eq(link.id, id));
}

export default async (req: Request, context: Context) => {
  const path = process.env.BETTER_AUTH_URL!;

  const db = drizzle({
    connection: {
      url: process.env.TURSO_DATABASE_URL!,
      authToken: process.env.TURSO_AUTH_TOKEN,
    },
  });

  const slug = req.url.split("/")[4];

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

  context.waitUntil(updateLinkStats(db, completeLink.id));

  return new Response(null, {
    status: 302,
    headers: {
      Location: completeLink.url,
    },
  });
};
