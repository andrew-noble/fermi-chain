import { Value, UnitInventory, Factor, Question } from "./composites";

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
    addUnitToNumerator: (unitId: string) => void;
    removeUnitFromNumerator: (unitId: string) => void;
    addUnitToDenominator: (unitId: string) => void;
    removeUnitFromDenominator: (unitId: string) => void;
    updateNumeratorMantissa: (mantissa: number) => void;
    updateDenominatorMantissa: (mantissa: number) => void;
    updateNumeratorOom: (oomId: string) => void;
    updateDenominatorOom: (oomId: string) => void;
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
  | { type: "UPDATE_EDITOR_UNITS"; unitId: string; delta: number }
  | { type: "UPDATE_NUMERATOR_MANTISSA"; mantissa: number }
  | { type: "UPDATE_DENOMINATOR_MANTISSA"; mantissa: number }
  | { type: "UPDATE_NUMERATOR_OOM"; oomId: string }
  | { type: "UPDATE_DENOMINATOR_OOM"; oomId: string };
