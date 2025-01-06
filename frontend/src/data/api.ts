import { StoryRequest } from "./types/types";

const BASE_DEV_URL = "http://localhost:8080/stories";
//const PROD_URL="https://stories123-481690514559.europe-north1.run.app/stories"

export const generateStory = async (storyRequest: StoryRequest) => {
  const response = await fetch(
    `${BASE_DEV_URL}/generate/${storyRequest.userId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language: storyRequest.language,
        ...storyRequest.payload,
      }),
    }
  );
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message ||
        `Oops! Our system is taking a little nap right now. Please try again later! ${response.statusText}`
    );
  }
  const json = await response.json();
  console.log("json", json);
  return json;
};

export const getAllStoriesByUserId = async (userId: string) => {
  try {
    const response = await fetch(`${BASE_DEV_URL}/user/${userId}`);
    if (!response.ok) {
      throw new Error(
        `Oops! Our system is taking a little nap right now. Please try again later! ${response.statusText}`
      );
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching stories:", error);
    throw new Error(`Oops! Our system is taking a little nap right now`);
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
      throw new Error(
        errorData.message ||
          `Yikes! Our server is feeling a little tired. Let's try again later! ${response.statusText}`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Yikes! Our server is feeling a little tired`);
  }
};

export const deleteStoryById = async (id: number) => {
  try {
    const response = await fetch(`${BASE_DEV_URL}/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(id),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error: ${response.statusText}`);
    }
    console.log("Deleted");
  } catch (error) {
    throw new Error(`Error deleting the story: ${error}`);
  }
};
