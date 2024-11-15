import { StoryForm } from "@/components/stories/StoryForm";
import { useUser } from "@clerk/clerk-react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/profile/$profileId/")({
  component: ProfileComponent,
});

function ProfileComponent() {
  const { user } = useUser();

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <h1 className="badge badge-ghost p-4">Hello {user?.firstName}!</h1>
      <StoryForm />
    </div>
  );
}
