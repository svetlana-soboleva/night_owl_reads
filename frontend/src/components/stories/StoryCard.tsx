export const StoryCard = ({ story }) => {
  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img src="../../../public/boywithbook.webp" alt="Strory" />
      </figure>
      <div className="card-body">
        <h3>{story.title}</h3>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Read</button>
        </div>
      </div>
    </div>
  );
};
