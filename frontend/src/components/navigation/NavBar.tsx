import { SignedIn, SignedOut, useAuth, UserButton } from "@clerk/clerk-react";
import { Link } from "@tanstack/react-router";
import {routes} from '@/utils/routes'

export const NavBar = () => {
  const {userId} = useAuth()
  return (
    <div className="navbar backdrop-blur-md bg-transparent rounded-2xl p-4">
      <div className="flex-1 ">
        <Link to={routes.home} className="btn btn-ghost text-xl">
          <img src="/owl4.png" alt="Home Icon" width="40" height="40" />
        </Link>
        <SignedIn>
          <Link
            to={routes.stories(userId!)}
            className="btn btn-ghost text-xl [&.active]:text-amber-300"
          >
            My stories
          </Link>
        </SignedIn>
      </div>
      <div className="flex-none">
        <div>
          <SignedOut>
            <Link
              className="btn btn-ghost text-xl [&.active]:text-amber-300"
              to={routes.signin}
            >
              Sign In
            </Link>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </div>
  );
};
