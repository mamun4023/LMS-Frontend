export type Theme = "Light" | "dark";
const THEME_KEY = "theme";
// export const setTheme = (theme: "light" | "dark") => {
//   if (theme === "dark") {
//     document.documentElement.classList.add("dark");
//     localStorage.theme = "dark";
//   } else {
//     document.documentElement.classList.remove("dark");
//     localStorage.theme = "light";
//   }
// };

export const getInitialTheme = (): Theme => {
  const stored = localStorage.getItem(THEME_KEY) as Theme | null;
  if (stored) {
    return stored;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "Light";
};

export const applyTheme = (theme: Theme) => {
  const root = document.documentElement;

  if (theme == "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }

  localStorage.setItem(THEME_KEY, theme);
};

export const toggleTheme = () => {
  const current = localStorage.getItem(THEME_KEY) === "dark" ? "Light" : "dark";
  applyTheme(current);
};
