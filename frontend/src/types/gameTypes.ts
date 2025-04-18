import { Oom, Unit } from ".";

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
  numeratorOom: Oom;
  denominatorOom: Oom;
}

// Game State Types
export interface Question {
  id: string;
  prompt: string;
  targetAnswer: number;
  targetOom: Oom;
  targetUnits: UnitInventory;
  usefulUnitList: Unit[];
}

export interface Factor extends BaseFactor {
  id: string; //uuid
}

export type Mode =
  | { type: "VIEWING" }
  | { type: "CREATING" }
  | { type: "EDITING"; idOfFactorBeingEdited: string };

// Core game state
export interface GameState {
  question: Question;
  userFactors: Factor[];
  mode: Mode;
}

// Internal reducer action types
interface SubmitFactorAction {
  type: "SUBMIT-FACTOR";
  factor: Factor;
}

interface RemoveFactorAction {
  type: "REMOVE-FACTOR";
  factor: Factor;
}

interface ResetAction {
  type: "RESET";
}

interface SetModeAction {
  type: "SET-MODE";
  mode: Mode;
}

export type GameAction =
  | SubmitFactorAction
  | RemoveFactorAction
  | ResetAction
  | SetModeAction;

// Public interface for the game hook
export interface GameHook {
  state: GameState;
  actions: {
    submitFactor: (factor: Factor) => void;
    removeFactor: (factor: Factor) => void;
    reset: () => void;
    setMode: (mode: Mode) => void;
  };
  derivedState: {
    netUserOom: Oom;
    netUserUnits: UnitInventory;
    isCorrectOom: boolean;
    isCorrectUnits: boolean;
  };
}
