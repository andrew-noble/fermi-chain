import { useReducer } from "react";
import question from "@/data/question.json";
import { Factor, Oom, UnitInventory, Unit, State, Action, Hook } from "@/types";
import { resolveUnits } from "@/helpers/unitManagement";
import { resolveOoms } from "@/helpers/oomManagement";
import { getOomById } from "@/data/ooms";
import { updateUnitCount } from "@/helpers/unitManagement";
import { v4 as uuidv4 } from "uuid";

// Initial state
const initialState: State = {
  question,
  factors: [],
  mode: "INIT",
  editingFactor: null,
  editorState: {
    units: {} as UnitInventory,
    numeratorOom: getOomById("1e0"),
    denominatorOom: getOomById("1e0"),
  },
};

// Reducer function
const fermiReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "CREATE_FACTOR": {
      const newFactor: Factor = {
        id: uuidv4(),
        units: state.editorState.units,
        numeratorOom: state.editorState.numeratorOom,
        denominatorOom: state.editorState.denominatorOom,
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
        units: state.editorState.units,
        numeratorOom: state.editorState.numeratorOom,
        denominatorOom: state.editorState.denominatorOom,
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

    case "START_EDIT_MODE":
      return {
        ...state,
        mode: "EDITING",
        editingFactor: action.factor,
        editorState: {
          units: action.factor.units,
          numeratorOom: action.factor.numeratorOom,
          denominatorOom: action.factor.denominatorOom,
        },
      };

    case "START_CREATE_MODE":
      return {
        ...state,
        mode: "CREATING",
        editingFactor: null,
        editorState: initialState.editorState,
      };

    case "CANCEL_EDITING":
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
      return {
        ...state,
        editorState: {
          ...state.editorState,
          units: updateUnitCount(
            state.editorState.units,
            action.unit,
            action.delta
          ),
        },
      };

    case "UPDATE_EDITOR_NUMERATOR_OOM":
      return {
        ...state,
        editorState: {
          ...state.editorState,
          numeratorOom: action.oom,
        },
      };

    case "UPDATE_EDITOR_DENOMINATOR_OOM":
      return {
        ...state,
        editorState: {
          ...state.editorState,
          denominatorOom: action.oom,
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
  const numerators: Oom[] = state.factors.map((f) => f.numeratorOom);
  const denominators: Oom[] = state.factors.map((f) => f.denominatorOom);
  const chainOom: Oom = resolveOoms(numerators, denominators);
  const chainUnits: UnitInventory = resolveUnits(
    state.factors.map((f) => f.units)
  );

  return {
    state,
    actions: {
      createFactor: () => dispatch({ type: "CREATE_FACTOR" }),
      updateFactor: () => dispatch({ type: "UPDATE_FACTOR" }),
      deleteFactor: (id: string) => dispatch({ type: "DELETE_FACTOR", id }),
      startEditMode: (factor: Factor) =>
        dispatch({ type: "START_EDIT_MODE", factor }),
      startCreateMode: () => dispatch({ type: "START_CREATE_MODE" }),
      cancelEditing: () => dispatch({ type: "CANCEL_EDITING" }),
      reset: () => dispatch({ type: "RESET" }),
      addUnitToNumerator: (unit: Unit) =>
        dispatch({ type: "UPDATE_EDITOR_UNITS", unit, delta: 1 }),
      removeUnitFromNumerator: (unit: Unit) =>
        dispatch({ type: "UPDATE_EDITOR_UNITS", unit, delta: -1 }),
      addUnitToDenominator: (unit: Unit) =>
        dispatch({ type: "UPDATE_EDITOR_UNITS", unit, delta: -1 }),
      removeUnitFromDenominator: (unit: Unit) =>
        dispatch({ type: "UPDATE_EDITOR_UNITS", unit, delta: 1 }),
      updateNumeratorOom: (oom: Oom) =>
        dispatch({ type: "UPDATE_EDITOR_NUMERATOR_OOM", oom }),
      updateDenominatorOom: (oom: Oom) =>
        dispatch({ type: "UPDATE_EDITOR_DENOMINATOR_OOM", oom }),
    },
    derivedState: {
      chainOom,
      chainUnits,
    },
  };
}
