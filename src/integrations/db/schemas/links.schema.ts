import { relations, sql } from 'drizzle-orm';
import {
  check,
  index,
  integer,
  primaryKey,
  sqliteTable,
  text,
  unique,
} from 'drizzle-orm/sqlite-core';
import { v7 } from 'uuid';

import { user } from '@/integrations/db/schemas/auth.schema';

const uuidV7 = text('id')
  .primaryKey()
  .$defaultFn(() => v7());

const auditMetadata = {
  createdAt: integer('created_at', { mode: 'timestamp_ms' })
    .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
    .notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp_ms' })
    .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  deletedAt: integer('deleted_at', { mode: 'timestamp_ms' }),
  isActive: integer('is_active', { mode: 'boolean' }).default(true).notNull(),
};

export const link = sqliteTable(
  'link',
  {
    id: uuidV7,
    url: text('url').notNull(),
    slug: text('slug', {
      length: 10,
    })
      .notNull()
      .unique(),
    customSlug: text('custom_slug', {
      length: 10,
    }).unique(),
    description: text('description'),
    clicks: integer('clicks').default(0).notNull(),
    lastClick: integer('last_click', { mode: 'timestamp_ms' }),
    userId: text('user_id')
      .notNull()
      .references(() => user.id, {
        onDelete: 'cascade',
      }),

    ...auditMetadata,
  },
  (t) => [
    index('link_slug_idx').on(t.slug),
    check('link_slug_min_length', sql`length(${t.slug}) >= 6`),
    check('link_slug_max_length', sql`length(${t.slug}) <= 10`),
    check('link_custom_slug_min_length', sql`length(${t.customSlug}) >= 5`),
    check('link_custom_slug_max_length', sql`length(${t.customSlug}) <= 10`),
  ],
);

export const tag = sqliteTable(
  'tag',
  {
    id: uuidV7,
    name: text('name').notNull(),
    slug: text('slug').notNull(),
    color: text('color').notNull(),
    userId: text('user_id')
      .notNull()
      .references(() => user.id, {
        onDelete: 'cascade',
      }),

    ...auditMetadata,
  },
  (t) => [
    index('tag_slug_idx').on(t.slug),
    index('tag_name_idx').on(t.name),
    unique('tag_slug_user_unique').on(t.slug, t.userId),
  ],
);

export const linkTag = sqliteTable(
  'link_tag',
  {
    linkId: text('link_id')
      .notNull()
      .references(() => link.id, {
        onDelete: 'cascade',
      }),
    tagId: text('tag_id')
      .notNull()
      .references(() => tag.id, {
        onDelete: 'cascade',
      }),
    createdAt: integer('created_at', { mode: 'timestamp_ms' })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .notNull(),
  },
  (t) => [
    primaryKey({ columns: [t.linkId, t.tagId] }),
    index('link_tag_ids_idx').on(t.linkId, t.tagId),
  ],
);

// ── Relations ────────────────────────────────────────────────

export const tagRelations = relations(tag, ({ many }) => ({
  linkTags: many(linkTag),
}));

export const linkTagRelations = relations(linkTag, ({ one }) => ({
  link: one(link, {
    fields: [linkTag.linkId],
    references: [link.id],
  }),
  tag: one(tag, {
    fields: [linkTag.tagId],
    references: [tag.id],
  }),
}));

export const linkRelations = relations(link, ({ many }) => ({
  linkTags: many(linkTag),
}));

// ── Types ────────────────────────────────────────────────────

export type LinkSelect = typeof link.$inferSelect;
export type TagSelect = typeof tag.$inferSelect;
export type LinkTagSelect = typeof linkTag.$inferSelect;

export type LinkInsert = typeof link.$inferInsert;
export type TagInsert = typeof tag.$inferInsert;
export type LinkTagInsert = typeof linkTag.$inferInsert;

/** Link with nested tags loaded via Drizzle relations */
export type LinkWithTags = LinkSelect & {
  linkTags: Array<{
    tag: TagSelect;
  }>;
};
