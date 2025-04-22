import { Unit, Oom, UnitInventory, Factor } from "./primitives";
import { Question } from "./primitives";

// Mode type
export type Mode = "INIT" | "CREATING" | "EDITING";

export type EditorState = {
  units: UnitInventory;
  numeratorOom: Oom;
  denominatorOom: Oom;
};

// CombinFactor, e, UnitInventoryd state type
export interface State {
  question: Question;
  factors: Factor[];
  mode: Mode;
  editingFactor: Factor | null; // null means creating new
  editorState: EditorState;
}

// Hook interface
export interface Hook {
  state: State;
  actions: {
    createFactor: () => void;
    updateFactor: () => void;
    deleteFactor: (id: string) => void;
    startEditMode: (factor: Factor) => void;
    startCreateMode: () => void;
    clearEditor: () => void;
    reset: () => void;
    addUnitToNumerator: (unit: Unit) => void;
    removeUnitFromNumerator: (unit: Unit) => void;
    addUnitToDenominator: (unit: Unit) => void;
    removeUnitFromDenominator: (unit: Unit) => void;
    updateNumeratorOom: (oom: Oom) => void;
    updateDenominatorOom: (oom: Oom) => void;
  };
  derivedState: {
    chainOom: Oom;
    chainUnits: UnitInventory;
    oomDelta: number;
  };
}

// Combined action types
export type Action =
  | { type: "CREATE_FACTOR" }
  | { type: "UPDATE_FACTOR" }
  | { type: "DELETE_FACTOR"; id: string }
  | { type: "START_EDIT_MODE"; factor: Factor }
  | { type: "START_CREATE_MODE" }
  | { type: "CLEAR_EDITOR" }
  | { type: "RESET" }
  | { type: "UPDATE_EDITOR_UNITS"; unit: Unit; delta: number }
  | { type: "UPDATE_EDITOR_NUMERATOR_OOM"; oom: Oom }
  | { type: "UPDATE_EDITOR_DENOMINATOR_OOM"; oom: Oom };
