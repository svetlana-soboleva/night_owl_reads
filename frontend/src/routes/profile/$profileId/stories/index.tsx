import { ErrorBadge } from "@/components/badge/ErrorBadge";
import { LoadingBubbles } from "@/components/loading/LoadingBubbles";
import { StoryCard } from "@/components/stories/StoryCard";
import { getAllStoriesByUserId } from "@/data/api";
import { Story } from "@/data/types/types";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { P } from "node_modules/@clerk/clerk-react/dist/useAuth-DT1ot2zi.d.mts";

export const Route = createFileRoute("/profile/$profileId/stories/")({
  component: StoriesComponent,
});

function StoriesComponent() {
  const { profileId } = Route.useParams();

  const {
    data: stories,
    isLoading,
    isError,
    error,
  } = useQuery<Story[]>({
    queryKey: ["user_stories"],
    queryFn: () => {
      console.log("Got all stories");
      return getAllStoriesByUserId(profileId);
    },

    enabled: !!profileId,
  });

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center gap-8 backdrop-blur-sm bg-transparent h-60">
        <h1 className="text-2xl bg-gray-200 p-2 rounded-xl text-gray-700">Fairy dust is settling… it’ll sparkle in a moment</h1>
        <LoadingBubbles />
      </div>
    );
  }

  if (isError) {
    return <ErrorBadge error={error} />;
  }

  if (stories && stories?.length <= 0) {
    return "No stories";
  }

  return (
    <div className="backdrop-blur-md bg-transparent h-full m-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-center p-4">
      {stories?.map((story) => (
        <StoryCard profileId={profileId} key={story.id} story={story} />
      ))}
    </div>
  );
}
