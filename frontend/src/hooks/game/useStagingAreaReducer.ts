import { useReducer } from "react";
import { Unit, Oom, StagingAreaAction, StagingAreaState } from "@/types";
import { getOomById } from "@/data/ooms";
import { updateUnitCount } from "@/helpers/unitManagement";

//state managing reducer for the factor staging area
const stagingAreaReducer: React.Reducer<StagingAreaState, StagingAreaAction> = (
  state: StagingAreaState,
  action: StagingAreaAction
): StagingAreaState => {
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
    case "RESET":
      return {
        ...stagingAreaInit,
      };
    default:
      return state;
  }
};

const stagingAreaInit: StagingAreaState = {
  units: {},
  numeratorOom: getOomById("1e0"),
  denominatorOom: getOomById("1e0"),
};

export default function useStagingAreaReducer(
  initState: StagingAreaState = stagingAreaInit
) {
  const [stagingAreaState, dispatch] = useReducer(
    stagingAreaReducer,
    initState
  );

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
      updateNumeratorOOM: (oom: Oom) =>
        dispatch({ type: "UPDATE-NUMERATOR-OOM", oom }),
      updateDenominatorOOM: (oom: Oom) =>
        dispatch({ type: "UPDATE-DENOMINATOR-OOM", oom }),
      reset: () => dispatch({ type: "RESET" }),
    },
  };
}
