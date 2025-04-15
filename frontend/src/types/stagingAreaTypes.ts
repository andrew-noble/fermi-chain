import { OOM, Unit } from ".";

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

export interface StagingAreaState {
  numeratorUnits: Unit[];
  denominatorUnits: Unit[];
  numeratorOOM: OOM;
  denominatorOOM: OOM;
}

export type StagingAreaAction =
  | AddUnitToNumeratorAction
  | AddUnitToDenominatorAction
  | RemoveUnitFromNumeratorAction
  | RemoveUnitFromDenominatorAction
  | UpdateNumeratorOOMAction
  | UpdateDenominatorOOMAction
  | ResetStagingAreaAction;
