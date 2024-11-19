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
    <div className="card bg-base-100 m-4 flex flex-col lg:flex-row justify-between items-stretch lg:gap-8">
      <figure className="p-4 lg:p-8 flex-grow lg:w-1/2 h-96 lg:h-auto">
        {!imageLoaded && (
          <div className="w-full h-full bg-gray-300 animate-pulse rounded-xl" />
        )}
        <img
          src={story.imageUrls}
          alt={story.title}
          className={`w-full h-full object-contain rounded-xl transition-opacity duration-500 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
        />
      </figure>

      <div className="card-body px-4 lg:px-8 flex flex-col justify-center lg:justify-between items-center lg:items-end lg:w-1/2">
        <h2 className="card-title text-purple-500 text-2lg md:text-xl lg:text-2xl text-center lg:text-left mb-4 uppercase abeezee-regular-italic ">
          {story.title.replace(/([A-Z])/g, " $1").trim()}
        </h2>
        <StoryPartsCarousel chunks={story.chunks} />
        <div className="card-actions mt-4">
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
