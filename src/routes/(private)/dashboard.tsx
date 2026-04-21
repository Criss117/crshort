import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
} from '@tanstack/react-router';
import { LinkIcon } from 'lucide-react';

import { getSessionQueryOptions } from '@/application/queries/auth.queries';
import { UserButton } from '@/presentation/components/user-button';
import { CreateLink } from '@/presentation/components/create-link';
import { Toast } from '@heroui/react/toast';
import { findAllLinksQueryOptions } from '@/application/queries/link.queries';

export const Route = createFileRoute('/(private)/dashboard')({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    const auth = await context.queryClient.fetchQuery(getSessionQueryOptions);

    if (!auth) {
      throw redirect({
        to: '/auth/sign-in',
      });
    }

    return { auth };
  },
  loader: ({ context }) => {
    void context.queryClient.prefetchQuery(findAllLinksQueryOptions);

    return context.auth;
  },
});

function RouteComponent() {
  const auth = Route.useLoaderData();

  return (
    <div className="min-h-screen">
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link to="/dashboard" className="flex items-center gap-2">
                <div className="size-8 bg-accent rounded-full flex items-center justify-center">
                  <LinkIcon />
                </div>
                <span className="font-bold text-lg">crshort</span>
              </Link>
              <div className="hidden sm:block w-px h-6 bg-border"></div>
              <h1 className="text-lg font-semibold hidden sm:block">
                Dashboard
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <CreateLink />
              <UserButton user={auth.user} />
            </div>
          </div>
        </div>
      </header>
      <main className="px-6 max-w-7xl mx-auto">
        <Outlet />
      </main>
      <Toast.Provider placement="top" />
    </div>
  );
}
