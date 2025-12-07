import { Book } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MENUS } from "../../constants/menus";
import { Text } from "../common/Text";
import { ThemeToggle } from "./themToggler";

const Header = () => {
  const location = useLocation();

  // Helper function to determine if a link is active
  const isActive = (path: string) => {
    // For the home page, we need an exact match
    if (path === "/") {
      return location.pathname === path;
    }
    // For other pages, check if the current path starts with the link path
    return location.pathname.startsWith(path);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Book className="w-8 h-8 text-blue-600" />
            <Link to="/" className="text-2xl font-bold text-gray-900">
              Central Library
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className={`transition ${
                isActive("/")
                  ? "text-blue-600 font-medium"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              <Text>{MENUS.HOME}</Text>
            </Link>
            <Link
              to="/catalog"
              className={`transition ${
                isActive("/catalog")
                  ? "text-blue-600 font-medium"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              <Text>{MENUS.CATALOG}</Text>
            </Link>
            <Link
              to="/services"
              className={`transition ${
                isActive("/services")
                  ? "text-blue-600 font-medium"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              <Text>{MENUS.SERVICES}</Text>
            </Link>
            <Link
              to="/events"
              className={`transition ${
                isActive("/events")
                  ? "text-blue-600 font-medium"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              <Text>{MENUS.EVENTS}</Text>
            </Link>
            <Link
              to="/about"
              className={`transition ${
                isActive("/about")
                  ? "text-blue-600 font-medium"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              <Text>{MENUS.ABOUT}</Text>
            </Link>
          </nav>
          <LanguageSwitcher />
          <ThemeToggle />
          <Link
            to="/signin"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <Text>{MENUS.LOGIN}</Text>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
