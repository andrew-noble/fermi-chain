import UnitSelectionArea from "@/components/UnitSelectionArea";
import FeedbackArea from "@/components/FeedbackArea";
import FermiChainArea from "@/components/FermiChainArea";

import RootLayout from "./components/layouts/RootLayout";
import ResponsiveGameLayout from "./components/layouts/ResponsiveGameLayout";

import useTheme from "@/hooks/useTheme";

import TopBar from "./components/topbar/TopBar";
import useFermiReducer from "./hooks/useFermiReducer";
import GameButtonArea from "./components/GameButtonArea";
import PhantomFactorDisplay from "./components/factor/PhantomFactorDisplay";

function App() {
  const hook = useFermiReducer();
  useTheme(); // This will initialize dark mode by default

  return (
    <RootLayout
      topbar={<TopBar />}
      hero={
        <p className="text-2xl md:text-3xl lg:text-4xl text-primary font-bold">
          {hook.state.question.prompt}
        </p>
      }
    >
      {hook.state.mode === "INIT" ? (
        <PhantomFactorDisplay
          isInit={true}
          onClick={() => hook.actions.setIntroMode()}
        />
      ) : (
        <ResponsiveGameLayout
          unitSelection={
            <UnitSelectionArea
              unitIds={hook.state.question.UnitList}
              onAddNumerator={hook.actions.addUnitToNumerator}
              onAddDenominator={hook.actions.addUnitToDenominator}
            />
          }
          fermiChain={<FermiChainArea hook={hook} />}
          feedback={<FeedbackArea hook={hook} />}
          gameButtonArea={<GameButtonArea hook={hook} />}
          showUnits={true}
          showFermiChain={true}
          showFeedback={hook.state.mode !== "INTRO"}
          showResults={hook.state.mode !== "INTRO"}
        />
      )}
    </RootLayout>
  );
}

export default App;
