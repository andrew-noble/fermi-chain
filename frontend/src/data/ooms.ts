import { OOM } from "@/types";

// Named entries for special OOMs
const namedEntries: Record<
  string,
  { nameISO: string; nameShortScale: string }
> = {
  "1e-12": { nameISO: "pico", nameShortScale: "trillionth" },
  "1e-9": { nameISO: "nano", nameShortScale: "billionth" },
  "1e-6": { nameISO: "micro", nameShortScale: "millionth" },
  "1e-3": { nameISO: "milli", nameShortScale: "thousandth" },
  "1e0": { nameISO: "unit", nameShortScale: "unit" },
  "1e3": { nameISO: "kilo", nameShortScale: "thousand" },
  "1e6": { nameISO: "mega", nameShortScale: "million" },
  "1e9": { nameISO: "giga", nameShortScale: "billion" },
  "1e12": { nameISO: "tera", nameShortScale: "trillion" },
};

// Generate the array programmatically
export const OOMS = Array.from({ length: 25 }, (_, i) => {
  const power = i - 12; // From -12 to 12
  const id = `1e${power}`;
  const value = Math.pow(10, power);

  return {
    id,
    value,
    exponent: power,
    ...(namedEntries[id] || {}),
  } as OOM;
});

// Create a Map for efficient lookups
export const OOMS_MAP = new Map(OOMS.map((oom) => [oom.id, oom]));

// Helper functions
export const getOOM = (id: string): OOM => {
  const oom = OOMS_MAP.get(id);
  if (!oom) {
    throw new Error(`Invalid OOM ID: ${id}`);
  }
  return oom;
};
