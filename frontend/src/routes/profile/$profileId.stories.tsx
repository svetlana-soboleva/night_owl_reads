import { StoryCard } from "@/components/stories/StoryCard";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/profile/$profileId/stories")({
  component: StoriesComponent,
});

function StoriesComponent() {
  return (
    <div className="">
      <StoryCard />
    </div>
  );
}
