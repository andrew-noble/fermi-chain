import UnitSelection from "@/components/UnitSelection";
import Staging from "@/components/Staging";
import Results from "@/components/Results";
import FermiChain from "@/components/FermiChain";

import MainLayout from "./components/layouts/MainLayout";
import GameLayout from "./components/layouts/GameLayout";

import useGameLogic from "@/hooks/game/useGameReducer";
import useStagingAreaReducer from "@/hooks/game/useStagingAreaReducer";
import useTheme from "@/hooks/useTheme";
import { Factor } from "@/types";
import { StagingAreaState } from "@/types/stagingAreaTypes";

import { v4 as uuidv4 } from "uuid";
import TopBar from "./components/topbar/TopBar";

function App() {
  const game = useGameLogic();
  const stagingArea = useStagingAreaReducer();
  const { toggleTheme } = useTheme();

  //handshake between staging area and game state. This will change later
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
      topbar={<TopBar onToggleTheme={toggleTheme} />}
      hero={
        <p className="text-4xl text-primary font-bold">
          {game.state.question.prompt}
        </p>
      }
      footer={<p>Footer</p>}
    >
      <GameLayout
        topLeft={
          <Staging
            state={stagingArea.state}
            onUpdateNumeratorOOM={
              stagingArea.doStagingAreaLogic.updateNumeratorOom
            }
            onUpdateDenominatorOOM={
              stagingArea.doStagingAreaLogic.updateDenominatorOom
            }
            onReset={stagingArea.doStagingAreaLogic.reset}
            onAddFactor={() => handleAddFactor(stagingArea.state)}
          />
        }
        topRight={
          <UnitSelection
            units={game.state.question.usefulUnitList}
            onAddNumerator={stagingArea.doStagingAreaLogic.addUnitToNumerator}
            onAddDenominator={
              stagingArea.doStagingAreaLogic.addUnitToDenominator
            }
          />
        }
        middle={
          <FermiChain state={game.state} onReset={game.doGameLogic.reset} />
        }
        bottom={
          <Results
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
