export const StoryCard = () => {
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <figure>
        <img src="../../../public/boywithbook.webp" alt="Strory" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Night Story!</h2>
        <p>Onece Upon a Time There Was a Hamster</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Read</button>
        </div>
      </div>
    </div>
  );
};
