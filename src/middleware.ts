import { defineMiddleware } from "astro:middleware";
import { auth } from "./lib/auth";
import { BETTER_AUTH_URL } from "astro:env/server";

const publicPaths = [
  `${BETTER_AUTH_URL}/`,
  `${BETTER_AUTH_URL}/terms`,
  `${BETTER_AUTH_URL}/privacy`,
];

export const onRequest = defineMiddleware(async (context, next) => {
  const path = context.request.url;

  if (publicPaths.includes(path)) {
    context.locals.user = null;
    context.locals.session = null;

    return next();
  }

  const isAuthed = await auth.api.getSession({
    headers: context.request.headers,
  });

  if (isAuthed) {
    context.locals.user = isAuthed.user;
    context.locals.session = isAuthed.session;
  } else {
    context.locals.user = null;
    context.locals.session = null;
  }

  return next();
});
