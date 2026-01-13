import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface Language {
  id: number;
  flag: string;
  code: string;
  name: string;
}

const LANGUAGES = [
  {
    id: 1,
    flag: "🇬🇧",
    code: "en",
    name: "English",
  },
  {
    id: 2,
    flag: "🇧🇩",
    code: "bn",
    name: "Bengali",
  },
];

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState(LANGUAGES[0]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const changeHandler = (language: Language) => {
    setLanguage(language);

    i18n.changeLanguage(language.code || "en");
    setIsOpen(false);
  };

  const handleBlur = (e: React.FocusEvent) => {
    // Check if the new focused element is outside the dropdown
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const lang = localStorage.getItem("i18nextLng") || "en";
    setLanguage(LANGUAGES.find((item) => item.code === lang) || LANGUAGES[0]);
  }, []);

  return (
    <div className="relative" onBlur={handleBlur} tabIndex={-1}>
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 px-4 py-1 text-sm rounded-md bg-surface text-text-rimary border border-border hover:opacity-90 transition"
      >
        {language.flag} {language.name}
      </button>
      {isOpen && (
        <ul className="absolute mt-1 z-10  w-[140px] bg-surface border border-border  rounded-md shadow-md ">
          {LANGUAGES.map((item) => (
            <li
              key={item.id}
              className="px-4 py-2 text-sm cursor-pointer text-text-primary hover:bg-background border-b border-border last:border-b-0 transition"
              onClick={() => changeHandler(item)}
            >
              {item.flag} {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
