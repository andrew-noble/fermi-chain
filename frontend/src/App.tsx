import UnitSelectionArea from "@/components/unit-selection/UnitSelectionArea";
import ResultsArea from "@/components/results/ResultsArea";
import FermiChainArea from "@/components/fermi-chain/FermiChainArea";

import RootLayout from "./components/layouts/RootLayout";
import ResponsiveGameLayout from "./components/layouts/ResponsiveGameLayout";

import useTheme from "@/hooks/useTheme";

import TopBar from "./components/topbar/TopBar";
import useEditorReducer from "./hooks/game/useEditorReducer";
import useChainReducer from "./hooks/game/useChainReducer";

function App() {
  const chain = useChainReducer();
  const editor = useEditorReducer();
  const toggleTheme = useTheme();

  return (
    <RootLayout
      topbar={<TopBar onToggleTheme={toggleTheme} />}
      hero={
        <p className="text-2xl md:text-3xl lg:text-4xl text-primary font-bold">
          {chain.state.question.prompt}
        </p>
      }
      footer={<p>© Andrew Noble, {new Date().getFullYear()}</p>}
    >
      <ResponsiveGameLayout
        unitSelection={
          <UnitSelectionArea
            show={chain.state.mode?.type !== "INIT"}
            units={chain.state.question.usefulUnitList}
            onAddNumerator={editor.actions.addUnitToNumerator}
            onAddDenominator={editor.actions.addUnitToDenominator}
          />
        }
        fermiChain={<FermiChainArea chain={chain} editor={editor} />}
        results={
          <ResultsArea
            show={
              chain.state.mode?.type !== "INIT" &&
              chain.state.userFactors.length > 0
            }
            chain={chain}
            editor={editor}
          />
        }
      />
    </RootLayout>
  );
}

export default App;
