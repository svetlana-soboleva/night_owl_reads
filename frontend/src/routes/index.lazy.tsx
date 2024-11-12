import { StoryForm } from "@/components/stories/StoryForm";
import { WelcomeMsg } from "@/components/welcome/WelcomeMsg";
import { SignedOut } from "@clerk/clerk-react";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <SignedOut>
        <WelcomeMsg />
      </SignedOut>
      <StoryForm />
    </>
  );
}
