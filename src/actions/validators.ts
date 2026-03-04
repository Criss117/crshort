import { z } from "astro:schema";

export const createLinkValidator = z.object({
  url: z
    .string({ required_error: "La url es obligatoria" })
    .url("La url no es válida"),
});

export const deleteLinksValidator = z
  .array(
    z.object({
      id: z.string(),
    }),
  )
  .min(1, "Debes seleccionar al menos un enlace para eliminar");
