import { useState, useEffect } from "react";

import ThemeToggle from "@/components/theme/ThemeToggle";
import AboutDialog from "@/components/dialogs/AboutDialog";
import { Button } from "@/components/ui/button";
import useGameLogic from "@/hooks/game/useGameReducer";
import useStagingAreaReducer from "@/hooks/game/useStagingAreaReducer";
import question from "@/data/question.json";
import { OOM, Question } from "@/types";
import { OOMS } from "@/data/ooms";

function App() {
  const { state, doGameLogic } = useGameLogic({
    question: question as Question,
    userFactors: [],
  });
  const { state: stagingAreaState, doStagingAreaLogic } =
    useStagingAreaReducer();

  const [selectedNumOOM, setSelectedNumOOM] = useState<OOM>(OOMS[0]);
  const [selectedDenOOM, setSelectedDenOOM] = useState<OOM>(OOMS[0]);

  const [aboutDialogOpen, setAboutDialogOpen] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme") || "light";
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, []);

  const calculateAnswer = () => {
    const result = state.userFactors.reduce((acc, factor) => {
      return acc * (factor.numeratorOOM.value / factor.denominatorOOM.value);
    }, 1);
    return result;
  };

  // const addUnitToStagingAreaNumerator = (unit: Unit) => {
  //   setStagingAreaState({
  //     ...stagingAreaState,
  //     numeratorUnits: [...stagingAreaState.numeratorUnits, unit],
  //   });
  // };

  // const addUnitToStagingAreaDenominator = (unit: Unit) => {
  //   setStagingAreaState({
  //     ...stagingAreaState,
  //     denominatorUnits: [...stagingAreaState.denominatorUnits, unit],
  //   });
  // };

  // const setStagingAreaNumOOM = (oom: OOM) => {
  //   setStagingAreaState({
  //     ...stagingAreaState,
  //     numeratorOOM: oom,
  //   });
  // };

  // const setStagingAreaDenOOM = (oom: OOM) => {
  //   setStagingAreaState({
  //     ...stagingAreaState,
  //     denominatorOOM: oom,
  //   });
  // };

  return (
    <>
      <ThemeToggle />
      <AboutDialog open={aboutDialogOpen} onOpenChange={setAboutDialogOpen} />
      <Button onClick={() => setAboutDialogOpen(true)}>About</Button>
      <h2>{state.question.prompt} </h2>

      <div className="bg-blue-800  p-4 rounded-lg m-3">
        <h2 className="text-lg font-bold">Unit Toolbox</h2>

        {state.question.units.map((unit) => (
          <div key={unit.id}>
            <h3>{unit.name}</h3>
            <p className="text-sm text-gray-500">{unit.dimension}</p>
            <Button onClick={() => doStagingAreaLogic.addUnitToNumerator(unit)}>
              Add Numerator
            </Button>
            <Button
              onClick={() => doStagingAreaLogic.addUnitToDenominator(unit)}
            >
              Add Denominator
            </Button>
          </div>
        ))}
      </div>

      <div className="bg-green-400  p-4 rounded-lg m-3">
        <h2 className="text-lg font-bold">Staging Area</h2>
        <p>
          Num: {stagingAreaState.numeratorUnits.map((u) => u.name).join(",")}
        </p>
        <p>
          Den: {stagingAreaState.denominatorUnits.map((u) => u.name).join(",")}
        </p>
        <p>Num OOM: {stagingAreaState.numeratorOOM.id}</p>
        <p>Den OOM: {stagingAreaState.denominatorOOM.id}</p>
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
              doStagingAreaLogic.updateNumeratorOOM(selectedNumOOM)
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
              doStagingAreaLogic.updateDenominatorOOM(selectedDenOOM)
            }
          >
            Set Denominator OOM
          </Button>
        </div>
        <Button onClick={() => doStagingAreaLogic.reset()}>Reset SA</Button>
        <Button
          onClick={() => {
            doGameLogic.addFactor(stagingAreaState);
            doStagingAreaLogic.reset();
          }}
        >
          Add Factor
        </Button>
      </div>

      <div className="bg-gray-400 p-4 rounded-lg m-3">
        <h2 className="text-lg font-bold">Current Game State:</h2>
        <p>
          Numerator Units:{" "}
          {state.userFactors.map((factor) =>
            factor.numeratorUnits.map((unit) => unit.name).join(", ")
          )}
        </p>
        <p>
          Denominator Units:{" "}
          {state.userFactors.map((factor) =>
            factor.denominatorUnits.map((unit) => unit.name).join(", ")
          )}
        </p>
        <p>Answer: {calculateAnswer()}</p>
      </div>

      <Button onClick={() => doGameLogic.reset()}>Reset</Button>
    </>
  );
}

export default App;
