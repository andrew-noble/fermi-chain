import { OOM, Unit } from ".";

export interface Question {
  id: string;
  prompt: string;
  targetAnswer: number;
  targetOOM: OOM;
  targetUnits: { numeratorUnits: Unit[] | []; denominatorUnits: Unit[] | [] };
  units: Unit[];
}

export interface Factor {
  id: string; //will be a uuid (i think?)
  numeratorUnits: Unit[] | [];
  denominatorUnits: Unit[] | [];
  numeratorOOM: OOM; //i think these don't need to be lists
  denominatorOOM: OOM;
}

export interface GameState {
  question: Question;
  //entirety of user input should be a list of constructed factors
  userFactors: Factor[] | [];
}

// Define specific action types
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

// Union type for all actions
export type GameAction =
  | AddFactorAction
  | RemoveFactorAction
  | UpdateFactorAction
  | ResetAction;
