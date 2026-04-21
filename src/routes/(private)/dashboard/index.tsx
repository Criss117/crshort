import { LinksScreen } from '@/presentation/screens/links.screen';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(private)/dashboard/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <LinksScreen />;
}
