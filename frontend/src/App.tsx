import { useState, useEffect } from "react";

import { Question, Factor, InputtedFactor, UnpreparedQuestion } from "@/types";

import FactorBank from "@/components/FactorBank";
import InputArea from "@/components/input/InputArea";
import TutorialDialog from "@/components/dialogs/TutorialDialog";
import AboutDialog from "@/components/dialogs/AboutDialog";
import ThemeToggle from "@/components/ThemeToggle";

import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";

import rawQuestions from "@/data/questions.json";

import {
  augmentQuestionWithFactorRanges,
  generateInputFactor,
} from "@/helpers/questionTransforms";

import { formatNumber } from "@/helpers/formatNumber";
import ResultDialog from "./components/dialogs/ResultDialog";

const getTodaysQuestion = () => {
  const start = new Date("2025-04-09");
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - start.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return rawQuestions[diffDays];
};

function App() {
  const [question, _] = useState<Question>(
    augmentQuestionWithFactorRanges(rawQuestions[1] as UnpreparedQuestion) //type assertion necessary to tell ts that augmentQWFR is getting the right type
  );
  const [userInput, setUserInput] = useState<InputtedFactor[]>([]);
  const [tutorialDialogOpen, setTutorialDialogOpen] = useState(true);
  const [aboutDialogOpen, setAboutDialogOpen] = useState(false);
  const [resultDialogOpen, setResultDialogOpen] = useState(false);

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

  const handleClear = () => {
    setUserInput([]);
  };

  const calculateResult = () => {
    const result = userInput.reduce((acc, factor) => {
      return acc * factor.userSelectedValue;
    }, 1);

    return result;
  };

  const handleSubmit = () => {
    setResultDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <TutorialDialog
        open={tutorialDialogOpen}
        onOpenChange={setTutorialDialogOpen}
      />
      <AboutDialog open={aboutDialogOpen} onOpenChange={setAboutDialogOpen} />
      <ResultDialog
        open={resultDialogOpen}
        onOpenChange={setResultDialogOpen}
        question={question}
        userInput={userInput}
        userEstimate={calculateResult()}
      />

      <div className="max-w-5xl w-full mx-auto px-4 py-6 relative min-h-screen flex flex-col">
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

          <div className="flex flex-col gap-6 items-center">
            {userInput.length === question?.factors.length && (
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Your estimate: </span>
                <span className="text-primary font-bold">
                  {formatNumber(calculateResult())}
                </span>{" "}
                <span className="text-muted-foreground">
                  {question?.targetUnit}
                </span>
              </div>
            )}

            {/* conditional buttons */}
            <div className="flex gap-6">
              {userInput.length === question?.factors.length && (
                <Button
                  onClick={handleSubmit}
                  disabled={userInput.length === 0}
                >
                  Submit
                </Button>
              )}
              {userInput.length > 0 && (
                <Button variant="outline" onClick={handleClear}>
                  Clear
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
