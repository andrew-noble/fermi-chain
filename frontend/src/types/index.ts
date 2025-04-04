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

export type EntryItem = {
  type: "factor" | "operation";
  data: Factor | Operation;
};

export type ValidationState = "init" | "valid" | "invalid";
