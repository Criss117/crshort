import { useId, useState } from 'react';
import { LinkIcon, PlusIcon } from 'lucide-react';
import { useForm } from '@tanstack/react-form';
import { Button } from '@heroui/react/button';
import { Modal } from '@heroui/react/modal';
import { Form } from '@heroui/react/form';
import { TextField } from '@heroui/react/textfield';
import { FieldError } from '@heroui/react/field-error';
import { Input } from '@heroui/react/input';
import { Description } from '@heroui/react/description';
import { toast } from '@heroui/react/toast';
import { Label } from '@heroui/react/label';

import { createLinkValidator } from '@/application/validators/link.validators';
import { useMutateLinks } from '@/application/hooks/use-mutate-links';
import { SECOND } from '@/lib/constants';

export function CreateLink() {
  const formId = `create-link-form-${useId()}`;
  const [open, setOpen] = useState(false);
  const { create } = useMutateLinks();

  const form = useForm({
    defaultValues: {
      url: '',
    },
    validators: {
      onChange: createLinkValidator,
    },
    onSubmit: ({ value }) => {
      const toastLoadingId = toast('Creando enlace', {
        description: 'El enlace se creará en breve',
        isLoading: true,
        timeout: 0,
      });

      create.mutate(value, {
        onSettled: () => {
          toast.close(toastLoadingId);
        },
        onSuccess: () => {
          toast.success('Enlace creado', {
            timeout: 5 * SECOND,
          });
          form.reset();
          setOpen(false);
        },
        onError: () => {
          toast.danger('Error al crear el enlace', {
            timeout: 5 * SECOND,
          });
        },
      });
    },
  });

  return (
    <Modal
      isOpen={open}
      onOpenChange={(v) => {
        if (!v) form.reset();
        setOpen(v);
      }}
    >
      <Button>
        <PlusIcon />
        Crear Enlace
      </Button>
      <Modal.Backdrop variant="blur">
        <Modal.Container>
          <Modal.Dialog>
            <Modal.CloseTrigger />
            <Modal.Header className="flex flex-row items-center gap-x-2">
              <Modal.Icon>
                <LinkIcon />
              </Modal.Icon>
              <Modal.Heading>Nuevo Enlace</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <Form
                id={formId}
                onSubmit={(e) => {
                  e.preventDefault();
                  form.handleSubmit();
                }}
              >
                <form.Field
                  name="url"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;

                    return (
                      <TextField
                        name={field.name}
                        type="text"
                        isInvalid={isInvalid}
                      >
                        <Label htmlFor={field.name}>Nuevo Enlace</Label>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          placeholder="https://crshort.com/new-link"
                          autoComplete="off"
                          className="mx-1"
                        />
                        <Description>
                          Ingrese el Enlace que desea acortar
                        </Description>
                        <FieldError>
                          {field.state.meta.errors.map((err, i) => (
                            <p key={i}>{err?.message}</p>
                          ))}
                        </FieldError>
                      </TextField>
                    );
                  }}
                />
              </Form>
            </Modal.Body>

            <Modal.Footer>
              <Button
                slot="close"
                variant="outline"
                isDisabled={create.isPending}
              >
                Cancel
              </Button>
              <Button type="submit" form={formId} isDisabled={create.isPending}>
                Guadar
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
