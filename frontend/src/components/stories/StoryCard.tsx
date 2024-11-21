import { Story } from "@/data/types/types";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { DeleteButton } from "../button/DeleteButton";
import { deleteStoryById } from "@/data/api";
import {  useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
  story: Story;
  profileId: string;
}


export const StoryCard = ({ story, profileId }: Props) => {
  const queryClient = useQueryClient()
  const [imageLoaded, setImageLoaded] = useState(false);

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteStoryById(id),
    onSuccess: () => {
      console.log("The mutation is sucessful!");
      queryClient.invalidateQueries({ queryKey: ["user_stories"] });
      
      
    },
  
  });

  return (
    <div className="card bg-base-100 shadow-xl h-64 flex flex-col justify-between">
      <figure className="h-32 overflow-hidden">
      <div className="absolute top-2 right-2 z-10">
      <DeleteButton onClick={() => deleteMutation.mutate(story.id)} />

      </div>
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
            <div className="loader border-t-2 border-b-2 border-gray-600 w-6 h-6 rounded-full animate-spin"></div>
          </div>
        )}
        <img
          src={story.imageUrls}
          alt="Story"
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
        />
      </figure>
      <div className="card-body p-4 flex flex-col justify-between">
        <h3 className=" text-lg text-gray-400 font-bold text-ellipsis overflow-hidden whitespace-nowrap">
          {story.title.replace(/([A-Z])/g, " $1").trim()}
        </h3>
        <div className="card-actions justify-between">
          <Link to={`/profile/${profileId}/stories/${story.id}`}>
            <button className="btn btn-secondary uppercase">Read</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
