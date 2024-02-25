import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";

import { useAtomValue } from "jotai";
import { useUserProductsId } from "src/services/payments";
import {
  RockData,
  getAreas,
  getRegions,
  getRocks,
  getSectors,
} from "src/services/rocks";
import { wantsToUseNotLoggedAtom } from "src/store/global";
import { useFilters } from "./useFilters";
import { useUserSubscription } from "./useUserSubscription";

export const useAreas = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [filteredRocks, setFilteredRocks] = useState<
    RockData[] | null | undefined
  >(null);
  const hasSubscription = useUserSubscription();
  const userProductsIds = useUserProductsId();
  const wantsToUseNotLogged = useAtomValue(wantsToUseNotLoggedAtom);

  const { activeFiltersCount, filters } = useFilters();

  const { data: areas, isLoading: areasLoading } = useQuery({
    queryFn: () => getAreas(),
    queryKey: ["areas"],
    cacheTime: Infinity,
    staleTime: 1000 * 60 * 60 * 24 * 30,
    enabled: !wantsToUseNotLogged,
  });
  const { data: regions, isLoading: regionsLoading } = useQuery({
    queryFn: () => getRegions(),
    queryKey: ["regions"],
    cacheTime: Infinity,
    staleTime: 1000 * 60 * 60 * 24 * 30,
    enabled: !wantsToUseNotLogged,
  });
  const { data: sectors, isLoading: sectorsLoading } = useQuery({
    queryFn: () => getSectors(),
    queryKey: ["sectors"],
    cacheTime: Infinity,
    staleTime: 1000 * 60 * 60 * 24 * 30,
    enabled: !wantsToUseNotLogged,
  });
  const {
    data: rocks,
    isLoading: rocksLoading,
    isInitialLoading,
    isFetching,
  } = useQuery({
    queryFn: () => getRocks(),
    queryKey: ["rocks"],
    cacheTime: Infinity,
    staleTime: 1000 * 60 * 60 * 24 * 30,
    enabled: !wantsToUseNotLogged,
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
        filters.onlyAvailable &&
        !hasSubscription &&
        rock.attributes.product.data?.attributes.uuid &&
        !userProductsIds?.includes(
          rock.attributes.product.data?.attributes.uuid,
        )
      ) {
        return false;
      }

      if (filters.familyFriendly && !rock.attributes.family_friendly) {
        return false;
      }

      if (
        filters.heightSelected[0] > rock.attributes.height ||
        filters.heightSelected[1] < rock.attributes.height
      ) {
        return false;
      }

      const shadings = filters.shadingSelected
        .filter((shading) => {
          if (shading.selected) return true;
        })
        .map((shading) => shading.type);
      if (shadings.length > 0 && !shadings.includes(rock.attributes.shading)) {
        return false;
      }

      const selectedFormations = filters.formationsSelected
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

      const selectedExpositions = filters.selectedExposition
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

      const selectedRouteTypes = filters.routeTypeSelected
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

      const selectedRouteGrades = filters.routesInterestedSections
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

    if (rocksToFilter?.length === 0) {
      Toast.show({
        type: "info",
        text1: "Brak skał do wyświetlenia",
        text2: "Zmień filtry żeby coś znaleźć ;)",
      });
    }
  }, [activeFiltersCount, filters, rocks]);

  return {
    areas,
    regions,
    sectors,
    rocks: filteredRocks,
    isLoading,
    rocksIsEmpty: !rocks || rocks.length < 1,
  };
};
