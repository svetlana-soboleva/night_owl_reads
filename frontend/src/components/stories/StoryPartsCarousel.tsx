import { Chunk } from "@/data/types/types";
import { useSpeech } from "@/hooks/useSpeech";
import { Word } from "./Word";

interface Props {
  chunks: Chunk[];
  language: string;
}

export const StoryPartsCarousel = ({ chunks, language }: Props) => {
  const { speakWord } = useSpeech({ language });
  return (
    <div className="carousel rounded-box  space-x-4">
      {chunks.map((chunk, index) => {
        const words = chunk.text.split(" ");
        return (
          <div
            key={index}
            className="carousel-item bg-neutral w-full rounded-lg shadow-lg flex flex-col"
          >
            <div className="uppercase flex text-gray-100 flex-wrap gap-1 justify-center">
              {words.map((word, wordIndex) => (
                <Word key={wordIndex} word={word} onSpeak={speakWord} />
              ))}
            </div>
            <p className="text-sm font-bold text-right m-4">{index + 1} - {chunks.length}</p>
          </div>
        );
      })}
    </div>
  );
};
