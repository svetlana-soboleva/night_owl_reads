import { WelcomeMsg } from "@/components/welcome/WelcomeMsg";
import { SignedOut, useAuth } from "@clerk/clerk-react";

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
  const { isSignedIn, userId } = useAuth();

  if (isSignedIn) {
    throw redirect({ to: `/profile/${userId}` });
  }

  return (
    <>
      <SignedOut>
        <WelcomeMsg />
      </SignedOut>
    </>
  );
}
