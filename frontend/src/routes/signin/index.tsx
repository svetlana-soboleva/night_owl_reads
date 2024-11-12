import { createFileRoute } from "@tanstack/react-router";
import { SignIn } from "@clerk/clerk-react";

import { Suspense } from "react";
import { Loading } from "@/components/loading/LoadingCard";

export const Route = createFileRoute("/signin/")({
  component: SignInPage,
});

function SignInPage() {
  return (
    <Suspense fallback={<Loading />}>
      <SignIn />
    </Suspense>
  );
}
