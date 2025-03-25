"use client";
import { createContext, useContext, useState, useEffect, useMemo } from "react";

// Membuat Context dengan nilai default null
export const ThemeContext = createContext(null); // Pastikan diekspor di sini

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme") || "light";
      setTheme(storedTheme);
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    }
  }, [theme, isMounted]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const value = useMemo(() => ({ theme, toggleTheme }), [theme]);

  if (!isMounted) return null;

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

// Custom Hook untuk mengakses ThemeContext
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme harus digunakan dalam ThemeProvider");
  }
  return context;
};
