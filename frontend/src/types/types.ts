import { useAuth } from "@clerk/clerk-react";

export type RouterContext = {
  authentication: ReturnType<typeof useAuth>;
}