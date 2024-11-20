import { useState } from "react";

interface Props {
  onLanguageSelect: (language: string) => void;
}

export const SelectLanguage = ({onLanguageSelect}: Props) => {
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = event.target.value;
    setSelectedLanguage(newLanguage);
    onLanguageSelect(newLanguage);
  };

  return (
    <select
      value={selectedLanguage}
      onChange={handleLanguageChange}
      className="select select-secondary w-44 max-w-xs relative"
    >
      <option disabled>
        Pick your language
      </option>
      <option value="sv">SV</option>
      <option value="en">EN</option>
    </select>
  );
};
