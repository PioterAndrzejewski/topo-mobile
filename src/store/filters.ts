import { atom } from "jotai";
import { Exhibition, Formations, Shading } from "src/services/rocks";

export type GradeInterestedSection = {
  label: string;
  gradeMin: number;
  gradeMax: number;
  selected: boolean;
};

export const gradesSectionsClean: GradeInterestedSection[] = [
  {
    label: "I - III+",
    gradeMin: 0,
    gradeMax: 3,
    selected: false,
  },
  {
    label: "IV - IV+",
    gradeMin: 4,
    gradeMax: 5,
    selected: false,
  },
  {
    label: "V- - V+",
    gradeMin: 6,
    gradeMax: 8,
    selected: false,
  },
  {
    label: "VI- - VI+",
    gradeMin: 9,
    gradeMax: 11,
    selected: false,
  },
  {
    label: "VI.1 - VI.1+",
    gradeMin: 12,
    gradeMax: 13,
    selected: false,
  },
  {
    label: "VI.2 - VI.2+",
    gradeMin: 14,
    gradeMax: 15,
    selected: false,
  },
  {
    label: "VI.3 - VI.3+",
    gradeMin: 16,
    gradeMax: 17,
    selected: false,
  },
  {
    label: "VI.4 - VI.4+",
    gradeMin: 18,
    gradeMax: 19,
    selected: false,
  },
  {
    label: "VI.5 - VI.5+",
    gradeMin: 20,
    gradeMax: 21,
    selected: false,
  },
  {
    label: "VI.6 - VI.6+",
    gradeMin: 22,
    gradeMax: 23,
    selected: false,
  },
  {
    label: "VI.7 - VI.7+",
    gradeMin: 24,
    gradeMax: 25,
    selected: false,
  },
  {
    label: "VI.8 - VI.8+",
    gradeMin: 24,
    gradeMax: 30,
    selected: false,
  },
];

export type FormationSelected = {
  type: Formations;
  selected: boolean;
};

export const formationsSelectedClean: FormationSelected[] = [
  {
    type: "slab",
    selected: false,
  },
  {
    type: "vertical",
    selected: false,
  },
  {
    type: "overhang",
    selected: false,
  },
  {
    type: "roof",
    selected: false,
  },
  {
    type: "chimney",
    selected: false,
  },
  {
    type: "crack",
    selected: false,
  },
  {
    type: "pillar",
    selected: false,
  },
];

export type ExpositionSelected = {
  type: Exhibition;
  selected: boolean;
};

export const expositionSelectedClean: ExpositionSelected[] = [
  {
    type: "north",
    selected: false,
  },
  {
    type: "east",
    selected: false,
  },
  {
    type: "south",
    selected: false,
  },
  {
    type: "west",
    selected: false,
  },
];

export type ShadingSelected = {
  type: Shading;
  selected: boolean;
};

export const shadingSelectedClean: ShadingSelected[] = [
  {
    type: "shadow",
    selected: false,
  },
  {
    type: "half-shadow",
    selected: false,
  },
  {
    type: "sunny",
    selected: false,
  },
];

export const heightValues = [0, 70];

export const onlyAvailableAtom = atom<boolean>(false);
export const routesInterestedAtom =
  atom<GradeInterestedSection[]>(gradesSectionsClean);
export const formationsSelectedAtom = atom<FormationSelected[]>(
  formationsSelectedClean,
);
export const exhibitionSelectedAtom = atom<ExpositionSelected[]>(
  expositionSelectedClean,
);
export const selectedHeightAtom = atom<number[]>([
  heightValues[0],
  heightValues[1],
]);
export const onlyFamilyFriendlyAtom = atom<boolean>(false);
export const shadingSelectedAtom =
  atom<ShadingSelected[]>(shadingSelectedClean);
