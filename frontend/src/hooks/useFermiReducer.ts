import { useReducer } from "react";
import question from "@/data/question.json";
import { Factor, Value, UnitInventory, State, Action, Hook } from "@/types";
import { resolveUnits } from "@/helpers/unitManagement";
import {
  resolveValues,
  multiplyValues,
  createValueFromMantissaAndOom,
} from "@/helpers/valueManagement";
import { updateUnitCount } from "@/helpers/unitManagement";
import { v4 as uuidv4 } from "uuid";
import { getOomById } from "@/data/ooms";

// Initial state
const initialState: State = {
  question,
  factors: [],
  mode: "INIT",
  editingFactor: null,
  editingFactorIndex: null,
  editorState: {
    unit: {} as UnitInventory,
    numeratorValue: createValueFromMantissaAndOom(1, "1e0"),
    denominatorValue: createValueFromMantissaAndOom(1, "1e0"),
  },
};

const isEditorActive = (mode: State["mode"]) =>
  mode === "CREATING" || mode === "EDITING";

// Reducer function
const fermiReducer = (state: State, action: Action): State => {
  console.log("Fermi Action:", action.type, action);
  console.log("Fermi State:", state);

  switch (action.type) {
    case "CREATE_FACTOR": {
      const newFactor: Factor = {
        id: uuidv4(),
        unit: state.editorState.unit,
        numeratorValue: state.editorState.numeratorValue,
        denominatorValue: state.editorState.denominatorValue,
      };
      return {
        ...state,
        factors: [...state.factors, newFactor],
        mode: "CREATING",
        editingFactor: null,
        editingFactorIndex: null,
        editorState: initialState.editorState,
      };
    }

    case "UPDATE_FACTOR": {
      if (!state.editingFactor || state.editingFactorIndex === null)
        return state;

      const updatedFactor: Factor = {
        ...state.editingFactor,
        unit: state.editorState.unit,
        numeratorValue: state.editorState.numeratorValue,
        denominatorValue: state.editorState.denominatorValue,
      };

      // Insert the updated factor back at its original position
      const newFactors = [...state.factors];
      newFactors.splice(state.editingFactorIndex, 0, updatedFactor);

      return {
        ...state,
        factors: newFactors,
        mode: "CREATING",
        editingFactor: null,
        editingFactorIndex: null,
        editorState: initialState.editorState,
      };
    }

    case "DELETE_FACTOR":
      return {
        ...state,
        factors: state.factors.filter((f) => f.id !== action.id),
      };

    case "SET_EDIT_MODE": {
      // Find the index of the factor being edited
      const editingIndex = state.factors.findIndex(
        (f) => f.id === action.factor.id
      );
      // Remove the factor being edited from the committed state
      const remainingFactors = state.factors.filter(
        (f) => f.id !== action.factor.id
      );

      return {
        ...state,
        factors: remainingFactors,
        mode: "EDITING",
        editingFactor: action.factor,
        editingFactorIndex: editingIndex,
        editorState: {
          unit: action.factor.unit,
          numeratorValue: action.factor.numeratorValue,
          denominatorValue: action.factor.denominatorValue,
        },
      };
    }

    case "SET_CREATE_MODE":
      return {
        ...state,
        mode: "CREATING",
        editingFactor: null,
        editingFactorIndex: null,
        editorState: initialState.editorState,
      };

    case "CLEAR_EDITOR":
      return {
        ...state,
        mode: "CREATING",
        editingFactor: null,
        editingFactorIndex: null,
        editorState: initialState.editorState,
      };

    case "RESET":
      return {
        ...state,
        factors: [],
        mode: "CREATING",
        editingFactor: null,
        editingFactorIndex: null,
        editorState: initialState.editorState,
      };

    case "UPDATE_EDITOR_UNITS":
      if (!isEditorActive(state.mode)) return state;
      return {
        ...state,
        editorState: {
          ...state.editorState,
          unit: updateUnitCount(
            state.editorState.unit,
            action.unitId,
            action.delta
          ),
        },
      };

    case "UPDATE_NUMERATOR_MANTISSA":
      if (!isEditorActive(state.mode)) return state;
      return {
        ...state,
        editorState: {
          ...state.editorState,
          numeratorValue: createValueFromMantissaAndOom(
            action.mantissa,
            state.editorState.numeratorValue.oomId
          ),
        },
      };

    case "UPDATE_DENOMINATOR_MANTISSA":
      if (!isEditorActive(state.mode)) return state;
      return {
        ...state,
        editorState: {
          ...state.editorState,
          denominatorValue: createValueFromMantissaAndOom(
            action.mantissa,
            state.editorState.denominatorValue.oomId
          ),
        },
      };

    case "UPDATE_NUMERATOR_OOM":
      if (!isEditorActive(state.mode)) return state;
      return {
        ...state,
        editorState: {
          ...state.editorState,
          numeratorValue: createValueFromMantissaAndOom(
            state.editorState.numeratorValue.mantissa,
            action.oomId
          ),
        },
      };

    case "UPDATE_DENOMINATOR_OOM":
      if (!isEditorActive(state.mode)) return state;
      return {
        ...state,
        editorState: {
          ...state.editorState,
          denominatorValue: createValueFromMantissaAndOom(
            state.editorState.denominatorValue.mantissa,
            action.oomId
          ),
        },
      };

    default:
      return state;
  }
};

