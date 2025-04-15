import { OOM, Unit } from ".";
import { BaseFactor } from "./gameTypes";

// Define specific action types
interface AddUnitToNumeratorAction {
  type: "ADD-UNIT-TO-NUMERATOR";
  unit: Unit;
}

interface AddUnitToDenominatorAction {
  type: "ADD-UNIT-TO-DENOMINATOR";
  unit: Unit;
}

interface RemoveUnitFromNumeratorAction {
  type: "REMOVE-UNIT-FROM-NUMERATOR";
  unit: Unit;
}

interface RemoveUnitFromDenominatorAction {
  type: "REMOVE-UNIT-FROM-DENOMINATOR";
  unit: Unit;
}

interface UpdateNumeratorOOMAction {
  type: "UPDATE-NUMERATOR-OOM";
  oom: OOM;
}

interface UpdateDenominatorOOMAction {
  type: "UPDATE-DENOMINATOR-OOM";
  oom: OOM;
}

interface ResetStagingAreaAction {
  type: "RESET";
}

export interface StagingAreaState extends BaseFactor {
  //for now, nothing, but likely important down the line
}

export type StagingAreaAction =
  | AddUnitToNumeratorAction
  | AddUnitToDenominatorAction
  | RemoveUnitFromNumeratorAction
  | RemoveUnitFromDenominatorAction
  | UpdateNumeratorOOMAction
  | UpdateDenominatorOOMAction
  | ResetStagingAreaAction;
