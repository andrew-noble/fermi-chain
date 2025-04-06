import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Question, Factor, InputtedFactor } from "./types";
import FactorBank from "./components/FactorBank";
import EntryArea from "./components/EntryArea";
import TutorialDialog from "./components/dialogs/TutorialDialog";
import AboutDialog from "./components/dialogs/AboutDialog";
import { Button } from "./components/ui/button";
import { HelpCircle } from "lucide-react";
import rawQuestion from "./data/question.json";
import prepareQuestion from "./helpers/prepareQuestion";

function App() {
  const [question, _] = useState<Question | null>(prepareQuestion(rawQuestion));

  const [userInput, setUserInput] = useState<InputtedFactor[]>([]);

  const [tutorialOpen, setTutorialOpen] = useState(true);

  const [aboutOpen, setAboutOpen] = useState(false);

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
    <>
      <TutorialDialog open={tutorialOpen} onOpenChange={setTutorialOpen} />
      <AboutDialog open={aboutOpen} onOpenChange={setAboutOpen} />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-4xl w-full mx-auto px-4 py-8 relative min-h-screen flex flex-col">
          <div className="absolute top-0 right-0 flex gap-2">
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

          <div className="flex-1 flex flex-col">
            <div className="h-1/3 flex items-end justify-center pb-8">
              <h1 className="text-4xl font-bold text-center">
                {question?.prompt}
              </h1>
            </div>

            <div className="flex flex-col justify-start">
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex flex-col">
                  <h2 className="text-lg font-semibold mb-2">Factors</h2>
                  <FactorBank
                    factors={question?.factors || []}
                    onAdd={handleAddFactor}
                  />
                </div>
              </div>
            </div>

            <div className="h-1/3 flex flex-col justify-end">
              <div>
                <EntryArea
                  factors={userInput}
                  onRemoveItem={handleRemoveItem}
                  onReorder={handleReorder}
                  onFactorValueChange={handleFactorValueChange}
                />
              </div>
              {userInput.length > 0 && (
                <Button
                  onClick={handleSubmit}
                  disabled={userInput.length === 0}
                  className="mt-4"
                >
                  Submit
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
