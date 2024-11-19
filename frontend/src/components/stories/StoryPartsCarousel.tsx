import { Chunk } from "@/data/types/types";
interface Props {
  chunks: Chunk[];
}

export const StoryPartsCarousel = ({ chunks }: Props) => {

  
  return (
    <div className="carousel carousel-center bg-neutral rounded-box space-x-6">
      {chunks.map((chunk, index) => (
        <div className="carousel-item w-full flex flex-col">
          <p className="text-md uppercase leading-10 text-center lg:p-8 lg:text-md xl:text-xl">{chunk.text}</p>
          <p className="text-sm font-bold text-right px-4">{index + 1} - {chunks.length}</p>
        </div>
      ))}
    </div>
  );
};
