import { Hook } from "@/types";

import FactorDisplay from "@/components/FactorDisplay";
import PhantomFactorDisplay from "@/components/PhantomFactorDisplay";
import MultiplicationSign from "@/components/MultiplicationSign";
import { Fragment } from "react/jsx-runtime";

interface FermiChainAreaProps {
  hook: Hook;
}

export default function FermiChainArea({ hook }: FermiChainAreaProps) {
  const { mode, factors, editingFactor, editorState } = hook.state;

  const handleSubmit = () => {
    if (mode === "EDITING") {
      hook.actions.updateFactor();
    } else if (mode === "CREATING") {
      hook.actions.createFactor();
    }
    hook.actions.setViewingMode();
  };

  const renderFactors = () => {
    return factors.map((factor) => (
      <Fragment key={factor.id}>
        <FactorDisplay
          data={factor}
          isEditing={mode === "EDITING" && editingFactor?.id === factor.id}
          onStartEdit={() => hook.actions.setEditMode(factor)}
          onRemove={() => hook.actions.deleteFactor(factor.id)}
          onSubmit={handleSubmit}
          onClear={() => {
            hook.actions.clearEditor();
            hook.actions.setViewingMode();
          }}
          updateNumeratorOom={hook.actions.updateNumeratorOom}
          updateDenominatorOom={hook.actions.updateDenominatorOom}
        />
        <div className="h-[306px] pt-[calc(92px)]">
          <MultiplicationSign className="text-2xl md:text-3xl lg:text-4xl" />
        </div>
      </Fragment>
    ));
  };

  const renderEditor = () => {
    if (mode === "CREATING" || mode === "EDITING") {
      return (
        <FactorDisplay
          data={editorState}
          isEditing={true}
          updateNumeratorOom={hook.actions.updateNumeratorOom}
          updateDenominatorOom={hook.actions.updateDenominatorOom}
          onSubmit={handleSubmit}
          onClear={() => {
            hook.actions.clearEditor();
            hook.actions.setViewingMode();
          }}
        />
      );
    }
    return null;
  };

  if (mode === "INIT") {
    return (
      <PhantomFactorDisplay
        isInit={true}
        onClick={() => hook.actions.setCreateMode()}
      />
    );
  }

  return (
    <>
      {renderFactors()}
      {renderEditor()}
      {mode === "VIEWING" && (
        <PhantomFactorDisplay
          isInit={false}
          onClick={() => hook.actions.setCreateMode()}
        />
      )}
    </>
  );
}
