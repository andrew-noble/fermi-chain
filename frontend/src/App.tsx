import { useState, useEffect } from "react";

import ThemeToggle from "@/components/theme/ThemeToggle";
import AboutDialog from "@/components/dialogs/AboutDialog";
import { Button } from "@/components/ui/button";
import UnitSelectionPanel from "@/components/UnitSelectionPanel";
import StagingPanel from "@/components/StagingPanel";
import ResultsPanel from "@/components/ResultsPanel";
import FermiChainPanel from "@/components/FermiChainPanel";

import useGameLogic from "@/hooks/game/useGameReducer";
import useStagingAreaReducer from "@/hooks/game/useStagingAreaReducer";

import { Factor } from "@/types";
import { StagingAreaState } from "@/types/stagingAreaTypes";

import { v4 as uuidv4 } from "uuid";

function App() {
  const game = useGameLogic();

  const stagingArea = useStagingAreaReducer();

  const [aboutDialogOpen, setAboutDialogOpen] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme") || "light";
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, []);

  //handshake between staging area and game state.
  const handleAddFactor = (stagingAreaState: StagingAreaState) => {
    const newFactor: Factor = {
      id: uuidv4(),
      numeratorOom: stagingAreaState.numeratorOom,
      denominatorOom: stagingAreaState.denominatorOom,
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

      <UnitSelectionPanel
        units={game.state.question.usefulUnitList}
        onAddNumerator={stagingArea.doStagingAreaLogic.addUnitToNumerator}
        onAddDenominator={stagingArea.doStagingAreaLogic.addUnitToDenominator}
      />

      {/* Staging Area */}
      <StagingPanel
        state={stagingArea.state}
        onUpdateNumeratorOOM={stagingArea.doStagingAreaLogic.updateNumeratorOOM}
        onUpdateDenominatorOOM={
          stagingArea.doStagingAreaLogic.updateDenominatorOOM
        }
        onReset={stagingArea.doStagingAreaLogic.reset}
        onAddFactor={() => handleAddFactor(stagingArea.state)}
      />

      {/* Game State */}
      <FermiChainPanel
        netUserUnits={game.derivedState.netUserUnits}
        netUserOom={game.derivedState.netUserOom}
        onReset={game.doGameLogic.reset}
      />

      {/* Results */}
      <ResultsPanel
        show={!!game.state.userFactors.length}
        isCorrectOom={!!game.derivedState.isCorrectOom}
        isCorrectUnits={!!game.derivedState.isCorrectUnits}
      />
    </>
  );
}

export default App;
