import { useState } from "react";
import { useEffect } from "react";
import { Question, EntryItem, Factor, Operation } from "./types";
import FactorBank from "./components/FactorBank";
import OperationBank from "./components/OperationBank";
import EntryArea from "./components/EntryArea";

function App() {
  const [question, setQuestion] = useState<Question | null>(null);
  const [userInput, setUserInput] = useState<EntryItem[]>([]);

  //this state constrains user input to either factor/operation, so that you cannot
  //stack operations like "**", and are forced to start with a factor
  const [constrainToFactor, setConstrainToFactor] = useState<boolean>(true);

  const handleAddFactor = (factor: Factor) => {
    if (constrainToFactor) {
      setUserInput([...userInput, { type: "factor", item: factor }]);
      setConstrainToFactor(false); // After adding a factor, allow operations
    }
  };

  const handleAddOperation = (operation: Operation) => {
    if (!constrainToFactor) {
      setUserInput([...userInput, { type: "operation", item: operation }]);
      setConstrainToFactor(true); // After adding an operation, require a factor
    }
  };

  const handleRemoveItem = (item: EntryItem) => {
    setUserInput(userInput.filter((i) => i !== item));

    // Update constrainToFactor based on the last item in userInput after removal
    if (userInput.length > 0) {
      const lastItem = userInput[userInput.length - 1];
      setConstrainToFactor(lastItem.type === "operation");
    } else {
      setConstrainToFactor(true); // If no items left, start with a factor
    }
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-center">{question?.prompt}</h1>
          <div className="grid grid-cols-2 gap-4">
            <OperationBank
              onAdd={handleAddOperation}
              disabled={constrainToFactor}
            />
            <FactorBank
              factors={question?.factors || []}
              onAdd={handleAddFactor}
              disabled={!constrainToFactor}
            />
          </div>
          <EntryArea
            userInput={userInput}
            handleRemoveItem={handleRemoveItem}
            setUserInput={setUserInput}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
