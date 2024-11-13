// import { StoryForm } from '@/components/stories/StoryForm'
import { WelcomeMsg } from "@/components/welcome/WelcomeMsg";
import { SignedOut } from "@clerk/clerk-react";

import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: ({ context }) => {
    const { isSignedIn, userId } = context.authentication;
    if (isSignedIn) {
      throw redirect({ to: `/profile/${userId}` });
    }
  },
  component: Index,
});

function Index() {
  return (
    <>
      <SignedOut>
        <WelcomeMsg />
      </SignedOut>
    </>
  );
}
