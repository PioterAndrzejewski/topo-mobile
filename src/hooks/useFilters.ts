import { useAtom } from "jotai";
import { useEffect, useState } from "react";

import {
  cleanFilterValues,
  filtersAtom,
  heightValues,
} from "src/store/filters";

export const useFilters = () => {
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);
  const [filters, setFilters] = useAtom(filtersAtom);

  const resetFilters = () => {
    setFilters(cleanFilterValues);
  };

  const countActiveFilters = () => {
    let activeNumber = 0;

    const routesSections = filters.routesInterestedSections.map(
      (section) => section.selected,
    );
    if (routesSections.includes(true)) {
      activeNumber++;
    }

    if (filters.onlyAvailable) {
      activeNumber++;
    }

    const formations = filters.formationsSelected.map(
      (formation) => formation.selected,
    );
    if (formations.includes(true)) {
      activeNumber++;
    }

    if (
      filters.heightSelected[0] !== heightValues[0] ||
      filters.heightSelected[1] !== heightValues[1]
    ) {
      activeNumber++;
    }

    if (filters.familyFriendly) {
      activeNumber++;
    }

    const expositions = filters.selectedExposition.map(
      (exposition) => exposition.selected,
    );
    if (expositions.includes(true)) {
      activeNumber++;
    }

    const shadings = filters.shadingSelected.map((shading) => shading.selected);
    if (shadings.includes(true)) {
      activeNumber++;
    }

    const routeTypes = filters.routeTypeSelected.map(
      (routeType) => routeType.selected,
    );
    if (routeTypes.includes(true)) {
      activeNumber++;
    }

    setActiveFiltersCount(activeNumber);
  };

  // const setInitValues = async () => {
  //   if (initialized) return;
  //   setInitiialized(true);
  //   const valuesString = await AsyncStorage.getItem(storage.filters);
  //   if (valuesString) {
  //     const storageValues = (await JSON.parse(
  //       valuesString,
  //     )) as typeof cleanFilterValues;
  //     setOnlyAvailable(storageValues.onlyAvailable);
  //     setRoutesInterestedSections(storageValues.routesInterestedSections);
  //     setFormationsSelected(storageValues.formationsSelected);
  //     setHeightSelected(storageValues.heightSelected);
  //     setFamilyFriendly(storageValues.familyFriendly);
  //     setSelectedExposition(storageValues.selectedExposition);
  //     setShadingSelected(storageValues.shadingSelected);
  //     setRouteTypeSelected(storageValues.routeTypeSelected);
  //   }
  // };

  useEffect(() => {
    countActiveFilters();
  }, [filters]);

  return {
    resetFilters,
    activeFiltersCount,
    filters,
  };
};
