import { setTheme } from "../../theme";
import { Text } from "../common/Text";

export const ThemeToggle = () => {
  const toggle = () => {
    const current = localStorage.theme === "dark" ? "light" : "dark";
    setTheme(current);
  };

  return (
    <button
      onClick={toggle}
      className="border px-3 py-1 rounded shadow-sm dark:bg-gray-800 dark:text-white"
    >
      <Text>Toggle Theme</Text>
    </button>
  );
}
