import { useState } from "react";
import { useEffect } from "react";
import { Question, EntryItem, Factor, Operation } from "./types";
import FactorBank from "./components/FactorBank";
import OperationBank from "./components/OperationBank";
import EntryArea from "./components/EntryArea";

function App() {
  const [question, setQuestion] = useState<Question | null>(null);
  const [userInput, setUserInput] = useState<EntryItem[]>([]);

  const handleAddFactor = (factor: Factor) => {
    setUserInput([...userInput, { type: "factor", item: factor }]);
  };

  const handleAddOperation = (operation: Operation) => {
    setUserInput([...userInput, { type: "operation", item: operation }]);
  };

  const handleRemoveItem = (item: EntryItem) => {
    setUserInput(userInput.filter((i) => i !== item));
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
            <OperationBank onAdd={handleAddOperation} />
            <FactorBank
              factors={question?.factors || []}
              onAdd={handleAddFactor}
            />
          </div>
          <EntryArea
            userInput={userInput}
            handleRemoveItem={handleRemoveItem}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
