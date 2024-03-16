import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { useAtomValue } from "jotai";
import { getAreas, getRegions, getRocks, getSectors } from "src/services/rocks";
import { wantsToUseNotLoggedAtom } from "src/store/global";
import { useUserProfile } from "./useUserProfile";

export const useAreas = () => {
  const [isLoading, setIsLoading] = useState(true);
  const wantsToUseNotLogged = useAtomValue(wantsToUseNotLoggedAtom);
  const { data: customer } = useUserProfile();

  const { data: areas, isLoading: areasLoading } = useQuery({
    queryFn: () => getAreas(),
    queryKey: ["areas"],
    staleTime: 1000 * 60 * 60 * 24 * 30,
    enabled: !wantsToUseNotLogged && !!customer?.id,
    gcTime: Infinity,
  });
  const { data: regions, isLoading: regionsLoading } = useQuery({
    queryFn: () => getRegions(),
    queryKey: ["regions"],
    staleTime: 1000 * 60 * 60 * 24 * 30,
    enabled: !wantsToUseNotLogged && !!customer?.id,
    gcTime: Infinity,
  });
  const { data: sectors, isLoading: sectorsLoading } = useQuery({
    queryFn: () => getSectors(),
    queryKey: ["sectors"],
    staleTime: 1000 * 60 * 60 * 24 * 30,
    enabled: !wantsToUseNotLogged && !!customer?.id,
    gcTime: Infinity,
  });
  const { data: rocks, isLoading: rocksLoading } = useQuery({
    queryFn: () => getRocks(),
    queryKey: ["rocks"],
    staleTime: 1000 * 60 * 60 * 24 * 30,
    enabled: !wantsToUseNotLogged && !!customer?.id,
    gcTime: Infinity,
  });

  useEffect(() => {
    if (areasLoading || regionsLoading || sectorsLoading || rocksLoading)
      return setIsLoading(true);
    setIsLoading(false);
  }, [areasLoading, regionsLoading, sectorsLoading, rocksLoading]);

  return {
    areas,
    regions,
    sectors,
    rocks,
    isLoading,
    rocksIsEmpty: !rocks || rocks.length < 1,
  };
};
