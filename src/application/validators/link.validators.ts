import { z } from 'zod';

export const createLinkValidator = z.object({
  url: z.url({ error: 'La url es obligatoria' }),
});

export const deleteLinksValidator = z
  .array(
    z.object({
      id: z.string(),
    }),
  )
  .min(1, 'Debes seleccionar al menos un enlace para eliminar');

export type CreateLink = z.infer<typeof createLinkValidator>;
export type DeleteLinks = z.infer<typeof deleteLinksValidator>;
