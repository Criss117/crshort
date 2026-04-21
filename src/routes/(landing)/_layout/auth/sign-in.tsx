import { createFileRoute, redirect } from '@tanstack/react-router';

import { SignInScreen } from '@/presentation/screens/sign-in.screen';
import { getSessionQueryOptions } from '@/application/queries/auth.queries';

export const Route = createFileRoute('/(landing)/_layout/auth/sign-in')({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    const auth = await context.queryClient.fetchQuery(getSessionQueryOptions);

    if (auth) {
      throw redirect({
        to: '/dashboard',
      });
    }
  },
});

function RouteComponent() {
  return <SignInScreen />;
}
