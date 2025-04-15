import { useState, useEffect } from "react";

import ThemeToggle from "@/components/theme/ThemeToggle";
import AboutDialog from "@/components/dialogs/AboutDialog";
import { Button } from "@/components/ui/button";
import useGameLogic from "@/hooks/game/useGameReducer";
import useStagingAreaReducer from "@/hooks/game/useStagingAreaReducer";
import question from "@/data/question.json";
import { Factor, OOM, Question } from "@/types";
import { OOMS } from "@/data/ooms";
import { v4 as uuidv4 } from "uuid";
import { StagingAreaState } from "@/types/stagingAreaTypes";

function App() {
  const game = useGameLogic({
    question: question as Question,
    userFactors: [],
  });

  const stagingArea = useStagingAreaReducer();

  const [selectedNumOOM, setSelectedNumOOM] = useState<OOM>(OOMS[0]);
  const [selectedDenOOM, setSelectedDenOOM] = useState<OOM>(OOMS[0]);

  const [aboutDialogOpen, setAboutDialogOpen] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme") || "light";
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, []);

  //handshake between staging area and game state.
  const handleAddFactor = (stagingAreaState: StagingAreaState) => {
    const newFactor: Factor = {
      id: uuidv4(),
      numeratorOOM: stagingAreaState.numeratorOOM,
      denominatorOOM: stagingAreaState.denominatorOOM,
      units: stagingAreaState.units,
    };
    game.doGameLogic.addFactor(newFactor);
    stagingArea.doStagingAreaLogic.reset();
  };

  return (
    <>
      <ThemeToggle />
      <AboutDialog open={aboutDialogOpen} onOpenChange={setAboutDialogOpen} />
      <Button onClick={() => setAboutDialogOpen(true)}>About</Button>
      <h2>{game.state.question.prompt} </h2>

      {/* Unit Toolbox */}
      <div className="bg-blue-800  p-4 rounded-lg m-3">
        <h2 className="text-lg font-bold">Unit Toolbox</h2>

        {game.state.question.usefulUnitList.map((unit) => (
          <div key={unit.id}>
            <h3>{unit.name}</h3>
            <p className="text-sm text-gray-500">{unit.dimension}</p>
            <Button
              onClick={() =>
                stagingArea.doStagingAreaLogic.addUnitToNumerator(unit)
              }
            >
              Add Numerator
            </Button>
            <Button
              onClick={() =>
                stagingArea.doStagingAreaLogic.addUnitToDenominator(unit)
              }
            >
              Add Denominator
            </Button>
          </div>
        ))}
      </div>

      {/* Staging Area */}
      <div className="bg-green-400  p-4 rounded-lg m-3">
        <h2 className="text-lg font-bold">Staging Area</h2>
        <p>
          Units:{" "}
          {Object.entries(stagingArea.state.units).map(
            ([id, { count, unitMetadata }]) => (
              <span key={id}>
                {unitMetadata.name} (
                {count > 0
                  ? "numerator x" + count
                  : "denominator x" + Math.abs(count)}
                )
              </span>
            )
          )}
        </p>
        <p>Num OOM: {stagingArea.state.numeratorOOM.id}</p>
        <p>Den OOM: {stagingArea.state.denominatorOOM.id}</p>
        <div className="bg-red-400 p-4 rounded-lg m-3">
          <label htmlFor="oom-select-numerator">Select OOM for numerator</label>
          <select
            id="oom-select-numerator"
            value={selectedNumOOM.id}
            onChange={(e) => {
              const selected = OOMS.find((oom) => oom.id === e.target.value);
              if (selected) setSelectedNumOOM(selected);
            }}
          >
            {OOMS.map((oom) => (
              <option className="bg-blue-300" key={oom.id} value={oom.id}>
                {`10^${oom.exponent}`}
              </option>
            ))}
          </select>
          <Button
            onClick={() =>
              stagingArea.doStagingAreaLogic.updateNumeratorOOM(selectedNumOOM)
            }
          >
            Set Numerator OOM
          </Button>
        </div>
        <div className="bg-red-400 p-4 rounded-lg m-3">
          <label htmlFor="oom-select-denominator">
            Select OOM for denominator
          </label>
          <select
            id="oom-select-denominator"
            value={selectedDenOOM.id}
            onChange={(e) => {
              const selected = OOMS.find((oom) => oom.id === e.target.value);
              if (selected) setSelectedDenOOM(selected);
            }}
          >
            {OOMS.map((oom) => (
              <option className="bg-blue-300" key={oom.id} value={oom.id}>
                {`10^${Math.log10(oom.value)}`}
              </option>
            ))}
          </select>
          <Button
            onClick={() =>
              stagingArea.doStagingAreaLogic.updateDenominatorOOM(
                selectedDenOOM
              )
            }
          >
            Set Denominator OOM
          </Button>
        </div>
        <Button onClick={() => stagingArea.doStagingAreaLogic.reset()}>
          Reset SA
        </Button>
        <Button
          onClick={() => {
            handleAddFactor(stagingArea.state);
          }}
        >
          Add Factor
        </Button>
      </div>

      {/* Game State */}
      <div className="bg-gray-400 p-4 rounded-lg m-3">
        <h2 className="text-lg font-bold">Current Game State:</h2>
        {/* <p>
          Numerator Units:{" "}
          {game.state.userFactors.map((factor) =>
            factor.numeratorUnits.map((unit: Unit) => unit.name).join(", ")
          )}
        </p>
        <p>
          Denominator Units:{" "}
          {game.state.userFactors.map((factor) =>
            factor.denominatorUnits.map((unit: Unit) => unit.name).join(", ")
          )}
        </p> */}
        <p>
          Your (cancelled) units:{" "}
          {Object.entries(game.netUserUnits).map(
            ([id, { count, unitMetadata }]) => (
              <span key={id}>
                {unitMetadata.name} (
                {count > 0
                  ? "numerator x" + count
                  : "denominator x" + Math.abs(count)}
                )
              </span>
            )
          )}
        </p>
        <p>Your Answer: {game.netUserAnswer}</p>
        <Button onClick={() => game.doGameLogic.reset()}>Reset</Button>
      </div>

      {/* Win/Lose */}
      {game.state.userFactors.length > 0 && (
        <div className="bg-orange-400 p-4 rounded-lg m-3">
          <h2 className="text-lg font-bold">Win?</h2>
          <p>{game.isCorrectOOM ? "Correct OOM!" : "Incorrect OOM!"}</p>
          <p>{game.isCorrectUnits ? "Correct Units!" : "Incorrect Units!"}</p>
        </div>
      )}
    </>
  );
}

export default App;
