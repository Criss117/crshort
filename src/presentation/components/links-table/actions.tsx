import {
  AlertCircle,
  BadgeCheckIcon,
  CircleOff,
  SettingsIcon,
  TrashIcon,
} from 'lucide-react';

import { useMutateLinks } from '@/application/hooks/use-mutate-links';
import type { LinkSelect } from '@/integrations/db/schemas/links.schema';

import { Button } from '@/presentation/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/presentation/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/presentation/components/ui/alert-dialog';

interface Props {
  link: LinkSelect;
}

function DeleteLink({ link }: Props) {
  const { remove } = useMutateLinks();

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={(props) => (
          <DropdownMenuItem
            variant="destructive"
            closeOnClick={false}
            {...props}
          />
        )}
      >
        <TrashIcon className="text-danger size-4" />
        <p>Eliminar Enlace</p>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia>
            <AlertCircle className="text-destructive" />
          </AlertDialogMedia>
          <AlertDialogTitle>Eliminar Enlace Permanentemente?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. ¿Estás seguro de que quieres
            eliminar el enlace permanentemente?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            render={(props) => (
              <Button variant="outline" {...props}>
                Cancelar
              </Button>
            )}
          />
          <Button
            variant="destructive"
            onClick={() => remove.mutate([{ id: link.id }])}
          >
            Eliminar Enlace
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function LinkTableActions({ link }: Props) {
  const { disable, enable } = useMutateLinks();

  const isPending = disable.isPending || enable.isPending;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={(props) => (
          <Button
            className="p-2 hover:bg-destructive/10 rounded-lg transition-colors"
            variant="ghost"
            size="icon"
            {...props}
          >
            <SettingsIcon />
          </Button>
        )}
      />
      <DropdownMenuContent className="w-48">
        <DropdownMenuGroup>
          {link.isActive ? (
            <DropdownMenuItem
              disabled={isPending}
              onClick={() =>
                disable.mutate([
                  {
                    id: link.id,
                  },
                ])
              }
            >
              <CircleOff className="text-muted-foreground size-4" />
              Desactivar Enlace
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              disabled={isPending}
              onClick={() =>
                enable.mutate([
                  {
                    id: link.id,
                  },
                ])
              }
            >
              <BadgeCheckIcon className="text-muted-foreground size-4" />
              Activar Enlace
            </DropdownMenuItem>
          )}
          <DeleteLink link={link} />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
