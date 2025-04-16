import { useEffect } from "react";

export default function useTheme() {
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const theme = stored ?? "light";

    document.documentElement.classList.toggle("dark", theme === "dark");
  }, []);
}
