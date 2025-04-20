import { useEffect } from "react";

export default function useTheme() {
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (!stored) {
      localStorage.setItem("theme", "dark"); //default to dark
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.toggle("dark", stored === "dark");
    }
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const isDark = root.classList.contains("dark");
    root.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "light" : "dark");
  };

  return toggleTheme;
}
