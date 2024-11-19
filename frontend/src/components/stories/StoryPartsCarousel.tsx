import { Chunk } from "@/data/types/types";
import { useEffect, useState } from "react";

interface Props {
  chunks: Chunk[];
}

export const StoryPartsCarousel = ({ chunks }: Props) => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const synth = window.speechSynthesis;

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = synth.getVoices();
      setVoices(availableVoices);
    };

    loadVoices();
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = loadVoices;
    }
  }, [synth]);

  const speakWord = (word: string) => {
    if (synth.speaking) {
      console.warn("Already speaking!");
      return;
    }

    if (word !== "") {
      const speakText = new SpeechSynthesisUtterance(word);

      const englishVoice =
        voices.find((voice) => voice.lang.startsWith("en")) || voices[0];

      speakText.voice = englishVoice;
      speakText.rate = 1;
      speakText.pitch = 1;

      speakText.onend = () => console.log("Speech finished");
      speakText.onerror = () => console.error("Speech error");

      synth.speak(speakText);
    }
  };

  return (
    <div className="carousel carousel-center h-52 bg-neutral rounded-box space-x-6 flex flex-row flex-wrap">
      {chunks.map((chunk, index) => {
        const words = chunk.text.split(" ");
        return (
          <div key={index} className="carousel-item w-full h-full ">
            <div className="uppercase flex flex-wrap">
              {words.map((word, wordIndex) => (
                <div>
                  <span
                    key={wordIndex}
                    className="cursor-pointer hover:bg-gray-500 rounded-md p-1 hover:text-white"
                    onMouseEnter={() => speakWord(word)}
                  >
                    {word}
                  </span>
                </div>
              ))}
              <p className="text-sm font-bold text-right px-4">
                {index + 1} - {chunks.length}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
