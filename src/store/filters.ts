import { atom } from "jotai";
import { Exhibition, Formations, RouteType, Shading } from "src/services/rocks";

export type GradeInterestedSection = {
  label: string;
  gradeMin: number;
  gradeMax: number;
};

export const gradesSectionsClean: GradeInterestedSection[] = [
  {
    label: "I - III+",
    gradeMin: 0,
    gradeMax: 3,
  },
  {
    label: "IV - IV+",
    gradeMin: 4,
    gradeMax: 5,
  },
  {
    label: "V- - V+",
    gradeMin: 6,
    gradeMax: 8,
  },
  {
    label: "VI- - VI+",
    gradeMin: 9,
    gradeMax: 11,
  },
  {
    label: "VI.1 - VI.1+",
    gradeMin: 12,
    gradeMax: 13,
  },
  {
    label: "VI.2 - VI.2+",
    gradeMin: 14,
    gradeMax: 15,
  },
  {
    label: "VI.3 - VI.3+",
    gradeMin: 16,
    gradeMax: 17,
  },
  {
    label: "VI.4 - VI.4+",
    gradeMin: 18,
    gradeMax: 19,
  },
  {
    label: "VI.5 - VI.5+",
    gradeMin: 20,
    gradeMax: 21,
  },
  {
    label: "VI.6 - VI.6+",
    gradeMin: 22,
    gradeMax: 23,
  },
  {
    label: "VI.7 - VI.7+",
    gradeMin: 24,
    gradeMax: 25,
  },
  {
    label: "VI.8 - VI.8+",
    gradeMin: 24,
    gradeMax: 30,
  },
];

export type FormationSelected = {
  type: Formations;
  selected: boolean;
};

export const formationsSelectedClean: Formations[] = [
  "slab",
  "vertical",
  "overhang",
  "roof",
  "chimney",
  "crack",
  "pillar",
];

export const expositionSelectedClean: Exhibition[] = [
  "north",
  "south",
  "east",
  "west",
];

export const shadingSelectedClean: Shading[] = [
  "shadow",
  "half-shadow",
  "sunny",
];

export const heightValues = [0, 70];

export const routeTypeSelectedClean: RouteType[] = ["sport", "trad", "boulder"];

export const cleanFilterValues = {
  onlyAvailable: false,
  familyFriendly: false,
  heightSelected: heightValues,
  routesInterestedSections: [] as string[],
  formationsSelected: [] as Formations[],
  selectedExposition: [] as Exhibition[],
  shadingSelected: [] as Shading[],
  routeTypeSelected: [] as RouteType[],
};

export const filtersAtom = atom<typeof cleanFilterValues>(cleanFilterValues);
export const filtersCountAtom = atom(0);
