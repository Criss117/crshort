import { createServerFn } from '@tanstack/react-start';
import { and, desc, eq, inArray, or } from 'drizzle-orm';

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

    if (data.customSlug) {
      const exisingLink = await db
        .select({
          id: link.id,
        })
        .from(link)
        .where(
          or(
            eq(link.customSlug, data.customSlug.toLowerCase()),
            eq(link.slug, data.customSlug.toLowerCase()),
          ),
        )
        .limit(1);

      if (exisingLink.length > 0) {
        throw new Error('El slug personalizado ya está en uso');
      }
    }

    const slug = Math.random().toString(36).substring(2, 8);

    const [newLink] = await db
      .insert(link)
      .values({
        userId: user.id,
        url: data.url,
        customSlug: data.customSlug?.toLowerCase(),
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

export const disableManyLinksAction = createServerFn()
  .middleware([requiredAuthMiddleware])
  .inputValidator(deleteLinksValidator)
  .handler(async ({ context, data }) => {
    const user = context.session.user;

    await db
      .update(link)
      .set({ isActive: false })
      .where(
        and(
          eq(link.userId, user.id),
          inArray(
            link.id,
            data.map((i) => i.id),
          ),
        ),
      );
  });

export const enableManyLinksAction = createServerFn()
  .middleware([requiredAuthMiddleware])
  .inputValidator(deleteLinksValidator)
  .handler(async ({ context, data }) => {
    const user = context.session.user;

    await db
      .update(link)
      .set({ isActive: true })
      .where(
        and(
          eq(link.userId, user.id),
          inArray(
            link.id,
            data.map((i) => i.id),
          ),
        ),
      );
  });
