import { useAuth } from "@clerk/clerk-react";
import { z } from "zod";

export type RouterContext = {
  authentication: ReturnType<typeof useAuth>;
}

export const storySchema = z.object({
  hero: z.string().min(2, "Hero required"),
  place: z.string().min(2, "Place required"),
  companion: z.string().min(2, "Companion required"),
  quest: z.string().min(2, "Quest required"),
  emotions: z.string().min(2, "Emotions required"),
});

export type IFormInput = z.infer<typeof storySchema>;
