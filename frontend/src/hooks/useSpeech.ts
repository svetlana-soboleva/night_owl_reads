import { useEffect, useState } from "react";

export const useSpeech = () => {
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
      return;
    }

    if (word !== "") {
      const speakText = new SpeechSynthesisUtterance(word);

      const englishVoice =
        voices.find((v) => v.lang.startsWith("en")) || voices[0];
      speakText.voice = englishVoice;

      speakText.rate = 1;
      speakText.pitch = 1;
      synth.speak(speakText);
    }
  };

  return { voices, speakWord };
};
