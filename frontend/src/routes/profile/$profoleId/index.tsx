import { StoryForm } from '@/components/stories/StoryForm'
import { createFileRoute, useParams } from '@tanstack/react-router'

export const Route = createFileRoute('/profile/$profoleId/')({
  component: ProfileComponent,
})

function ProfileComponent() {
  const { profileId } = useParams({ from: '/profile/$profoleId/' })

  return (
    <>
      <h1>Hi {profileId}</h1>
      <StoryForm />
    </>
  )
}
