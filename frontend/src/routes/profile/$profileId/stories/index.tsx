import { ErrorBadge } from "@/components/badge/ErrorBadge";
import { LoadingBubbles } from "@/components/loading/LoadingBubbles";
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
    queryKey: ["user_stories"],
    queryFn: () => {
      console.log("Got all stories")
      return getAllStoriesByUserId(profileId)},

    enabled: !!profileId,
  });

  if (isLoading) {
    return <LoadingBubbles />;
  }

  if (isError) {
    return <ErrorBadge />;
  }

  if(stories && stories?.length <= 0){
    return "No stories"
  }

  return (
    <div className="backdrop-blur-md bg-transparent h-full m-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-center p-4">
      {stories?.map((story) => (
        <StoryCard profileId={profileId} key={story.id} story={story} />
      ))}
    </div>
  );
}
