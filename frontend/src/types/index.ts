export interface Factor {
  label: string;
  value: number;
  unit: string;
}

export interface Question {
  id: string;
  prompt: string;
  target_answer: number;
  unit: string;
  factors: Factor[];
  notes: string;
}

export interface Operation {
  label: string;
  symbol: string;
}

export type EntryItem =
  | { type: "factor"; data: Factor }
  | { type: "operation"; data: Operation };
