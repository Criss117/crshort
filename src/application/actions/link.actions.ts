import { createServerFn } from '@tanstack/react-start';
import { and, desc, eq, inArray } from 'drizzle-orm';

import { db } from '@/integrations/db';
import { link } from '@/integrations/db/schemas/links.schema';
import {
  createLinkValidator,
  deleteLinksValidator,
} from '@/application/validators/link.validators';
import { requiredAuthMiddleware } from '@/application/actions/middlewares';

export const createLinkAction = createServerFn()
  .middleware([requiredAuthMiddleware])
  .inputValidator(createLinkValidator)
  .handler(async ({ context, data }) => {
    const user = context.session.user;

    const slug = Math.random().toString(36).substring(2, 8);

    const [newLink] = await db
      .insert(link)
      .values({
        userId: user.id,
        url: data.url,
        slug,
      })
      .returning();

    return newLink;
  });

export const findAllLinksAction = createServerFn()
  .middleware([requiredAuthMiddleware])
  .handler(async ({ context }) => {
    const user = context.session.user;

    const links = await db
      .select()
      .from(link)
      .where(and(eq(link.userId, user.id)))
      .orderBy(desc(link.createdAt));

    return links;
  });

export const deleteManyLinksAction = createServerFn()
  .middleware([requiredAuthMiddleware])
  .inputValidator(deleteLinksValidator)
  .handler(async ({ context, data }) => {
    const user = context.session.user;

    await db.delete(link).where(
      and(
        eq(link.userId, user.id),
        inArray(
          link.id,
          data.map((i) => i.id),
        ),
      ),
    );
  });
