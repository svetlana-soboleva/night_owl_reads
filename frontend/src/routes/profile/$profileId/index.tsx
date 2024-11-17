import { StoryForm } from "@/components/stories/StoryForm";
import { generateStory } from "@/data/api";
import { StoryInput } from "@/data/types/types";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Loading } from '../../../components/loading/LoadingCard';

export const Route = createFileRoute("/profile/$profileId/")({
  component: ProfileComponent,
});

function ProfileComponent() {
  const { user } = useUser();
  const { userId } = useAuth();

  const { mutate, isPending, isError, Loading} = useMutation({
    mutationFn: (payload) => generateStory(payload, userId),
  })

  const handleFormSubmit = (formData: StoryInput) => {
    mutate(formData); 
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <h1 className="badge badge-ghost p-4">Hello {user?.firstName}!</h1>
      <StoryForm onSubmit={handleFormSubmit} />
      {isPending || Loading && <p>Generating your story...</p>}
      {isError && <p className="text-red-500">Something went wrong. Please try again!</p>}
    </div>
  );
}
