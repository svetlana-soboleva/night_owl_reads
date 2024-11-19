import { SingleStoryPage } from "@/data/types/types";
import { StoryPartsCarousel } from "./StoryPartsCarousel";
import { useState } from "react";

interface Props {
  story: SingleStoryPage;
  isLoading: boolean;
}

export const StoryPage = ({ story, isLoading }: Props) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!story) {
    return <div>No story data available.</div>;
  }

  return (
    <div className="card bg-base-100 m-4 flex flex-col lg:flex-row justify-center items-center ">
      <figure className="p-8 lg:w-1/2 h-1/2 lg:h-full">
        {!imageLoaded && (
          <div className="w-full h-full bg-gray-300 animate-pulse rounded-xl" />
        )}
        <img
          src={story.imageUrls}
          alt={story.title}
          className={`w-full h-full object-cover rounded-xl transition-opacity duration-500 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
        />
      </figure>
      <div className="card-body lg:w-1/2 h-1/2 lg:h-full flex flex-col justify-center md:justify-between lg:justify-between gap-4 lg:m-4 items-center text-center">
        <h2 className="card-title text-2xl md:text-4xl text-purple-500 lg:text-4xl lg:mt-8">
          {story.title.replace(/([A-Z])/g, " $1").trim()}
        </h2>
        <StoryPartsCarousel chunks={story.chunks} />
        <div className="card-actions self-center lg:self-end">
          <button
            className="btn btn-secondary"
            onClick={() => window.history.back()}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};
