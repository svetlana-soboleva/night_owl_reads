const BASE_DEV_URL = "http://localhost:8080/stories/generate";

export const generateStory = async (payload, userId) => {
  const response = await fetch(`${BASE_DEV_URL}/${userId}`, {
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
