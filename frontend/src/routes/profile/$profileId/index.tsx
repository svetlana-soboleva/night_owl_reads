import { StoryForm } from "@/components/stories/StoryForm";
import { generateStory } from "@/data/api";
import { StoryInput } from "@/data/types/types";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { ErrorBadge } from "@/components/badge/ErrorBadge";
import { LoadingBubbles } from "@/components/loading/LoadingBubbles";

export const Route = createFileRoute("/profile/$profileId/")({
  component: ProfileComponent,
});

function ProfileComponent() {
  const { user } = useUser();
  const { userId } = useAuth();
  const router = useRouter();

  const { mutate, isPending, isError } = useMutation({
    // const mutation = useMutation({
    mutationFn: generateStory,
    onMutate: async () => {
      console.log("onMutate");
    },
    onError: (error) => {
      console.log("onError", error);
    },
    onSuccess: (data) => {
      console.log("onSuccess", data.id);
      router.navigate({
        to: `/profile/${userId}/stories/${data.id}`,
      });
    },
  });

  const handleFormSubmit = (formData: StoryInput) => {
    mutate({ payload: formData, userId: "userid" });
    // mutation.mutate({ bla: sth });
  };

  if (isError) return <ErrorBadge />;
  if (isPending) return <LoadingBubbles />;

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <h1 className="badge badge-ghost p-4">Hello {user?.firstName}!</h1>
      <StoryForm onSubmit={handleFormSubmit} />
    </div>
  );
}
