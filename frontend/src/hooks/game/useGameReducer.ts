import { useReducer } from "react";
import { GameState, GameAction } from "@/types/gameTypes";
import { Factor, UnitInventory } from "@/types";

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

//derived state functions -- for transforming single source of truth state into displayable format
const calculateUserAnswer = (state: GameState) => {
  const result = state.userFactors.reduce((acc, factor) => {
    return acc * (factor.numeratorOOM.value / factor.denominatorOOM.value);
  }, 1);
  return result;
};

const calculateUserUnits = (state: GameState) => {
  const masterInv: UnitInventory = {};

  //first, loop through the user's factors and compile their units into a master unitInventory
  //very gross but it works
  state.userFactors.forEach((factor) => {
    const thisFactorsUnits = Object.entries(factor.units);
    for (const [unitId, unitCount] of thisFactorsUnits) {
      if (!masterInv[unitId]) {
        //init if this unit hasn't been seen yet
        masterInv[unitId] = { ...unitCount };
      } else {
        //otherwise, record its count
        masterInv[unitId].count += factor.units[unitId].count;
      }
    }
  });

  //TO-DO: modularize this-- its also used in StagingAreaReducer
  //strip out units with quantity 0. My eyes, they hurt
  const result = Object.entries(masterInv).reduce<UnitInventory>(
    (acc, [id, { count, unitMetadata }]) => {
      if (count != 0) {
        acc[id] = { count, unitMetadata };
      }
      return acc;
    },
    {}
  );

  return result;
};

const isCorrectOOM = (state: GameState) => {
  const targetOOM = Math.floor(Math.log10(state.question.targetAnswer));
  //for now much of this is useless bc input is only powers of 10
  const userOOM = Math.floor(Math.log10(calculateUserAnswer(state)));
  return userOOM == targetOOM;
};

const isCorrectUnits = (state: GameState) => {
  const areEqual =
    JSON.stringify(calculateUserUnits(state)) ===
    JSON.stringify(state.question.targetUnits);
  return areEqual;
};

export default function useGameLogic(initialState: GameState) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

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
    netUserAnswer: calculateUserAnswer(state),
    netUserUnits: calculateUserUnits(state),
    isCorrectOOM: isCorrectOOM(state),
    isCorrectUnits: isCorrectUnits(state),
  };
}
