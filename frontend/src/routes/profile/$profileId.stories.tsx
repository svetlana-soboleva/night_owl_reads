import { createFileRoute, useParams } from '@tanstack/react-router'

export const Route = createFileRoute('/profile/$profileId/stories')({
  component: StoriesComponent,
})

function StoriesComponent() {
  const { profileId } = useParams({ from: '/profile/$profileId/stories' })
  return (
    <>
      <h1>Stories Page</h1>
      <p>Showing stories for user: {profileId}</p>
    </>
  )
}
