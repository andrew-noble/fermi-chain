import { Oom } from "@/types";

// Named entries for special OOMs
const namedEntries: Record<
  string,
  { nameISO: string; nameShortScale: string }
> = {
  "1e-12": { nameISO: "pico", nameShortScale: "trillionths" },
  "1e-11": { nameISO: "", nameShortScale: "hundred billionths" },
  "1e-10": { nameISO: "", nameShortScale: "ten billionths" },
  "1e-9": { nameISO: "nano", nameShortScale: "billionths" },
  "1e-8": { nameISO: "", nameShortScale: "hundred millionths" },
  "1e-7": { nameISO: "", nameShortScale: "ten millionths" },
  "1e-6": { nameISO: "micro", nameShortScale: "millionths" },
  "1e-5": { nameISO: "", nameShortScale: "hundred thousandths" },
  "1e-4": { nameISO: "", nameShortScale: "ten thousandths" },
  "1e-3": { nameISO: "milli", nameShortScale: "thousandths" },
  "1e-2": { nameISO: "centi", nameShortScale: "hundredths" },
  "1e-1": { nameISO: "deci", nameShortScale: "tenths" },
  "1e0": { nameISO: "one", nameShortScale: "one" },
  "1e1": { nameISO: "deca", nameShortScale: "tens" },
  "1e2": { nameISO: "hecto", nameShortScale: "hundreds" },
  "1e3": { nameISO: "kilo", nameShortScale: "thousands" },
  "1e4": { nameISO: "", nameShortScale: "ten thousands" },
  "1e5": { nameISO: "", nameShortScale: "hundred thousands" },
  "1e6": { nameISO: "mega", nameShortScale: "millions" },
  "1e7": { nameISO: "", nameShortScale: "ten millions" },
  "1e8": { nameISO: "", nameShortScale: "hundred millions" },
  "1e9": { nameISO: "giga", nameShortScale: "billions" },
  "1e10": { nameISO: "", nameShortScale: "ten billions" },
  "1e11": { nameISO: "", nameShortScale: "hundred billions" },
  "1e12": { nameISO: "tera", nameShortScale: "trillions" },
};

// Generate the array programmatically
export const ooms = Array.from({ length: 25 }, (_, i) => {
  const power = i - 12; // From -12 to 12
  const id = `1e${power}`;
  const value = Math.pow(10, power);

  return {
    id,
    value,
    exponent: power,
    ...(namedEntries[id] || {}),
  } as Oom;
});

// Create a Map for efficient lookups
export const OOMS_MAP = new Map(ooms.map((oom) => [oom.id, oom]));

// Helper functions
export const getOomById = (id: string): Oom => {
  const oom = OOMS_MAP.get(id);
  if (!oom) {
    throw new Error(`Invalid OOM ID: ${id}`);
  }
  return oom;
};
