import { StoryRequest } from "./types/types";

const BASE_DEV_URL = "http://localhost:8080/stories";

export const generateStory = async (storyRequest: StoryRequest) => {
  const response = await fetch(
    `${BASE_DEV_URL}/generate/${storyRequest.userId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(storyRequest.payload),
    }
  );
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `Error: ${response.statusText}`);
  }
  const json = await response.json();
  console.log("json", json);
  return json;
};

export const getAllStoriesByUserId = async (userId: string) => {
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
};

export const getStoryById = async (storyId: number) => {
  try {
    const response = await fetch(`${BASE_DEV_URL}/user/stories/${storyId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        //Authorization: `Bearer ${await token}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error to get the story ${error}`);
  }
};

export const deleteStoryById = async (id: number) => {
  try {
    const response = await fetch(`${BASE_DEV_URL}/delete/${id}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error: ${response.statusText}`);
    }
  } catch (error) {
    throw new Error(`Error to get the story ${error}`);
  }
};
