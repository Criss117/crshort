import { useId, useState } from 'react';
import { LinkIcon, PlusIcon } from 'lucide-react';
import { useForm } from '@tanstack/react-form';
import { toast } from 'sonner';

import { createLinkValidator } from '@/application/validators/link.validators';
import { useMutateLinks } from '@/application/hooks/use-mutate-links';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/presentation/components/ui/dialog';
import { Button } from '@/presentation/components/ui/button';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/presentation/components/ui/field';
import { Input } from '@/presentation/components/ui/input';

interface Props {
  label?: string;
}

export function CreateLink({ label }: Props) {
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
      const toastLoadingId = toast.loading('Creando enlace', {
        description: 'El enlace se creará en breve',
      });

      create.mutate(value, {
        onSettled: () => {
          toast.dismiss(toastLoadingId);
        },
        onSuccess: () => {
          toast.success('Enlace creado');
          form.reset();
          setOpen(false);
        },
        onError: () => {
          toast.error('Error al crear el enlace');
        },
      });
    },
  });

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) form.reset();
        setOpen(v);
      }}
    >
      <DialogTrigger
        render={(props) => (
          <Button
            className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-accent text-accent-foreground"
            {...props}
          >
            <PlusIcon />
            {label || 'Crear Enlace'}
          </Button>
        )}
      />
      <DialogContent className="min-w-120">
        <DialogHeader className="flex flex-row items-center gap-x-2">
          <LinkIcon />
          <DialogTitle>Nuevo Enlace</DialogTitle>
        </DialogHeader>

        <form
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
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Nuevo Enlace</FieldLabel>
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
                  <FieldDescription>
                    Ingrese el Enlace que desea acortar
                  </FieldDescription>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
        </form>

        <DialogFooter>
          <DialogClose
            render={(props) => (
              <Button {...props} variant="outline">
                Cancelar
              </Button>
            )}
          />
          <Button type="submit" form={formId} disabled={create.isPending}>
            Guadar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
