import { useReducer } from "react";
import question from "@/data/question.json";
import { Factor, Oom, UnitInventory, GameState, GameAction } from "@/types";
import { flattenUnits, isSameUnits } from "@/helpers/unitManagement";
import { isSameOom, flattenOoms } from "@/helpers/oomManagement";

// Reducer for managing the game state (list of user factors)
const gameReducer: React.Reducer<GameState, GameAction> = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case "ADD-FACTOR":
      // Add a new factor to the user's list
      return {
        ...state,
        userFactors: [...state.userFactors, action.factor],
      };
    case "REMOVE-FACTOR":
      // Remove a factor by id
      return {
        ...state,
        userFactors: state.userFactors.filter(
          (factor) => factor.id !== action.factor.id
        ),
      };
    case "UPDATE-FACTOR":
      // Update a factor by id
      return {
        ...state,
        userFactors: state.userFactors.map((factor) =>
          factor.id === action.factor.id ? action.factor : factor
        ),
      };
    case "RESET":
      // Reset all user factors
      return stateInit;
    default:
      return state;
  }
};

const stateInit: GameState = {
  question: question,
  userFactors: [],
};

export default function useGameLogic(initState: GameState = stateInit) {
  const [state, dispatch] = useReducer(gameReducer, initState);

  // Extract ooms from all user factors for calculation
  const numerators: Oom[] = state.userFactors.map((f) => f.numeratorOom);
  const denominators: Oom[] = state.userFactors.map((f) => f.denominatorOom);

  //-----Derived State for Display and Usage------
  const netOom: Oom = flattenOoms(numerators, denominators);
  const netUnits: UnitInventory = flattenUnits(
    state.userFactors.map((f) => f.units)
  );
  const isCorrectOom = isSameOom(state.question.targetAnswer, netOom.value);
  const isCorrectUnits = isSameUnits(netUnits, state.question.targetUnits);

  return {
    state: state,
    doGameLogic: {
      addFactor: (factor: Factor) => dispatch({ type: "ADD-FACTOR", factor }),
      removeFactor: (factor: Factor) =>
        dispatch({ type: "REMOVE-FACTOR", factor }),
      updateFactor: (factor: Factor) =>
        dispatch({ type: "UPDATE-FACTOR", factor }),
      reset: () => dispatch({ type: "RESET" }),
    },
    derivedState: {
      netUserOom: netOom,
      netUserUnits: netUnits,
      isCorrectOom: isCorrectOom,
      isCorrectUnits: isCorrectUnits,
    },
  };
}
