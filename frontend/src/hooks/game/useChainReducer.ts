import { useReducer } from "react";
import question from "@/data/question.json";
import {
  Factor,
  Oom,
  UnitInventory,
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
  switch (action.type) {
    case "SUBMIT-FACTOR": {
      if (state.mode?.type === "EDITING" && state.mode.idOfFactorBeingEdited) {
        return {
          ...state,
          userFactors: state.userFactors.map((factor) =>
            state.mode?.type === "EDITING" && //annoying extra mode check bc ts is fussy
            factor.id === state.mode.idOfFactorBeingEdited
              ? { ...action.payload, id: factor.id }
              : factor
          ),
          mode: null, // back to default create mode
        };
      } else {
        // default: new factor
        const newId = uuidv4();
        const newFactor: Factor = {
          ...action.payload,
          id: newId,
        };
        return {
          ...state,
          userFactors: [...state.userFactors, newFactor],
          mode: null,
        };
      }
    }
    case "START-EDIT": {
      if (action.payload?.id) {
        return {
          //edit existing
          ...state,
          mode: { type: "EDITING", idOfFactorBeingEdited: action.payload.id },
        };
      } else {
        //this shouldn't get triggered, but sends back to normal creating
        return { ...state, mode: null }; //create new
      }
    }

    case "REMOVE-FACTOR":
      // Remove a factor by id
      return {
        ...state,
        userFactors: state.userFactors.filter(
          (factor) => factor.id !== action.payload.id
        ),
      };
    case "RESET":
      // Reset all user factors
      return emptyState;
    default:
      return state;
  }
};

const emptyState: ChainState = {
  question: question,
  userFactors: [],
  mode: null,
};

const initState: ChainState = {
  question: question,
  userFactors: [],
  mode: { type: "INIT" },
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
      submitFactor: (payload: Factor | EditorState) =>
        dispatch({ type: "SUBMIT-FACTOR", payload }),
      removeFactor: (payload: Factor) =>
        dispatch({ type: "REMOVE-FACTOR", payload }),
      reset: () => dispatch({ type: "RESET" }),
      startEdit: (payload: Factor | null) =>
        dispatch({
          type: "START-EDIT",
          payload,
        }),
    },
    derivedState: {
      chainOom: chainOom,
      chainUnits: chainUnits,
    },
  };
}
