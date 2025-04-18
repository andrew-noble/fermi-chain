import { useReducer } from "react";
import { Unit, Oom, Factor } from "@/types";
import { getOomById } from "@/data/ooms";
import { updateUnitCount } from "@/helpers/unitManagement";
import { EditorAction, EditorHook } from "@/types/editorTypes";
import { EditorState } from "@/types/editorTypes";

import { v4 as uuidv4 } from "uuid";

// Reducer managing the editor state
const editorReducer: React.Reducer<EditorState, EditorAction> = (
  state: EditorState,
  action: EditorAction
): EditorState => {
  switch (action.type) {
    case "ADD-UNIT-TO-NUMERATOR":
    case "REMOVE-UNIT-FROM-DENOMINATOR":
      return {
        ...state,
        units: updateUnitCount(state.units, action.unit, 1),
      };
    case "REMOVE-UNIT-FROM-NUMERATOR":
    case "ADD-UNIT-TO-DENOMINATOR":
      return {
        ...state,
        units: updateUnitCount(state.units, action.unit, -1),
      };
    case "UPDATE-NUMERATOR-OOM":
      return {
        ...state,
        numeratorOom: action.oom,
      };
    case "UPDATE-DENOMINATOR-OOM":
      return {
        ...state,
        denominatorOom: action.oom,
      };
    case "SET-ALL":
      return {
        ...action.factor,
      };
    case "RESET":
      return getInitStateFromFactor();
    default:
      return state;
  }
};

//this is for either reseting the editor to blank or to an existing factor for editing
//if factor is null, it means the user is creating a new factor, if not null, they're editing
function getInitStateFromFactor(factor?: Factor | null): EditorState {
  return {
    id: factor?.id ?? uuidv4(),
    units: factor?.units ?? {},
    numeratorOom: factor?.numeratorOom ?? getOomById("1e0"),
    denominatorOom: factor?.denominatorOom ?? getOomById("1e0"),
  };
}

export default function useEditorReducer(factor?: Factor | null): EditorHook {
  const [state, dispatch] = useReducer(
    editorReducer,
    getInitStateFromFactor(factor)
  );

  return {
    state,
    actions: {
      addUnitToNumerator: (unit: Unit) =>
        dispatch({ type: "ADD-UNIT-TO-NUMERATOR", unit }),
      removeUnitFromNumerator: (unit: Unit) =>
        dispatch({ type: "REMOVE-UNIT-FROM-NUMERATOR", unit }),
      addUnitToDenominator: (unit: Unit) =>
        dispatch({ type: "ADD-UNIT-TO-DENOMINATOR", unit }),
      removeUnitFromDenominator: (unit: Unit) =>
        dispatch({ type: "REMOVE-UNIT-FROM-DENOMINATOR", unit }),
      updateNumeratorOom: (oom: Oom) =>
        dispatch({ type: "UPDATE-NUMERATOR-OOM", oom }),
      updateDenominatorOom: (oom: Oom) =>
        dispatch({ type: "UPDATE-DENOMINATOR-OOM", oom }),
      setAll: (factor: Factor) => dispatch({ type: "SET-ALL", factor }),
      reset: () => dispatch({ type: "RESET" }),
    },
  };
}
