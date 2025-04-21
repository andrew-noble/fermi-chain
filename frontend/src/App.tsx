import UnitSelectionArea from "@/components/unit-selection/UnitSelectionArea";
import FeedbackArea from "@/components/FeedbackArea";
import FermiChainArea from "@/components/fermi-chain/FermiChainArea";

import RootLayout from "./components/layouts/RootLayout";
import ResponsiveGameLayout from "./components/layouts/ResponsiveGameLayout";

import useTheme from "@/hooks/useTheme";

import TopBar from "./components/topbar/TopBar";
import useFermiReducer from "./hooks/useFermiReducer";

function App() {
  const hook = useFermiReducer();
  const toggleTheme = useTheme();

  return (
    <RootLayout
      topbar={<TopBar onToggleTheme={toggleTheme} />}
      hero={
        <p className="text-2xl md:text-3xl lg:text-4xl text-primary font-bold">
          {hook.state.question.prompt}
        </p>
      }
    >
      <ResponsiveGameLayout
        unitSelection={
          <UnitSelectionArea
            show={hook.state.mode !== "INIT"}
            units={hook.state.question.usefulUnitList}
            onAddNumerator={hook.actions.addUnitToNumerator}
            onAddDenominator={hook.actions.addUnitToDenominator}
          />
        }
        fermiChain={<FermiChainArea hook={hook} />}
        feedback={
          <FeedbackArea show={hook.state.mode !== "INIT"} hook={hook} />
        }
      />
    </RootLayout>
  );
}

export default App;
