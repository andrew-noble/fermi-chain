import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const ThemeToggle = () => {
  const toggleTheme = () => {
    const root = document.documentElement;
    const isDark = root.classList.contains("dark");
    root.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "light" : "dark");
  };

  // Set dark mode as default if no theme is stored
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (!storedTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  }, []);

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme}>
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ThemeToggle;
