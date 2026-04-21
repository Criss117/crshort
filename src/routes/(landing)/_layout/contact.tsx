import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(landing)/_layout/contact')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/(landing)/_layout/contact"!</div>;
}
