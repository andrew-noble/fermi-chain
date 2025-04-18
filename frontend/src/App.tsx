import UnitSelectionArea from "@/components/unit-selection/UnitSelectionArea";
import ResultsArea from "@/components/results/ResultsArea";
import FermiChainArea from "@/components/fermi-chain/FermiChainArea";

import MainLayout from "./components/layouts/MainLayout";
import GameLayout from "./components/layouts/GameLayout";

import useGameReducer from "@/hooks/game/useGameReducer";
import useTheme from "@/hooks/useTheme";

import TopBar from "./components/topbar/TopBar";
import useEditorReducer from "./hooks/game/useEditorReducer";

function App() {
  const game = useGameReducer();
  const editor = useEditorReducer();
  const { toggleTheme } = useTheme();

  return (
    <MainLayout
      topbar={<TopBar onToggleTheme={toggleTheme} />}
      hero={
        <p className="text-4xl text-primary font-bold">
          {game.state.question.prompt}
        </p>
      }
      footer={<p>© Andrew Noble, {new Date().getFullYear()}</p>}
    >
      <GameLayout
        top={
          <UnitSelectionArea
            units={game.state.question.usefulUnitList}
            onAddNumerator={editor.actions.addUnitToNumerator}
            onAddDenominator={editor.actions.addUnitToDenominator}
          />
        }
        middle={<FermiChainArea game={game} editor={editor} />}
        bottom={
          <ResultsArea
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
