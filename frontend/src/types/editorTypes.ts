import { Oom, Unit, Factor, BaseFactor } from ".";

// Define specific action types
interface AddUnitToNumeratorAction {
  type: "ADD-UNIT-TO-NUMERATOR";
  unit: Unit;
}

interface AddUnitToDenominatorAction {
  type: "ADD-UNIT-TO-DENOMINATOR";
  unit: Unit;
}

interface RemoveUnitFromNumeratorAction {
  type: "REMOVE-UNIT-FROM-NUMERATOR";
  unit: Unit;
}

interface RemoveUnitFromDenominatorAction {
  type: "REMOVE-UNIT-FROM-DENOMINATOR";
  unit: Unit;
}

interface UpdateNumeratorOOMAction {
  type: "UPDATE-NUMERATOR-OOM";
  oom: Oom;
}

interface UpdateDenominatorOOMAction {
  type: "UPDATE-DENOMINATOR-OOM";
  oom: Oom;
}

interface ResetEditorAction {
  type: "RESET";
}

interface SetAllEditorAction {
  //for loading an existing factor into editor
  type: "SET-ALL";
  factor: Factor;
}

export interface EditorState extends BaseFactor {
  //for now, nothing, but likely important down the line
}

export type EditorAction =
  | AddUnitToNumeratorAction
  | AddUnitToDenominatorAction
  | RemoveUnitFromNumeratorAction
  | RemoveUnitFromDenominatorAction
  | UpdateNumeratorOOMAction
  | UpdateDenominatorOOMAction
  | ResetEditorAction
  | SetAllEditorAction;

// Public interface for the game hook
export interface EditorHook {
  state: EditorState;
  actions: {
    addUnitToNumerator: (unit: Unit) => void;
    removeUnitFromNumerator: (unit: Unit) => void;
    addUnitToDenominator: (unit: Unit) => void;
    removeUnitFromDenominator: (unit: Unit) => void;
    updateNumeratorOom: (oom: Oom) => void;
    updateDenominatorOom: (oom: Oom) => void;
    setAll: (factor: Factor) => void;
    reset: () => void;
  };
}
