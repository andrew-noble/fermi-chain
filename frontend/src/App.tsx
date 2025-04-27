import UnitSelectionArea from "@/components/features/unit-selection/UnitSelectionArea";
import FeedbackArea from "@/components/features/feedback/FeedbackArea";
import FermiChainArea from "@/components/features/chain/FermiChainArea";

import RootLayout from "@/components/layout/RootLayout";
import ResponsiveGameLayout from "@/components/layout/ResponsiveGameLayout";

import useTheme from "@/hooks/useTheme";

import TopBar from "@/components/misc/TopBar";
import useFermiReducer from "@/hooks/useFermiReducer";
import GameButtonArea from "@/components/features/results/GameButtonArea";
import PhantomFactorDisplay from "@/components/display/PhantomFactorDisplay";

function App() {
  const hook = useFermiReducer();
  useTheme(); // This will initialize dark mode by default

  return (
    <RootLayout
      topbar={<TopBar />}
      hero={
        <p className="text-xl sm:text-2xl lg:text-3xl text-primary font-bold">
          {hook.state.question.prompt}
        </p>
      }
    >
      {hook.state.mode === "INIT" ? (
        <PhantomFactorDisplay
          isInit={true}
          onClick={() => hook.actions.setCreateMode()}
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
          showFeedback={true}
          showResults={true}
        />
      )}
    </RootLayout>
  );
}

export default App;
