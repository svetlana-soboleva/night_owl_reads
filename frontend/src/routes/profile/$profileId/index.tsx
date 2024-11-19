import { StoryForm } from "@/components/stories/StoryForm";
import { generateStory } from "@/data/api";
import { StoryInput } from "@/data/types/types";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ErrorBadge } from "@/components/badge/ErrorBadge";
import { LoadingBubbles } from "@/components/loading/LoadingBubbles";

export const Route = createFileRoute("/profile/$profileId/")({
  component: ProfileComponent,
});

function ProfileComponent() {
  const { user } = useUser();
  const { userId } = useAuth();
  const navigate = useNavigate(); 

  const { mutate, isPending, isError} = useMutation({
    mutationFn: (payload) => generateStory(payload, userId),
    onSuccess: (data) => {
      navigate(`/profile/${userId}/stories/${data.id}`);
    },
  });

  const handleFormSubmit = (formData: StoryInput) => {
    mutate(formData);
  };

  if (isError) return <ErrorBadge/>;
  if (isPending) return <LoadingBubbles />;
  // if(data) return <div>redirect</div>

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <h1 className="badge badge-ghost p-4">Hello {user?.firstName}!</h1>
      <StoryForm onSubmit={handleFormSubmit} />
    </div>
  );
}
