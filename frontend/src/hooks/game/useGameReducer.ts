import { useReducer } from "react";
import { GameState, GameAction } from "@/types/gameTypes";
import { Factor } from "@/types";

//this is the finite state machine
const gameReducer = (state: GameState, action: GameAction) => {
  switch (action.type) {
    case "ADD-FACTOR":
      return {
        ...state,
        userFactors: [...state.userFactors, action.factor],
      };
    case "REMOVE-FACTOR":
      return {
        ...state,
        userFactors: state.userFactors.filter(
          (factor) => factor.id !== action.factor.id
        ),
      };
    case "UPDATE-FACTOR":
      return {
        ...state,
        userFactors: state.userFactors.map((factor) =>
          factor.id === action.factor.id ? action.factor : factor
        ),
      };
    case "RESET":
      return {
        ...state,
        userFactors: [],
      };
    default:
      return state;
  }
};

export default function useGameLogic(initialState: GameState) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  //this technique abstracts away the logic reducer for the components that use this hook
  //the build, noBuild, etc is an easier interface than dispatch's obj arg on the right
  return {
    state: state,
    doGameLogic: {
      addFactor: (factor: Factor) =>
        dispatch({ type: "ADD-FACTOR", factor: factor }),
      removeFactor: (factor: Factor) =>
        dispatch({ type: "REMOVE-FACTOR", factor: factor }),
      updateFactor: (factor: Factor) =>
        dispatch({ type: "UPDATE-FACTOR", factor: factor }),
      reset: () => dispatch({ type: "RESET" }),
    },
  };
}
