import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(landing)/_layout/how-its-works')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(landing)/_layout/how-its-work"!</div>
}
