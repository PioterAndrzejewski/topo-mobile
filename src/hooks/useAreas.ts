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

      return true;
    });

    setFilteredRocks(rocksToFilter);
  }, [
    activeFiltersCount,
    onlyAvailable,
    familyFriendly,
    heightSelected,
    routesInterestedSections,
    formationsSelected,
    selectedExposition,
    shadingSelected,
    rocks,
  ]);

  return { areas, regions, sectors, rocks: filteredRocks, isLoading };
};
