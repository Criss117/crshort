import { createFileRoute, redirect } from '@tanstack/react-router';

import { findLinkByIdQueryOptions } from '@/application/queries/link.queries';
import { LinkAnalyticsScreen } from '@/presentation/screens/link-analytics.screen';

export const Route = createFileRoute('/(private)/dashboard/links/$linkId')({
  loader: async ({ context, params }) => {
    try {
      return await context.queryClient.fetchQuery(
        findLinkByIdQueryOptions(params.linkId),
      );
    } catch {
      throw redirect({ to: '/dashboard' });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const link = Route.useLoaderData();

  return <LinkAnalyticsScreen link={link} />;
}
