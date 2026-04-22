import { useRouter } from '@tanstack/react-router';
import { useQueryClient } from '@tanstack/react-query';
import { LogOutIcon } from 'lucide-react';
import type { User } from 'better-auth';

import { Label } from '@heroui/react/label';
import { Header } from '@heroui/react/header';
import { Avatar } from '@heroui/react/avatar';
import { Dropdown } from '@heroui/react/dropdown';
import { Separator } from '@heroui/react/separator';

import { authClient } from '@/integrations/better-auth/auth-client';
import { getSessionQueryOptions } from '@/application/queries/auth.queries';
import { ToogleThemeSwitch } from '@/presentation/components/toogle-theme';

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
    <Dropdown>
      <Dropdown.Trigger>
        <Avatar>
          {user.image !== null && (
            <Avatar.Image alt={user.name} src={user.image} />
          )}
          <Avatar.Fallback>{user.name.charAt(0)}</Avatar.Fallback>
        </Avatar>
      </Dropdown.Trigger>
      <Dropdown.Popover>
        <Dropdown.Menu selectionMode="multiple">
          <Dropdown.Section>
            <Header>Preferencias</Header>
            <Dropdown.Item className="p-0 min-h-0">
              <ToogleThemeSwitch className="menu-item menu-item--default" />
            </Dropdown.Item>
          </Dropdown.Section>
          <Separator />
          <Dropdown.Section>
            <Dropdown.Item variant="danger" onClick={handleLogOut} className="">
              <LogOutIcon size={16} className="text-danger" />
              <Label>Cerrar sesión</Label>
            </Dropdown.Item>
          </Dropdown.Section>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}
