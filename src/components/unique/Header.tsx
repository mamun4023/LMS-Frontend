import { Book } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { MENUS } from "../../constants/menus";
import { Text } from "../common/Text";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./themToggler";

const Header = () => {
  const location = useLocation();
  const { t } = useTranslation();
  // Helper function to determine if a link is active
  const isActive = (path: string) => {
    // For the home page, we need an exact match
    if (path === "/") {
      return location.pathname === path;
    }
    // For other pages, check if the current path starts with the link path
    return location.pathname.startsWith(path);
  };

  const navClass = (path: string) =>
    `transition ${
      isActive(path)
        ? "text-primary font-medium"
        : "text-text-secondary hover:text-primary"
    }`;

  return (
    <header className="bg-surface border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Book className="w-8 h-8 text-primary" />
            <Link to="/" className="text-2xl font-bold text-text-primary">
              {t("hero.libraryName")}
            </Link>
          </div>
          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className={navClass("/")}>
              <Text>{MENUS.HOME}</Text>
            </Link>
            <Link to="/catalog" className={navClass("/catalog")}>
              <Text>{MENUS.CATALOG}</Text>
            </Link>
            <Link to="/services" className={navClass("/services")}>
              <Text>{MENUS.SERVICES}</Text>
            </Link>
            <Link to="/events" className={navClass("/events")}>
              <Text>{MENUS.EVENTS}</Text>
            </Link>
            <Link to="/about" className={navClass("/about")}>
              <Text>{MENUS.ABOUT}</Text>
            </Link>
          </nav>
          <LanguageSwitcher />
          <ThemeToggle />
          <Link to="/signin" className="btn-primary">
            <Text>{MENUS.LOGIN}</Text>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
