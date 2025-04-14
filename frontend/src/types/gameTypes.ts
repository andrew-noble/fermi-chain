import { Question } from ".";
import { Factor } from ".";

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
