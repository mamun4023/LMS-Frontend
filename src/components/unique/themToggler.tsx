// export const ThemeToggle = () => {
//   const { t } = useTranslation();
//   const toggle = () => {
//     const current = localStorage.theme === "dark" ? "light" : "dark";
//     setTheme(current);
//   };

import { Moon, Sun } from "lucide-react";
import { toggleTheme } from "../../theme";
//   return (
//     <button
//       onClick={toggle}
//       className="border px-3 py-1 rounded shadow-sm dark:bg-gray-800 dark:text-white"
//     >
//       <Text>{t("navigation.toggleTheme")}</Text>
//     </button>
//   );
// };

export const ThemeToggle = () => {
  // const { t } = useTranslation();
  const isDark = document.documentElement.classList.contains("dark");

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="p-2 rounded-lg border border-border bg-surface text-text-primary hover:bg-background transition"
    >
      {isDark ? (
        <>
          <Sun size={18} />
          {/* <Text>{t("navigation.toggleTheme")}</Text> */}
        </>
      ) : (
        <>
          <Moon size={18} />
          {/* <Text>{t("navigation.toggleTheme")}</Text> */}
        </>
      )}
    </button>
  );
};
