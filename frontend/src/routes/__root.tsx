import { Footer } from "@/components/footer/Footer";
import { NavBar } from "@/components/navigation/NavBar";
import { RouterContext } from "@/data/types/types";
import { createRootRouteWithContext, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <div className="flex flex-col justify-between items-center p-4 bg-story-magic bg-cover bg-center min-h-screen">
      <NavBar />
      <Outlet />
      <TanStackRouterDevtools />
      <Footer/>
    </div>
  ),
  notFoundComponent: () => {
    return (
    <div className="bg-gray-900 w-full h-full justify-center flex flex-col items-center rounded-lg m-4 opacity-90">
       <p className="text-2xl">Oh no! This page went on an adventure and got lost!</p>
       <Link className="text-purple-600 text-2xl" to="/">Go home</Link>
    </div>
   )
  },
});
