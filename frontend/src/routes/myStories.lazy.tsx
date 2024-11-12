
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/myStories')({
  component: RouteComponent,
})

function RouteComponent() {
  return 'Hello /myStories!'
}
