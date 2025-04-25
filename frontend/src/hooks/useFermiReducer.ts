import { useReducer } from "react";
import question from "@/data/question.json";
import {
  Factor,
  Value,
  UnitInventory,
  Unit,
  State,
  Action,
  Hook,
  Oom,
} from "@/types";
import { resolveUnits } from "@/helpers/unitManagement";
import { createValue, resolveValues } from "@/helpers/valueManagement";
import { updateUnitCount } from "@/helpers/unitManagement";
import { v4 as uuidv4 } from "uuid";

// Initial state
const initialState: State = {
  question,
  factors: [],
  mode: "INIT",
  editingFactor: null,
  editorState: {
    unit: {} as UnitInventory,
    numeratorValue: createValue(1),
    denominatorValue: createValue(1),
  },
};

const isEditorActive = (mode: State["mode"]) =>
  mode === "CREATING" || mode === "EDITING" || mode === "INTRO";

// Reducer function
const fermiReducer = (state: State, action: Action): State => {
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
        editorState: initialState.editorState,
      };
    }

    case "UPDATE_FACTOR": {
      if (!state.editingFactor) return state;

      const updatedFactor: Factor = {
        ...state.editingFactor,
        unit: state.editorState.unit,
        numeratorValue: state.editorState.numeratorValue,
        denominatorValue: state.editorState.denominatorValue,
      };

      return {
        ...state,
        factors: state.factors.map((f) =>
          f.id === state.editingFactor?.id ? updatedFactor : f
        ),
        mode: "CREATING",
        editingFactor: null,
        editorState: initialState.editorState,
      };
    }

    case "DELETE_FACTOR":
      return {
        ...state,
        factors: state.factors.filter((f) => f.id !== action.id),
      };

    case "SET_EDIT_MODE":
      return {
        ...state,
        mode: "EDITING",
        editingFactor: action.factor,
        editorState: {
          unit: action.factor.unit,
          numeratorValue: action.factor.numeratorValue,
          denominatorValue: action.factor.denominatorValue,
        },
      };

    case "SET_CREATE_MODE":
      return {
        ...state,
        mode: "CREATING",
        editingFactor: null,
        editorState: initialState.editorState,
      };

    case "CLEAR_EDITOR":
      return {
        ...state,
        mode: "CREATING",
        editingFactor: null,
        editorState: initialState.editorState,
      };

    case "RESET":
      return {
        ...state,
        factors: [],
        mode: "CREATING",
        editingFactor: null,
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
            action.unit,
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
          numeratorValue: {
            ...state.editorState.numeratorValue,
            mantissa: action.mantissa,
          },
        },
      };

    case "UPDATE_DENOMINATOR_MANTISSA":
      if (!isEditorActive(state.mode)) return state;
      return {
        ...state,
        editorState: {
          ...state.editorState,
          denominatorValue: {
            ...state.editorState.denominatorValue,
            mantissa: action.mantissa,
          },
        },
      };

    case "UPDATE_NUMERATOR_OOM":
      if (!isEditorActive(state.mode)) return state;
      return {
        ...state,
        editorState: {
          ...state.editorState,
          numeratorValue: {
            ...state.editorState.numeratorValue,
            oom: action.oom,
          },
        },
      };

    case "UPDATE_DENOMINATOR_OOM":
      if (!isEditorActive(state.mode)) return state;
      return {
        ...state,
        editorState: {
          ...state.editorState,
          denominatorValue: {
            ...state.editorState.denominatorValue,
            oom: action.oom,
          },
        },
      };

    case "SET_VIEWING_MODE":
      return {
        ...state,
        mode: "VIEWING",
      };

    case "SET_INTRO_MODE":
      return {
        ...state,
        mode: "INTRO",
        editingFactor: null,
        editorState: initialState.editorState,
      };

    default:
      return state;
  }
};

// Hook implementation
export default function useFermiReducer(): Hook {
  const [state, dispatch] = useReducer(fermiReducer, initialState);

  // Calculate derived state
  const numerators: Value[] = state.factors.map((f) => f.numeratorValue);
  const denominators: Value[] = state.factors.map((f) => f.denominatorValue);
  const userValue: Value = resolveValues(numerators, denominators);
  const userUnit: UnitInventory = resolveUnits(
    state.factors.map((f) => f.unit)
  );
  const oomDelta: number =
    userValue.oom.exponent - state.question.targetOom.exponent;

  return {
    state,
    actions: {
      createFactor: () => dispatch({ type: "CREATE_FACTOR" }),
      updateFactor: () => dispatch({ type: "UPDATE_FACTOR" }),
      deleteFactor: (id: string) => dispatch({ type: "DELETE_FACTOR", id }),
      setEditMode: (factor: Factor) =>
        dispatch({ type: "SET_EDIT_MODE", factor }),
      setCreateMode: () => dispatch({ type: "SET_CREATE_MODE" }),
      setViewingMode: () => dispatch({ type: "SET_VIEWING_MODE" }),
      clearEditor: () => dispatch({ type: "CLEAR_EDITOR" }),
      reset: () => dispatch({ type: "RESET" }),
      addUnitToNumerator: (unit: Unit) =>
        dispatch({ type: "UPDATE_EDITOR_UNITS", unit, delta: 1 }),
      removeUnitFromNumerator: (unit: Unit) =>
        dispatch({ type: "UPDATE_EDITOR_UNITS", unit, delta: -1 }),
      addUnitToDenominator: (unit: Unit) =>
        dispatch({ type: "UPDATE_EDITOR_UNITS", unit, delta: -1 }),
      removeUnitFromDenominator: (unit: Unit) =>
        dispatch({ type: "UPDATE_EDITOR_UNITS", unit, delta: 1 }),
      updateNumeratorMantissa: (mantissa: number) =>
        dispatch({ type: "UPDATE_NUMERATOR_MANTISSA", mantissa }),
      updateDenominatorMantissa: (mantissa: number) =>
        dispatch({ type: "UPDATE_DENOMINATOR_MANTISSA", mantissa }),
      updateNumeratorOom: (oom: Oom) =>
        dispatch({ type: "UPDATE_NUMERATOR_OOM", oom }),
      updateDenominatorOom: (oom: Oom) =>
        dispatch({ type: "UPDATE_DENOMINATOR_OOM", oom }),
      setIntroMode: () => dispatch({ type: "SET_INTRO_MODE" }),
      submitFactor: () => {
        if (state.mode === "EDITING") {
          dispatch({ type: "UPDATE_FACTOR" });
        } else if (state.mode === "CREATING" || state.mode === "INTRO") {
          dispatch({ type: "CREATE_FACTOR" });
        }
        dispatch({ type: "SET_VIEWING_MODE" });
      },
    },
    derivedState: {
      userValue,
      userUnit,
      oomDelta,
    },
  };
}
