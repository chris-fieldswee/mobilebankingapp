
import { createContext, useContext, useEffect, useState } from "react";
import { lightTheme, darkTheme } from "@/lib/themes";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => null,
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem("theme");
    return (stored as Theme) || "light";
  });

  const toggleTheme = () => {
    setTheme((current) => {
      const newTheme = current === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  useEffect(() => {
    const root = document.documentElement;
    const vars = theme === "light" ? lightTheme : darkTheme;
    Object.entries(vars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
    document.body.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
