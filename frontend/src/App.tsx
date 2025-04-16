import { useEffect } from "react";

import UnitSelectionPanel from "@/components/UnitSelectionPanel";
import StagingPanel from "@/components/StagingPanel";
import ResultsPanel from "@/components/ResultsPanel";
import FermiChainPanel from "@/components/FermiChainPanel";

import MainLayout from "./components/layouts/MainLayout";
import GameLayout from "./components/layouts/GameLayout";

import useGameLogic from "@/hooks/game/useGameReducer";
import useStagingAreaReducer from "@/hooks/game/useStagingAreaReducer";

import { Factor } from "@/types";
import { StagingAreaState } from "@/types/stagingAreaTypes";

import { v4 as uuidv4 } from "uuid";
import TopBar from "./components/topbar/TopBar";

function App() {
  const game = useGameLogic();
  const stagingArea = useStagingAreaReducer();

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
    <MainLayout
      topbar={<TopBar />}
      hero={<h2>{game.state.question.prompt} </h2>}
      footer={<p>Footer</p>}
    >
      <GameLayout
        topLeft={
          <StagingPanel
            state={stagingArea.state}
            onUpdateNumeratorOOM={
              stagingArea.doStagingAreaLogic.updateNumeratorOOM
            }
            onUpdateDenominatorOOM={
              stagingArea.doStagingAreaLogic.updateDenominatorOOM
            }
            onReset={stagingArea.doStagingAreaLogic.reset}
            onAddFactor={() => handleAddFactor(stagingArea.state)}
          />
        }
        topRight={
          <UnitSelectionPanel
            units={game.state.question.usefulUnitList}
            onAddNumerator={stagingArea.doStagingAreaLogic.addUnitToNumerator}
            onAddDenominator={
              stagingArea.doStagingAreaLogic.addUnitToDenominator
            }
          />
        }
        middle={
          <FermiChainPanel
            netUserUnits={game.derivedState.netUserUnits}
            netUserOom={game.derivedState.netUserOom}
            onReset={game.doGameLogic.reset}
          />
        }
        bottom={
          <ResultsPanel
            show={!!game.state.userFactors.length}
            isCorrectOom={!!game.derivedState.isCorrectOom}
            isCorrectUnits={!!game.derivedState.isCorrectUnits}
          />
        }
      />
    </MainLayout>
  );
}

export default App;
