import { z } from 'zod';

export const contactValidator = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Ingresa un correo electrónico válido'),
  subject: z.string().min(3, 'El asunto debe tener al menos 3 caracteres'),
  message: z.string().min(10, 'Cuéntanos algo más, al menos 10 caracteres'),
});

export type ContactMessage = z.infer<typeof contactValidator>;
