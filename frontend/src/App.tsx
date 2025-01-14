import { RouterProvider, createRouter } from "@tanstack/react-router";
import { useAuth } from "@clerk/clerk-react";
import { routeTree } from "./routeTree.gen";
import { Providers } from "./utils/providers";
import { LoadingBubbles } from "./components/loading/LoadingBubbles";

const router = createRouter({
  routeTree,
  context: { authentication: undefined! },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export const App = () => {
  return (
    <Providers>
      <RouterWrapper />
    </Providers>
  );
};

const RouterWrapper = () => {
  const authentication = useAuth();
  if (!authentication.isLoaded) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingBubbles />
      </div>
    );
  }
  return <RouterProvider router={router} context={{ authentication }} />;
};
