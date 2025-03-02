import { ErrorBadge } from "@/components/badge/ErrorBadge";
import { LoadingStory } from "@/components/loading/LoadingStory";
import { StoryPage } from "@/components/stories/StoryPage";
import { getStoryById } from "@/data/api";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/profile/$profileId/stories/$storyId")({
  component: RouteComponent,
});

function RouteComponent() {
  const storyId = useParams({
    from: "/profile/$profileId/stories/$storyId",
    select: (params) => params.storyId,
  });
  const storyIsNumber = parseInt(storyId);

  const {
    data: story,
    isError,
    isLoading,
    isPending,
    error,
  } = useQuery({
    queryKey: ["story", storyIsNumber],
    queryFn: () => getStoryById(storyIsNumber),
    enabled: !!storyIsNumber,
  });

  if (isLoading || isPending) {
    <LoadingStory />;
  }

  if (isError) {
    return <ErrorBadge error={error} />;
  }

  if (story) {
    return <StoryPage story={story} isLoading={isLoading || isPending} />;
  }

  return null;
}
