import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import type { ContactMessage } from '@/application/validators/contact.validators';
import { submitContactForm } from '@/application/actions/contact.actions';

export function useMutateContact() {
  const sendContact = useMutation({
    mutationKey: ['send-contact-message'],
    mutationFn: (data: ContactMessage) => submitContactForm({ data }),
    onSuccess: () => {
      toast.success('Gracias por tu mensaje', {
        description:
          'En teoría lo hemos recibido. En práctica, este formulario no envía nada a ningún lado. Pero apreciamos el intento. 🫡',
      });
    },
    onError: () => {
      toast.error('Algo salió mal. Intenta de nuevo.');
    },
  });

  return { sendContact };
}
