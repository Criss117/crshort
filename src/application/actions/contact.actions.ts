import { createServerFn } from '@tanstack/react-start';

import { contactValidator } from '@/application/validators/contact.validators';

export const submitContactForm = createServerFn()
  .inputValidator(contactValidator)
  .handler(async () => {
    return {
      success: true,
      message:
        'Gracias por tu mensaje. En teoría lo hemos recibido. En práctica, este formulario no envía nada a ningún lado. Pero apreciamos el intento. 🎉',
    };
  });
