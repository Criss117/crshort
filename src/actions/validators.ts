import { z } from "astro:schema";

export const createLinkValidator = z.object({
  url: z
    .string({ required_error: "La url es obligatoria" })
    .url("La url no es válida"),
});
