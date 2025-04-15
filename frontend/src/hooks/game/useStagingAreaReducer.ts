import { useReducer } from "react";
import { StagingAreaAction } from "@/types/stagingAreaTypes";
import { Factor, Unit, OOM } from "@/types";
import { getOOM } from "@/data/ooms";

//state managing reducer for the factor staging area
const stagingAreaReducer = (state: Factor, action: StagingAreaAction) => {
  switch (action.type) {
    case "ADD-UNIT-TO-NUMERATOR":
      return {
        ...state,
        numeratorUnits: [...state.numeratorUnits, action.unit],
      };
    case "REMOVE-UNIT-FROM-NUMERATOR":
      return {
        ...state,
        numeratorUnits: state.numeratorUnits.filter(
          (unit) => unit.id !== action.unit.id
        ),
      };
    case "ADD-UNIT-TO-DENOMINATOR":
      return {
        ...state,
        denominatorUnits: [...state.denominatorUnits, action.unit],
      };
    case "REMOVE-UNIT-FROM-DENOMINATOR":
      return {
        ...state,
        denominatorUnits: state.denominatorUnits.filter(
          (unit) => unit.id !== action.unit.id
        ),
      };
    case "UPDATE-NUMERATOR-OOM":
      return {
        ...state,
        numeratorOOM: action.oom,
      };
    case "UPDATE-DENOMINATOR-OOM":
      return {
        ...state,
        denominatorOOM: action.oom,
      };
    case "RESET":
      return {
        id: "staging-area",
        numeratorUnits: [],
        denominatorUnits: [],
        numeratorOOM: getOOM("1e0"),
        denominatorOOM: getOOM("1e0"),
      };
    default:
      return state;
  }
};

const emptyFactor: Factor = {
  id: "staging-area",
  numeratorUnits: [],
  denominatorUnits: [],
  numeratorOOM: getOOM("1e0"),
  denominatorOOM: getOOM("1e0"),
};

export default function useStagingAreaReducer(
  initialState: Factor = emptyFactor
) {
  const [stagingAreaState, dispatch] = useReducer(
    stagingAreaReducer,
    (initialState = emptyFactor)
  );

  //this technique abstracts away the logic reducer for the components that use this hook
  //the build, noBuild, etc is an easier interface than dispatch's obj arg on the right
  return {
    state: stagingAreaState,
    doStagingAreaLogic: {
      addUnitToNumerator: (unit: Unit) =>
        dispatch({ type: "ADD-UNIT-TO-NUMERATOR", unit }),
      removeUnitFromNumerator: (unit: Unit) =>
        dispatch({ type: "REMOVE-UNIT-FROM-NUMERATOR", unit }),
      addUnitToDenominator: (unit: Unit) =>
        dispatch({ type: "ADD-UNIT-TO-DENOMINATOR", unit }),
      removeUnitFromDenominator: (unit: Unit) =>
        dispatch({ type: "REMOVE-UNIT-FROM-DENOMINATOR", unit }),
      updateNumeratorOOM: (oom: OOM) =>
        dispatch({ type: "UPDATE-NUMERATOR-OOM", oom }),
      updateDenominatorOOM: (oom: OOM) =>
        dispatch({ type: "UPDATE-DENOMINATOR-OOM", oom }),
      reset: () => dispatch({ type: "RESET" }),
    },
  };
}
