import { createRouteTree } from "@tanstack/react-router";
import { Route as HomeRoute } from "@/routes/index"; 
import { Route as ProfileRoute } from "@/routes/profile/$profileId/index"; // Profile route for "/profile/$profileId"
import { Route as StoriesRoute } from "@/routes/profile/$profileId/stories"; // Stories route for "/profile/$profileId/stories"
import { Route as SignInRoute } from "@/routes/signin/index"; // Sign-in route for "/signin"


export const routeTree = createRouteTree([
  HomeRoute, // "/"
  {
    path: "/profile",
    children: [
      ProfileRoute, // "/profile/$profileId"
      StoriesRoute, // "/profile/$profileId/stories"
    ],
  },
  SignInRoute, // "/signin"
]);
