import { Hook } from "@/types";

import FactorDisplay from "@/components/FactorDisplay";
import PhantomFactorDisplay from "@/components/PhantomFactorDisplay";
import MultiplicationSign from "@/components/MultiplicationSign";

interface FermiChainAreaProps {
  hook: Hook;
}

export default function FermiChainArea({ hook }: FermiChainAreaProps) {
  const factorList = hook.state.factors;

  //shouldn't be here...
  const handleSubmit = () => {
    if (hook.state.mode === "EDITING") {
      hook.actions.updateFactor();
    } else {
      hook.actions.createFactor();
    }
    // After submission, ensure we're in create mode with a fresh editor
    hook.actions.startCreateMode();
  };

  const renderItems = () => {
    // INIT: show just the start prompt
    if (hook.state.mode === "INIT") {
      return (
        <PhantomFactorDisplay
          isInit={true}
          onClick={() => {
            hook.actions.startCreateMode();
          }}
        />
      );
    }

    // EDIT: editing an existing factor
    if (hook.state.mode === "EDITING" && hook.state.editingFactor) {
      return factorList.map((factor) => (
        <>
          <FactorDisplay
            key={factor.id}
            isEditing={factor.id === hook.state.editingFactor?.id}
            data={factor}
            onStartEdit={() => hook.actions.startEditMode(factor)}
            onSubmit={handleSubmit}
            onClear={() => hook.actions.clearEditor()}
            updateNumeratorOom={hook.actions.updateNumeratorOom}
            updateDenominatorOom={hook.actions.updateDenominatorOom}
          />
          {/* Hack citu, but it works*/}
          <div className="h-[306px] pt-[calc(92px)]">
            <MultiplicationSign className="text-2xl md:text-3xl lg:text-4xl" />
          </div>
        </>
      ));
    }

    // DEFAULT: creating new factor
    return (
      <>
        {factorList.map((factor) => (
          <>
            <FactorDisplay
              key={factor.id}
              data={factor}
              isEditing={false}
              onStartEdit={() => hook.actions.startEditMode(factor)}
              onRemove={() => hook.actions.deleteFactor(factor.id)}
            />
            {/* Hack citu, but it works*/}
            <div className="h-[306px] pt-[calc(92px)]">
              <MultiplicationSign className="text-2xl md:text-3xl lg:text-4xl" />
            </div>
          </>
        ))}
        <FactorDisplay
          data={hook.state.editorState}
          isEditing={true}
          updateNumeratorOom={hook.actions.updateNumeratorOom}
          updateDenominatorOom={hook.actions.updateDenominatorOom}
          onSubmit={handleSubmit}
          onClear={() => hook.actions.clearEditor()}
        />
      </>
    );
  };

  return (
    <div className="flex flex-wrap gap-4 items-center">{renderItems()}</div>
  );
}
