import { RouterProvider, createRouter } from "@tanstack/react-router";
import { useAuth } from "@clerk/clerk-react";
import { routeTree } from "./routeTree.gen";
import { Providers } from "./utils/providers";
import { ColorfullSpinners } from "./components/loading/ColorfullSpinners";

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
    return <ColorfullSpinners/>
  }
  return <RouterProvider router={router} context={{ authentication }} />;
};
