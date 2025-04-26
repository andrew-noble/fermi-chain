import { EditorState, Factor, Hook } from "@/types";
import FactorLayout from "@/components/factor/FactorLayout";

interface FermiChainAreaProps {
  hook: Hook;
}

export default function FermiChainArea({ hook }: FermiChainAreaProps) {
  const { mode, factors, editorState, editingFactorIndex } = hook.state;
  const {
    setEditMode,
    deleteFactor,
    submitFactor,
    clearEditor,
    updateNumeratorMantissa,
    updateDenominatorMantissa,
    updateNumeratorOom,
    updateDenominatorOom,
  } = hook.actions;

  let itemList: (Factor | EditorState)[] = [];

  if (mode === "EDITING") {
    itemList = [
      ...factors.slice(0, editingFactorIndex ?? 0),
      editorState,
      ...factors.slice(editingFactorIndex ?? 0),
    ];
  } else if (mode === "CREATING") {
    itemList = [...factors, editorState];
  }

  //a wee bit gross but clean logically. always rendering a list of factorLayouts
  return itemList.map((item, index) => (
    <FactorLayout
      key={index}
      data={item}
      isInput={
        (mode === "EDITING" && editingFactorIndex === index) ||
        (mode === "CREATING" && index === itemList.length - 1)
      }
      onStartEdit={
        editingFactorIndex !== index
          ? () => setEditMode(item as Factor)
          : undefined
      }
      onRemove={
        editingFactorIndex !== index
          ? () => deleteFactor((item as Factor).id)
          : undefined
      }
      onSubmit={() => submitFactor()}
      onClear={() => clearEditor()}
      updateNumeratorMantissa={updateNumeratorMantissa}
      updateDenominatorMantissa={updateDenominatorMantissa}
      updateNumeratorOom={updateNumeratorOom}
      updateDenominatorOom={updateDenominatorOom}
      showMultiplicationSign={index !== itemList.length - 1}
    />
  ));
}
