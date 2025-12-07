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

  useEffect(()=>{
    const lang = localStorage.getItem("i18nextLng") || "en";
    setLanguage(LANGUAGES.find((item) => item.code === lang) || LANGUAGES[0]);
  },[])

  return (
    <div className="relative" onBlur={handleBlur} tabIndex={-1}>
      <button
        onClick={toggleDropdown}
        className="border-1 border-gray-300 rounded-md text-sm px-4 py-1"
      >
        {language.flag} {language.name}
      </button>
      {isOpen && (
        <ul className="absolute bg-white border border-gray-300 rounded-md z-10 ">
          {LANGUAGES.map((item) => (
            <li
              key={item.id}
              className="w-[130px] cursor-pointer text-sm border-b border-gray-300 px-4 py-2 hover:bg-gray-100"
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
