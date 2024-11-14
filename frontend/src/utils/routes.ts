export const routes = {
    home: "/",
    signin: "/signin",
    profile: (userId: string) => `/profile/${userId}`,
    stories: (userId: string) => `/profile/${userId}/stories`,
  };