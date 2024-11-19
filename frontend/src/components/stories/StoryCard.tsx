import { Story } from "@/data/types/types";
import { Link } from "@tanstack/react-router";

interface Props {
  story: Story;
  profileId: string;
}
export const StoryCard = ({ story, profileId }: Props) => {
  return (
    <div className="card bg-base-100 shadow-xl h-64 flex flex-col justify-between">
      <figure className="h-32 overflow-hidden">
        <img
          src={story.imageUrls}
          alt="Story"
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body p-4 flex flex-col justify-between">
        <h3 className="text-lg font-bold text-ellipsis overflow-hidden whitespace-nowrap">
          {story.title.replace(/([A-Z])/g, ' $1').trim()}
        </h3>
        <div className="card-actions justify-end">
          <Link to={`/profile/${profileId}/stories/${story.id}`}>
            <button className="btn btn-secondary">Read</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
