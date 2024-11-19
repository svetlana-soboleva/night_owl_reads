import { Chunk } from "@/data/types/types";

interface Props {
  chunks: Chunk[];
}

export const StoryPartsCarousel = ({ chunks }: Props) => {
  return (
    <div className="carousel carousel-center bg-neutral rounded-box space-x-6 p-4">
      {chunks.map((chunk, index) => (
        <div className="carousel-item w-full flex flex-col">
          <p className="text-3xl uppercase leading-10 ">{chunk.text}</p>
          <p className="text-sm font-bold text-right">{index + 1} - {chunks.length}</p>
        </div>
      ))}
    </div>
  );
};
