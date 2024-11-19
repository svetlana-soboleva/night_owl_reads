import { ErrorBadge } from "@/components/badge/ErrorBadge";
import { ColorfullSpinners } from "@/components/loading/ColorfullSpinners";
import { StoryCard } from "@/components/stories/StoryCard";
import { getAllStoriesByUserId } from "@/data/api";
import { Story } from "@/data/types/types";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/profile/$profileId/stories/")({
  component: StoriesComponent,
});

function StoriesComponent() {
  const { profileId } = Route.useParams();
  const {
    data: stories,
    isLoading,
    isError,
  } = useQuery<Story[]>({
    queryKey: ["userStories", profileId],
    queryFn: () => getAllStoriesByUserId(profileId),

    enabled: !!profileId,
  });

  if (isLoading) {
    return <ColorfullSpinners />;
  }

  if (isError) {
    return <ErrorBadge />;
  }

  return (
    <div className="backdrop-blur-md bg-transparent h-full m-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-center p-4">
      {stories?.map((story) => (
        <StoryCard profileId={profileId} key={story.id} story={story} />
      ))}
    </div>
  );
}
