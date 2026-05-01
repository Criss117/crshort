import { createServerFn } from '@tanstack/react-start';
import { and, desc, eq, inArray, ne, or, sql } from 'drizzle-orm';

import { db } from '@/integrations/db';
import {
  link,
  linkTag,
  tag,
  type LinkWithTags,
} from '@/integrations/db/schemas/links.schema';
import { prepareTagData } from '@/lib/tag-utils';

import {
  createLinkValidator,
  deleteLinksValidator,
  updateCustomSlugValidator,
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

    const tags = prepareTagData(data.tags);

    const result = await db.transaction(async (tx) => {
      const [newLink] = await tx
        .insert(link)
        .values({
          userId: user.id,
          url: data.url,
          customSlug: data.customSlug?.toLowerCase(),
          slug,
        })
        .returning();

      // Skip tag processing if no tags provided
      if (tags.length === 0) {
        return newLink;
      }

      for (const tagData of tags) {
        // Case-insensitive lookup via LOWER(slug)
        const [existingTag] = await tx
          .select()
          .from(tag)
          .where(
            and(
              eq(tag.userId, user.id),
              sql`LOWER(${tag.slug}) = ${tagData.slug}`,
            ),
          )
          .limit(1);

        let tagId: string;
        if (existingTag) {
          tagId = existingTag.id;
        } else {
          const [newTag] = await tx
            .insert(tag)
            .values({
              name: tagData.name,
              slug: tagData.slug,
              color: tagData.color,
              userId: user.id,
            })
            .returning();
          tagId = newTag.id;
        }

        await tx.insert(linkTag).values({
          linkId: newLink.id,
          tagId,
        });
      }

      return newLink;
    });

    return result;
  });

export const findAllLinksAction = createServerFn()
  .middleware([requiredAuthMiddleware])
  .handler(async ({ context }) => {
    const user = context.session.user;

    const links = await db.query.link.findMany({
      where: eq(link.userId, user.id),
      orderBy: desc(link.createdAt),
      with: {
        linkTags: {
          with: {
            tag: true,
          },
        },
      },
    });

    return links as unknown as LinkWithTags[];
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

export const updateCustomSlugAction = createServerFn()
  .middleware([requiredAuthMiddleware])
  .inputValidator(updateCustomSlugValidator)
  .handler(async ({ context, data }) => {
    const user = context.session.user;

    // Check if another link already has this slug (excluding this link)
    const existingLink = await db
      .select({
        id: link.id,
      })
      .from(link)
      .where(
        and(
          ne(link.id, data.id),
          or(
            eq(link.customSlug, data.customSlug.toLowerCase()),
            eq(link.slug, data.customSlug.toLowerCase()),
          ),
        ),
      )
      .limit(1);

    if (existingLink.length > 0) {
      throw new Error('El slug personalizado ya está en uso');
    }

    await db
      .update(link)
      .set({ customSlug: data.customSlug.toLowerCase() })
      .where(and(eq(link.userId, user.id), eq(link.id, data.id)));
  });
