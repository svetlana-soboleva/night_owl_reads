export const StoryCard = ({ story }) => {
  return (
    <div className="card bg-base-100 shadow-xl h-64 flex flex-col justify-between">
      <figure className="h-32 overflow-hidden">
      <img src={story.imageUrls} alt="Story" className="w-full h-full object-cover" />
      </figure>
      <div className="card-body p-4 flex flex-col justify-between">
        <h3 className="text-lg font-bold text-ellipsis overflow-hidden whitespace-nowrap">{story.title}</h3>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Read</button>
        </div>
      </div>
    </div>
  );
};
