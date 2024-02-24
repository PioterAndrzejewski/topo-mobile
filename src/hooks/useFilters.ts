import { useAtom } from "jotai";
import { useState } from "react";

import {
  exhibitionSelectedAtom,
  expositionSelectedClean,
  formationsSelectedAtom,
  formationsSelectedClean,
  gradesSectionsClean,
  heightValues,
  onlyAvailableAtom,
  onlyFamilyFriendlyAtom,
  routesInterestedAtom,
  selectedHeightAtom,
  shadingSelectedAtom,
  shadingSelectedClean,
} from "src/store/filters";

export const useFilters = () => {
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);
  const [onlyAvailable, setOnlyAvailable] = useAtom(onlyAvailableAtom);
  const [routesInterestedSections, setRoutesInterestedSections] =
    useAtom(routesInterestedAtom);
  const [formationsSelected, setFormationsSelected] = useAtom(
    formationsSelectedAtom,
  );
  const [heightSelected, setHeightSelected] = useAtom(selectedHeightAtom);
  const [familyFriendly, setFamilyFriendly] = useAtom(onlyFamilyFriendlyAtom);
  const [selectedExposition, setSelectedExposition] = useAtom(
    exhibitionSelectedAtom,
  );
  const [shadingSelected, setShadingSelected] = useAtom(shadingSelectedAtom);

  const resetFilters = () => {
    setOnlyAvailable(false);
    setRoutesInterestedSections(gradesSectionsClean);
    setFormationsSelected(formationsSelectedClean);
    setHeightSelected(heightValues);
    setFamilyFriendly(false);
    setSelectedExposition(expositionSelectedClean);
    setShadingSelected(shadingSelectedClean);
  };

  const countActiveFilters = () => {
    let activeNumber = 0;

    const routesSections = routesInterestedSections.map(
      (section) => section.selected,
    );
    if (routesSections.includes(true)) {
      activeNumber++;
    }

    if (onlyAvailable) {
      activeNumber++;
    }

    const formations = formationsSelected.map(
      (formation) => formation.selected,
    );
    if (formations.includes(true)) {
      activeNumber++;
    }

    if (
      heightSelected[0] !== heightValues[0] ||
      heightSelected[1] !== heightValues[1]
    ) {
      activeNumber++;
    }

    if (familyFriendly) {
      activeNumber++;
    }

    const expositions = selectedExposition.map(
      (exposition) => exposition.selected,
    );
    if (expositions.includes(true)) {
      activeNumber++;
    }

    const shadings = shadingSelected.map((shading) => shading.selected);
    if (shadings.includes(true)) {
      activeNumber++;
    }

    setActiveFiltersCount(activeNumber);
  };

  return { resetFilters, activeFiltersCount };
};
