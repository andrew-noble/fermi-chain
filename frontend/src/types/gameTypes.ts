import { OOM, Unit } from ".";

// Primitive Types
type UnitId = string;

// Common Structures
type UnitCount = {
  count: number;
  unitMetadata: Unit;
};

//structure for tracking what units are in num/denom
//count is positive? thats in the num, vv for denom
//note: there is special display logic to expel units with count = 0
export type UnitInventory = {
  [K in UnitId]: UnitCount;
};

// Base Types
export interface BaseFactor {
  units: UnitInventory;
  numeratorOOM: OOM;
  denominatorOOM: OOM;
}

// Game State Types
export interface Question {
  id: string;
  prompt: string;
  targetAnswer: number;
  targetOOM: OOM;
  targetUnits: UnitInventory;
  usefulUnitList: Unit[];
}

export interface Factor extends BaseFactor {
  id: string; //uuid
}

export interface GameState {
  question: Question;
  userFactors: Factor[];
}

// Action Types
interface AddFactorAction {
  type: "ADD-FACTOR";
  factor: Factor;
}

interface RemoveFactorAction {
  type: "REMOVE-FACTOR";
  factor: Factor;
}

interface UpdateFactorAction {
  type: "UPDATE-FACTOR";
  factor: Factor;
}

interface ResetAction {
  type: "RESET";
}

export type GameAction =
  | AddFactorAction
  | RemoveFactorAction
  | UpdateFactorAction
  | ResetAction;
