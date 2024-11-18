import { StoryInput } from "./types/types";

const BASE_DEV_URL = "http://localhost:8080/stories";

export const generateStory = async (payload: StoryInput, userId: string) => {
  const response = await fetch(`${BASE_DEV_URL}/generate/${userId}`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json", 
      },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `Error: ${response.statusText}`);
  }
  console.log(await response.json());
  return response.json();
};

export const getAllStoriesByUserId = async(userId: string) => {
  try {
    const response = await fetch(`${BASE_DEV_URL}/user/${userId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch stories: ${response.statusText}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching stories:", error);
    throw error;
  }
}