import { useAuth } from "@clerk/clerk-react";
import { z } from "zod";

export type RouterContext = {
  authentication: ReturnType<typeof useAuth>;
};

export const storySchema = z.object({
  hero: z.string().min(2, "Hero required").toLowerCase().trim(),
  place: z.string().min(2, "Place required").toLowerCase().trim(),
  companion: z.string().min(2, "Companion required").toLowerCase().trim(),
  quest: z.string().min(2, "Quest required").toLowerCase().trim(),
  emotion: z.string().min(2, "Emotions required").toLowerCase().trim(),
});

export type StoryInput = z.infer<typeof storySchema>;

export type StoryRequest = { language:string, payload: StoryInput, userId: string};

export interface StoryDTO {
  id: number;
  title: string;
}

export interface Story {
  id: number,
  imageUrls: string,
  title: string,
}

export interface Chunk {
  id: number,
  text: string
}

export interface SingleStoryPage {
  id: number,
  imageUrls: string,
  title: string,
  language: string,
  chunks: Chunk[]
}