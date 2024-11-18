import { StoryCard } from '@/components/stories/StoryCard'
import { getAllStoriesByUserId } from '@/data/api'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/profile/$profileId/stories/')({
  component: StoriesComponent,
})

function StoriesComponent() {
  const { profileId } = Route.useParams()
  const {
    data: stories,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['userStories', profileId],
    queryFn: () => getAllStoriesByUserId(profileId),

    enabled: !!profileId,
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Something went wrong.</div>
  }

  return (
    <div className="grid grid-cols-4 gap-4 justify-center">
      {stories?.map((story) => <StoryCard key={story.id} story={story} />)}
    </div>
  )
}
