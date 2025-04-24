import UnitSelectionArea from "@/components/UnitSelectionArea";
import FeedbackArea from "@/components/FeedbackArea";
import FermiChainArea from "@/components/FermiChainArea";

import RootLayout from "./components/layouts/RootLayout";
import ResponsiveGameLayout from "./components/layouts/ResponsiveGameLayout";

import useTheme from "@/hooks/useTheme";

import TopBar from "./components/topbar/TopBar";
import useFermiReducer from "./hooks/useFermiReducer";
import ResultsSection from "./components/ResultsSection";
import PhantomFactorDisplay from "./components/factor/PhantomFactorDisplay";

function SectionWrapper({
  show,
  children,
}: {
  show: boolean;
  children: React.ReactNode;
}) {
  if (!show) return null;
  return <>{children}</>;
}

function App() {
  const hook = useFermiReducer();
  const toggleTheme = useTheme();
  const showContent = hook.state.mode !== "INIT";
  return (
    <RootLayout
      topbar={<TopBar onToggleTheme={toggleTheme} />}
      hero={
        <p className="text-2xl md:text-3xl lg:text-4xl text-primary font-bold">
          {hook.state.question.prompt}
        </p>
      }
    >
      {showContent ? (
        <ResponsiveGameLayout
          unitSelection={
            <SectionWrapper show={showContent}>
              <UnitSelectionArea
                units={hook.state.question.usefulUnitList}
                onAddNumerator={hook.actions.addUnitToNumerator}
                onAddDenominator={hook.actions.addUnitToDenominator}
              />
            </SectionWrapper>
          }
          fermiChain={<FermiChainArea hook={hook} />}
          feedback={
            <SectionWrapper show={showContent}>
              <FeedbackArea hook={hook} />
            </SectionWrapper>
          }
          resultsSection={
            <SectionWrapper show={showContent}>
              <ResultsSection hook={hook} />
            </SectionWrapper>
          }
        />
      ) : (
        <PhantomFactorDisplay
          isInit={true}
          onClick={() => hook.actions.setCreateMode()}
        />
      )}
    </RootLayout>
  );
}

export default App;
