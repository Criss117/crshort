import { useId, useState } from 'react';
import { LinkIcon, PlusIcon } from 'lucide-react';
import { toast } from 'sonner';

import {
  createLinkValidator,
  type CreateLink,
} from '@/application/validators/link.validators';
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
import { FieldGroup } from '@/presentation/components/ui/field';
import { useLinkForm } from './link-form';

interface Props {
  label?: string;
}

const defaultValues: CreateLink = {
  url: '',
  tags: '',
};

export function CreateLink({ label }: Props) {
  const formId = `create-link-form-${useId()}`;
  const [open, setOpen] = useState(false);
  const { create } = useMutateLinks();

  const form = useLinkForm({
    defaultValues,
    validators: {
      onChange: createLinkValidator,
    },
    onSubmit: ({ value }) => {
      const toastLoadingId = toast.loading('Creando enlace', {
        description: 'El enlace se creará en breve',
        position: 'top-center',
      });

      create.mutate(value, {
        onSettled: () => {
          toast.dismiss(toastLoadingId);
        },
        onSuccess: () => {
          toast.success('Enlace creado', {
            position: 'top-center',
          });
          form.reset();
          setOpen(false);
        },
        onError: (err) => {
          toast.error('Error al crear el enlace', {
            position: 'top-center',
            description: err.message,
          });
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
          <FieldGroup className="space-y-2">
            <form.AppField
              name="url"
              children={(field) => <field.LinkInput />}
            />
            <form.AppField
              name="customSlug"
              children={(field) => <field.CustomSlugInput />}
            />
            <form.AppField
              name="tags"
              children={(field) => <field.TagInput />}
            />
          </FieldGroup>
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
