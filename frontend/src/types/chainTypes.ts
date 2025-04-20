import { Oom, Unit } from ".";
import { EditorState } from "./editorTypes";

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
  | { type: "INIT" }
  | { type: "EDITING"; idOfFactorBeingEdited: string }
  | null; // default "creating" mode

// Chain State Types
// Core chain state
export interface ChainState {
  question: Question;
  userFactors: Factor[];
  mode: Mode;
}

// Internal reducer action types
interface SubmitFactorAction {
  type: "SUBMIT-FACTOR";
  payload: EditorState;
}

interface RemoveFactorAction {
  type: "REMOVE-FACTOR";
  payload: Factor;
}

interface ResetAction {
  type: "RESET";
}

interface StartEditAction {
  type: "START-EDIT";
  payload: Factor | null;
}

export type ChainAction =
  | SubmitFactorAction
  | RemoveFactorAction
  | ResetAction
  | StartEditAction;

// Public interface for the chain hook
export interface ChainHook {
  state: ChainState;
  actions: {
    submitFactor: (payload: EditorState) => void;
    removeFactor: (payload: Factor) => void;
    reset: () => void;
    startEdit: (payload: Factor | null) => void;
  };
  derivedState: {
    chainOom: Oom;
    chainUnits: UnitInventory;
  };
}
