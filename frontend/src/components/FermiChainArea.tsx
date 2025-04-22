import { Hook } from "@/types";

import FactorDisplay from "@/components/FactorDisplay";
import PhantomFactorDisplay from "@/components/PhantomFactorDisplay";
import MultiplicationSign from "@/components/MultiplicationSign";
import { Fragment } from "react/jsx-runtime";

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
        <Fragment key={factor.id}>
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
          {/* Hacky alignment, but it works*/}
          <div className="h-[306px] pt-[calc(92px)]">
            <MultiplicationSign className="text-2xl md:text-3xl lg:text-4xl" />
          </div>
        </Fragment>
      ));
    }

    // DEFAULT: creating new factor
    return (
      <>
        {factorList.map((factor) => (
          <Fragment key={factor.id}>
            <FactorDisplay
              key={factor.id}
              data={factor}
              isEditing={false}
              onStartEdit={() => hook.actions.startEditMode(factor)}
              onRemove={() => hook.actions.deleteFactor(factor.id)}
            />
            <div className="h-[306px] pt-[calc(92px)]">
              <MultiplicationSign className="text-2xl md:text-3xl lg:text-4xl" />
            </div>
          </Fragment>
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

  return <>{renderItems()}</>;
}
