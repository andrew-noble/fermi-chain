import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Question, Factor, InputtedFactor } from "./types";
import FactorBank from "./components/FactorBank";
import InputArea from "./components/InputArea";
import TutorialDialog from "./components/dialogs/TutorialDialog";
import AboutDialog from "./components/dialogs/AboutDialog";
import { Button } from "./components/ui/button";
import { HelpCircle } from "lucide-react";
import rawQuestion from "./data/question.json";
import prepareQuestion from "./helpers/prepareQuestion";
import { ThemeToggle } from "./components/ThemeToggle";

function App() {
  const [question, _] = useState<Question | null>(prepareQuestion(rawQuestion));

  const [userInput, setUserInput] = useState<InputtedFactor[]>([]);

  const [tutorialOpen, setTutorialOpen] = useState(true);

  const [aboutOpen, setAboutOpen] = useState(false);

  // Initialize theme from localStorage
  useEffect(() => {
    const theme = localStorage.getItem("theme") || "light";
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, []);

  const handleAddFactor = (factor: Factor) => {
    const newItem: InputtedFactor = {
      ...factor,
      id: uuidv4(),
      userSelectedValue: factor.value,
    };
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
            value: newValue,
          };
        }
        return item;
      });
      return newInput;
    });
  };

  const handleRemoveItem = (item: InputtedFactor) => {
    setUserInput((prevInput) => {
      const newInput = prevInput.filter((i) => i.id !== item.id);
      return newInput;
    });
  };

  const handleReorder = (items: InputtedFactor[]) => {
    setUserInput(items);
  };

  const handleSubmit = () => {
    let result = 1;

    for (let i = 0; i < userInput.length; i++) {
      const item = userInput[i];

      result *= item.userSelectedValue;
    }
    console.log("result:", result);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <TutorialDialog open={tutorialOpen} onOpenChange={setTutorialOpen} />
      <AboutDialog open={aboutOpen} onOpenChange={setAboutOpen} />

      <div className="max-w-4xl w-full mx-auto px-4 py-8 relative min-h-screen flex flex-col">
        <div className="absolute top-0 right-0 flex gap-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTutorialOpen(true)}
          >
            <HelpCircle className="h-8 w-8" />
          </Button>
          <Button variant="ghost" onClick={() => setAboutOpen(true)}>
            About
          </Button>
        </div>

        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold text-primary text-center my-12">
            {question?.prompt}
          </h1>

          <h2 className="text-xl font-semibold mb-2">Factors</h2>

          <div className="w-108 mb-12">
            <FactorBank
              factors={question?.factors || []}
              onAdd={handleAddFactor}
            />
          </div>

          <div className="mb-12">
            <InputArea
              factors={userInput}
              onRemoveItem={handleRemoveItem}
              onReorder={handleReorder}
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
