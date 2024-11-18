import { createFileRoute, useParams } from '@tanstack/react-router'

export const Route = createFileRoute('/profile/$profileId/stories/$storyId')({
  component: RouteComponent,
})

function RouteComponent() {

  const storyId = useParams({
    from: "/profile/$profileId/stories/$storyId",
     select: (params) => params.storyId,
    })
  return <div>{storyId}</div>
}
