import { SingleStoryPage } from "@/data/types/types";
import { StoryPartsCarousel } from "./StoryPartsCarousel";
import { useEffect, useState } from "react";
import { LoadingBubbles } from "../loading/LoadingBubbles";
import { useSpeech } from "@/hooks/useSpeech";

interface Props {
  story: SingleStoryPage;
  isLoading: boolean;
}

export const StoryPage = ({ story, isLoading }: Props) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const language = story.language;
  const { speakWord } = useSpeech({ language });

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  let text = "";
  story.chunks.forEach((c) => (text += c.text));

  if (isLoading) {
    return (
      <div className="text-center">
        <LoadingBubbles />
      </div>
    );
  }

  if (!story) {
    return <div>No story data available.</div>;
  }

  const toggleReadAloud = () => {
    setIsPlaying((prev) => {
      if (prev) {
        window.speechSynthesis.cancel();
      } else {
        speakWord(text);
      }
      return !prev;
    });
  };

  return (
    <div className="card bg-base-100 m-4 flex flex-col lg:flex-row justify-between items-stretch lg:gap-8">
      <div className="card-actions m-4">
        <button
          className="btn btn-secondary"
          onClick={() => window.history.back()}
        >
          Back
        </button>
      </div>
      <figure className="p-4 lg:p-8 flex-grow lg:w-1/2 h-96 lg:h-auto relative">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
            <div className="loader border-t-2 border-b-2 border-gray-600 w-6 h-6 rounded-full animate-spin"></div>
          </div>
        )}
        <img
          src={story.imageUrls}
          alt={story.title}
          className={`w-full h-full object-contain transition-opacity duration-500 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(true)}
        />
      </figure>

      <div className="card-body px-4 lg:px-8 flex flex-col justify-center lg:justify-between items-center lg:items-end lg:w-1/2">
        <h2 className="card-title text-purple-500 text-2lg md:text-xl lg:text-2xl text-center lg:text-left mb-4 uppercase tracking-widest">
          {story.title}
          {/* .replace(/([A-Z])/g, " $1").trim() */}
        </h2>
        <div className="flex flex-row items-center gap-1">
        <p className="m-2">❮</p>
        <StoryPartsCarousel language={story.language} chunks={story.chunks} />
        <p className="m-2">❯</p>
        </div>
        
        <div className="btn btn-secondary w-20" onClick={toggleReadAloud}>
          {isPlaying ? "STOP" : "READ ALOUD"}
        </div>
      </div>
    </div>
  );
};
