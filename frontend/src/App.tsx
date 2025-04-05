import { useState } from "react";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Question,
  InputItem,
  Factor,
  Operation,
  ValidationState,
} from "./types";
import FactorBank from "./components/FactorBank";
import OperationBank from "./components/OperationBank";
import EntryArea from "./components/EntryArea";
import TutorialDialog from "./components/dialogs/TutorialDialog";
import AboutDialog from "./components/dialogs/AboutDialog";
import { Button } from "./components/ui/button";
import { HelpCircle } from "lucide-react";

function App() {
  const [question, setQuestion] = useState<Question | null>(null);
  const [userInput, setUserInput] = useState<InputItem[]>([]);
  const [validationState, setValidationState] =
    useState<ValidationState>("init");
  const [tutorialOpen, setTutorialOpen] = useState(true);
  const [aboutOpen, setAboutOpen] = useState(false);

  const validateInput = (userInput: InputItem[]) => {
    if (userInput.length === 0) {
      setValidationState("init");
      return;
    }

    const startsOrEndsWithOp =
      userInput[0].type === "operation" ||
      userInput[userInput.length - 1].type === "operation";

    if (startsOrEndsWithOp) {
      setValidationState("invalid");
      return;
    }

    //must have ops in odd positions (1,3,5) and factors in even positions
    for (let i = 0; i < userInput.length; i++) {
      const isEven = i % 2 === 0;
      const item = userInput[i];

      if (
        (isEven && item.type !== "factor") ||
        (!isEven && item.type !== "operation")
      ) {
        setValidationState("invalid");
        return;
      }
    }

    setValidationState("valid");
  };

  const handleAddFactor = (factor: Factor) => {
    const newItem: InputItem = {
      id: uuidv4(),
      type: "factor",
      data: factor,
    };
    setUserInput((prevInput) => {
      const newInput = [...prevInput, newItem];
      validateInput(newInput);
      return newInput;
    });
  };

  const handleAddOperation = (operation: Operation) => {
    const newItem: InputItem = {
      id: uuidv4(),
      type: "operation",
      data: operation,
    };
    setUserInput((prevInput) => {
      const newInput = [...prevInput, newItem];
      validateInput(newInput);
      return newInput;
    });
  };

  const handleRemoveItem = (item: InputItem) => {
    console.log("REMOVE called with id:", item.id);

    setUserInput((prevInput) => {
      const newInput = prevInput.filter((i) => i.id !== item.id);
      validateInput(newInput);
      return newInput;
    });
  };

  const handleReorder = (items: InputItem[]) => {
    setUserInput(() => {
      validateInput(items);
      return items;
    });
  };

  const handleSubmit = () => {
    console.log("submit called");
    let result = 1;
    let curOp = "multiply"; //always starts with a single factor

    for (let i = 0; i < userInput.length; i++) {
      const item = userInput[i];

      if (item.type === "factor") {
        const factor = item.data as Factor;
        switch (curOp) {
          case "multiply":
            result *= factor.value;
            break;
          case "divide":
            result /= factor.value;
            break;
          case "add":
            result += factor.value;
            break;
          case "subtract":
            result -= factor.value;
            break;
        }
      } else if (item.type === "operation") {
        const operation = item.data as Operation;
        curOp = operation.operation;
      }
    }
    console.log("result:", result);
  };

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await fetch("./question.json");
        const data = await response.json();
        setQuestion(data);
      } catch (error) {
        console.error("Error loading question:", error);
      }
    };

    fetchQuestion();
  }, []);

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

            <div className="flex-1 flex flex-col justify-start">
              <div className="grid grid-cols-2 gap-4 mb-8">
                <OperationBank onAdd={handleAddOperation} />
                <FactorBank
                  factors={question?.factors || []}
                  onAdd={handleAddFactor}
                />
              </div>
            </div>

            <div className="h-1/3 flex flex-col justify-end">
              <div
                className={`border-2 rounded-md p-4 ${
                  validationState === "invalid"
                    ? "border-red-300 bg-red-50"
                    : "border-transparent"
                }`}
              >
                <EntryArea
                  userInput={userInput}
                  handleRemoveItem={handleRemoveItem}
                  handleReorder={handleReorder}
                />
                {validationState === "invalid" && (
                  <p className="text-red-500 text-sm mt-2">
                    Not a valid expression
                  </p>
                )}
              </div>
              {validationState !== "init" && (
                <Button
                  onClick={handleSubmit}
                  disabled={validationState === "invalid"}
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
