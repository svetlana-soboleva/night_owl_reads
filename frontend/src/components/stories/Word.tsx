interface WordProps {
  word: string;
  onSpeak: (word: string) => void;
}

export const Word = ({ word, onSpeak }: WordProps) => {
  return (
    <span
      className="cursor-pointer leading-8 tracking-wider hover:bg-gray-500 rounded-md p-1 hover:text-white"
      onMouseEnter={() => onSpeak(word)}
      onMouseLeave={() => window.speechSynthesis.cancel()}
    >
      {word}
    </span>
  );
};
