import { useState } from "react";

interface Props {
  onLanguageSelect: (language: string) => void;
}

export const SelectLanguage = ({ onLanguageSelect }: Props) => {
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newLanguage = event.target.value;
    setSelectedLanguage(newLanguage);
    onLanguageSelect(newLanguage);
  };

  return (
    <label className="form-control max-w-xs w-32 ">
      <div className="label">
        <span className="label-text text-base">Choose Language</span>
      </div>
      <select
        value={selectedLanguage}
        onChange={handleLanguageChange}
        className="select select-secondary max-w-xs relative"
      >
        <option disabled>Pick your language</option>
        <option value="sv">SV</option>
        <option value="en">EN</option>
      </select>
    </label>
  );
};
