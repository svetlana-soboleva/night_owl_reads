import { StoryForm } from "@/components/stories/StoryForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/profile/$profileId")({
  component: RouteComponent,
});

function RouteComponent() {
  return <StoryForm />;
}
