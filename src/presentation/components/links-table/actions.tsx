import { Button } from '@heroui/react/button';
import { Dropdown } from '@heroui/react/dropdown';
import { Label } from '@heroui/react/label';
import { AlertDialog } from '@heroui/react/alert-dialog';
import {
  BadgeCheckIcon,
  CircleOff,
  SettingsIcon,
  TrashIcon,
} from 'lucide-react';

import { useMutateLinks } from '@/application/hooks/use-mutate-links';
import type { LinkSelect } from '@/integrations/db/schemas/links.schema';

interface Props {
  link: LinkSelect;
}

function DeleteLink({ link }: Props) {
  const { remove } = useMutateLinks();

  return (
    <AlertDialog>
      <AlertDialog.Trigger className="menu-item menu-item--danger flex">
        <TrashIcon className="text-danger size-4" />
        <Label>Eliminar Enlace</Label>
      </AlertDialog.Trigger>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-100">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>
                Eliminar Enlace Permanentemente?
              </AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                Esta acción no se puede deshacer. ¿Estás seguro de que quieres
                eliminar el enlace permanentemente?
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancelar
              </Button>
              <Button
                variant="danger"
                onClick={() => remove.mutate([{ id: link.id }])}
              >
                Eliminar Enlace
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}

export function LinkTableActions({ link }: Props) {
  const { disable, enable } = useMutateLinks();

  const isPending = disable.isPending || enable.isPending;

  return (
    <Dropdown>
      <Button
        className="p-2 hover:bg-destructive/10 rounded-lg transition-colors"
        variant="ghost"
        size="sm"
        isIconOnly
      >
        <SettingsIcon className="text-destructive" />
      </Button>
      <Dropdown.Popover>
        <Dropdown.Menu selectionMode="multiple">
          {link.isActive ? (
            <Dropdown.Item
              textValue="Desactivar Enlace"
              isDisabled={isPending}
              onClick={() =>
                disable.mutate([
                  {
                    id: link.id,
                  },
                ])
              }
            >
              <CircleOff className="text-muted-foreground size-4" />
              <Label>Desactivar Enlace</Label>
            </Dropdown.Item>
          ) : (
            <Dropdown.Item
              textValue="Activar Enlace"
              isDisabled={isPending}
              onClick={() =>
                enable.mutate([
                  {
                    id: link.id,
                  },
                ])
              }
            >
              <BadgeCheckIcon className="text-muted-foreground size-4" />
              <Label>Activar Enlace</Label>
            </Dropdown.Item>
          )}
          <Dropdown.Item
            textValue="Eliminar Enlace"
            variant="danger"
            className="p-0 min-h-0"
          >
            <DeleteLink link={link} />
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}
