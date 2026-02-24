import { db } from "@/lib/db";
import { and, desc, eq } from "drizzle-orm";
import { link } from "@/lib/schemas/links.schema";
import { ActionError, defineAction } from "astro:actions";
import { createLinkValidator } from "./validators";

export const linkActions = {
  findAll: defineAction({
    handler: async (_, context) => {
      const user = context.locals.user;

      if (!user) {
        throw new ActionError({
          code: "UNAUTHORIZED",
          message: "Unauthorized",
        });
      }

      const links = await db
        .select()
        .from(link)
        .where(and(eq(link.userId, user.id)))
        .orderBy(desc(link.createdAt));

      return links;
    },
  }),

  create: defineAction({
    input: createLinkValidator,
    handler: async ({ url }, context) => {
      const user = context.locals.user;

      if (!user) {
        throw new ActionError({
          code: "UNAUTHORIZED",
          message: "Unauthorized",
        });
      }

      const slug = Math.random().toString(36).substring(2, 8);

      const [newLink] = await db
        .insert(link)
        .values({
          userId: user.id,
          url,
          slug,
        })
        .returning();

      return newLink;
    },
  }),
};
