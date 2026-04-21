import { createFileRoute } from '@tanstack/react-router';

import { LinksScreen } from '@/presentation/screens/links.screen';

export const Route = createFileRoute('/(private)/dashboard/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <LinksScreen />;
}
