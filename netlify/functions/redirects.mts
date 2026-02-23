import type { Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  return new Response(null, {
    status: 302,
    headers: {
      Location:
        "https://docs.netlify.com/build/functions/get-started/?data-tab=TypeScript",
    },
  });
};
