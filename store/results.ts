import { atom } from 'jotai'

export const resultsStageAtom = atom<number>(0);

export const emptyCurrentObject = {
  id: null,
  name: "Wybierz obszar",
};

type ResultsCurrentItem = {
  id: null | string;
  name: string;
};
export const resultsCurrentItemAtom = atom<ResultsCurrentItem>(emptyCurrentObject);
