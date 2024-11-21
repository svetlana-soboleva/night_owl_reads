import { StoryForm } from "@/components/stories/StoryForm";
import { generateStory } from "@/data/api";
import { StoryInput } from "@/data/types/types";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { ErrorBadge } from "@/components/badge/ErrorBadge";
import { LoadingBubbles } from "@/components/loading/LoadingBubbles";
import { SelectLanguage } from "@/components/select/SelectLanguage";
import { useState } from "react";

export const Route = createFileRoute("/profile/$profileId/")({
  component: ProfileComponent,
});

function ProfileComponent() {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const { userId } = useAuth();
  const router = useRouter();
  const [language, setLanguage] = useState("en");

  const { mutate, isPending, isError, error } = useMutation({
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
      queryClient.invalidateQueries({ queryKey: ["user_stories"] });
      router.navigate({
        to: `/profile/${userId}/stories/${data.id}`,
      });
    },
  });

  const handleFormSubmit = (formData: StoryInput) => {
    console.log(formData);
    mutate({ language, payload: formData, userId: userId! });
    // mutation.mutate({ bla: sth });
  };

  const handleLanguageSelect = (selectedLanguage: string) => {
    console.log(selectedLanguage);
    setLanguage(selectedLanguage);
    console.log("selected" + language);
  };

  if (isError) return <ErrorBadge error={error} />;
  if (isPending)
    return (
      <div className="flex flex-col justify-center gap-8 backdrop-blur-sm bg-transparent h-60">
        <h1 className="text-2xl bg-gray-200 p-2 rounded-xl text-gray-700">
          Fairy dust is settling… it’ll sparkle in a moment
        </h1>
        <LoadingBubbles />
      </div>
    );

  return (
    <div className="flex flex-col gap-8 mt-4 w-full">
      <div className="flex justify-end">
        <SelectLanguage onLanguageSelect={handleLanguageSelect} />
      </div>
      <div className="flex flex-col justify-center items-center gap-4">
        <h1 className="badge badge-ghost p-4 tracking-widest text-2xl">
          Hello {user?.firstName}!
        </h1>
        <h1 className="badge badge-secondary p-4 tracking-wide text-lg md:text-xl">
          ✨It's time to create your STORY✨
        </h1>
        <StoryForm onSubmit={handleFormSubmit} />
      </div>
    </div>
  );
}
