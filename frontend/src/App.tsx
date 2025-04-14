import { useState, useEffect } from "react";

import ThemeToggle from "./components/ThemeToggle";
import AboutDialog from "@/components/AboutDialog";
import { Button } from "./components/ui/button";
import useGameLogic from "./useGameReducer";
import question from "./question.json";
import { Question } from "./types";

function App() {
  const { state, doGameLogic } = useGameLogic({
    question: question as Question,
    userFactors: [],
  });
  const [aboutDialogOpen, setAboutDialogOpen] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme") || "light";
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, []);

  return (
    <>
      <ThemeToggle />

      <AboutDialog open={aboutDialogOpen} onOpenChange={setAboutDialogOpen} />
      <Button onClick={() => setAboutDialogOpen(true)}>About</Button>
    </>
  );
}

export default App;
