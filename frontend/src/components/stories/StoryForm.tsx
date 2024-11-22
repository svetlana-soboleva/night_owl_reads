import { useForm, SubmitHandler } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { StoryInput, storySchema } from "@/data/types/types";

interface storyFormProps {
  onSubmit: (data: StoryInput) => void;
}

export const StoryForm = ({ onSubmit }: storyFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StoryInput>({ resolver: zodResolver(storySchema) });

  const handleFormSubmit: SubmitHandler<StoryInput> = (data) => {
    onSubmit(data);
  };

  return (
    <form
      className="flex flex-col gap-2 mb-4 backdrop-blur-md bg-transparent rounded-2xl px-8 py-16"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <label className="input input-bordered input-secondary flex items-center gap-2">
        Hero
        <input
          type="text"
          className="grow placeholder-gray-700"
          placeholder="Hamster"
          {...register("hero")}
        />
      </label>
      {errors.hero && (
        <p className="text-white text-sm">{errors.hero.message}</p>
      )}
      <label className="input input-bordered input-secondary  flex items-center gap-2">
        Place
        <input
          type="text"
          className="grow placeholder-gray-700"
          placeholder="Magic Forest"
          {...register("place")}
        />
      </label>
      {errors.place && (
        <p className="text-white text-sm">{errors.place.message}</p>
      )}
      <label className="input input-bordered input-secondary  flex items-center gap-2">
        Companion
        <input
          type="text"
          className="grow placeholder-gray-700"
          placeholder="Squirrel"
          {...register("companion")}
        />
      </label>
      {errors.companion && (
        <p className="text-white text-sm">{errors.companion.message}</p>
      )}
      <label className="input input-bordered input-secondary  flex items-center gap-2">
        Quest
        <input
          type="text"
          className="grow placeholder-gray-700"
          placeholder="What they did?"
          {...register("quest")}
        />
      </label>
      {errors.quest && (
        <p className="text-white text-sm">{errors.quest.message}</p>
      )}
      <label className="input input-bordered input-secondary  flex items-center gap-2">
        Emotions
        <input
          type="text"
          className="grow placeholder-gray-700"
          placeholder="How did they feel?"
          {...register("emotion")}
        />
      </label>
      {errors.emotion && (
        <p className="text-white text-sm">{errors.emotion.message}</p>
      )}
      <button type="submit" className="btn btn-active btn-secondary">
        Generate Story
      </button>
    </form>
  );
};
