import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Link } from "@tanstack/react-router";

export const NavBar = () => {
  return (
    <div className="navbar backdrop-blur-md bg-transparent rounded-2xl p-4">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          <img src="/owl4.png" alt="Home Icon" width="40" height="40" />
        </Link>
        <SignedIn>
          <Link
            to="/myStories"
            className="btn btn-ghost text-xl [&.active]:text-amber-300"
          >
            My stories
          </Link>
        </SignedIn>
      </div>
      <div className="flex-none">
        <div className="btn btn-ghost text-xl text-white">
          <SignedOut>
            <Link
              className="btn btn-ghost text-xl [&.active]:text-amber-300"
              to="/signin"
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
