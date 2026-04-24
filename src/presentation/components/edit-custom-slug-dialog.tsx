import { useId } from 'react';
import { LinkIcon } from 'lucide-react';
import { toast } from 'sonner';

import { updateCustomSlugValidatorForm } from '@/application/validators/link.validators';
import type { UpdateCustomSlug } from '@/application/validators/link.validators';
import { useMutateLinks } from '@/application/hooks/use-mutate-links';
import { useEditCustomSlugDialog } from '@/presentation/contexts/edit-custom-slug-dialog';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/presentation/components/ui/dialog';
import { Button } from '@/presentation/components/ui/button';
import {
  Field,
  FieldGroup,
  FieldLabel,
} from '@/presentation/components/ui/field';
import { Input } from '@/presentation/components/ui/input';
import { useLinkForm } from './link-form';

interface Props {
  links: Array<{
    id: string;
    url: string;
    customSlug: string | null;
    slug: string;
  }>;
}

function EditSlugForm({ links }: Props) {
  const formId = `edit-slug-form-${useId()}`;
  const { isOpen, linkId, close } = useEditCustomSlugDialog();
  const { updateCustomSlug } = useMutateLinks();

  const currentLink = links.find((l) => l.id === linkId);

  // Default values when there's no customSlug yet
  const defaultValues = {
    customSlug: '',
  };

  const form = useLinkForm({
    defaultValues,
    validators: {
      onChange: updateCustomSlugValidatorForm,
    },
    onSubmit: ({ value }) => {
      if (!linkId) return;

      const data: UpdateCustomSlug = {
        id: linkId,
        customSlug: value.customSlug,
      };

      const toastLoadingId = toast.loading('Actualizando slug', {
        position: 'top-center',
      });

      updateCustomSlug.mutate(data, {
        onSettled: () => {
          toast.dismiss(toastLoadingId);
        },
        onSuccess: () => {
          toast.success('Slug actualizado', {
            position: 'top-center',
          });
          form.reset();
          close();
        },
        onError: (err) => {
          toast.error('Error al actualizar el slug', {
            position: 'top-center',
            description: err.message,
          });
        },
      });
    },
  });

  // Update form values when the link changes
  if (currentLink) {
    // Reset form with the current link's customSlug when opening
    if (form.state.values.customSlug !== (currentLink.customSlug ?? '')) {
      form.setFieldValue('customSlug', currentLink.customSlug ?? '');
    }
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(v) => {
        if (!v) close();
      }}
    >
      <DialogContent className="min-w-96">
        <DialogHeader className="flex flex-row items-center gap-x-2">
          <LinkIcon />
          <DialogTitle>Editar Slug Personalizado</DialogTitle>
        </DialogHeader>

        {currentLink && (
          <form
            id={formId}
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup className="space-y-3">
              <Field>
                <FieldLabel>URL Original</FieldLabel>
                <Input
                  value={currentLink.url}
                  readOnly
                  className="bg-muted text-muted-foreground cursor-not-allowed"
                  disabled
                />
              </Field>
              <form.AppField
                name="customSlug"
                children={(field) => <field.CustomSlugInput />}
              />
            </FieldGroup>
          </form>
        )}

        <DialogFooter>
          <DialogClose
            render={(props) => (
              <Button {...props} variant="outline">
                Cancelar
              </Button>
            )}
          />
          <Button
            type="submit"
            form={formId}
            disabled={updateCustomSlug.isPending}
          >
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function EditCustomSlugDialog({ links }: Props) {
  return <EditSlugForm links={links} />;
}
