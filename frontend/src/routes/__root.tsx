import { NavBar } from "@/components/navigation/NavBar";
import { RouterContext } from "@/types/types";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <div className="flex flex-col justify-between items-center p-4 bg-story-magic bg-cover bg-center min-h-screen">
      <NavBar />
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  ),
});
