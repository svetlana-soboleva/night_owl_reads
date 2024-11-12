import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <div className="flex flex-col justify-between items-center p-4 bg-story-magic bg-cover bg-center min-h-screen">
      <div className="navbar backdrop-blur-md bg-transparent rounded-2xl p-4">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">
            <img
              src="../../public/octopus (1).png"
              alt="Home Icon"
              width="54"
              height="54"
            />
          </a>
        </div>
        <div className="flex-none">
          <header className="btn btn-ghost text-xl text-white">
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>
        </div>
      </div>
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  ),
});
