import { Hook } from "@/types";
import PhantomFactorDisplay from "@/components/factor/PhantomFactorDisplay";
import MultiplicationSign from "@/components/MultiplicationSign";
import { Fragment } from "react/jsx-runtime";
import FactorLayout from "@/components/factor/FactorLayout";
interface FermiChainAreaProps {
  hook: Hook;
}

export default function FermiChainArea({ hook }: FermiChainAreaProps) {
  const { mode, factors, editingFactor, editorState } = hook.state;

  const renderFactors = () => {
    return factors.map((factor) => (
      <Fragment key={factor.id}>
        <FactorLayout
          data={factor}
          isEditing={mode === "EDITING" && editingFactor?.id === factor.id}
          onStartEdit={() => hook.actions.setEditMode(factor)}
          onRemove={() => hook.actions.deleteFactor(factor.id)}
          onSubmit={hook.actions.submitFactor}
          onClear={() => {
            hook.actions.clearEditor();
            hook.actions.setViewingMode();
          }}
          updateNumeratorMantissa={hook.actions.updateNumeratorMantissa}
          updateDenominatorMantissa={hook.actions.updateDenominatorMantissa}
          updateNumeratorOom={hook.actions.updateNumeratorOom}
          updateDenominatorOom={hook.actions.updateDenominatorOom}
        />
        <div className="h-[306px] pt-[calc(92px)]">
          <MultiplicationSign className="text-2xl md:text-3xl lg:text-4xl text-grey-500" />
        </div>
      </Fragment>
    ));
  };

  const renderEditorAtEnd = () => {
    if (mode === "CREATING" || mode === "INTRO") {
      return (
        <FactorLayout
          data={editorState}
          isEditing={true}
          updateNumeratorMantissa={hook.actions.updateNumeratorMantissa}
          updateDenominatorMantissa={hook.actions.updateDenominatorMantissa}
          updateNumeratorOom={hook.actions.updateNumeratorOom}
          updateDenominatorOom={hook.actions.updateDenominatorOom}
          onSubmit={hook.actions.submitFactor}
          onClear={() => {
            hook.actions.clearEditor();
            hook.actions.setViewingMode();
          }}
        />
      );
    }
    return null;
  };

  return (
    <>
      {renderFactors()}
      {renderEditorAtEnd()}
      {mode === "VIEWING" && (
        <PhantomFactorDisplay
          isInit={false}
          onClick={() => hook.actions.setCreateMode()}
        />
      )}
    </>
  );
}
