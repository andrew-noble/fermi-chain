import { useState, useEffect } from "react";

import { Question, Factor, InputtedFactor, UnpreparedQuestion } from "@/types";

import FactorBank from "@/components/FactorBank";
import InputArea from "@/components/input/InputArea";
import TutorialDialog from "@/components/dialogs/TutorialDialog";
import AboutDialog from "@/components/dialogs/AboutDialog";
import ThemeToggle from "@/components/ThemeToggle";

import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";

import rawQuestion from "@/data/question.json";

import {
  augmentQuestionWithFactorRanges,
  generateInputFactor,
} from "@/helpers/questionTransforms";

function App() {
  const [question, _] = useState<Question | null>(
    augmentQuestionWithFactorRanges(rawQuestion as UnpreparedQuestion)
  );
  const [userInput, setUserInput] = useState<InputtedFactor[]>([]);
  const [tutorialDialogOpen, setTutorialDialogOpen] = useState(true);
  const [aboutDialogOpen, setAboutDialogOpen] = useState(false);

  // Initialize theme from localStorage
  useEffect(() => {
    const theme = localStorage.getItem("theme") || "light";
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, []);

  const handleAddFactor = (factor: Factor) => {
    const newItem: InputtedFactor = generateInputFactor(factor);
    setUserInput((prevInput) => {
      const newInput = [...prevInput, newItem];
      return newInput;
    });
  };

  const handleFactorValueChange = (itemId: string, newValue: number) => {
    setUserInput((prevInput) => {
      const newInput = prevInput.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            userSelectedValue: newValue,
          };
        }
        return item;
      });
      return newInput;
    });
  };

  const handleRemoveFactor = (item: InputtedFactor) => {
    setUserInput((prevInput) => {
      const newInput = prevInput.filter((i) => i.id !== item.id);
      return newInput;
    });
  };

  const handleReorderFactors = (items: InputtedFactor[]) => {
    setUserInput(items);
  };

  const handleSubmit = () => {
    //dynamically adjusts to division/multiplication
    const result = userInput.reduce((acc, factor) => {
      if (factor.isReciprocal) {
        return acc / factor.userSelectedValue;
      }
      return acc * factor.userSelectedValue;
    }, 1);

    console.log("result:", result);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <TutorialDialog
        open={tutorialDialogOpen}
        onOpenChange={setTutorialDialogOpen}
      />
      <AboutDialog open={aboutDialogOpen} onOpenChange={setAboutDialogOpen} />

      <div className="max-w-4xl w-full mx-auto px-4 py-6 relative min-h-screen flex flex-col">
        <div className="absolute top-0 right-0 flex gap-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTutorialDialogOpen(true)}
          >
            <HelpCircle className="h-8 w-8" />
          </Button>
          <Button variant="ghost" onClick={() => setAboutDialogOpen(true)}>
            About
          </Button>
        </div>

        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold text-primary text-center my-12">
            {question?.prompt}
          </h1>

          <h2 className="text-xl font-semibold mb-2">Factors</h2>

          <div className="mb-6">
            <FactorBank
              factors={question?.factors || []}
              pickedFactors={userInput}
              onAdd={handleAddFactor}
            />
          </div>

          <div className="mb-6">
            <InputArea
              factors={userInput}
              onRemoveFactor={handleRemoveFactor}
              onReorderFactors={handleReorderFactors}
              onFactorValueChange={handleFactorValueChange}
            />
          </div>

          {userInput.length > 0 && (
            <div className="flex gap-6">
              <Button onClick={handleSubmit} disabled={userInput.length === 0}>
                Submit
              </Button>
              <Button variant="outline" onClick={() => setUserInput([])}>
                Clear
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
