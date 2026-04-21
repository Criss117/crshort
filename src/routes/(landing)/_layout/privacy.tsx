import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(landing)/_layout/privacy')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(landing)/_layout/privacy"!</div>
}
