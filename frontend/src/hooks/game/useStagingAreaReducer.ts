import { useReducer } from "react";
import { StagingAreaAction, StagingAreaState } from "@/types/stagingAreaTypes";
import { Unit, OOM, UnitInventory } from "@/types";
import { getOOM } from "@/data/ooms";

const updateUnitCount = (
  units: UnitInventory,
  unit: Unit,
  delta: number // +1 for increment, -1 for decrement
) => {
  const newCount = (units[unit.id]?.count || 0) + delta;

  //to-do: modularize this process
  if (newCount === 0) {
    // Remove the unit from the dictionary. Fuckin weird
    const { [unit.id]: _, ...remainingUnits } = units;
    return remainingUnits;
  } else {
    return {
      ...units,
      [unit.id]: {
        unitMetadata: unit,
        count: newCount,
      },
    };
  }
};

//state managing reducer for the factor staging area
const stagingAreaReducer = (
  state: StagingAreaState,
  action: StagingAreaAction
) => {
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
        numeratorOOM: action.oom,
      };
    case "UPDATE-DENOMINATOR-OOM":
      return {
        ...state,
        denominatorOOM: action.oom,
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
  numeratorOOM: getOOM("1e0"),
  denominatorOOM: getOOM("1e0"),
};

export default function useStagingAreaReducer(
  init: StagingAreaState = stagingAreaInit
) {
  const [stagingAreaState, dispatch] = useReducer(stagingAreaReducer, init);

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
