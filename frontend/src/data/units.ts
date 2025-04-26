import { Unit } from "@/types/primitives";

export const UNITS: Record<string, Unit> = {
  meter: {
    id: "meter",
    symbol: "m",
    displayName: "meter",
    displayNamePlural: "meters",
    dimension: "length",
  },
  inch: {
    id: "inch",
    symbol: "in",
    displayName: "inch",
    displayNamePlural: "inches",
    dimension: "length",
  },
  "golf-ball": {
    id: "golf-ball",
    symbol: "golf ball",
    displayName: "golf ball",
    displayNamePlural: "golf balls",
    dimension: "quantity",
  },
  "heart-beat": {
    id: "heart-beat",
    symbol: "beat",
    displayName: "heart beat",
    displayNamePlural: "heart beats",
    dimension: "quantity",
  },
  minute: {
    id: "minute",
    symbol: "min",
    displayName: "minute",
    displayNamePlural: "minutes",
    dimension: "time",
  },
  hour: {
    id: "hour",
    symbol: "hr",
    displayName: "hour",
    displayNamePlural: "hours",
    dimension: "time",
  },
  day: {
    id: "day",
    symbol: "day",
    displayName: "day",
    displayNamePlural: "days",
    dimension: "time",
  },
  year: {
    id: "year",
    symbol: "yr",
    displayName: "year",
    displayNamePlural: "years",
    dimension: "time",
  },
};
