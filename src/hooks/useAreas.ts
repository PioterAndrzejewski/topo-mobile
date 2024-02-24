import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useUserProductsId } from "src/services/payments";
import {
  RockData,
  getAreas,
  getRegions,
  getRocks,
  getSectors,
} from "src/services/rocks";
import { useFilters } from "./useFilters";
import { useUserSubscription } from "./useUserSubscription";

export const useAreas = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [filteredRocks, setFilteredRocks] = useState<
    RockData[] | null | undefined
  >(null);
  const hasSubscription = useUserSubscription();
  const userProductsIds = useUserProductsId();

  const {
    activeFiltersCount,
    onlyAvailable,
    routesInterestedSections,
    formationsSelected,
    heightSelected,
    familyFriendly,
    selectedExposition,
    shadingSelected,
    routeTypeSelected,
  } = useFilters();

  const { data: areas, isLoading: areasLoading } = useQuery({
    queryFn: () => getAreas(),
    queryKey: ["areas"],
  });
  const { data: regions, isLoading: regionsLoading } = useQuery({
    queryFn: () => getRegions(),
    queryKey: ["regions"],
  });
  const { data: sectors, isLoading: sectorsLoading } = useQuery({
    queryFn: () => getSectors(),
    queryKey: ["sectors"],
  });
  const { data: rocks, isLoading: rocksLoading } = useQuery({
    queryFn: () => getRocks(),
    queryKey: ["rocks"],
  });

  useEffect(() => {
    if (areasLoading || regionsLoading || sectorsLoading || rocksLoading)
      return setIsLoading(true);
    setIsLoading(false);
  }, [areasLoading, regionsLoading, sectorsLoading, rocksLoading]);

  useEffect(() => {
    if (activeFiltersCount === 0) setFilteredRocks(rocks);

    const rocksToFilter = rocks?.filter((rock) => {
      if (
        onlyAvailable &&
        !hasSubscription &&
        rock.attributes.product.data?.attributes.uuid &&
        !userProductsIds?.includes(
          rock.attributes.product.data?.attributes.uuid,
        )
      ) {
        return false;
      }

      if (familyFriendly && !rock.attributes.family_friendly) {
        return false;
      }

      if (
        heightSelected[0] > rock.attributes.height ||
        heightSelected[1] < rock.attributes.height
      ) {
        return false;
      }

      const shadings = shadingSelected
        .filter((shading) => {
          if (shading.selected) return true;
        })
        .map((shading) => shading.type);
      if (shadings.length > 0 && !shadings.includes(rock.attributes.shading)) {
        return false;
      }

      const selectedFormations = formationsSelected
        .filter((formation) => formation.selected)
        .map((formation) => formation.type);

      if (selectedFormations.length > 0) {
        const rockFormations = rock.attributes.formation.map(
          (formation) => formation.formation,
        );
        const found = selectedFormations.some((element) =>
          rockFormations.includes(element),
        );

        if (!found) {
          return false;
        }
      }

      const selectedExpositions = selectedExposition
        .filter((exposition) => exposition.selected)
        .map((exposition) => exposition.type);

      if (selectedExpositions.length > 0) {
        const rockExpositions = rock.attributes.exhibition.map(
          (exposition) => exposition.exhibition,
        );

        if (
          !selectedExpositions.some((element) =>
            rockExpositions.includes(element),
          )
        ) {
          return false;
        }
      }

      const selectedRouteTypes = routeTypeSelected
        .filter((routeType) => routeType.selected)
        .map((routeType) => routeType.type);

      if (selectedRouteTypes.length > 0) {
        const rockRouteTypes = rock.attributes.routes.data.map(
          (route) => route.attributes.Type,
        );
        if (
          !selectedRouteTypes.some((element) =>
            rockRouteTypes.includes(element),
          )
        ) {
          return false;
        }
      }

      const selectedRouteGrades = routesInterestedSections
        .filter((section) => section.selected)
        .map((section) => ({ max: section.gradeMax, min: section.gradeMin }));

      if (selectedRouteGrades.length > 0) {
        const rockRouteGrades = rock.attributes.routes.data.map(
          (route) => route.attributes.grade,
        );
        if (
          !selectedRouteGrades.some((selectedGrade) => {
            return !!rockRouteGrades.find(
              (rockRouteGrade) =>
                selectedGrade.min <= rockRouteGrade &&
                selectedGrade.max >= rockRouteGrade,
            );
          })
        ) {
          return false;
        }
      }

      return true;
    });

    setFilteredRocks(rocksToFilter);
  }, [
    activeFiltersCount,
    onlyAvailable,
    familyFriendly,
    heightSelected,
    shadingSelected,
    formationsSelected,
    selectedExposition,
    routeTypeSelected,
    routesInterestedSections,
    rocks,
  ]);

  return { areas, regions, sectors, rocks: filteredRocks, isLoading };
};
