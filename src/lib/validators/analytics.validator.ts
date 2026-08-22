import { z } from 'zod';

const date = z.iso.date();

export const analyticsDateRangeValidator = z
  .object({
    from: date,
    to: date,
  })
  .superRefine(({ from, to }, context) => {
    const fromDate = new Date(`${from}T00:00:00.000Z`);
    const toDate = new Date(`${to}T00:00:00.000Z`);

    if (fromDate > toDate) {
      context.addIssue({
        code: 'custom',
        path: ['to'],
        message: 'La fecha final debe ser posterior o igual a la inicial',
      });
      return;
    }

    if (toDate.getTime() - fromDate.getTime() > 365 * 24 * 60 * 60 * 1000) {
      context.addIssue({
        code: 'custom',
        path: ['to'],
        message: 'Rango máximo 365 días',
      });
    }
  });

export const linkOwnershipValidator = z.object({
  linkId: z.string().min(1, 'El enlace es obligatorio'),
});

export const linkAnalyticsValidator = analyticsDateRangeValidator.extend({
  linkId: z.string().min(1, 'El enlace es obligatorio'),
});

export type LinkAnalyticsInput = z.infer<typeof linkAnalyticsValidator>;
