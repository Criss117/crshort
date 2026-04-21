import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(landing)/_layout/terms')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(landing)/_layout/terms"!</div>
}
