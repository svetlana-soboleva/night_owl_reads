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
    <div className="card bg-base-100 mt-4 shadow-xl flex flex-col lg:flex-row">
      <figure className="px-10 pt-10">
        <img
          src={story.imageUrls}
          alt={story.title}
          className={`rounded-xl transition-opacity duration-500 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
        />
      </figure>
      <div className="card-body items-center text-center gap-8">
        <h2 className="card-title text-3xl text-purple-300">{story.title}</h2>
        <StoryPartsCarousel chunks={story.chunks} />
        <div className="card-actions">
          <button className="btn btn-secondary">Back</button>
        </div>
      </div>
    </div>
  );
};
