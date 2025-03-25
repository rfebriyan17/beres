"use client";
import { useTheme } from "@/context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        position: "fixed",
        bottom: "20px",
        left: "20px",
        padding: "10px 15px",
        backgroundColor: theme === "light" ? "#333" : "#f1f1f1",
        color: theme === "light" ? "white" : "black",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
        transition: "all 0.3s ease",
      }}
    >
      {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </button>
  );
}
