import { z } from 'zod';

export const createLinkValidator = z.object({
  url: z.url({ error: 'El enlace es obligatorio' }),
  customSlug: z
    .string({
      error: 'El slug personalizado no es válido',
    })
    .min(5, 'El slug personalizado es muy corto')
    .max(10, 'El slug personalizado es muy largo')
    .optional(),
  tags: z.string().optional(),
});

export const deleteLinksValidator = z
  .array(
    z.object({
      id: z.string(),
    }),
  )
  .min(1, 'Debes seleccionar al menos un enlace para eliminar');

export const updateCustomSlugValidatorForm = z.object({
  customSlug: z
    .string({
      error: 'El slug personalizado no es válido',
    })
    .min(5, 'El slug personalizado es muy corto')
    .max(10, 'El slug personalizado es muy largo'),
});

export const updateCustomSlugValidator = z.object({
  id: z.uuid({ error: 'El ID del enlace no es válido' }),
  customSlug: z
    .string({
      error: 'El slug personalizado no es válido',
    })
    .min(5, 'El slug personalizado es muy corto')
    .max(10, 'El slug personalizado es muy largo'),
});

export type CreateLink = z.infer<typeof createLinkValidator>;
export type DeleteLinks = z.infer<typeof deleteLinksValidator>;
export type UpdateCustomSlug = z.infer<typeof updateCustomSlugValidator>;
