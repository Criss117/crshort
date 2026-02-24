import { sql } from "drizzle-orm";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { v7 } from "uuid";
import { user } from "./auth.schema";

const uuidV7 = text("id")
  .primaryKey()
  .$defaultFn(() => v7());

const auditMetadata = {
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
    .$onUpdate(() => /* @__PURE__ */ new Date()),
  deletedAt: integer("deleted_at", { mode: "timestamp_ms" })
    .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
    .$onUpdate(() => /* @__PURE__ */ new Date()),
  isActive: integer("is_active", { mode: "boolean" }).default(true).notNull(),
};

export const link = sqliteTable(
  "link",
  {
    id: uuidV7,
    url: text("url").notNull(),
    slug: text("slug").notNull(),
    description: text("description"),
    clicks: integer("clicks").default(0).notNull(),
    lastClick: integer("last_click", { mode: "timestamp_ms" }),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, {
        onDelete: "cascade",
      }),

    ...auditMetadata,
  },
  (t) => [index("link_slug_idx").on(t.slug)],
);

export const tag = sqliteTable(
  "tag",
  {
    id: uuidV7,
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    color: text("color").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, {
        onDelete: "cascade",
      }),

    ...auditMetadata,
  },
  (t) => [index("tag_slug_idx").on(t.slug), index("tag_name_idx").on(t.name)],
);

export const linkTag = sqliteTable(
  "link_tag",
  {
    linkId: uuidV7.references(() => link.id, {
      onDelete: "cascade",
    }),
    tagId: uuidV7.references(() => tag.id, {
      onDelete: "cascade",
    }),

    ...auditMetadata,
  },
  (t) => [index("link_tag_ids_idx").on(t.linkId, t.tagId)],
);
