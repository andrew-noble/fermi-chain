import { Unit, Value, UnitInventory, Factor, Oom } from "./primitives";
import { Question } from "./primitives";

// Mode type
export type Mode = "INIT" | "INTRO" | "CREATING" | "EDITING" | "VIEWING";

export type EditorState = {
  unit: UnitInventory;
  numeratorValue: Value;
  denominatorValue: Value;
};

// CombinFactor, e, UnitInventoryd state type
export interface State {
  question: Question;
  factors: Factor[];
  mode: Mode;
  editingFactor: Factor | null; // null means creating new
  editingFactorIndex: number | null; // tracks position of factor being edited
  editorState: EditorState;
}

// Hook interface
export interface Hook {
  state: State;
  actions: {
    createFactor: () => void;
    updateFactor: () => void;
    deleteFactor: (id: string) => void;
    setEditMode: (factor: Factor) => void;
    setCreateMode: () => void;
    setViewingMode: () => void;
    setIntroMode: () => void;
    clearEditor: () => void;
    reset: () => void;
    addUnitToNumerator: (unit: Unit) => void;
    removeUnitFromNumerator: (unit: Unit) => void;
    addUnitToDenominator: (unit: Unit) => void;
    removeUnitFromDenominator: (unit: Unit) => void;
    updateNumeratorMantissa: (mantissa: number) => void;
    updateDenominatorMantissa: (mantissa: number) => void;
    updateNumeratorOom: (oom: Oom) => void;
    updateDenominatorOom: (oom: Oom) => void;
    submitFactor: () => void;
  };
  derivedState: {
    liveValue: Value;
    liveUnits: UnitInventory;
    liveOomDelta: number;
  };
}

// Combined action types
export type Action =
  | { type: "CREATE_FACTOR" }
  | { type: "UPDATE_FACTOR" }
  | { type: "DELETE_FACTOR"; id: string }
  | { type: "SET_EDIT_MODE"; factor: Factor }
  | { type: "SET_CREATE_MODE" }
  | { type: "SET_VIEWING_MODE" }
  | { type: "SET_INTRO_MODE" }
  | { type: "CLEAR_EDITOR" }
  | { type: "RESET" }
  | { type: "UPDATE_EDITOR_UNITS"; unit: Unit; delta: number }
  | { type: "UPDATE_NUMERATOR_MANTISSA"; mantissa: number }
  | { type: "UPDATE_DENOMINATOR_MANTISSA"; mantissa: number }
  | { type: "UPDATE_NUMERATOR_OOM"; oom: Oom }
  | { type: "UPDATE_DENOMINATOR_OOM"; oom: Oom };
