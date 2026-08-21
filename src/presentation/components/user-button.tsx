import { useRouter } from '@tanstack/react-router';
import { useQueryClient } from '@tanstack/react-query';
import { LogOutIcon } from 'lucide-react';
import type { User } from 'better-auth';

import { authClient } from '@/integrations/better-auth/auth-client';
import { getSessionQueryOptions } from '@/application/queries/auth.queries';
import { ToogleThemeSwitch } from '@/presentation/components/toogle-theme';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/presentation/components/ui/avatar';
import { Separator } from '@/presentation/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface Props {
  user: User;
}

export function UserButton({ user }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();

  async function handleLogOut() {
    await authClient.signOut();
    queryClient.removeQueries(getSessionQueryOptions);

    await router.invalidate();
    router.navigate({
      to: '/',
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          {user.image !== null && (
            <AvatarImage alt={user.name} src={user.image} />
          )}
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Preferencias</DropdownMenuLabel>
          <DropdownMenuItem>
            <ToogleThemeSwitch />
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <Separator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleLogOut} variant="destructive">
            <LogOutIcon size={16} className="text-destructive" />
            Cerrar sesión
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
