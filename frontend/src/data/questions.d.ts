declare module "@/data/questions.json" {
  interface Question {
    id: string;
    prompt: string;
    targetValue: {
      mantissa: number;
      oomId: string;
      fullValue: number;
    };
    targetUnit: {
      [key: string]: {
        power: number;
      };
    };
    targetChain: Array<{
      label: string;
      unit: {
        [key: string]: {
          power: number;
        };
      };
      numeratorValue: {
        mantissa: number;
        oomId: string;
        fullValue: number;
      };
      denominatorValue: {
        mantissa: number;
        oomId: string;
        fullValue: number;
      };
    }>;
    UnitList: string[];
  }

  const questions: Question[];
  export default questions;
}
