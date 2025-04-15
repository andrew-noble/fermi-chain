import { useReducer } from "react";
import { GameState, GameAction } from "@/types/gameTypes";
import { Factor, Unit } from "@/types";

//global finite state machine for the whole app
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

  const calculateUserAnswer = () => {
    const result = state.userFactors.reduce((acc, factor) => {
      return acc * (factor.numeratorOOM.value / factor.denominatorOOM.value);
    }, 1);
    return result;
  };

  const calculateUserUnits = () => {
    const numeratorUnits: Unit[] = [];
    const denominatorUnits: Unit[] = [];

    //unpack the user's factor string into a list of n/d units
    state.userFactors.map((factor) => {
      factor.numeratorUnits.map((n_unit) => {
        numeratorUnits.push(n_unit);
      });
      factor.denominatorUnits.map((d_unit) => {
        denominatorUnits.push(d_unit);
      });
    });

    const doesCancel = (unit1: Unit, unit2: Unit) => {
      return unit1.dimension === unit2.dimension;
    };

    //iterate through numerator seeing if units cancel
    numeratorUnits.map((unit, idx) => {
      denominatorUnits.map((d_unit, d_idx) => {
        if (doesCancel(unit, d_unit)) {
          numeratorUnits.splice(idx, 1);
          denominatorUnits.splice(d_idx, 1);
        }
      });
    });

    return { numeratorUnits, denominatorUnits };
  };

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
    calculateUserAnswer: calculateUserAnswer,
    calculateUserUnits: calculateUserUnits,
  };
}
