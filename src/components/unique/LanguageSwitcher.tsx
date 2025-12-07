import { useState } from "react";
import { useTranslation } from "react-i18next";

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState("English");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const changeLang = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="border-1 border-gray-300 rounded-md text-sm px-4 py-1"
      >
        {language}
      </button>
      {isOpen && (
        <ul className="absolute bg-white border border-gray-300 rounded-md p-4 z-10">
          <li 
          className="cursor-pointer text-sm" 
          onClick={() => {
            setLanguage("English")
            changeLang("en")}
            }>
            English
          </li>
          <li className="cursor-pointer text-sm" onClick={() => {
            setLanguage("Bengali")
            changeLang("bn")
            }}>
            বাংলা
          </li>
        </ul>
      )}
    </div>
  );
};
