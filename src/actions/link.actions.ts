import { db } from "@/lib/db";
import { link } from "@/lib/schemas/links.schema";
import { getActionState } from "@astrojs/react/actions";
import type { SafeResult } from "astro/actions/runtime/shared.js";
import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";
import { and, eq } from "drizzle-orm";
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
        .where(and(eq(link.userId, user.id)));

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
