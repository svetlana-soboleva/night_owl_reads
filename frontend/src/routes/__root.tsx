import { Footer } from "@/components/footer/Footer";
import { NavBar } from "@/components/navigation/NavBar";
import { RouterContext } from "@/data/types/types";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <div className="flex flex-col justify-between h-screen items-center p-4 bg-story-magic bg-cover bg-center min-h-screen">
      <NavBar />
      <Outlet />
      <TanStackRouterDevtools />
      <Footer/>
    </div>
  ),
});
