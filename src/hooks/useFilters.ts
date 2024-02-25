import { useAtom } from "jotai";

import {
  cleanFilterValues,
  filtersAtom,
  filtersCountAtom,
} from "src/store/filters";

export const useFilters = () => {
  const [filters, setFilters] = useAtom(filtersAtom);
  const [activeFiltersCount, setActiveFiltersCount] = useAtom(filtersCountAtom);

  const resetFilters = () => {
    setFilters(cleanFilterValues);
    setActiveFiltersCount(0);
  };

  // const setInitValues = async () => {
  //   if (initialized) return;
  //   setInitiialized(true);
  //   const valuesString = await AsyncStorage.getItem(storage.filters);
  //   if (valuesString) {
  //     const storageValues = (await JSON.parse(
  //       valuesString,
  //     )) as typeof cleanFilterValues;
  //   }
  // };

  return {
    resetFilters,
    filters,
  };
};
