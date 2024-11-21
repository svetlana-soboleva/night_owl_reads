import { SignedIn, SignedOut, useAuth, UserButton } from "@clerk/clerk-react";
import { Link } from "@tanstack/react-router";
import { routes } from "@/utils/routes";

export const NavBar = () => {
  const { userId } = useAuth();
  return (
    <div className="sticky top-0 z-10 navbar backdrop-blur-md bg-transparent  border-2 border-yellow-500  rounded-2xl p-4">
      <div className="flex-1 ">
        <Link to={routes.home} className="btn btn-ghost text-xl">
          <img src="/owl4.png" alt="Home Icon" width="40" height="40" />
        </Link>
        <SignedIn>
          <Link
            to={routes.stories(userId!)}
            params={{ profileId: userId! }}
            className="btn btn-ghost text-xl [&.active]:text-amber-300 [&.active]:shadow-[0_0_10px_#fbbf24,0_0_20px_#fbbf24]"
          >
            My stories
          </Link>
        </SignedIn>
        <SignedOut>
          <h1 className="text-purple-400 text-xl font-bold text-center w-full">
            NIGHT OWL READS
          </h1>
        </SignedOut>
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
