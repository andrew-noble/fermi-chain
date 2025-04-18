import { useReducer } from "react";
import question from "@/data/question.json";
import {
  Factor,
  Oom,
  UnitInventory,
  GameState,
  GameAction,
  GameHook,
  Mode,
  EditorState,
} from "@/types";
import { flattenUnits, isSameUnits } from "@/helpers/unitManagement";
import { isSameOom, flattenOoms } from "@/helpers/oomManagement";
import { v4 as uuidv4 } from "uuid";

// Reducer for managing the game state (list of user factors)
const gameReducer: React.Reducer<GameState, GameAction> = (
  state: GameState,
  action: GameAction
): GameState => {
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

        case "VIEWING":
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
      return stateInit;
    case "SET-MODE":
      return { ...state, mode: action.mode };
    default:
      return state;
  }
};

const stateInit: GameState = {
  question: question,
  userFactors: [],
  mode: { type: "VIEWING" },
};

export default function useGameReducer(
  initState: GameState = stateInit
): GameHook {
  const [state, dispatch] = useReducer(gameReducer, initState);

  // Extract ooms from all user factors for calculation
  const numerators: Oom[] = state.userFactors.map((f) => f.numeratorOom);
  const denominators: Oom[] = state.userFactors.map((f) => f.denominatorOom);

  //-----Derived State for Display and Usage------
  const netOom: Oom = flattenOoms(numerators, denominators);
  const netUnits: UnitInventory = flattenUnits(
    state.userFactors.map((f) => f.units)
  );
  const isCorrectOom: boolean = isSameOom(
    state.question.targetAnswer,
    netOom.value
  );
  const isCorrectUnits: boolean = isSameUnits(
    netUnits,
    state.question.targetUnits
  );

  return {
    state,
    actions: {
      submitFactor: (factor: EditorState) =>
        dispatch({ type: "SUBMIT-FACTOR", factor }),
      removeFactor: (factor: Factor) =>
        dispatch({ type: "REMOVE-FACTOR", factor }),
      reset: () => dispatch({ type: "RESET" }),
      setMode: (mode: Mode) => dispatch({ type: "SET-MODE", mode }),
    },
    derivedState: {
      netUserOom: netOom,
      netUserUnits: netUnits,
      isCorrectOom: isCorrectOom,
      isCorrectUnits: isCorrectUnits,
    },
  };
}