// Hook implementation
export default function useFermiReducer(): Hook {
  const [state, dispatch] = useReducer(fermiReducer, initialState);

  // Calculate derived state
  const n: Value = multiplyValues(state.factors.map((f) => f.numeratorValue));
  const d: Value = multiplyValues(state.factors.map((f) => f.denominatorValue));
  const n_editor: Value = state.editorState.numeratorValue;
  const d_editor: Value = state.editorState.denominatorValue;

  // Only include editor values if we're in an active editor mode, but don't double-count
  const liveValue: Value = isEditorActive(state.mode)
    ? resolveValues([n, n_editor], [d, d_editor])
    : resolveValues(n, d);
  const liveUnits: UnitInventory = resolveUnits([
    ...state.factors.map((f) => f.unit),
    ...(isEditorActive(state.mode) ? [state.editorState.unit] : []),
  ]);
  const liveOomDelta: number =
    getOomById(liveValue.oomId).exponent -
    getOomById(state.question.targetValue.oomId).exponent;

  return {
    state,
    actions: {
      createFactor: () => dispatch({ type: "CREATE_FACTOR" }),
      updateFactor: () => dispatch({ type: "UPDATE_FACTOR" }),
      deleteFactor: (id: string) => dispatch({ type: "DELETE_FACTOR", id }),
      setEditMode: (factor: Factor) =>
        dispatch({ type: "SET_EDIT_MODE", factor }),
      setCreateMode: () => dispatch({ type: "SET_CREATE_MODE" }),
      clearEditor: () => dispatch({ type: "CLEAR_EDITOR" }),
      reset: () => dispatch({ type: "RESET" }),
      addUnitToNumerator: (unitId: string) =>
        dispatch({ type: "UPDATE_EDITOR_UNITS", unitId, delta: 1 }),
      removeUnitFromNumerator: (unitId: string) =>
        dispatch({ type: "UPDATE_EDITOR_UNITS", unitId, delta: -1 }),
      addUnitToDenominator: (unitId: string) =>
        dispatch({ type: "UPDATE_EDITOR_UNITS", unitId, delta: -1 }),
      removeUnitFromDenominator: (unitId: string) =>
        dispatch({ type: "UPDATE_EDITOR_UNITS", unitId, delta: 1 }),
      updateNumeratorMantissa: (mantissa: number) =>
        dispatch({ type: "UPDATE_NUMERATOR_MANTISSA", mantissa }),
      updateDenominatorMantissa: (mantissa: number) =>
        dispatch({ type: "UPDATE_DENOMINATOR_MANTISSA", mantissa }),
      updateNumeratorOom: (oomId: string) =>
        dispatch({ type: "UPDATE_NUMERATOR_OOM", oomId }),
      updateDenominatorOom: (oomId: string) =>
        dispatch({ type: "UPDATE_DENOMINATOR_OOM", oomId }),
      submitFactor: () => {
        if (state.mode === "EDITING") {
          dispatch({ type: "UPDATE_FACTOR" });
        } else if (state.mode === "CREATING") {
          dispatch({ type: "CREATE_FACTOR" });
        }
      },
    },
    derivedState: {
      liveValue,
      liveUnits,
      liveOomDelta,
    },
  };
}
