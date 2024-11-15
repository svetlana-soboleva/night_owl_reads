export const StoryForm = () => {
  return (
    <form className="flex flex-col gap-4 backdrop-blur-md bg-transparent rounded-2xl px-8 py-16">
      <label className="input input-bordered input-secondary flex items-center gap-2">
        Hero
        <input type="text" className="grow" placeholder="Hamster" />
      </label>
      <label className="input input-bordered input-secondary  flex items-center gap-2">
        Place
        <input type="text" className="grow" placeholder="Magic Forest" />
      </label>
      <label className="input input-bordered input-secondary  flex items-center gap-2">
        Companion
        <input type="text" className="grow" placeholder="Squirrel" />
      </label>
      <label className="input input-bordered input-secondary  flex items-center gap-2">
        Quest
        <input type="text" className="grow" placeholder="What they did?" />
      </label>
      <label className="input input-bordered input-secondary  flex items-center gap-2">
        Emotions
        <input type="text" className="grow" placeholder="How did they feel?" />
      </label>
      <button className="btn btn-active btn-secondary">Generate Story</button>
    </form>
  );
};
