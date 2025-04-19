import { useReducer } from "react";
import question from "@/data/question.json";
import {
  Factor,
  Oom,
  UnitInventory,
  Mode,
  EditorState,
  ChainState,
  ChainAction,
  ChainHook,
} from "@/types";
import { resolveUnits } from "@/helpers/unitManagement";
import { resolveOoms } from "@/helpers/oomManagement";
import { v4 as uuidv4 } from "uuid";

// Reducer for managing the chain state (list of user factors)
const chainReducer: React.Reducer<ChainState, ChainAction> = (
  state: ChainState,
  action: ChainAction
): ChainState => {
  //fuggggly nested switch...
  switch (action.type) {
    case "SUBMIT-FACTOR":
      switch (state.mode.type) {
        case "CREATING":
          const newId = uuidv4();
          const newFactor: Factor = {
            ...action.factor,
            id: newId,
          };
          return {
            ...state,
            userFactors: [...state.userFactors, newFactor],
            mode: { type: "VIEWING" },
          };
        case "EDITING":
          return {
            ...state,
            userFactors: state.userFactors.map((factor) =>
              state.mode.type === "EDITING" &&
              factor.id === state.mode.idOfFactorBeingEdited
                ? { ...action.factor, id: factor.id }
                : factor
            ),
            mode: { type: "VIEWING" },
          };
        default:
          return state;
      }
    case "REMOVE-FACTOR":
      // Remove a factor by id
      return {
        ...state,
        userFactors: state.userFactors.filter(
          (factor) => factor.id !== action.factor.id
        ),
      };
    case "RESET":
      // Reset all user factors
      return emptyState;
    case "SET-MODE":
      return { ...state, mode: action.mode };
    default:
      return state;
  }
};

const initState: ChainState = {
  question: question,
  userFactors: [],
  mode: { type: "INIT" },
};

const emptyState: ChainState = {
  question: question,
  userFactors: [],
  mode: { type: "VIEWING" },
};

export default function useChainReducer(
  init: ChainState = initState
): ChainHook {
  const [state, dispatch] = useReducer(chainReducer, init);

  // Extract ooms from all user factors for calculation
  const numerators: Oom[] = state.userFactors.map((f) => f.numeratorOom);
  const denominators: Oom[] = state.userFactors.map((f) => f.denominatorOom);

  //-----Derived State for Display and Usage------
  const chainOom: Oom = resolveOoms(numerators, denominators);
  const chainUnits: UnitInventory = resolveUnits(
    state.userFactors.map((f) => f.units)
  );

  return {
    state,
    actions: {
      submitFactor: (factor: Factor | EditorState) =>
        dispatch({ type: "SUBMIT-FACTOR", factor }),
      removeFactor: (factor: Factor) =>
        dispatch({ type: "REMOVE-FACTOR", factor }),
      reset: () => dispatch({ type: "RESET" }),
      setMode: (mode: Mode) => dispatch({ type: "SET-MODE", mode }),
    },
    derivedState: {
      chainOom: chainOom,
      chainUnits: chainUnits,
    },
  };
}
