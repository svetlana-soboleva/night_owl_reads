import { Link, useNavigate } from "@tanstack/react-router";

export const WelcomeMsg = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-4 items-center rounded-lg p-8 bg-gradient-to-r from-gray-500">
      <h1 className="text-3xl font-bold text-white">Welcome to Story Magic!</h1>
      <p className="text-lg text-white">
        Stories are waiting for you—where every word unlocks a new adventure!
      </p>
      <button
        onClick={() => navigate({ to: "/signin" })}
        className="bg-teal-700 font-semibold py-2 px-6 rounded-full hover:bg-teal-900 text-white"
      >
        Start Your Adventure
      </button>
      <p className="mt-4 text-md text-white">
        <strong>Did you know?</strong> Reading helps you imagine amazing worlds
        and understand new things! Keep reading every day to become a reading
        superhero!
      </p>
    </div>
  );
};
