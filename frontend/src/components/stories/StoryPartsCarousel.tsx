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
    <div className="bg-neutral rounded-box p-4 flex flex-col gap-6">
      {chunks.map((chunk, index) => {
        const words = chunk.text.split(" ");
        return (
          <div
            key={index}
            className="bg-base-100 p-4 rounded-lg shadow-lg flex flex-col"
          >
            <div className="uppercase flex flex-wrap gap-1 justify-center">
              {words.map((word, wordIndex) => (
                <Word key={wordIndex} word={word} onSpeak={speakWord} />
              ))}
            </div>
            <p className="text-sm font-bold text-right mt-4">{index + 1}</p>
          </div>
        );
      })}
    </div>
  );
};
